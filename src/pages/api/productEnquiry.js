import { client } from '@/lib/sanity';
import { z } from 'zod';
import sanitizeHtml from 'sanitize-html';

// Define Zod schema for validation
const contactSchema = z.object({
  products: z.string().min(1, "Products is required").max(1000),
  name: z.string().min(1, "Name is required").max(100),
  phone: z.string().min(7, "Phone is required").max(20),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required").max(1000),
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Validate incoming request body using Zod
    const validatedData = contactSchema.parse(req.body);

    // Sanitize message to prevent HTML/script injection
    validatedData.message = sanitizeHtml(validatedData.message, {
      allowedTags: [], // no HTML tags allowed, plain text only
      allowedAttributes: {},
    });

    const doc = {
      _type: 'productEnquiry',
      products: validatedData.products,
      name: validatedData.name,
      phone: validatedData.phone,
      email: validatedData.email,
      message: validatedData.message,
      submittedAt: new Date().toISOString(),
    };

    await client.create(doc);

    return res.status(200).json({ message: 'Form submission successful' });
  } catch (error) {
    if (error.name === 'ZodError') {
      // validation errors from Zod
      return res.status(400).json({ message: 'Validation failed', errors: error.errors });
    }

    console.error('Sanity form submission error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
