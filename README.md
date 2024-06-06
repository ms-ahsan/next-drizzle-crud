## About

This project is a Task CRUD application built using Next.js, Drizzle ORM, and PostgreSQL database hosted on Vercel. It allows users to manage tasks with the following features:

- **Add Task:** Users can add a new task.
- **View Tasks:** Users can view all tasks that have been added.
- **Edit Task:** Users can edit an existing task.
- **Delete Task:** Users can delete an existing task.

The application leverages Next.js for server-side rendering and client-side routing, providing a seamless user experience. Drizzle ORM is used for database operations, ensuring efficient management of task data. The PostgreSQL database, hosted on Vercel, provides a reliable and scalable data storage solution for the application.

You can see a live demo at [Task Manager App Demo](https://test-gema-phala-ananta.vercel.app/)

## Running locally in development mode

To get started, just clone the repository and run:

```bash
git clone https://github.com/iaincollins/nextjs-starter.git
npm install
npm run dev
```

## Setting up the PostgreSQL Database on Vercel using Drizzle ORM

1. **Create a Vercel Account:** If you don't have one already, sign up for a Vercel account at [Vercel](https://vercel.com/).

2. **Install Vercel CLI:** Install the Vercel CLI globally using npm:

    ```bash
    npm install -g vercel
    ```

3. **Create a PostgreSQL Database:** Set up a PostgreSQL database using Vercel's integrations. You can do this by navigating to your Vercel dashboard, selecting your project, and adding the PostgreSQL integration.


4. **Configure Environment Variables:** Set up environment variables for your Next.js project to connect to the PostgreSQL database. You can find the database credentials  in the Vercel dashboard after setting up the integration on .env.local tab then copy the POSTGRES_URL.

5. **Generate Migrations Using Drizzle-kit:**
   
   - *(Optional)* Create your database schema in a file (e.g., `server/schema.ts`). Here is an example schema:

     ```typescript
     import { pgTable, serial, text, boolean } from 'drizzle-orm/pg-core';

     export const tasks = pgTable('tasks', {
       id: serial('id').primaryKey(),
       title: text('title').notNull(),
       description: text('description').notNull(),
       done: boolean('done').default(false),
     });
     ```

   - Generate a migration file based on the schema:

     ```bash
     npx drizzle-kit generate
     ```

   - Apply the migration to your PostgreSQL database:

     ```bash
     npx drizzle-kit push
     ```


By following these steps, you can set up a PostgreSQL database on Vercel and integrate it with your Next.js project then can running locally
