# be-food-app

Backend for food economic. This application allows to create users, accept users
to order food, and can store cart history on the local side as well as on the
server side.

## Enviroment

### Development framework

- Typescript: v4.2.3
- Node: v14.16.0
- Express: v4.18.1

### Database

- Mongoose: v6.3.3
- GridFs

## Data

Using data, some collected from Yummy website by collecting on the internet,
some created by faker library. Main purpose is used to improve my development
and coding skills, not for commercial purposes.

## Backlog

- auth ✅
- user ✅
- food ✅
- photos ✅
- payment
- history

--- This will update late ---

## Route:

### base url: https://be-food-app.heroku.com

### food:

- [GET] /food/get/popular get popular food by rating star on food
- [GET] /food/get/common: get common food by comment of food
- [GET] /food/get?limit=&offset=: get food list with pagination
- [GET] /food/get/idFood: get food detail

### user: Users can create accounts with a unique email, some feature basic like change password, change user info, show profile of account, ...

- [GET] /user/get/:userId get uesr by id
- [PATCH] /user/update/:userId: update infomation in account by id
- [POST] /user/create: sign up account
- [POST] /user/signin: login
- [POST] /user/verify: verify email is exits
- [POST] /user/change_password

### photos: upload image, show and delete image

- [POST] /photos/upload: login
- [GET] /photos/:filename: verify email is exits
- [DELETE] /photos/:filename

## Run:

- npm i
- npm start
