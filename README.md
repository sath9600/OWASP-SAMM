# OWASP SAMM (Software Assurance Maturity Model)

This is an implementation of the OWASP Software Assurance Maturity Model (SAMM), a framework to help organizations formulate and implement a strategy for software security.

## Application Architecture

1. **Frontend**: Angular application running on port 4208
   - Provides a user interface for interacting with the SAMM assessment tool
   - Contains modules for different security practices (Governance, Design, Implementation, Verification, Operations)

2. **Backend Servers**:
   - **Main Server (server)**: Node.js/Express server running on port 3000
     - Uses mysql2 library to connect to the MySQL database
     - Handles most of the application's API endpoints
   
   - **Authentication Server (server2)**: Node.js/Express server running on port 8082
     - Uses Sequelize ORM to connect to the MySQL database
     - Handles user authentication and role management

3. **Database**: MySQL database named "samm"
   - Contains tables for users, roles, and various security practice assessments
   - Stores assessment data, scores, and history

## Application Purpose

OWASP SAMM is a framework to help organizations formulate and implement a strategy for software security. The application provides:

1. A self-assessment tool to evaluate security practices across different domains
2. Tracking of security maturity levels across different practices
3. Historical data to show improvement over time
4. Reporting capabilities to visualize security posture

## Security Features

The application includes several security features:

1. **Authentication Security**:
   - JWT-based authentication with short-lived tokens (1 hour)
   - Secure password storage with bcrypt
   - Role-based access control

2. **API Security**:
   - CORS restrictions to specific origins
   - Rate limiting to prevent brute force attacks
   - Security headers with Helmet
   - Input validation and sanitization

3. **Database Security**:
   - Parameterized queries to prevent SQL injection
   - Secure connection pool configuration

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v8 or higher)
- Angular CLI

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   cd server && npm install
   cd server2 && npm install
   cd jsreportapp && npm install
   ```

3. Set up the MySQL database:
   - Create a database named "samm"
   - Import the schema from `samm.sql`

4. Start the servers:
   ```
   # Start the Angular frontend
   npm start
   
   # Start the main server
   cd server && node server.js
   
   # Start the authentication server
   cd server2 && node server.js
   ```

5. Access the application at http://localhost:4208

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OWASP SAMM Project: https://owaspsamm.org/
- OWASP Foundation: https://owasp.org/
