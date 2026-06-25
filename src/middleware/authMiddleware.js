import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

export const authMiddleware = async(req, res, next) => {
    console.log("Auth Middleware Reached");
    let token;

    if(
        req.headers.authorization && req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    } else if(req.cookies?.jwt){
        token = req.cookies.jwt;
    }

    if(!token){
        res.status(401).json({
            error: "Not Authorized, No token found"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.Jwt_Secret);

        const user = await prisma.user.findUnique({
            where: {id: decoded.id},
        });

        if(!user){
            return res.status(401).json({
                error: "User no longer exists"
            });
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({
            error: `Token Failed, Not authorized: ${error}`
        });
    }
}