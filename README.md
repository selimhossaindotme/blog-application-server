# 📝 Blog Application Server

A robust RESTful API server for a full-featured blog application, built with **Node.js**, **Express**, **TypeScript**, and **Prisma ORM** backed by **PostgreSQL**.

---

## 📌 Project Links

| Resource | Link |
|---|---|
| 📋 Requirement Analysis | [View on Eraser.io](https://app.eraser.io/workspace/QACyjxnEGsp9Xd9SAu1m) |
| 🗃️ ERD Diagram | [View on Google Drive](https://drive.google.com/file/d/1Iz8HC-y3yxqi1XTZVHJ6miwn0UrdUH6B/view?usp=drive_link) |

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js |
| **Language** | TypeScript |
| **Framework** | Express.js v5 |
| **ORM** | Prisma ORM v7 |
| **Database** | PostgreSQL |
| **Package Manager** | pnpm |

---

## 📁 Project Structure

```
blog-application-server/
├── prisma/
│   └── schema.prisma        # Database schema & models
├── src/
│   ├── app/                 # Application modules (routes, controllers, services)
│   ├── app.ts               # Express app setup
│   └── server.ts            # Server entry point
├── generated/
│   └── prisma/              # Prisma generated client
├── dist/                    # Compiled JavaScript output
├── tsconfig.json            # TypeScript configuration
├── prisma7.config.ts        # Prisma config file
├── package.json
└── .env                     # Environment variables
```

---

## 🗃️ Database Models

### `Post`
| Field | Type | Description |
|---|---|---|
| `id` | String (UUID) | Primary key |
| `title` | String | Post title |
| `content` | String | Post body content |
| `thumbnail` | String? | Optional thumbnail URL |
| `isFeatured` | Boolean | Whether the post is featured |
| `status` | PostStatus | `DRAFT`, `PUBLISHED`, or `ARCHIVED` |
| `tags` | String[] | Array of tags |
| `view` | Int | View count |
| `authorId` | String | Reference to the author (User) |
| `createdAt` | DateTime | Auto-generated timestamp |
| `updatedAt` | DateTime | Auto-updated timestamp |

### `Comment`
| Field | Type | Description |
|---|---|---|
| `id` | String (UUID) | Primary key |
| `content` | String | Comment body |
| `authorId` | String | Reference to the author (User) |
| `postId` | String | Reference to the parent post |
| `parentId` | String? | Reference to the parent comment (nested) |
| `status` | CommentStatus | `APPROVED` or `REJECTED` |
| `createdAt` | DateTime | Auto-generated timestamp |
| `updatedAt` | DateTime | Auto-updated timestamp |

### Enums
- **PostStatus**: `DRAFT` | `PUBLISHED` | `ARCHIVED`
- **CommentStatus**: `APPROVED` | `REJECTED`

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (v12+)
- PostgreSQL database

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd blog-application-server

# Install dependencies
pnpm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
PORT=5000
```

### Database Setup

```bash
# Run migrations
pnpm prisma migrate dev

# Generate Prisma client
pnpm prisma generate
```

### Run the Server

```bash
# Development mode
pnpm tsx src/server.ts

# Build for production
pnpm tsc

# Run production build
node dist/server.js
```

---

## 📡 API Endpoints

> Coming soon — routes and API documentation will be added as features are developed.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'feat: add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

