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
    appUrl: process.env.APP_URL,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    appUser: process.env.APP_USER,
    appPass: process.env.APP_PASS,
}



