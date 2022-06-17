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

#### Model rule

- User:

| field name   |   type   | rule                                                                                                  |
| ------------ | :------: | :---------------------------------------------------------------------------------------------------- |
| name         |  string  | not null                                                                                              |
| password     |  string  | more than 8 character. At least 1 uppercase character, number, special symbol and lowercase character |
| email        |  string  | email type, not null, unique                                                                          |
| birth        | datetime | not null, selected date no later than today                                                           |
| gender       |  string  | include [female, male, private], default is private                                                   |
| avatar       |  string  |                                                                                                       |
| updated date | datetime |                                                                                                       |

- Comment

| field name |   type   | rule                       |
| ---------- | :------: | :------------------------- |
| user       |   User   | not null                   |
| comments   |  string  | not null                   |
| datePost   | datetime | not null                   |
| stars      |  double  | between 0 and 5, default 0 |

- Food:

| field name  |   type    | rule                                               |
| ----------- | :-------: | :------------------------------------------------- |
| name        |  string   | not null                                           |
| images      | [string]  | not empty                                          |
| comments    | [comment] |                                                    |
| finalRate   |  double   | between 0 and 5, default 0                         |
| timePrepare |    int    | more than 5                                        |
| status      |  string   | include [normal, empty, little], default is normal |
| description |  string   | not null                                           |
| price       |  double   | not null                                           |

- Food in cart: match with food model data

| field name |   type   | rule                   |
| ---------- | :------: | :--------------------- |
| name       |  string  | not null               |
| image      |  string  | not null               |
| options    | [string] |                        |
| price      |  double  | not null               |
| quantity   |   int    | default 1, more than 1 |
| time       |   int    | more than 5, defaul 5  |

- Cart:

| field name  |      type      | rule                                                              |
| ----------- | :------------: | :---------------------------------------------------------------- |
| create Date |    datetime    | default now                                                       |
| foods       | [food in cart] | not empty                                                         |
| status      |     string     | includes [accept, prepare, shipping, done, reject], defaul accept |

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
