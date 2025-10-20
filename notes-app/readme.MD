### 1. Start MySQL Database

```bash
docker run --name notes-mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=notes_app -p 3306:3306 -d mysql:8
```

### 2. Environment Variables

Create `.env.local` in the project root:

```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=notes_app
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Database Migrations

```bash
npm run drizzle:generate
npm run drizzle:push
```

### 5. Start Development Server

```bash
npm run dev
```

Open `http://localhost:3000/notes` to use the app.

## Features

- ✅ Create, read, update, delete notes
- ✅ MySQL database with Drizzle ORM
- ✅ Optimistic updates for smooth UX
- ✅ Notes sorted by creation date (newest first)
- ✅ Date display in UI
- ✅ Full CRUD operations

## Database Commands

### Check if MySQL container is running:

```bash
docker ps
```

### Stop MySQL container:

```bash
docker stop notes-mysql
```

### Remove MySQL container:

```bash
docker rm notes-mysql
```
