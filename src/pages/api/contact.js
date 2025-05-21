import { client } from '@/lib/sanity';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, phone, email, message } = req.body;

  if (!name || !phone || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Create a new document in Sanity
    const doc = {
      _type: 'contactForm',
      name,
      phone,
      email,
      message,
      submittedAt: new Date().toISOString(),
    };

    await client.create(doc);

    return res.status(200).json({ message: 'Form submission successful' });
  } catch (error) {
    console.error('Sanity form submission error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
