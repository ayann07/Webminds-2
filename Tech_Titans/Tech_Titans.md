<h1 align="center" id="title">Payments App</h1>

[WEB APP LINK](https://easypayy.netlify.app/)
  
<h2>🧐 Features</h2>

Here're some of the project's best features:

*   You can add multiple bank accounts
*   make transactions from accounts
*   track your transaction history across accounts

<h2>🛠️ Installation Steps:</h2>

<p>1. BACKEND</p>

```
cd Tech_Titans/Backend
```

```
npm install
```

```
node server.js
```

<p>2. FRONTEND</p>

```
cd Tech_Titans/Frontend
```

```
npm install
```

```
npm run dev
```

  
  
<h2>💻 Built with</h2>

MERN Stack

Technologies used in the project:

*   React
*   Express
*   JWT
*   MUI

<h2>Process Flow</h2>
1. Frontend (React)

App.jsx:
The main component, App.jsx, renders different components (SendMoney.jsx, Login.jsx, Signup.jsx) based on the routes defined using React Router.
Component Example (SendMoney.jsx):
This component makes an API call to the backend to send money.

2. Backend (Node.js/Express)

server.js:
Creates an Express app.
Configures environment variables.
Connects to MongoDB using connectToDb.
Sets up routes.

db.js:
Contains the function to connect to MongoDB.

3. Routes

account-route.js:
Defines routes related to account operations and links them to controllers.

auth-route.js:
Defines authentication routes.

transaction-route.js:
Defines transaction-related routes.

4. Controllers

addBank-controller.js:
Contains logic for adding a bank account.

auth-controller.js:
Handles user authentication.

transaction-controller.js:
Manages transactions.

5. Models

account-model.js:
Defines the schema for the Account model.

user-model.js:
Defines the schema for the User model.

transaction-model.js:
Defines the schema for the Transaction model.

6. Middleware

authMiddleware.js:
Verifies if the user is authenticated by checking the JWT token.

Summary
Frontend: The React app's components (SendMoney.jsx, Login.jsx, Signup.jsx) make API calls to the backend Express server.
Backend: The Express server (server.js) routes these requests to specific route handlers (account-route.js, auth-route.js, transaction-route.js).
Controllers: The route handlers invoke controller functions (addBank-controller.js, auth-controller.js, transaction-controller.js) that contain the business logic.
Database: Controllers interact with MongoDB via Mongoose models (account-model.js, transaction-model.js, user-model.js).
Middleware: Middleware (authMiddleware.js) ensures the user is authenticated before accessing protected routes.
Response: The server processes the request, interacts with the database if needed, and sends a response back to the React frontend, which updates the UI accordingly.
