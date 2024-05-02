if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL must be set");
export const DATABASE_URL = process.env.DATABASE_URL;
console.log("DATABASE_URL", DATABASE_URL);
