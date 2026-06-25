import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    const payload = {id: userId};
    const token = jwt.sign(payload, process.env.Jwt_Secret, {
        expiresIn: process.env.Jwt_Expires_In || "7d",
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.Node_Env === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return token
}