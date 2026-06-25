import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body; 
        
        // Check if user already exists
        const userExists = await prisma.user.findUnique({
            where: { email: email },
        });

        if (userExists) {
            return res.status(400).json({
                error: "User already exists!!!"
            });
        }

        // Hash the password safely
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user in the database
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        const token = generateToken(user.id, res);

        return res.status(201).json({
            status: "success",
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
                token
            }
        });

    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({
            error: "Internal server error. Please try again later."
        });
    }
};

export const logIn = async (req, res) => {
    try{
        const { email, password } = req.body;

        //Check if user email is valid
        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        if (!user) {
            return res.status(401).json({
                error: "Invalid Email or Password!"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return res.status(401).json({
                error: "Invalid Password"
            });
        }

        const token = generateToken(user.id, res);

        return res.status(201).json({
            status: "success",
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                },
                token,
            }
        });


    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            error: "Internal server error. Please try again later."
        });

    }
}

export const logOut = async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({
        status: "success",
        message: "Logged out successfully",
    });
}