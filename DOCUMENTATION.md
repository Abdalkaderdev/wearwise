# WearWise API Documentation

This document provides comprehensive documentation for the WearWise AI Virtual Closet + Stylist App API.

## 📋 Table of Contents

- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)

---

## 🔐 Authentication

The WearWise API uses JWT (JSON Web Tokens) for authentication. All protected endpoints require a valid JWT token in the Authorization header.

### Authentication Flow

1. **Register** a new user account
2. **Login** with credentials to receive a JWT token
3. **Include** the token in subsequent requests

### Token Format
```
Authorization: Bearer <your-jwt-token>
```

### Token Expiration
- Access tokens expire after 30 minutes
- Refresh tokens (future implementation) will have longer expiration

---

## 📡 API Endpoints

### Base URL
```
http://localhost:8000
```

### Authentication Endpoints

#### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "is_active": true
}
```

**Error Response (400 Bad Request):**
```json
{
  "detail": "Username or email already registered"
}
```

#### POST /auth/login
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "securepassword123"
}
```

**OR**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**Error Response (401 Unauthorized):**
```json
{
  "detail": "Invalid credentials"
}
```

### Virtual Closet Endpoints

#### POST /closet/upload-clothes
Upload a clothing item to the user's virtual closet.

**Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: multipart/form-data
```

**Form Data:**
- `file`: Image file (required)
- `description`: Text description (optional)
- `category`: Clothing category (optional)
- `color`: Color of the item (optional)

**Response (200 OK):**
```json
{
  "id": 1,
  "user_id": 1,
  "image_url": "/uploads/1_blue_shirt.jpg",
  "description": "Blue cotton shirt",
  "category": "shirt",
  "color": "blue"
}
```

**Error Response (401 Unauthorized):**
```json
{
  "detail": "Invalid authentication"
}
```

#### GET /closet/my-closet
Retrieve all clothing items for the authenticated user.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "image_url": "/uploads/1_blue_shirt.jpg",
    "description": "Blue cotton shirt",
    "category": "shirt",
    "color": "blue"
  },
  {
    "id": 2,
    "user_id": 1,
    "image_url": "/uploads/1_black_pants.jpg",
    "description": "Black jeans",
    "category": "pants",
    "color": "black"
  }
]
```

### AI Outfit Generation Endpoints

#### POST /outfit/generate-outfit
Generate outfit suggestions based on user's clothing items.

**Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "clothes_ids": [1, 2, 3],
  "event": "casual",
  "season": "summer"
}
```

**Response (200 OK):**
```json
{
  "suggestion": "Fake outfit for user johndoe with clothes [1, 2, 3], event: casual, season: summer"
}
```

**Error Response (400 Bad Request):**
```json
{
  "detail": "Username or email required"
}
```

---

## 🗄️ Database Models

### Entity Relationship Diagram

```
User (1) ──── (N) Clothes
  │
  └─── (1) ──── (N) Outfit
              │
              └─── (N) ──── (N) Clothes (via outfit_clothes)
```

### User Model
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    hashed_password VARCHAR NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);
```

**Fields:**
- `id`: Primary key
- `username`: Unique username for login
- `email`: Unique email address
- `hashed_password`: Bcrypt hashed password
- `is_active`: Account status

### Clothes Model
```sql
CREATE TABLE clothes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    image_url VARCHAR NOT NULL,
    description VARCHAR,
    category VARCHAR,
    color VARCHAR
);
```

**Fields:**
- `id`: Primary key
- `user_id`: Foreign key to users table
- `image_url`: Path to stored image
- `description`: Optional item description
- `category`: Clothing category (shirt, pants, etc.)
- `color`: Item color

### Outfit Model
```sql
CREATE TABLE outfits (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    suggestion_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE outfit_clothes (
    outfit_id INTEGER REFERENCES outfits(id),
    clothes_id INTEGER REFERENCES clothes(id),
    PRIMARY KEY (outfit_id, clothes_id)
);
```

**Fields:**
- `id`: Primary key
- `user_id`: Foreign key to users table
- `suggestion_text`: AI-generated outfit suggestion
- `created_at`: Timestamp of creation
- `clothes`: Many-to-many relationship with clothes via outfit_clothes table

### Relationships

1. **User → Clothes**: One-to-Many
   - A user can have multiple clothing items
   - Each clothing item belongs to one user

2. **User → Outfit**: One-to-Many
   - A user can have multiple outfits
   - Each outfit belongs to one user

3. **Outfit → Clothes**: Many-to-Many
   - An outfit can contain multiple clothing items
   - A clothing item can be part of multiple outfits
   - Relationship managed through outfit_clothes association table

---

## ⚠️ Error Handling

### HTTP Status Codes

- **200 OK**: Request successful
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid request data
- **401 Unauthorized**: Authentication required or failed
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **422 Unprocessable Entity**: Validation error
- **500 Internal Server Error**: Server error

### Error Response Format
```json
{
  "detail": "Error message description"
}
```

### Common Error Messages

| Error | Description | Solution |
|-------|-------------|----------|
| `Invalid authentication` | JWT token missing or invalid | Include valid Bearer token |
| `User not found` | User doesn't exist in database | Check user credentials |
| `Username or email already registered` | Duplicate registration attempt | Use different username/email |
| `Invalid credentials` | Wrong password or username | Verify login credentials |

---

## 🚦 Rate Limiting

Currently, the API does not implement rate limiting. Future implementations will include:

- **Authentication endpoints**: 5 requests per minute per IP
- **File uploads**: 10 requests per minute per user
- **General API**: 100 requests per minute per user

---

## 🔧 Development Setup

### Environment Variables
```env
DATABASE_URL=postgresql://username:password@localhost/wearwise
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
```

### Running the API
```bash
uvicorn app.main:app --reload
```

### API Documentation
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

---

## 📝 Testing Examples

### Using curl

#### Register a new user:
```bash
curl -X POST "http://localhost:8000/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "testpassword123"
  }'
```

#### Login and get token:
```bash
curl -X POST "http://localhost:8000/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "testpassword123"
  }'
```

#### Upload clothing item:
```bash
curl -X POST "http://localhost:8000/closet/upload-clothes" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@/path/to/image.jpg" \
  -F "description=Blue shirt" \
  -F "category=shirt" \
  -F "color=blue"
```

#### Get user's closet:
```bash
curl -X GET "http://localhost:8000/closet/my-closet" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Using Python requests

```python
import requests

# Register
response = requests.post("http://localhost:8000/auth/register", json={
    "username": "testuser",
    "email": "test@example.com",
    "password": "testpassword123"
})

# Login
response = requests.post("http://localhost:8000/auth/login", json={
    "username": "testuser",
    "password": "testpassword123"
})
token = response.json()["access_token"]

# Upload clothes
with open("shirt.jpg", "rb") as f:
    response = requests.post(
        "http://localhost:8000/closet/upload-clothes",
        headers={"Authorization": f"Bearer {token}"},
        files={"file": f},
        data={"description": "Blue shirt", "category": "shirt", "color": "blue"}
    )

# Get closet
response = requests.get(
    "http://localhost:8000/closet/my-closet",
    headers={"Authorization": f"Bearer {token}"}
)
```

---

## 🔮 Future Enhancements

- **Pagination**: For large datasets
- **Filtering**: By category, color, season
- **Search**: Full-text search capabilities
- **Caching**: Redis integration for performance
- **Webhooks**: Real-time notifications
- **Analytics**: Usage tracking and insights

---

*This documentation is maintained alongside the codebase and should be updated with any API changes.* 