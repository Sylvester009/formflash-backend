import express from "express";
import { config } from "dotenv";
//Routes Apis
import FormRoutes from "./routes/formRoutes.js";
import AuthRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
//DB Connect
import { connectDb, disconnectDb } from "./config/db.js";

config();
connectDb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use("/api/forms", FormRoutes);
app.use("/api/auth", AuthRoutes);

app.use(errorHandler);


const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, "0.0.0.0", ()=>{
    console.log(`Server running successfully on port ${PORT}`);
})

//params for disconnect
process.on("unhandledRejection", (err) => {
    console.error(`Unhandled Rejection: ${err}`);
    server.close(async() => {
        await disconnectDb();
        process.exit(1);
    })
})

process.on("uncaughtException", async (err) => {
    console.error(`Uncaught Exception: ${err}`);
    await disconnectDb();
    process.exit(1);
})

process.on("SIGTERM", async () => {
    console.log("SIGTERM Received, Shutting down gracefully");
    server.close(async() => {
        await disconnectDb();
        process.exit(1);
    })
})
