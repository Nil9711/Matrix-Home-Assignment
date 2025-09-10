# Math Calculator API

A REST API that performs basic mathematical operations with JWT authentication.

## Features

- Mathematical operations: add, subtract, multiply, divide
- JWT Bearer token authentication
- Input validation and error handling
- OpenAPI/Swagger documentation

## Quick Start

### Local Development

```bash
npm install
npm start
```

API available at `http://localhost:8080`

### Docker

```bash
# Build and run
docker build -t math-calculator .
docker run -p 8080:8080 math-calculator

# Or use npm scripts
npm run docker:build
npm run docker:run
```

## Usage

### 1. Login
```bash
curl -X POST "http://localhost:8080/login" \
  -H "Content-Type: application/json" \
  -d '{"username": "nil", "password": "nil"}'
```

### 2. Calculate
```bash
curl -X POST "http://localhost:8080/calculate" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "X-Operation: add" \
  -H "Content-Type: application/json" \
  -d '{"number": 10, "secondNumber": 5}'
```

## API Endpoints

- `POST /login` - Get JWT token
- `POST /calculate` - Perform math operations (requires auth)
- `GET /healthCheck` - Health status

## Documentation

Swagger UI: `http://localhost:8080/docs`

## Testing

```bash
npm test
```

## Environment Variables

Create `.env` file:
```
JWT_SECRET=your-secret-key
```