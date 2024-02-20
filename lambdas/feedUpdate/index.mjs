/* eslint-disable import/no-extraneous-dependencies */
import pg from 'pg'
import dotenv from 'dotenv'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

dotenv.configDotenv()

export const handler = async (_event) => {
  let pool

  const db = new pg.Pool({
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
    const query = `SELECT title, description, company_id, created_at FROM jobs WHERE status = 'published'`
    pool = await db.connect()
    const { rows } = await pool.query(query)
    const s3 = new S3Client({ region: process.env.S3_REGION })

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: `${process.env.STORAGE_FOLDER}/jobs.json`,
      ACL: 'public-read',
      Body: JSON.stringify(rows),
      ContentType: 'application/json',
    })
    await s3.send(command)

    return 200
  } catch (err) {
    console.error(err)
    return 500
  } finally {
    if (pool) {
      pool.release()
    }
  }
}

handler()
