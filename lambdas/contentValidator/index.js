/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
const { Pool } = require('pg')
const doenv = require('dotenv')

doenv.configDotenv()

const handler = async (event) => {
  let pool

  const db = new Pool({
    user: process.env.USERNAME,
    host: process.env.HOST,
    database: process.env.DB,
    password: process.env.PASSWORD,
    port: +process.env.PORT,
    max: 5,
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
  })

  try {
    console.log(event)
    const body = JSON.parse(event.Records[0].body.toString())

    const { id, description } = body

    const response = await fetch(process.env.MODERATION_API_URL, {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify({ input: description }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAPI_KEY}`,
      },
    })

    if (response.status !== 200) {
      throw new Error('Error during openai request')
    }

    const bodyResponse = JSON.parse(await response.text())

    const isDescriptionApproved = !bodyResponse['results'][0]['flagged']

    if (isDescriptionApproved) {
      const query = `UPDATE jobs SET status = 'published' WHERE id = $1`
      const parameters = [id]

      pool = await db.connect()
      await pool.query(query, parameters)

      return 204
    }

    const notes = []

    for (const [key, value] of Object.entries(
      bodyResponse['results'][0]['categories']
    )) {
      if (value === true) {
        notes.push(`${key}: ${value}`)
      }
    }

    const notesJoined = notes.join(', ')

    const query = `UPDATE jobs SET status = 'rejected', notes = $1 WHERE id = $2`
    const parameters = [notesJoined, id]

    pool = await db.connect()
    await pool.query(query, parameters)

    return 204
  } catch (err) {
    console.error(err)
    return 500
  } finally {
    if (pool) {
      pool.release()
    }
  }
}

module.exports = {
  handler,
}
