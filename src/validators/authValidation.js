import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .trim()
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  
  email: z.string()
    .email("Invalid email format")
    .min(5, "Email must be at least 5 characters")
    .max(255, "Email must be less than 255 characters")
    .trim()
    .toLowerCase()
    .refine(
      (email) => {
        // Optional: Block disposable email domains
        const blockedDomains = ['tempmail.com', 'throwaway.com']; // Add more if needed
        const domain = email.split('@')[1];
        return !blockedDomains.includes(domain);
      },
      { message: "Disposable email addresses are not allowed" }
    ),
  
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be less than 128 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
    .refine(
      (password) => !password.includes(' '),
      "Password cannot contain spaces"
    ),
  
  confirmPassword: z.string().optional(),
}).refine(
  (data) => {
    if (data.confirmPassword && data.password !== data.confirmPassword) {
      return false;
    }
    return true;
  },
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
);

export const logInSchema = z.object({
  email: z.string()
    .email("Invalid email format")
    .min(1, "Email is required")
    .trim()
    .toLowerCase(),
  
  password: z.string()
    .min(1, "Password is required")
    .max(128, "Password must be less than 128 characters"),
});