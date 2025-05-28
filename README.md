# QR Code Tracker

A modern web application for generating and tracking QR codes. This project consists of a Next.js frontend and a Python backend, providing a seamless experience for QR code management.

## Features

- Generate QR codes with custom content
- Track QR code scans and analytics
- Modern, responsive UI built with Next.js and Tailwind CSS
- RESTful API backend

## Tech Stack

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- QR Code generation library

### Backend
- Python
- FastAPI
- Docker support

## Prerequisites

- Node.js (v18 or higher)
- Python 3.8 or higher
- Docker and Docker Compose (optional, for containerized setup)
- pnpm (recommended) or npm

## Local Development Setup

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the backend server:
   ```bash
   uvicorn app.main:app --reload
   ```

The backend API will be available at `http://localhost:8000`

### Docker Setup (Alternative)

If you prefer using Docker:

1. From the project root, run:
   ```bash
   docker-compose up
   ```

This will start both frontend and backend services in containers.

## API Documentation

Once the backend is running, you can access the API documentation at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 