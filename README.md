# Personal Blog Platform

A RESTful API for a personal blog platform built with Node.js, Express, TypeScript, and MongoDB.

## 🚀 How to Set Up and Run the Project Locally

### Prerequisites

- Node.js installed on your machine.
- MongoDB installed locally or a MongoDB Atlas cluster.
- TypeScript installed globally (`npm install -g typescript ts-node`).

### 1. Clone the repository

```sh
git clone <your-repository-url>
cd <repository-directory>
```

### 2. Install dependencies

```sh
npm install
```

### 3. Environment Configuration

Create a `config` folder at the root of your project if it doesn't exist, and create a `.env` file inside it (`config/.env`). Add the following environment variables:

```env
# Database Configuration
URI=mongodb://127.0.0.1:27017/personal-blog

# Server Configuration
SERVER_PORT=3000

# JWT Signatures (Secrets for token generation)
ACCESS_SIGNITURE=your_access_token_secret_key
REFRESH_SIGNITURE=your_refresh_token_secret_key
TEMP_SIGNITURE=your_temp_token_secret_key
```

### 4. Run the Project

Since the project relies on TypeScript, you can run the application directly using `ts-node`:

```sh
npx ts-node src/index.ts
```

The server should now be running on `http://localhost:3000` (or the port specified in your `.env`).

### 5. API Documentation (Swagger)

You can view the full Swagger documentation for testing and interacting with the API in your browser. Just navigate to:

```
http://localhost:3000/api-docs
```

---

## 🛣️ Implemented Endpoints

The base API path is `/api/v1`.

### Auth Endpoints

- **POST** `/api/v1/auth/register` - Register a new user.
- **POST** `/api/v1/auth/login` - Authenticate an existing user and get tokens.

### Post Endpoints

- **GET** `/api/v1/posts/` - Retrieve all blog posts.
- **POST** `/api/v1/posts/` - Create a new blog post. _(Requires Authentication)_
- **PUT** `/api/v1/posts/:id` - Update an existing blog post by its ID. _(Requires Authentication)_
- **DELETE** `/api/v1/posts/:id` - Delete a blog post by its ID. _(Requires Authentication)_

---

## 🗄️ Database Choice & Rationale

**Database Used: MongoDB (with Mongoose ODM)**

### Why MongoDB?

1. **Flexible Schema Design:** A blog platform heavily relies on document-based data (Users, Posts with unstructured content, tags, comments, etc.). MongoDB's flexible schema effortlessly supports these document layouts, specifically dynamically evolving text content in the future.
2. **Horizontal Scalability:** MongoDB simplifies horizontal scaling and read speeds, ensuring that as blog traffic increases (high reads for posts), the application data will scale harmoniously.
3. **Mongoose ODM:** Mongoose makes type-safe Object Data Modeling seamlessly integrate with TypeScript in Node.js apps. It simplifies applying schema definitions, validation, and managing data relations.
4. **Fast Prototyping:** The JSON-like BSON format used by MongoDB matches naturally with JavaScript/TypeScript object syntax, radically speeding up the development process from controllers to the database repository pattern.
