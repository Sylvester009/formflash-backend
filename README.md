# FormFlash Backend API

A powerful and flexible form builder backend API built with Node.js, Express, Prisma, and PostgreSQL. Create, manage, and collect responses for various types of forms including quizzes, surveys, assessments, and more.

## 🚀 Features

- **User Authentication** - JWT-based auth with HTTP-only cookies
- **Form Management** - Create, read, update, delete forms
- **Draft/Published Workflow** - Save forms as drafts before publishing
- **30+ Field Types** - Support for quizzes, surveys, file uploads, and more
- **Quiz Scoring** - Automatic scoring for quiz-type forms
- **Form Responses** - Collect and manage form submissions
- **Share Links** - Generate unique shareable links for published forms
- **Validation** - Comprehensive input validation using Zod
- **Pagination** - Built-in pagination for all list endpoints
- **Search** - Search forms by title or description
- **Error Handling** - Consistent error responses and logging

## 📋 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: Zod
- **Authentication**: JWT + bcryptjs
- **Database Adapter**: @prisma/adapter-pg


## 🛠️ Installation

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/Sylvester009/formflash-backend.git
cd formflash-backend
