import dotenv from "dotenv";
import path from "path";
dotenv.config(
    {
        path: path.join(process.cwd(), ".env")
    }
);

export const envVars = {
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL,
    betterAuthSecret: process.env.BETTER_AUTH_SECRET,
    betterAuthUrl: process.env.BETTER_AUTH_URL,
    appUrl: process.env.APP_URL
}



