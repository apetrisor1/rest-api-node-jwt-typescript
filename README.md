# Node Rest API
- Written in **Typescript**.  
- Uses **Mongoose ORM**.
- Authentification and Authorization with **JWT (Passport)**.

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

# Credits
philippe@collignon.email
Routing based on FazTech rest api
> More information about the architecture of the API can be found in this Medium story :
> https://medium.com/@phcollignon/node-rest-api-jwt-in-typescript-e6a8ae5cd8f8

Updates by: adrian.petrisor@saltandpepper.co
```
- Fixed login.
- GET/PUT my user, to ilustrate a simple authorization strategy.
- Moved login, register to auth controller.
- Call passport middleware in auth controller. Keep strategies in services/passport.
- Error handlers and some refactoring.
```