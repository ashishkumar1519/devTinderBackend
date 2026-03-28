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
   - Update database credentials and configuration
   ```bash
   cp envExample .env
   ```

9. **Update Database Password**
   - Update your MongoDB password in `.env` file
   - Ensure EC2 instance public IP is whitelisted on MongoDB server

10. **Install PM2 Globally**
    ```bash
    npm install -g pm2
    ```

11. **Start Backend with PM2**
    ```bash
    pm2 start npm --name "devTinder-backend" --exec-mode cluster -- start
    ```
    - Alternative: `pm2 start src/index.js --name "devTinder-backend"`

12. **Enable Startup on Reboot**
    ```bash
    pm2 startup
    pm2 save
    ```

13. **Configure Nginx Reverse Proxy**
    - This is configured on the frontend server (see Frontend README Step 12)
    - Nginx will proxy `/api` requests to your backend on `localhost:3000`
    - Make sure port 3000 is NOT exposed to the internet (only localhost)

14. **Verify Backend is Running**
    ```bash
    pm2 status
    pm2 logs devTinder-backend
    ```

### PM2 Commands for Management

```bash
pm2 list                          # View all running processes
pm2 logs                          # View real-time logs
pm2 logs devTinder-backend        # View logs for specific app
pm2 stop devTinder-backend        # Stop the application
pm2 restart devTinder-backend     # Restart the application
pm2 delete devTinder-backend      # Remove from PM2
pm2 flush devTinder-backend       # Clear logs
```

### Important Notes

- **Database Access:** Ensure your MongoDB connection string in `.env` is correct and EC2 IP is whitelisted
- **Port 3000:** Keep this port private (not exposed to internet). Only Nginx should access it via localhost
- **Environment Variables:** Never commit `.env` file to git. Use `.env.example` for reference
- **Logs:** Monitor with `pm2 logs` to troubleshoot issues

### Post-Deployment
- Verify backend is running: `pm2 status`
- Monitor logs: `pm2 logs devTinder-backend`
- Test API endpoint through: `http://<ec2-ip>/api/` (proxied through Nginx)
- Configure domain name and SSL certificate
- Set up monitoring and alerts

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
