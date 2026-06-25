import { z } from "zod";

const fieldTypes = z.enum([
  // Quiz & Assessment
  'multiple_choice_quiz',
  'true_false',
  'fill_blank',
  'matching',
  'essay_question',
  // Basic Fields
  'short_text',
  'long_text',
  'email',
  'phone',
  'number',
  // Choices
  'radio',
  'checkbox',
  'dropdown',
  'multi_select',
  // Assignment Fields
  'file_submission',
  'link_submission',
  'grade',
  // Date & Time
  'date',
  'time',
  'datetime',
  // Data Collection
  'student_id',
  'class_select',
  'feedback_survey',
  // Uploads
  'file_upload',
  'image_upload',
  // Feedback
  'rating',
  'slider',
  'nps',
]);

const fieldCategories = z.enum([
  'Quiz & Assessment',
  'Basic Fields',
  'Choices',
  'Assignment Fields',
  'Date & Time',
  'Data Collection',
  'Uploads',
  'Feedback',
]);

const formFieldSchema = z.object({
  type: fieldTypes,
  label: z.string().min(1, "Field label is required").max(200, "Label must be less than 200 characters"),
  category: fieldCategories.optional(),
  order: z.number().int().min(0).optional(),
  helpText: z.string().max(500).optional().nullable(),
  placeholder: z.string().max(200).optional().nullable(),
  required: z.boolean().optional(),
  attributes: z.record(z.unknown()).optional().default({}),
  showWhen: z.record(z.unknown()).optional().nullable(),
});

export const queryParamsSchema = z.object({
  page: z.string().optional().transform(val => val ? parseInt(val) : 1)
    .pipe(z.number().int().positive("Page must be a positive integer")),
  limit: z.string().optional().transform(val => val ? parseInt(val) : 10)
    .pipe(z.number().int().min(1, "Limit must be at least 1").max(100, "Limit cannot exceed 100")),
  status: z.enum(['DRAFT', 'PUBLISHED']).optional(),
  search: z.string().min(1).max(100).optional(),
});

export const createFormSchema = z.object({
  title: z.string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters")
    .trim(),
  description: z.string()
    .max(1000, "Description must be less than 1000 characters")
    .optional()
    .nullable(),
  fields: z.array(formFieldSchema)
    .min(0)
    .max(100, "Form cannot have more than 100 fields")
    .optional(),
  settings: z.object({
    showProgressBar: z.boolean().optional(),
    emailNotifications: z.boolean().optional(),
    confirmationMessage: z.string().max(500).optional(),
    shuffleQuestions: z.boolean().optional(),
    timeLimit: z.number().int().positive().optional(),
    passingScore: z.number().min(0).max(100).optional(),
    showResults: z.boolean().optional(),
    allowRetake: z.boolean().optional(),
    anonymous: z.boolean().optional(),
    maxRegistrations: z.number().int().positive().optional(),
    confirmationEmail: z.boolean().optional(),
    sections: z.boolean().optional(),
  }).optional().default({}),
  theme: z.object({
    primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color format").optional(),
    backgroundColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color format").optional(),
    fontFamily: z.string().optional(),
  }).optional().default({}),
});

export const updateFormSchema = z.object({
  title: z.string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters")
    .trim()
    .optional(),
  description: z.string()
    .max(1000, "Description must be less than 1000 characters")
    .optional()
    .nullable(),
  fields: z.array(formFieldSchema)
    .min(0)
    .max(100, "Form cannot have more than 100 fields")
    .optional(),
  settings: z.record(z.unknown()).optional(),
  theme: z.record(z.unknown()).optional(),
}).refine(data => {
  // At least one field must be provided
  return Object.keys(data).length > 0;
}, {
  message: "At least one field must be provided for update"
});

// export const formIdParamSchema = z.object({
//   id: z.string()
//     .min(1, "Form ID is required")
//     .uuid("Invalid form ID format")
//     .or(z.string().uuid("Invalid form ID format")),
// });

export const submitResponseSchema = z.object({
  data: z.record(z.unknown(), {
    required_error: "Response data is required",
    invalid_type_error: "Response data must be an object"
  }),
  startedAt: z.string().datetime().optional().nullable(),
  completedAt: z.string().datetime().optional().nullable(),
  timeSpent: z.number().int().positive().optional().nullable(),
  metadata: z.object({
    browser: z.string().optional(),
    ip: z.string().optional(),
    userAgent: z.string().optional(),
  }).optional().default({}),
});

// export const submissionIdParamSchema = z.object({
//   submissionId: z.string()
//     .min(1, "Submission ID is required")
//     .uuid("Invalid submission ID format")
//     .or(z.string().cuid("Invalid submission ID format")),
// });

export const responsesQuerySchema = z.object({
  formId: z.string()
    .min(1, "Form ID is required")
    .uuid("Invalid form ID format")
    .or(z.string().cuid("Invalid form ID format")),
  page: z.string().optional().transform(val => val ? parseInt(val) : 1)
    .pipe(z.number().int().positive("Page must be a positive integer")),
  limit: z.string().optional().transform(val => val ? parseInt(val) : 20)
    .pipe(z.number().int().min(1).max(100)),
});