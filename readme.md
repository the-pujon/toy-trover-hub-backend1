# Toy Trover Hub Backend

## Project Overview

This is the backend codebase for Toy Trover Hub

## Setup

1. Install dependencies: `npm install`
2. Start the server: `npm start` or `npm run dev` for development with nodemon.
3. The server will be running on `http://localhost:5000`.

## Project Structure

- `src/config/db.js`: MongoDB connection setup.
- `src/routes/`: Contains route handlers for different entities (users, toys).
- `src/controllers/`: Controllers for each entity's CRUD operations.
- `src/middlewares/auth.js`: Authentication and authorization middleware.
- `app.js`: Main application file with configuration and route setup.
- `package.json`: Project metadata and dependencies.

## Endpoints

### Users

- `POST /api/users`: Create a new user.
- `GET /api/users`: Get all users.
- `GET /api/users/:email`: Get a single user by email.
- `PUT /api/users/:email`: Update a user by email.
- `DELETE /api/users/:email`: Delete a user by email.
- `POST /api/users/jwt`: Get JWT token.


### Toys

- `POST /api/toys`: Create a new toy. (requires authentication and admin privileges).
- `GET /api/toys`: Get all toys.
- `GET /api/toys/:id`: Get a single toy by id.
- `PUT /api/toys/:id`: Update a toy by id.
- `DELETE /api/toys/:id`: Delete a toy by id. (requires authentication and admin privileges).

### Payments

- `GET /api/payments`: Get all payments (requires authentication and admin privileges).
- `GET /api/payments/:email`: Get payments by user email (requires authentication).
- `GET /api/payments/:id`: Get payments by payment id (requires authentication).
- `PUT /api/payments/orderId/:orderId`: Update payments status by order id (requires authentication and admin privileges).
- `POST /api/payments`: Create a new payment (requires authentication).
- `DELETE /api/payments/:id`: Delete payments by payment id (requires authentication).


### Orders

- `GET /api/orders`: Get all orders (requires authentication and admin privileges).
- `GET /api/orders/:email`: Get orders by user email (requires authentication).
- `PUT /api/orders/:id`: Update orders by order id (requires authentication and admin privileges).
- `DELETE /api/orders/:id`: Delete orders by order id (requires authentication and admin privileges).
<!--- `PUT /api/orders/orderId/:orderId`: Update orders status by order id (requires authentication).-->
- `POST /api/orders`: Create a new order (requires authentication).
- `DELETE /api/orders/:email`: Delete all orders by user email (requires authentication and admin privileges).


## Middleware

- `verifyJWT`: Verifies the JSON Web Token for authentication.
- `verifyAdmin`: Verifies if the user has admin privileges.
<!--- `verifyInstructor`: Verifies if the user has instructor privileges.-->


## Payment Integration

- The application integrates with the Stripe API for handling payments.
- `POST /api/checkout`: Initiates the checkout process, calculates the total amount, and creates a Stripe Checkout session.

## Error Handling

- 404 Route Not Found: Returns a JSON response indicating the route is not found.
- 500 Server Error: Returns a JSON response for internal server errors.

## Scripts

- `npm start`: Starts the server.
- `npm run dev`: Starts the server with nodemon for development.

## Project Demo

Click [here](https://skills-voyage-elm.netlify.app/) to view the Skills Voyage project.

For Frontend, click [here](https://github.com/the-pujon/toy-trover-hub-frontend).

---

## Credentials

### Admin Login:

- **Email:** pujondasauvi@gmail.com
- **Password:** password123456789

---

<div align="center">
  <a href="https://skills-voyage-elm.netlify.app/">Explore the Toy Trover Hub Platform</a>
</div>
