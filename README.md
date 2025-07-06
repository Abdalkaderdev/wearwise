# WearWise - AI Virtual Closet + Stylist App

A modern FastAPI backend for an AI-powered virtual closet and personal stylist application. Users can upload their clothes, organize their virtual closet, and receive AI-generated outfit suggestions based on their wardrobe and preferences.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication with password hashing
- **Virtual Closet**: Upload, organize, and manage your clothing items with metadata
- **AI Outfit Generator**: Get personalized outfit suggestions based on your wardrobe
- **RESTful API**: Clean, well-documented API endpoints
- **PostgreSQL Database**: Robust data storage with SQLAlchemy ORM

## 🛠️ Tech Stack

- **Backend Framework**: FastAPI
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Authentication**: JWT with Passlib
- **File Upload**: Python-multipart
- **Environment Management**: Python-dotenv
- **Server**: Uvicorn

## 📋 Prerequisites

- Python 3.8+
- PostgreSQL database
- pip (Python package manager)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd wearwise-app
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Set Up Environment Variables
Create a `.env` file in the project root:
```env
DATABASE_URL=postgresql://username:password@localhost/wearwise
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
```

### 4. Set Up Database
1. Create a PostgreSQL database named `wearwise`
2. Run database migrations (when Alembic is set up):
```bash
alembic upgrade head
```

### 5. Run the Application
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

### 6. Access API Documentation
- Interactive API docs: `http://localhost:8000/docs`
- Alternative docs: `http://localhost:8000/redoc`

## 📁 Project Structure

```
wearwise-app/
├── app/
│   ├── main.py              # FastAPI application entry point
│   ├── models.py            # Pydantic models and SQLAlchemy models
│   ├── database.py          # Database configuration
│   └── routers/
│       ├── auth.py          # Authentication endpoints
│       ├── closet.py        # Virtual closet management
│       └── outfit.py        # AI outfit generation
├── uploads/                 # Directory for uploaded images
├── requirements.txt         # Python dependencies
└── README.md               # This file
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected endpoints:

1. Register a new user: `POST /auth/register`
2. Login to get a token: `POST /auth/login`
3. Include the token in the Authorization header: `Bearer <your-token>`

## 📝 API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token

### Virtual Closet
- `POST /closet/upload-clothes` - Upload clothing items
- `GET /closet/my-closet` - Get user's clothing items

### AI Outfit Generation
- `POST /outfit/generate-outfit` - Generate outfit suggestions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions, please open an issue in the repository or contact the development team. 