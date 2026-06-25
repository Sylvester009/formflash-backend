import { ZodError } from "zod";
import { prisma } from '../config/db.js';

export const errorHandler = (error, req, res, next) => {
  console.error("Error:", error);

  // Zod validation errors
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: "Validation failed",
      details: error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      })),
    });
  }

  // Prisma known errors
  if (error instanceof prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return res.status(409).json({
        success: false,
        error: "A record with this value already exists",
      });
    }
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        error: "Record not found",
      });
    }
  }

  // Prisma validation errors
  if (error instanceof prisma.PrismaClientValidationError) {
    return res.status(400).json({
      success: false,
      error: "Invalid data provided",
    });
  }

  // Default error
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Internal server error",
  });
};