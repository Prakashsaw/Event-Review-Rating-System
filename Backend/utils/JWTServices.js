import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// dotenv.config();

export const createJWTToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRETE_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
// Code for JWT token verification
export const verifyJWTToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRETE_KEY);
};

