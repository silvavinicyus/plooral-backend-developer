# Plooral Backend Developer Test
 This project propose a solution to an application capable of managing job offers from companies pre-registered in the application. The project consists of: 
 <ul>
  <li>
    Backend:  A backend responsible for showing companies, and handling job offers. 
  </li>
</ul>

 ## Requirements

 <table>
   <thead>
     <th> Requirements </th>
     <th> Version </th>
     <th> Install </th>
   </thead>
   <tbody>
     <tr>
       <td>
         NodeJs
       </td>
       <td>
         20.11.0
       </td>
       <td>
         <a href="https://nodejs.org/download/release/v20.11.0/"> Install </a>
       </td>
     </tr>
     <tr>
       <td>
         Yarn
       </td>
       <td>
         1.22.19
       </td>
       <td>
         <a href="https://classic.yarnpkg.com/lang/en/docs/install/"> Install </a>
       </td>
     </tr>
      <tr>
       <td>
         PostgreSQL
       </td>
       <td>
         16.0-1
       </td>
       <td>
         <a href="https://www.postgresql.org/download/"> Install </a>
       </td>
     </tr>
   </tbody>
 </table>
 
 ## Backend 
 
 ### Features
 <ul>
   <li> List all companies </li>
   <li> Show a company </li>
   <li> Create a job </li>
   <li> Publish a job </li>
   <li> Update a job </li>
   <li> Remove a job </li>
   <li> Archive a job </li>
 </ul>

 ### Architecture
The chosen architecture was based on clean architecture, despite not applying all the concepts of clean architecture. Where the system is divided into layers, with the following responsibilities:
<ul>
  <li> The first "domain" layer is responsible for storing the entities that represent the application domain. </li>
  <li> The second "business" layer is responsible for creating DTOs (Data Transfer Object), service and repository operating contracts, possible errors in services, in addition to the services themselves. </li>
  <li> The third layer "useCases" stores the application's useCases, where some business rules are applied in addition to the validation of the serializers, which bring the data sent by the web environment </li>
  <li> The fourth layer is where the implementations of repositories and services are located, which need to respect the contracts defined in layer 2, dependency injections are carried out, routes and real "controllers" are defined, which receive the data coming from the API endpoints and pass them on. for layer 3 controllers. This layer is where the use of frameworks, external libraries, etc. comes in heavily. Possible adapters can also be created in this layer that work to translate what is received by the database, for example, to what is expected by the system, controllers, etc.</li>
</ul>

### Banco de dados e variáveis de ambiente
<li>
  The code for creating the database tables can be found in the folder <a href="https://github.com/silvavinicyus/plooral-backend-developer/blob/master/ddl/models.sql"> ddl </a>
</li>
<li>
  In the project's root there is a .env.example file containing all the environment variables necessary for the system to work correctly. For correct configuration, it is necessary to create a ".env" file at the root of the project and add all variables from .env.example to this new .env file, adding the correct value for those variables based on your database configuration and accounts.
</li>

### Install e Run
  To run the project, the following steps must be executed:
   <li> 
     1 - Execute the ddl file located <a href="https://github.com/silvavinicyus/plooral-backend-developer/blob/master/ddl/models.sql"> here </a>  to create the database tables and company data. 
   </li> 
   
   <li>
     2 - Clone this repository in your computer.

    git clone git@github.com:silvavinicyus/plooral-backend-developer.git
    
   </li>
   
   <li>
     3 - Via terminal navigate to the application folder.

    cd plooral-backend-developer
    
   </li>
   
   <li>
     4 - Install the project dependencies by running the following command in (terminal / cmd):      

    yarn install   
   </li>
                   
After installing and preparing the environment, to execute the project it is only necessary to execute the following command in the (terminal / cmd):
 
     yarn dev     

### Testes 
 After installing the project dependendcies, to run the unit tests simple execute the following command in (terminal / cmd). 

     yarn run test     
 
 
### Libs & Frameworks 
<table>
  <thead>
    <th> Lib </th>
    <th> Version </th>
  </thead>
  <tbody>
    <tr>
      <td> NodeJs </td>
      <td> 20.11.0 </td>
    </tr>
    <tr>
      <td> AWS SDK </td>
      <td> 2.1559.0 </td>
    </tr>
    <tr>
      <td> Express.js </td>
      <td> 4.18.2 </td>
    </tr>
    <tr>
      <td> TypeScript </td>
      <td> 5.3.3 </td>
    </tr>
    <tr>
      <td> PostgreSQL </td>
      <td> 16.0-1 </td>
    </tr>
    <tr>
      <td> Jest </td>
      <td> 29.5.0 </td>
    </tr>
    <tr>
      <td> Sequelize </td>
      <td> 6.35.2 </td>
    </tr>
    <tr>
      <td> ESLint </td>
      <td> 8.56.2 </td>
    </tr>
    <tr>
      <td> Prettier </td>
      <td> 3.2.4 </td>
    </tr>
  </tbody>
</table>

### Bonus Questions
1 - First of all, I would try to separate the OpenAI API calls and the database updates, so the serverless would only handle the OpenAI API calls, and send the results back to the API. If available, would improve the computational power of these serverless service, trying to improve response time. Then, back to the main API, we could store all the openai results in runtime memory, and when we have a 100 results (where the number would be a parameter that could be changed at anytime needed), we would update all these 100 results in the database and update the feed information service, also if we dont reach the 100 results in 10 minutes, we would update the database with the current amount of results and restart the count. This way, the serverless moderation service would only have to handle de moderation and the api would be responsible for all data changes in the database, also with the strategy of multi update after reaching X results or Y time, we would have a huge decrease in the number of database connections.

2- I would create an EC2 instance in AWS, and configure a redis database for caching, that would be update by the API everytime that the a new job was published or a publish job was archived or removed. So this way, we would have a really fast endpoint to serve the feed globally. If needed, we could add some more instances and create a load balance to make this instances work together and avoid availability problems.