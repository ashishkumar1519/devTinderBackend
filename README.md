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

## Deployment

### Prerequisites
- AWS Account
- EC2 instance access
- SSH key pair (.pem file)

### Deployment Steps

1. **Sign up on AWS**
   - Create an AWS account and sign in to AWS Console

2. **Launch EC2 Instance**
   - Go to EC2 Dashboard
   - Click "Launch Instances"
   - Select Ubuntu 20.04 LTS AMI
   - Choose t2.micro or appropriate instance type
   - Complete the instance launch process

3. **Setup SSH Key**
   ```bash
   chmod 400 <secret>.pem
   ```
   - Replace `<secret>` with your actual key pair name

4. **Connect to Your Instance**
   ```bash
   ssh -i "devTinder-secret.pem" ubuntu@<your-ec2-public-ip>
   ```
   - Replace `<your-ec2-public-ip>` with your instance's public IP address

5. **Install Node.js**
   ```bash
   curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt-get install -y nodejs
   node --version  # Verify installation
   ```

6. **Clone Repository**
   ```bash
   git clone <your-repository-url>
   cd backend
   ```

7. **Install Dependencies**
   ```bash
   npm install
   ```

8. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Update database and API configuration
   ```bash
   cp envExample .env
   ```

9. **Start the Server**
   ```bash
   npm start
   ```
   - The backend will be running on your EC2 instance

### Post-Deployment
- Configure security groups to allow HTTP/HTTPS traffic
- Set up domain name and SSL certificate (optional)
- Monitor instance performance and logs
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
