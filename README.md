# Tranzitluc Website Server

Backend server for the Tranzitluc website, built with Express.js.

## Features

- **Contact Form**: Handles contact form submissions, sends emails to admins and users via Nodemailer.
- **Rate Limiting**: Protects endpoints from abuse.
- **Security**: Uses Helmet for secure HTTP headers.
- **Validation**: Validates email addresses and domains.

## Prerequisites

- Node.js (v18+ recommended)
- npm

## Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```

## Configuration

1.  Create a `.env` file in the root directory based on `.env.example`.
2.  Add your credentials:

    ```env
    PORT=5000
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_google_app_password
    ```

    *Note: For Gmail, you need to use an App Password if 2FA is enabled.*

## Usage

### Development

To start the server with hot-reloading:

```bash
npm run dev
```

### Production

To start the server in production mode:

```bash
node src/server.js
```

## API Endpoints

### POST /api/contact

Sends a contact message.

**Body:**
```json
{
  "departure_city": "City A",
  "destination_city": "City B",
  "total_weight": "100kg",
  "phone": "0700000000",
  "email": "user@example.com",
  "message": "Hello"
}
```
