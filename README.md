# Job Portal Application

A modern job portal application built with React + Vite for the frontend and Spring Boot for the backend. This application allows users to manage job postings, applications, and user profiles efficiently.

## Tech Stack

### Frontend
- React 18
- Vite
- React Router DOM
- Tailwind CSS

### Backend
- Spring Boot
- Spring Security
- Spring Data JPA
- MySQL

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- Java Development Kit (JDK) 17 or higher
- MySQL Server
- Git

## Installation

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd jobportal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd ../Server
   ```

2. Configure the database:
   - Create a MySQL database named `jobportal`
   - Update `application.properties` with your database credentials

3. Build and run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```
   The backend server will start on `http://localhost:8080`

## Configuration

### Environment Variables

Create a `.env` file in the frontend root directory with the following variables:
```env
VITE_API_URL=http://localhost:8080
```

### Database Configuration

Update `application.properties` in the backend:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/jobportal
spring.datasource.username=your_username
spring.datasource.password=your_password
```

## Features

- User authentication (Login/Register)
- Job posting management
- Job search and filtering
- User profile management
- Application tracking

## Usage

1. Register a new account or login with existing credentials
2. Browse available job listings
3. Create and manage job postings (for employers)
4. Apply for jobs and track applications (for job seekers)
5. Update profile information

## Development

- Frontend development server: `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`
- Lint code: `npm run lint`

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
