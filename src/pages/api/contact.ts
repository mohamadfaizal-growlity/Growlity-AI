import type { APIRoute } from 'astro';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';

const prisma = new PrismaClient();
const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    // Basic validation
    if (!data.name || data.name.trim().length < 3 || !data.email || !data.company || data.company.trim().length < 1) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const entry = await prisma.contactEntry.create({
      data: {
        name: data.name,
        email: data.email,
        company: data.company,
        role: data.role || null
      }
    });

    // Send Email Notification via Resend
    try {
      const { data: emailData, error: emailError } = await resend.emails.send({
        from: import.meta.env.MAIL_EMAIL, // Now using verified growlity.com domain
        to: import.meta.env.ADMIN_EMAIL,
        subject: `New Demo Request: ${data.name}`,
        html: `
          <h2>New Demo Request</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Company:</strong> ${data.company}</p>
          <p><strong>Phone/Role:</strong> ${data.role || 'N/A'}</p>
          <hr>
          <p><em>This entry has also been saved to the secure admin database.</em></p>
        `,
      });

      if (emailError) {
        console.error("Resend API Error:", emailError);
      }
    } catch (err) {
      console.error("Failed to send notification email:", err);
      // Proceed returning success since DB save was successful
    }

    return new Response(JSON.stringify({ success: true, entry }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error("Error creating contact entry:", error);
    return new Response(JSON.stringify({ error: "Failed to process request" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
