import { prisma } from '../config/db.js';

export const formList = async (req, res) => {
  console.log('formList called');
  try {
    const { status, search, page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build where clause
    const where = {
      userId: req.user?.id,
      ...(status && { status: status.toUpperCase() }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [forms, total] = await Promise.all([
      prisma.form.findMany({
        where,
        include: {
          _count: {
            select: {
              submissions: true,
              fields: true,
            },
          },
        },
        orderBy: { updatedAt: 'desc' },
        skip,
        take: parseInt(limit),
      }),
      prisma.form.count({ where }),
    ]);

    res.json({
      success: true,
      data: forms,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const savedForms = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {
      userId: req.user?.id,
      status: 'DRAFT',
      isPublished: false,
    };

    const [forms, total] = await Promise.all([
      prisma.form.findMany({
        where,
        include: {
          _count: {
            select: { fields: true },
          },
        },
        orderBy: { updatedAt: 'desc' },
        skip,
        take: parseInt(limit),
      }),
      prisma.form.count({ where }),
    ]);

    res.json({
      success: true,
      data: forms,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const publishedForms = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {
      userId: req.user?.id,
      status: 'PUBLISHED',
      isPublished: true,
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [forms, total] = await Promise.all([
      prisma.form.findMany({
        where,
        include: {
          _count: {
            select: {
              submissions: true,
              fields: true,
            },
          },
          formShareLinks: {
            select: {
              slug: true,
              isActive: true,
            },
          },
        },
        orderBy: { updatedAt: 'desc' },
        skip,
        take: parseInt(limit),
      }),
      prisma.form.count({ where }),
    ]);

    res.json({
      success: true,
      data: forms,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getFormById = async (req, res) => {
  console.log('getFormById called');
  try {
    const { id } = req.params;

    const form = await prisma.form.findUnique({
      where: { id },
      include: {
        fields: {
          orderBy: { order: 'asc' },
        },
        _count: {
          select: { submissions: true },
        },
        formShareLinks: {
          select: {
            slug: true,
            isActive: true,
          },
        },
      },
    });

    if (!form) {
      return res.status(404).json({
        success: false,
        error: 'Form not found',
      });
    }

    if (form.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to view this form',
      });
    }

    res.json({
      success: true,
      data: form,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const createForm = async (req, res) => {
  try {
    const { title, description, fields, settings, theme } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        error: 'Title is required',
      });
    }

    const form = await prisma.form.create({
      data: {
        title,
        description,
        userId: req.user?.id,
        status: 'DRAFT',
        isPublished: false,
        settings: settings || {},
        theme: theme || {},
        fields: fields
          ? {
              create: fields.map((field, index) => ({
                type: field.type,
                label: field.label,
                category: field.category || getFieldCategory(field.type),
                order: index,
                required: field.required || false,
                placeholder: field.placeholder,
                helpText: field.helpText,
                attributes: field.attributes || {},
                showWhen: field.showWhen || null,
              })),
            }
          : undefined,
      },
      include: {
        fields: {
          orderBy: { order: 'asc' },
        },
      },
    });

    res.status(201).json({
      success: true,
      data: form,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateForm = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, settings, theme, fields } = req.body;

    // Check if form exists
    const existingForm = await prisma.form.findUnique({
      where: { id },
    });

    if (!existingForm) {
      return res.status(404).json({
        success: false,
        error: 'Form not found',
      });
    }

    // Update form basic info
    const form = await prisma.form.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(settings && { settings }),
        ...(theme && { theme }),
      },
      include: {
        fields: {
          orderBy: { order: 'asc' },
        },
      },
    });

    // If fields are provided, update them
    if (fields && Array.isArray(fields)) {
      // Delete existing fields
      await prisma.formField.deleteMany({
        where: { formId: id },
      });

      // Create new fields
      await prisma.formField.createMany({
        data: fields.map((field, index) => ({
          formId: id,
          type: field.type,
          label: field.label,
          category: field.category || getFieldCategory(field.type),
          order: index,
          required: field.required || false,
          placeholder: field.placeholder,
          helpText: field.helpText,
          attributes: field.attributes || {},
          showWhen: field.showWhen || null,
        })),
      });

      // Get updated form with new fields
      const updatedForm = await prisma.form.findUnique({
        where: { id },
        include: {
          fields: {
            orderBy: { order: 'asc' },
          },
        },
      });

      return res.json({
        success: true,
        data: updatedForm,
      });
    }

    res.json({
      success: true,
      data: form,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const publishForm = async (req, res) => {
  try {
    const { id } = req.params;

    const form = await prisma.form.update({
      where: { id },
      data: {
        isPublished: true,
        status: 'PUBLISHED',
      },
    });

    // Auto-create share link if it doesn't exist
    const existingLink = await prisma.formShareLink.findUnique({
      where: { formId: id },
    });

    if (!existingLink) {
      const slug =
        form.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '') +
        '-' +
        Math.random().toString(36).substring(2, 8);

      await prisma.formShareLink.create({
        data: {
          formId: id,
          slug,
        },
      });
    }

    res.json({
      success: true,
      data: form,
      message: 'Form published successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const unpublishForm = async (req, res) => {
  try {
    const { id } = req.params;

    const form = await prisma.form.update({
      where: { id },
      data: {
        isPublished: false,
        status: 'DRAFT',
      },
    });

    res.json({
      success: true,
      data: form,
      message: 'Form unpublished successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteForm = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.form.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Form deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const responses = async (req, res) => {
  try {
    const { formId } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = { formId };

    const [submissions, total] = await Promise.all([
      prisma.formSubmission.findMany({
        where,
        include: {
          form: {
            select: {
              title: true,
              fields: {
                select: {
                  id: true,
                  label: true,
                  type: true,
                  attributes: true,
                },
                orderBy: { order: 'asc' },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit),
      }),
      prisma.formSubmission.count({ where }),
    ]);

    res.json({
      success: true,
      data: submissions,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const submitResponse = async (req, res) => {
  try {
    const { formId } = req.params;
    const {
      data: formData,
      startedAt,
      completedAt,
      timeSpent,
      metadata,
    } = req.body;

    // Check if form exists and is published
    const form = await prisma.form.findUnique({
      where: { id: formId },
    });

    if (!form) {
      return res.status(404).json({
        success: false,
        error: 'Form not found',
      });
    }

    if (!form.isPublished) {
      return res.status(400).json({
        success: false,
        error: 'This form is not accepting responses',
      });
    }

    // Calculate quiz score if applicable
    let score = null;
    let totalPoints = null;

    // Check if form has quiz fields
    const quizFields = await prisma.formField.findMany({
      where: {
        formId,
        type: {
          in: ['multiple_choice_quiz', 'true_false', 'fill_blank', 'matching'],
        },
      },
    });

    if (quizFields.length > 0) {
      totalPoints = quizFields.reduce((sum, field) => {
        return sum + (field.attributes?.points || 0);
      }, 0);

      score = quizFields.reduce((sum, field) => {
        const userAnswer = formData[field.id];
        const attributes = field.attributes || {};

        if (
          field.type === 'multiple_choice_quiz' ||
          field.type === 'true_false'
        ) {
          if (userAnswer === attributes.correctAnswer) {
            return sum + (attributes.points || 0);
          }
        } else if (field.type === 'fill_blank') {
          const correctAnswers = attributes.acceptMultiple || [
            attributes.correctAnswer,
          ];
          if (
            correctAnswers.some((answer) =>
              attributes.caseSensitive
                ? answer === userAnswer
                : answer.toLowerCase() === userAnswer?.toLowerCase()
            )
          ) {
            return sum + (attributes.points || 0);
          }
        }

        return sum;
      }, 0);
    }

    const submission = await prisma.formSubmission.create({
      data: {
        formId,
        userId: req.user?.id,
        data: formData,
        startedAt: startedAt ? new Date(startedAt) : null,
        completedAt: completedAt ? new Date(completedAt) : new Date(),
        timeSpent,
        score,
        totalPoints,
        metadata: metadata || {},
      },
    });

    res.status(201).json({
      success: true,
      data: submission,
      message:
        score !== null
          ? `Form submitted successfully! Score: ${score}/${totalPoints}`
          : 'Form submitted successfully!',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ============ GET SUBMISSION DETAILS ============
export const getSubmissionById = async (req, res) => {
  try {
    const { submissionId } = req.params;

    const submission = await prisma.formSubmission.findUnique({
      where: { id: submissionId },
      include: {
        form: {
          include: {
            fields: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });

    if (!submission) {
      return res.status(404).json({
        success: false,
        error: 'Submission not found',
      });
    }

    res.json({
      success: true,
      data: submission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Helper function to get field category
function getFieldCategory(fieldType) {
  const categoryMap = {
    multiple_choice_quiz: 'Quiz & Assessment',
    true_false: 'Quiz & Assessment',
    fill_blank: 'Quiz & Assessment',
    matching: 'Quiz & Assessment',
    essay_question: 'Quiz & Assessment',
    short_text: 'Basic Fields',
    long_text: 'Basic Fields',
    email: 'Basic Fields',
    phone: 'Basic Fields',
    number: 'Basic Fields',
    radio: 'Choices',
    checkbox: 'Choices',
    dropdown: 'Choices',
    multi_select: 'Choices',
    file_submission: 'Assignment Fields',
    link_submission: 'Assignment Fields',
    grade: 'Assignment Fields',
    date: 'Date & Time',
    time: 'Date & Time',
    datetime: 'Date & Time',
    student_id: 'Data Collection',
    class_select: 'Data Collection',
    feedback_survey: 'Data Collection',
    file_upload: 'Uploads',
    image_upload: 'Uploads',
    rating: 'Feedback',
    slider: 'Feedback',
    nps: 'Feedback',
  };
  return categoryMap[fieldType] || 'Other';
}
