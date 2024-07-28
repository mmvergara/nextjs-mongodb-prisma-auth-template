# Next.js MongoDB Prisma Auth Template

[**`🌐 App Demo`**](https://nextjs-mongodb-prisma-auth-template.vercel.app/)

<p align="center">
<img src="remove_mee.png" width="450">
</p>

This is a template repository for building a Next.js application with MongoDB, Prisma, and Next Auth **V5**.

## Features

- 🚀 Next Auth **V5** with user registration, login, and logout functionality
- 🚀 Protected Routes
- 🚀 Next.js framework for server-side rendering and client-side rendering
- 🚀 MongoDB for database storage
- 🚀 Prisma for database ORM

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your environment variables by creating a `.env` `or` `.env.local` file based on the `.env.example` file.
4. Generate and DB Push Prisma Client
```bash
npx prisma generate
npx prisma db push
```
5. Start the development server: `npm run dev`

## What you need to know

- `auth.config.ts` `&&` `app/lib/actions.ts` handles auth logic
- `/lib/form-schemas.ts` zod for form validation
- `middleware.ts` handles protected routes

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
