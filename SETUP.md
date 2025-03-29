# OWASP SAMM (Software Assurance Maturity Model) Setup Guide

## Project Overview

OWASP SAMM (Software Assurance Maturity Model) is a framework to help organizations analyze and improve their software security posture. This application provides a dashboard for organizations to assess their current software security practices, define a target state, and create a roadmap for improvement.

## System Architecture

The application consists of:

1. **Frontend**: Angular application (running on port 4208)
2. **Backend Server 1**: Node.js server (server directory)
3. **Backend Server 2**: Node.js server for authentication (server2 directory)
4. **Database**: MySQL database (samm)

## Default User Accounts

The system has three default user accounts:

1. **User**
   - Username: User
   - Email: user@gmail.com
   - Role: User
   - Password: password

2. **Auditor**
   - Username: Auditor
   - Email: auditor@gmail.com
   - Role: Auditor

3. **Admin**
   - Username: Admin
   - Email: admin@gmail.com
   - Role: Admin

## Starting the Application

To start the application, run the following commands:

1. Start the Angular frontend:
   ```
   cd /Users/sathish.eathurajgaincredit.com/Desktop/SAMM/OWASP-SAMM
   NODE_OPTIONS=--openssl-legacy-provider npx ng serve
   ```

2. Start the main backend server:
   ```
   cd /Users/sathish.eathurajgaincredit.com/Desktop/SAMM/OWASP-SAMM/server
   node server.js
   ```

3. Start the authentication server:
   ```
   cd /Users/sathish.eathurajgaincredit.com/Desktop/SAMM/OWASP-SAMM/server2
   node server.js
   ```

4. Access the application at: http://localhost:4208

## Database Configuration

The database configuration is located in:
- `server2/app/config/env.js` for the authentication server
- `server/db/config.js` for the main server

The default configuration uses:
- Database: samm
- Username: root
- Password: (empty)
- Host: localhost
- Dialect: mysql

## Troubleshooting

### Password Reset

If you need to reset a user's password, you can use the following SQL command:

```sql
UPDATE users SET password = '$2a$08$iihnTyIrfJIHj8SyzykQ/uk5.XGJ8W/9JzJ4sSpmHMhgiafynbwFm' WHERE username = 'User';
```

This will set the password to 'password' for the specified user.

### Authentication Issues

The authentication system uses JWT (JSON Web Tokens) for authentication. The token is valid for 1 hour as configured in `server2/app/controller/controller.js`.

If you encounter authentication issues, check:
1. The database connection
2. The user credentials
3. The JWT token expiration

## SAMM Dashboard

The SAMM dashboard displays various security metrics across different domains:
- Strategy & Metrics
- Policy & Compliance
- Education & Guidance
- Threat Assessment
- Defect Management
- Architecture Assessment
- Requirements Driven Testing
- Security Testing

Each domain has a score that indicates the maturity level of the organization in that area.
