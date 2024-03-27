# Event Review and Rating System

## GitHub Repo Link: 
```bash 
  https://github.com/Prakashsaw/Event-Review-Rating-System
```
## Deployed backend URL: 
```bash 
#   Deployed Backend URL will go here later
```

## Description and Features
* Create a backend REST APIs full project of review and rating system for the events.
* User Login and SignUp functionality with full validation, bcrypt passsword in backend, JWT token for   secure user authentication.
* Organizer Login and SignUp functionality with full validation, bcrypt passsword in backend, JWT token for secure user authentication.
* Implementing middlewares for both user authorization and organizer authorization for secure APIs accessibility.
* Organizer can create/schedule events, display all the events, update/reschedule events and delete event also.
* User after SignUp/loggedIn, can view all reviews of a event, submit review, like review, report review, give rating for different criteria like registrationExperience, eventExperience, breakFastExperience and overall ratings.
* If report of a review is greater than or equal to 5 then that review will be flagged.
* Organizer can respond to a particular review.
* Implementing pagination features for browsing through rating/reviews, ensuring efficient handling of large datasets.

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

**Step:3-** Install all the dependencies in backend folder.

* Installl dependencies for backend
```bash
  cd Backend/
  npm install
```

**Step:4-** Make .env file in your server folder which will contain all your development environment variables with private keys
```bash
  PORT = 
  MONGO_URL = 
  SALT_ROUNDS = 
  JWT_EXPIRES_IN = 
  JWT_SECRETE_KEY = 
```

**Step:5-** Start the backend server / app

* Start the client
```bash
  //open new terminal
  cd backend
  npm run dev
```

**Step:6-** Now Review and Rating System App is running in your local system.

<!-- ## Features

#### Login and Registration with full user validation.

#### Validate user email with sending email for email confirmation link email then user email have been verified.

#### User authentication and authorization using JWT token for secure user authentication.

#### Forgot password features when user don't remembered their password.

#### User can Update their profile details after loggedIn and also able to change their password as well.

#### User can add their transaction, edit transaction, delete transaction with confirmation.

#### User can view their finantial transaction in weekly, monthly and yealy basis (filterration).

#### User can view transaction history by selecting custom dates also.

#### User can filter their transaction by category like by all income, all expenses and both income and expenses.

#### User can view expense analytics and visualizations in graphs and charts. -->


## Made By
- [@Prakashsaw](https://github.com/Prakashsaw)
