import  { prisma } from "../src/config/db.js";

const userId = "f14bbe1a-d9c0-48df-9b7d-d37cb82a8464";

const Forms = [
  // ==================== 1. CONTACT FORM ====================
  {
    title: "Customer Contact Form",
    description: "Get in touch with our support team",
    userId,
    status: "PUBLISHED",
    isPublished: true,
    settings: {
      showProgressBar: true,
      emailNotifications: true,
      confirmationMessage: "Thanks for contacting us! We'll get back to you within 24 hours."
    },
    theme: {
      primaryColor: "#4F46E5",
      backgroundColor: "#FFFFFF",
      fontFamily: "Inter"
    },
    fields: {
      create: [
        {
          type: "short_text",
          label: "Full Name",
          category: "Basic Fields",
          order: 0,
          required: true,
          placeholder: "Enter your full name",
          helpText: "Please enter your first and last name",
          attributes: {
            minLength: 2,
            maxLength: 100
          }
        },
        {
          type: "email",
          label: "Email Address",
          category: "Basic Fields",
          order: 1,
          required: true,
          placeholder: "you@example.com",
          attributes: {
            validation: "email"
          }
        },
        {
          type: "phone",
          label: "Phone Number",
          category: "Basic Fields",
          order: 2,
          required: false,
          placeholder: "+1 (555) 000-0000",
          attributes: {
            countryCode: true
          }
        },
        {
          type: "dropdown",
          label: "Department",
          category: "Choices",
          order: 3,
          required: true,
          attributes: {
            options: ["Sales", "Support", "Billing", "Technical", "Other"],
            searchable: false
          }
        },
        {
          type: "long_text",
          label: "Message",
          category: "Basic Fields",
          order: 4,
          required: true,
          placeholder: "Tell us how we can help...",
          helpText: "Please be as detailed as possible",
          attributes: {
            maxLength: 1000,
            rows: 4
          }
        },
        {
          type: "file_upload",
          label: "Attachments",
          category: "Uploads",
          order: 5,
          required: false,
          helpText: "Upload screenshots or relevant documents (max 10MB each)",
          attributes: {
            fileTypes: [".jpg", ".png", ".pdf", ".doc", ".docx"],
            maxSizeMB: 10,
            multiple: true
          }
        },
        {
          type: "rating",
          label: "How would you rate our service?",
          category: "Feedback",
          order: 6,
          required: false,
          attributes: {
            maxStars: 5,
            allowHalf: true
          }
        }
      ]
    }
  },

  // ==================== 2. MATH QUIZ ====================
  {
    title: "Mathematics Quiz - Algebra Basics",
    description: "Test your algebra knowledge with this comprehensive quiz",
    userId,
    status: "PUBLISHED",
    isPublished: true,
    settings: {
      showProgressBar: true,
      shuffleQuestions: true,
      timeLimit: 1800, // 30 minutes
      passingScore: 60,
      showResults: true,
      allowRetake: true
    },
    theme: {
      primaryColor: "#059669",
      backgroundColor: "#F0FDF4"
    },
    fields: {
      create: [
        {
          type: "student_id",
          label: "Student ID",
          category: "Data Collection",
          order: 0,
          required: true,
          placeholder: "Enter your student ID",
          attributes: {
            validation: "student_id_format",
            autoGenerate: false
          }
        },
        {
          type: "class_select",
          label: "Select Your Class",
          category: "Data Collection",
          order: 1,
          required: true,
          attributes: {
            options: ["Math 101 - Section A", "Math 101 - Section B", "Math 102 - Advanced"],
            multiple: false,
            searchable: true
          }
        },
        {
          type: "multiple_choice_quiz",
          label: "What is the value of x in the equation 2x + 5 = 13?",
          category: "Quiz & Assessment",
          order: 2,
          required: true,
          attributes: {
            options: ["x = 3", "x = 4", "x = 5", "x = 6"],
            correctAnswer: "x = 4",
            points: 10,
            feedback: {
              correct: "Correct! 2(4) + 5 = 8 + 5 = 13",
              incorrect: "Try solving: subtract 5 from both sides, then divide by 2"
            },
            shuffleOptions: true
          }
        },
        {
          type: "true_false",
          label: "The quadratic formula can solve any quadratic equation",
          category: "Quiz & Assessment",
          order: 3,
          required: true,
          attributes: {
            correctAnswer: true,
            points: 5,
            feedback: {
              correct: "Yes! The quadratic formula x = [-b ± √(b² - 4ac)] / 2a works for all quadratic equations",
              incorrect: "Actually, the quadratic formula works for all quadratic equations in the form ax² + bx + c = 0"
            }
          }
        },
        {
          type: "fill_blank",
          label: "Complete the formula: The area of a circle = ___",
          category: "Quiz & Assessment",
          order: 4,
          required: true,
          attributes: {
            correctAnswer: "πr²",
            points: 5,
            caseSensitive: false,
            acceptMultiple: ["πr²", "pi r squared", "pi*r^2"]
          }
        },
        {
          type: "number",
          label: "What is 15% of 200?",
          category: "Basic Fields",
          order: 5,
          required: true,
          attributes: {
            min: 0,
            max: 200,
            step: 1
          }
        },
        {
          type: "essay_question",
          label: "Explain the Pythagorean theorem and provide a real-world example",
          category: "Quiz & Assessment",
          order: 6,
          required: true,
          attributes: {
            placeholder: "Write your answer here...",
            minWords: 50,
            maxWords: 200,
            rubric: {
              definition: 20,
              formula: 20,
              example: 30,
              explanation: 30
            }
          }
        }
      ]
    }
  },

  // ==================== 3. EVENT REGISTRATION ====================
  {
    title: "Tech Conference 2026 Registration",
    description: "Register for the biggest tech conference of the year",
    userId,
    status: "PUBLISHED",
    isPublished: true,
    settings: {
      showProgressBar: true,
      maxRegistrations: 500,
      confirmationEmail: true
    },
    theme: {
      primaryColor: "#7C3AED",
      backgroundColor: "#FAF5FF"
    },
    fields: {
      create: [
        {
          type: "short_text",
          label: "Full Name",
          category: "Basic Fields",
          order: 0,
          required: true,
          placeholder: "Enter your name as it should appear on badge"
        },
        {
          type: "email",
          label: "Email Address",
          category: "Basic Fields",
          order: 1,
          required: true,
          placeholder: "your@email.com"
        },
        {
          type: "dropdown",
          label: "Ticket Type",
          category: "Choices",
          order: 2,
          required: true,
          attributes: {
            options: ["Early Bird - $199", "Regular - $299", "VIP - $499", "Student - $99"],
            searchable: false
          }
        },
        {
          type: "checkbox",
          label: "Workshops (Select all that interest you)",
          category: "Choices",
          order: 3,
          required: false,
          attributes: {
            options: [
              "AI & Machine Learning",
              "Cloud Architecture",
              "Web Development",
              "Cybersecurity",
              "DevOps",
              "Blockchain"
            ],
            minSelected: 1,
            maxSelected: 3
          }
        },
        {
          type: "radio",
          label: "Dietary Preference",
          category: "Choices",
          order: 4,
          required: true,
          attributes: {
            options: ["Vegetarian", "Vegan", "Non-Vegetarian", "Gluten-Free", "Other"],
            layout: "vertical"
          }
        },
        {
          type: "date",
          label: "Preferred Date",
          category: "Date & Time",
          order: 5,
          required: true,
          attributes: {
            minDate: "2026-06-01",
            maxDate: "2026-06-03"
          }
        },
        {
          type: "file_upload",
          label: "Upload Profile Photo (for badge)",
          category: "Uploads",
          order: 6,
          required: false,
          attributes: {
            fileTypes: [".jpg", ".png"],
            maxSizeMB: 5,
            multiple: false
          }
        },
        {
          type: "nps",
          label: "How likely are you to recommend this conference?",
          category: "Feedback",
          order: 7,
          required: false,
          attributes: {
            scale: 10
          }
        }
      ]
    }
  },

  // ==================== 4. COURSE FEEDBACK SURVEY ====================
  {
    title: "Course Feedback Survey - Web Development 101",
    description: "Help us improve the course by providing your honest feedback",
    userId,
    status: "DRAFT",
    isPublished: false,
    settings: {
      anonymous: true,
      showProgressBar: true
    },
    theme: {
      primaryColor: "#2563EB",
      backgroundColor: "#EFF6FF"
    },
    fields: {
      create: [
        {
          type: "feedback_survey",
          label: "How would you rate the course content?",
          category: "Data Collection",
          order: 0,
          required: true,
          attributes: {
            ratingScale: 5,
            commentRequired: false,
            anonymous: true
          }
        },
        {
          type: "rating",
          label: "Rate the Instructor",
          category: "Feedback",
          order: 1,
          required: true,
          attributes: {
            maxStars: 5,
            allowHalf: true
          }
        },
        {
          type: "slider",
          label: "How many hours per week did you study?",
          category: "Feedback",
          order: 2,
          required: true,
          attributes: {
            min: 0,
            max: 20,
            step: 0.5,
            showValue: true
          }
        },
        {
          type: "multi_select",
          label: "What topics would you like to learn next?",
          category: "Choices",
          order: 3,
          required: false,
          attributes: {
            options: [
              "React.js",
              "Node.js",
              "Python",
              "Database Design",
              "DevOps",
              "Mobile Development",
              "UI/UX Design"
            ],
            searchable: true,
            minSelected: 1,
            maxSelected: 3
          }
        },
        {
          type: "long_text",
          label: "What could we improve?",
          category: "Basic Fields",
          order: 4,
          required: false,
          placeholder: "Share your suggestions...",
          attributes: {
            maxLength: 500,
            rows: 3
          }
        },
        {
          type: "nps",
          label: "How likely are you to recommend this course to a friend?",
          category: "Feedback",
          order: 5,
          required: true,
          attributes: {
            scale: 10
          }
        }
      ]
    }
  },

  // ==================== 5. JOB APPLICATION ====================
  {
    title: "Software Engineer Application",
    description: "Apply for the Senior Software Engineer position at TechCorp",
    userId,
    status: "PUBLISHED",
    isPublished: true,
    settings: {
      showProgressBar: true,
      sections: true,
      confirmationEmail: true
    },
    theme: {
      primaryColor: "#DC2626",
      backgroundColor: "#FEF2F2"
    },
    fields: {
      create: [
        {
          type: "short_text",
          label: "Full Name",
          category: "Basic Fields",
          order: 0,
          required: true,
          placeholder: "John Doe"
        },
        {
          type: "email",
          label: "Email",
          category: "Basic Fields",
          order: 1,
          required: true
        },
        {
          type: "phone",
          label: "Phone",
          category: "Basic Fields",
          order: 2,
          required: true,
          attributes: {
            countryCode: true
          }
        },
        {
          type: "link_submission",
          label: "LinkedIn Profile URL",
          category: "Assignment Fields",
          order: 3,
          required: true,
          placeholder: "https://linkedin.com/in/yourprofile",
          attributes: {
            allowedDomains: ["linkedin.com"]
          }
        },
        {
          type: "link_submission",
          label: "GitHub Portfolio",
          category: "Assignment Fields",
          order: 4,
          required: false,
          placeholder: "https://github.com/yourusername",
          attributes: {
            allowedDomains: ["github.com"]
          }
        },
        {
          type: "dropdown",
          label: "Years of Experience",
          category: "Choices",
          order: 5,
          required: true,
          attributes: {
            options: ["0-2 years", "3-5 years", "5-7 years", "7-10 years", "10+ years"],
            searchable: false
          }
        },
        {
          type: "checkbox",
          label: "Technologies You're Proficient In",
          category: "Choices",
          order: 6,
          required: true,
          attributes: {
            options: [
              "JavaScript/TypeScript",
              "React.js",
              "Node.js",
              "Python",
              "PostgreSQL",
              "AWS",
              "Docker",
              "GraphQL",
              "Next.js"
            ],
            minSelected: 3,
            maxSelected: 9
          }
        },
        {
          type: "file_submission",
          label: "Upload Your Resume",
          category: "Assignment Fields",
          order: 7,
          required: true,
          attributes: {
            fileTypes: [".pdf", ".doc", ".docx"],
            maxSizeMB: 5,
            maxFiles: 1
          }
        },
        {
          type: "essay_question",
          label: "Why do you want to work at TechCorp?",
          category: "Quiz & Assessment",
          order: 8,
          required: true,
          attributes: {
            placeholder: "Tell us about your motivation...",
            minWords: 100,
            maxWords: 500
          }
        },
        {
          type: "date",
          label: "Available Start Date",
          category: "Date & Time",
          order: 9,
          required: true,
          attributes: {
            minDate: "2026-07-01"
          }
        },
        {
          type: "slider",
          label: "Expected Salary Range (in thousands USD)",
          category: "Feedback",
          order: 10,
          required: false,
          attributes: {
            min: 50,
            max: 200,
            step: 5,
            showValue: true
          }
        }
      ]
    }
  },

  // ==================== 6. SIMPLE POLL ====================
  {
    title: "Team Lunch Preference",
    description: "Vote for where we should have our team lunch this Friday",
    userId,
    status: "PUBLISHED",
    isPublished: true,
    settings: {
      anonymous: true
    },
    theme: {
      primaryColor: "#F59E0B",
      backgroundColor: "#FFFBEB"
    },
    fields: {
      create: [
        {
          type: "radio",
          label: "Choose a restaurant",
          category: "Choices",
          order: 0,
          required: true,
          attributes: {
            options: [
              "Italian - La Pasta",
              "Mexican - El Taco Loco",
              "Japanese - Sushi Bar",
              "Indian - Curry House",
              "Thai - Bangkok Kitchen"
            ],
            layout: "vertical"
          }
        },
        {
          type: "datetime",
          label: "Preferred Date & Time",
          category: "Date & Time",
          order: 1,
          required: false,
          attributes: {
            minDate: "2026-06-26",
            maxDate: "2026-06-28",
            timeZone: true
          }
        },
        {
          type: "short_text",
          label: "Special Requests",
          category: "Basic Fields",
          order: 2,
          required: false,
          placeholder: "Any dietary restrictions or preferences?",
          attributes: {
            maxLength: 200
          }
        }
      ]
    }
  },

  // ==================== 7. HEALTH ASSESSMENT ====================
  {
    title: "Health & Wellness Assessment",
    description: "Complete this assessment to get personalized health recommendations",
    userId,
    status: "DRAFT",
    isPublished: false,
    settings: {
      showProgressBar: true,
      sections: true
    },
    theme: {
      primaryColor: "#0891B2",
      backgroundColor: "#ECFEFF"
    },
    fields: {
      create: [
        {
          type: "number",
          label: "Age",
          category: "Basic Fields",
          order: 0,
          required: true,
          attributes: {
            min: 18,
            max: 120,
            step: 1
          }
        },
        {
          type: "radio",
          label: "Gender",
          category: "Choices",
          order: 1,
          required: true,
          attributes: {
            options: ["Male", "Female", "Other", "Prefer not to say"],
            layout: "vertical"
          }
        },
        {
          type: "number",
          label: "Height (cm)",
          category: "Basic Fields",
          order: 2,
          required: true,
          attributes: {
            min: 100,
            max: 250,
            step: 0.1
          }
        },
        {
          type: "number",
          label: "Weight (kg)",
          category: "Basic Fields",
          order: 3,
          required: true,
          attributes: {
            min: 30,
            max: 300,
            step: 0.1
          }
        },
        {
          type: "checkbox",
          label: "Existing Health Conditions",
          category: "Choices",
          order: 4,
          required: true,
          attributes: {
            options: [
              "Diabetes",
              "Hypertension",
              "Asthma",
              "Heart Disease",
              "None",
              "Other"
            ],
            minSelected: 1,
            maxSelected: 6
          }
        },
        {
          type: "slider",
          label: "How many hours of sleep do you get per night?",
          category: "Feedback",
          order: 5,
          required: true,
          attributes: {
            min: 0,
            max: 12,
            step: 0.5,
            showValue: true
          }
        },
        {
          type: "slider",
          label: "How many days per week do you exercise?",
          category: "Feedback",
          order: 6,
          required: true,
          attributes: {
            min: 0,
            max: 7,
            step: 1,
            showValue: true
          }
        },
        {
          type: "rating",
          label: "Rate your stress level",
          category: "Feedback",
          order: 7,
          required: true,
          attributes: {
            maxStars: 5,
            allowHalf: true
          }
        }
      ]
    }
  },

  // ==================== 8. PRODUCT REVIEW ====================
  {
    title: "Product Review - SmartWatch X200",
    description: "Share your experience with our latest smartwatch",
    userId,
    status: "PUBLISHED",
    isPublished: true,
    settings: {
      showProgressBar: true,
      confirmationMessage: "Thank you for your review! You've earned 50 reward points."
    },
    theme: {
      primaryColor: "#9333EA",
      backgroundColor: "#FAF5FF"
    },
    fields: {
      create: [
        {
          type: "rating",
          label: "Overall Rating",
          category: "Feedback",
          order: 0,
          required: true,
          attributes: {
            maxStars: 5,
            allowHalf: true
          }
        },
        {
          type: "short_text",
          label: "Review Title",
          category: "Basic Fields",
          order: 1,
          required: true,
          placeholder: "Summarize your review in a few words",
          attributes: {
            maxLength: 100,
            minLength: 5
          }
        },
        {
          type: "long_text",
          label: "Your Review",
          category: "Basic Fields",
          order: 2,
          required: true,
          placeholder: "Tell us what you liked and didn't like...",
          attributes: {
            maxLength: 2000,
            rows: 5,
            minLength: 50
          }
        },
        {
          type: "radio",
          label: "Would you recommend this product?",
          category: "Choices",
          order: 3,
          required: true,
          attributes: {
            options: ["Yes, definitely", "Maybe", "No"],
            layout: "horizontal"
          }
        },
        {
          type: "checkbox",
          label: "What features did you use the most?",
          category: "Choices",
          order: 4,
          required: true,
          attributes: {
            options: [
              "Heart Rate Monitor",
              "GPS Tracking",
              "Sleep Tracking",
              "Notifications",
              "Music Control",
              "Water Resistance"
            ],
            minSelected: 1,
            maxSelected: 6
          }
        },
        {
          type: "image_upload",
          label: "Share photos of your product",
          category: "Uploads",
          order: 5,
          required: false,
          helpText: "Show others how you use your SmartWatch",
          attributes: {
            maxSizeMB: 10,
            multiple: true,
            compression: true
          }
        },
        {
          type: "nps",
          label: "How likely are you to recommend this product to a friend?",
          category: "Feedback",
          order: 6,
          required: true,
          attributes: {
            scale: 10
          }
        }
      ]
    }
  },

  // ==================== 9. QUIZ - SCIENCE ====================
  {
    title: "Science Quiz - Human Body",
    description: "Test your knowledge about the human body",
    userId,
    status: "PUBLISHED",
    isPublished: true,
    settings: {
      shuffleQuestions: true,
      timeLimit: 600, // 10 minutes
      showResults: true,
      passingScore: 70
    },
    theme: {
      primaryColor: "#16A34A",
      backgroundColor: "#F0FDF4"
    },
    fields: {
      create: [
        {
          type: "multiple_choice_quiz",
          label: "What is the largest organ in the human body?",
          category: "Quiz & Assessment",
          order: 0,
          required: true,
          attributes: {
            options: ["Heart", "Liver", "Skin", "Brain"],
            correctAnswer: "Skin",
            points: 10,
            feedback: {
              correct: "Correct! The skin is the largest organ, covering about 20 square feet.",
              incorrect: "The skin is actually the largest organ in the human body."
            },
            shuffleOptions: true
          }
        },
        {
          type: "true_false",
          label: "The human body has 206 bones",
          category: "Quiz & Assessment",
          order: 1,
          required: true,
          attributes: {
            correctAnswer: true,
            points: 5,
            feedback: {
              correct: "Correct! An adult human typically has 206 bones.",
              incorrect: "Actually, an adult human does have 206 bones."
            }
          }
        },
        {
          type: "multiple_choice_quiz",
          label: "How many chambers does the human heart have?",
          category: "Quiz & Assessment",
          order: 2,
          required: true,
          attributes: {
            options: ["2", "3", "4", "6"],
            correctAnswer: "4",
            points: 10,
            feedback: {
              correct: "Correct! The heart has 4 chambers: 2 atria and 2 ventricles.",
              incorrect: "The human heart has 4 chambers: left atrium, right atrium, left ventricle, and right ventricle."
            },
            shuffleOptions: true
          }
        },
        {
          type: "fill_blank",
          label: "The powerhouse of the cell is the __________",
          category: "Quiz & Assessment",
          order: 3,
          required: true,
          attributes: {
            correctAnswer: "mitochondria",
            points: 5,
            caseSensitive: false,
            acceptMultiple: ["mitochondria", "mitochondrion"]
          }
        },
        {
          type: "matching",
          label: "Match the body part to its function",
          category: "Quiz & Assessment",
          order: 4,
          required: true,
          attributes: {
            leftOptions: ["Heart", "Lungs", "Kidneys", "Stomach"],
            rightOptions: ["Filter blood", "Pump blood", "Digest food", "Exchange gases"],
            correctPairs: {
              "Heart": "Pump blood",
              "Lungs": "Exchange gases",
              "Kidneys": "Filter blood",
              "Stomach": "Digest food"
            },
            points: 20
          }
        }
      ]
    }
  },

  // ==================== 10. SURVEY - REMOTE WORK ====================
  {
    title: "Remote Work Experience Survey",
    description: "Help us understand your remote work preferences and challenges",
    userId,
    status: "PUBLISHED",
    isPublished: true,
    settings: {
      anonymous: true,
      showProgressBar: true
    },
    theme: {
      primaryColor: "#0EA5E9",
      backgroundColor: "#F0F9FF"
    },
    fields: {
      create: [
        {
          type: "radio",
          label: "How many days per week do you prefer to work remotely?",
          category: "Choices",
          order: 0,
          required: true,
          attributes: {
            options: ["0 days (Office only)", "1-2 days", "3-4 days", "5 days (Full remote)"],
            layout: "vertical"
          }
        },
        {
          type: "checkbox",
          label: "What are your biggest challenges with remote work?",
          category: "Choices",
          order: 1,
          required: true,
          attributes: {
            options: [
              "Communication with team",
              "Work-life balance",
              "Internet connectivity",
              "Lack of proper equipment",
              "Isolation",
              "Time zone differences",
              "Distractions at home"
            ],
            minSelected: 1,
            maxSelected: 4
          }
        },
        {
          type: "slider",
          label: "How productive are you when working remotely? (1-10)",
          category: "Feedback",
          order: 2,
          required: true,
          attributes: {
            min: 1,
            max: 10,
            step: 1,
            showValue: true
          }
        },
        {
          type: "rating",
          label: "How would you rate your work-life balance?",
          category: "Feedback",
          order: 3,
          required: true,
          attributes: {
            maxStars: 5,
            allowHalf: true
          }
        },
        {
          type: "multi_select",
          label: "What tools do you use for remote collaboration?",
          category: "Choices",
          order: 4,
          required: true,
          attributes: {
            options: [
              "Zoom",
              "Microsoft Teams",
              "Slack",
              "Google Meet",
              "Discord",
              "Trello",
              "Asana",
              "Notion",
              "GitHub"
            ],
            searchable: true,
            minSelected: 2,
            maxSelected: 6
          }
        },
        {
          type: "long_text",
          label: "What would improve your remote work experience?",
          category: "Basic Fields",
          order: 5,
          required: false,
          placeholder: "Share your suggestions for improving remote work...",
          attributes: {
            maxLength: 500,
            rows: 3
          }
        },
        {
          type: "feedback_survey",
          label: "How satisfied are you with the current remote work policy?",
          category: "Data Collection",
          order: 6,
          required: true,
          attributes: {
            ratingScale: 5,
            commentRequired: true,
            anonymous: true
          }
        }
      ]
    }
  }
];

const main = async() => {
    try{
        console.log("Seeding Forms...");
        for(const form of Forms) {
            await prisma.form.create({
                data: form,
            })
            console.log(`Created Form: ${form.title}`);
        }

        const publishedForms = await prisma.form.findMany({
            where: {isPublished: true}
        });

        for(const form of publishedForms) {
            const slug = form.title.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
            + '-'
            + Math.random().toString(36).substring(2, 8);

            await prisma.formShareLink.create({
                data: {
                    formId: form.id,
                    slug: slug
                }
            });
            console.log(`Created Share Link: /form/${slug}`);
        }
        
        console.log("Form seeds created Successfully");

    } catch(err){
        console.error(err);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});