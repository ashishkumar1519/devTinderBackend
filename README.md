# DevTinder APIs

DevTinder is a dating application backend built with Node.js. This document provides a comprehensive overview of all available API endpoints.

## Installation

```bash
npm install
```

## Running the Server

```bash
npm start
```

## API Endpoints

### authRouter

- **POST** `/signup` - Create a new user account
- **POST** `/login` - Login with user credentials
- **POST** `/logout` - Logout from the application

### profileRouter

- **GET** `/profile/view` - View your profile
- **PATCH** `/profile/edit` - Edit your profile information
- **PATCH** `/profile/password` - Change your password

### connectionRequestRouter

- **POST** `/request/send/interested/:userId` - Send an interested request to a user
- **POST** `/request/send/ignored/:userId` - Send an ignored request to a user
- **POST** `/request/review/accepted/:requestId` - Accept a connection request
- **POST** `/request/review/rejected/:requestId` - Reject a connection request

### Additional Endpoints

- **GET** `/user/connections` - Get all your connections
- **GET** `/requests/received` - Get all received requests
- **GET** `/feed` - Get the profiles of other users on the platform

## Status

The platform supports the following connection statuses:

- `ignore` - User was ignored
- `interested` - User showed interest
- `accepted` - Connection request was accepted
- `rejected` - Connection request was rejected

## Architecture

```
src/
├── index.js              # Main application entry point
├── config/
│   └── database.js       # Database configuration
├── middlewares/
│   └── auth.js           # Authentication middleware
├── Models/
│   └── user.model.js     # User data model
└── utils/
    └── validation.js     # Validation utilities
```

## Technologies

- Node.js
- Express.js
- MongoDB

## License

MIT
