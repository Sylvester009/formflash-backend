import express from 'express';
import {
  formList,
  savedForms,
  publishedForms,
  getFormById,
  createForm,
  updateForm,
  publishForm,
  unpublishForm,
  deleteForm,
  responses,
  submitResponse,
  getSubmissionById,
} from '../controllers/formController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import {
  createFormSchema,
  queryParamsSchema,
  submitResponseSchema,
  updateFormSchema,
} from '../validators/formValidation.js';

const router = express.Router();

router.use(authMiddleware);

// Get all forms (with optional status filter)
router.get('/', validateRequest(queryParamsSchema), formList);

// Get saved/draft forms
router.get('/drafts', validateRequest(queryParamsSchema), savedForms);

// Get published forms
router.get('/publishes', validateRequest(queryParamsSchema), publishedForms);

// Create new form
router.post('/', validateRequest(createFormSchema), createForm);

// Get single form
router.get('/:id', getFormById);

// Update form
router.put('/:id', validateRequest(updateFormSchema), updateForm);

// Delete form
router.delete('/:id', deleteForm);

// Publish form
router.patch('/:id/publish', publishForm);

// Unpublish form
router.patch('/:id/unpublish', unpublishForm);

// Get form responses
router.get('/:formId/responses', validateRequest(queryParamsSchema), responses);

// Submit form response (public)
router.post(
  '/:formId/submit',
  validateRequest(submitResponseSchema),
  submitResponse
);

// Get single submission
router.get('/responses/:submissionId', getSubmissionById);

export default router;
