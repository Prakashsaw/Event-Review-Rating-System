# Event Review and Rating System

## GitHub Repo Link:

```bash
  https://github.com/Prakashsaw/Event-Review-Rating-System
```

## Deployed backend URL:

```bash
#   Deployed Backend URL will go here later
```

## To Access All the APIs tested on POSTMAN use below URL:

```bash
    https://lunar-crescent-279799.postman.co/workspace/Team-Workspace~57e4e80b-cbeb-4bed-8414-9c28139b9dd2/collection/25159059-e33e23f5-5eba-4fb6-a056-307bc3fd195e?action=share&creator=25159059&active-environment=25159059-d99bb387-6286-4b36-a31d-f83395388d55
```

## Description and Features

- Created backend REST APIs full project of review and rating system for the events.
- User Login and SignUp functionality with full validation, bcrypt passsword in backend, JWT token for secure user authentication.
- Organizer Login and SignUp functionality with full validation, bcrypt passsword in backend, JWT token for secure user authentication.
- Implementing middlewares for both user authorization and organizer authorization for secure APIs accessibility.
- Organizer can create/schedule events, display all the events, update/reschedule events and delete event also.
- User after SignUp/loggedIn, can view all reviews of a event, submit review, like review, report review, give rating for different criteria like registrationExperience, eventExperience, breakFastExperience and overall ratings.
- If report of a review is greater than or equal to 5 then that review will be flagged.
- Organizer can respond to a particular review.
- Implementing pagination features for browsing through rating/reviews, ensuring efficient handling of large datasets.

## Tech Stack

**Backend:** Node.js, Express.js.

**Database:** MongoDB.

**Backend APIs Testing Tool:** Postman.

## Run Locally

**Step:1-** Clone the project

```bash
  git clone https://github.com/Prakashsaw/Event-Review-Rating-System.git
```

**Step:2-** Go to the project directory

```bash
  cd Event-Review-Rating-System
```

**Step:3-** Install all the dependencies in Backend folder.

- Installl dependencies for backend

```bash
  cd Backend/
  npm install
```

**Step:4-** Create .env file in your Backend folder which will contain all your development environment private keys(variables) and their values

```bash
  PORT =
  MONGO_URL =
  SALT_ROUNDS =
  JWT_EXPIRES_IN =
  JWT_SECRETE_KEY =
```

**Step:5-** Start the Backend server / app

- Start the app.js

```bash
  //open new terminal
  cd Backend/
  npm run dev
```

**Step:6-** Now Review and Rating System App is running in your local system.

## Made By

- [@Prakashsaw](https://github.com/Prakashsaw)
