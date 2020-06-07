# Node Rest API
- **Typescript**.  
- **Mongoose ORM**.
- **JWT (Passport)**.

- Data access service.
- Basic error handlers.
- Interfaces and types.
- Some simple authorization strategies illustrated & ready to use.

# Installation
- Clone the repository
```
git clone git@bitbucket.org:apetrisor91/typescript-nodejs.git
```
- Install dependencies
```
cd typescript-nodejs
npm install
npm run build
```
- Launch demo Node and Mongo server in docker containers
```
docker-compose build
docker-compose up
```
( *Alternatively, you can run and configure your local or cloud Mongo server and start Node server with
`npm start`* )

# Getting started

## Step1 : Register a user
Send a POST request to `http://localhost:3000/api/user/register` 
with the following payload ** :
```json
{
	"username": "me",
	"password": "pass"
}
```
You should get a JWT token in the response :
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lMiIsImlhdCI6MTU1MDU4MTA4NH0.WN5D-BFLypnuklvO3VFQ5ucDjBT68R2Yc-gj8AlkRAs"
}
```
## Step2 : Authorization w/ Passport strategies
Pass the following headers for:

Routes protected with `masterKey` **E.g. /auth/register**
```
Authorization     Bearer masterKey
```

Routes protected with `jwt` **E.g. /user/me**
```
Authorization     Bearer token
```

Add more strategies to passport or extend the `token` strategy to fine-grain authorization.

# Inspired by
- https://github.com/phcollignon/rest-api-node-jwt-typescript
- https://github.com/robert-dordai/mern-starter