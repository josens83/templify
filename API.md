# Templify API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require a JWT token. Include it in the Authorization header:
```
Authorization: Bearer <your-token>
```

---

## Auth Endpoints

### Register
**POST** `/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword",
  "name": "John Doe",
  "role": "BUYER" // or "SELLER"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "BUYER",
    "createdAt": "2025-01-18T..."
  },
  "token": "jwt-token-here"
}
```

### Login
**POST** `/auth/login`

Login to an existing account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "BUYER",
    "avatar": null
  },
  "token": "jwt-token-here"
}
```

### Get Current User
**GET** `/auth/me`

Get current user information.

**Headers:** Requires Authentication

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "BUYER",
    "avatar": null,
    "createdAt": "2025-01-18T..."
  }
}
```

---

## Template Endpoints

### Get All Templates
**GET** `/templates`

Get all templates with filtering, sorting, and pagination.

**Query Parameters:**
- `category` (string): Filter by category
- `minPrice` (number): Minimum price filter
- `maxPrice` (number): Maximum price filter
- `search` (string): Search in name and description
- `sortBy` (string): Field to sort by (default: 'createdAt')
- `order` (string): 'asc' or 'desc' (default: 'desc')
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 12)

**Response:**
```json
{
  "templates": [...],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 100,
    "totalPages": 9
  }
}
```

### Get Template by ID
**GET** `/templates/:id`

Get a specific template by ID.

**Response:**
```json
{
  "template": {
    "id": "uuid",
    "name": "Template Name",
    "description": "Description...",
    "category": "ecommerce",
    "price": 49000,
    "image": "https://...",
    "demoUrl": "https://...",
    "downloads": 1234,
    "rating": 4.8,
    "reviewCount": 156,
    "tags": ["react", "tailwind"],
    "features": ["Feature 1", "Feature 2"],
    "files": ["file1.zip"],
    "author": "John Doe",
    "authorId": "uuid",
    "lastUpdated": "2025-01-15",
    "seller": {
      "id": "uuid",
      "name": "John Doe",
      "avatar": null
    }
  }
}
```

### Create Template
**POST** `/templates`

Create a new template (Seller/Admin only).

**Headers:** Requires Authentication (SELLER or ADMIN role)

**Request Body:**
```json
{
  "name": "New Template",
  "description": "Description...",
  "category": "ecommerce",
  "price": 49000,
  "image": "https://...",
  "demoUrl": "https://...",
  "tags": ["react", "tailwind"],
  "features": ["Feature 1", "Feature 2"],
  "files": ["file1.zip"]
}
```

### Update Template
**PUT** `/templates/:id`

Update an existing template (Seller/Admin only).

**Headers:** Requires Authentication (SELLER or ADMIN role)

**Request Body:** Same as Create Template (partial updates allowed)

### Delete Template
**DELETE** `/templates/:id`

Soft delete a template (Seller/Admin only).

**Headers:** Requires Authentication (SELLER or ADMIN role)

---

## Order Endpoints

### Create Order
**POST** `/orders`

Create a new order.

**Headers:** Requires Authentication

**Request Body:**
```json
{
  "items": [
    {
      "templateId": "uuid",
      "price": 49000
    }
  ],
  "total": 49000,
  "paymentMethod": "card"
}
```

### Get My Orders
**GET** `/orders/my-orders`

Get all orders for the current user.

**Headers:** Requires Authentication

**Response:**
```json
{
  "orders": [
    {
      "id": "uuid",
      "total": 49000,
      "status": "COMPLETED",
      "paymentMethod": "card",
      "createdAt": "2025-01-18T...",
      "items": [...]
    }
  ]
}
```

### Get Order by ID
**GET** `/orders/:id`

Get a specific order by ID.

**Headers:** Requires Authentication

---

## Review Endpoints

### Get Template Reviews
**GET** `/reviews/template/:templateId`

Get all reviews for a template.

**Response:**
```json
{
  "reviews": [
    {
      "id": "uuid",
      "rating": 5,
      "comment": "Excellent template!",
      "helpful": 12,
      "createdAt": "2025-01-18T...",
      "user": {
        "id": "uuid",
        "name": "Jane Doe",
        "avatar": null
      }
    }
  ]
}
```

### Create Review
**POST** `/reviews`

Create a review (must have purchased the template).

**Headers:** Requires Authentication

**Request Body:**
```json
{
  "templateId": "uuid",
  "rating": 5,
  "comment": "Excellent template!"
}
```

---

## User Endpoints

### Get Wishlist
**GET** `/users/wishlist`

Get user's wishlist.

**Headers:** Requires Authentication

### Add to Wishlist
**POST** `/users/wishlist/:templateId`

Add a template to wishlist.

**Headers:** Requires Authentication

### Remove from Wishlist
**DELETE** `/users/wishlist/:templateId`

Remove a template from wishlist.

**Headers:** Requires Authentication

---

## Support Endpoints

### Create Support Ticket
**POST** `/support/tickets`

Create a new support ticket.

**Headers:** Requires Authentication

**Request Body:**
```json
{
  "subject": "Subject",
  "message": "Message...",
  "category": "Technical",
  "priority": "MEDIUM"
}
```

### Get My Tickets
**GET** `/support/tickets`

Get all support tickets for current user.

**Headers:** Requires Authentication

### Subscribe to Newsletter
**POST** `/support/newsletter`

Subscribe to newsletter.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

---

## Error Responses

All error responses follow this format:

```json
{
  "error": {
    "message": "Error message here",
    "stack": "... (only in development)"
  }
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Running the Backend

### Development
```bash
# Install dependencies
npm install

# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Start backend server
npm run dev:server

# Or start both frontend and backend
npm run dev:all
```

### Environment Variables
Create a `.env` file:
```
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="your-secret-key"
PORT=5000
NODE_ENV=development
```
