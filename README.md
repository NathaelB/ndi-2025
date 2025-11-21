# 🚀 NDI 2025 Project

A modern full-stack web application built with AdonisJS, React, and PostgreSQL.

![Project Status](https://img.shields.io/badge/status-active-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![AdonisJS](https://img.shields.io/badge/AdonisJS-220052?logo=adonisjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [🏗️ Architecture](#️-architecture)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [💻 Development](#-development)
- [🐳 Docker Setup](#-docker-setup)
- [📡 API Reference](#-api-reference)
- [🧪 Testing](#-testing)
- [📁 Project Structure](#-project-structure)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🎯 Overview

NDI 2025 is a modern web application designed with a clean architecture separating the backend API from the frontend interface. The project demonstrates best practices in full-stack development using cutting-edge technologies.

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│   React App     │◄──►│   AdonisJS API  │◄──►│   PostgreSQL    │
│   (Port 5173)   │    │   (Port 6000)   │    │   (Port 5454)   │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## ✨ Features

- 🎨 **Modern React Frontend** - Built with React 19, TypeScript, and Vite
- 🚀 **Robust API Backend** - Powered by AdonisJS 6 with TypeScript
- 🗄️ **Database Integration** - PostgreSQL with Lucid ORM
- 🔐 **Authentication Ready** - Built-in auth system with AdonisJS Auth
- 🛡️ **Type Safety** - Full TypeScript coverage across the stack
- 🐳 **Docker Support** - Containerized development environment
- ⚡ **Hot Module Replacement** - Fast development with HMR
- 🧪 **Testing Framework** - Comprehensive test suite with Japa
- 📝 **Code Quality** - ESLint and Prettier configuration

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.0 - Modern UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Rolldown** - High-performance bundler

### Backend
- **AdonisJS** 6.18.0 - Node.js framework
- **TypeScript** - Type-safe server development
- **Lucid ORM** - Database queries and migrations
- **Vine.js** - Schema validation
- **PostgreSQL** - Relational database

### DevOps
- **Docker** - Containerization
- **PNPM** - Fast package manager
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **PNPM** package manager
- **Docker** and Docker Compose
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ndi-2025
   ```

2. **Install dependencies**
   ```bash
   # Install API dependencies
   cd api
   pnpm install

   # Install webapp dependencies
   cd ../webapp
   pnpm install
   ```

3. **Set up the database**
   ```bash
   # Start PostgreSQL with Docker
   docker-compose up -d postgres
   ```

4. **Configure environment**
   ```bash
   # Copy example environment files (if they exist)
   cd api
   cp .env.example .env  # Configure your database connection
   ```

## 💻 Development

### Starting the Development Servers

1. **Start the database**
   ```bash
   docker-compose up -d postgres
   ```

2. **Start the API server** (Port 6000)
   ```bash
   cd api
   pnpm dev
   ```

3. **Start the webapp** (Port 5173)
   ```bash
   cd webapp
   pnpm dev
   ```

4. **Open your browser**
   - Frontend: http://localhost:5173
   - API: http://localhost:6000

### Available Scripts

#### API Commands
```bash
pnpm dev        # Start development server with HMR
pnpm build      # Build for production
pnpm start      # Start production server
pnpm test       # Run tests
pnpm lint       # Lint code
pnpm format     # Format code with Prettier
```

#### Webapp Commands
```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm preview    # Preview production build
pnpm lint       # Lint code
```

## 🐳 Docker Setup

The project includes Docker configuration for easy development setup.

### Services

- **PostgreSQL**: Database server (Port 5454)
  - Username: `postgres`
  - Password: `postgres`
  - Database: `ndi`

### Running with Docker

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

## 📡 API Reference

### Base URL
```
http://localhost:6000
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/`      | Health check |

*Note: More endpoints will be added as the API develops.*

### Response Format

```json
{
  "hello": "world"
}
```

## 🧪 Testing

### Running Tests

```bash
# API tests
cd api
pnpm test

# Run tests with coverage
pnpm test --coverage
```

### Test Structure

- **Unit Tests**: Individual component/function testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Full application flow testing

## 📁 Project Structure

```
ndi-2025/
├── api/                    # Backend API (AdonisJS)
│   ├── app/               # Application logic
│   │   ├── controllers/   # Request handlers
│   │   ├── models/        # Database models
│   │   ├── middleware/    # HTTP middleware
│   │   └── services/      # Business logic
│   ├── config/            # Configuration files
│   ├── database/          # Migrations and seeds
│   ├── start/             # Application bootstrap
│   └── tests/             # Test files
├── webapp/                # Frontend application (React)
│   ├── public/            # Static assets
│   ├── src/               # Source code
│   │   ├── assets/        # Images, fonts, etc.
│   │   ├── components/    # React components
│   │   └── App.tsx        # Main application
│   └── dist/              # Built files
├── docker-compose.yaml    # Docker services
├── Dockerfile            # Container definition
└── README.md             # You are here!
```

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Use conventional commit messages
- Ensure code passes linting and formatting checks

### Code Style

- **ESLint**: Enforced code quality rules
- **Prettier**: Automatic code formatting
- **TypeScript**: Strict type checking enabled

## 📄 License

This project is licensed under the **UNLICENSED** license - see the package.json files for details.

---

<div align="center">

**Built with ❤️ for NDI 2025**

[🐛 Report Bug](../../issues) • [✨ Request Feature](../../issues) • [📚 Documentation](../../wiki)

</div>
