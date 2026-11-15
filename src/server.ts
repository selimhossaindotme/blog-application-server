import app from "./app";
import { prisma } from "./lib/prisma";

const PORT = process.env.PORT || 3000;
async function startServer() {
    try {
       await prisma.$connect();
       console.log("Server started successfully."); 
       app.listen(PORT, () => {
           console.log(`Server is running on port ${PORT}`);
       });
    } catch (error) {
        console.error("Error starting server:", error);
    }
}

startServer();