import type { APIRoute } from 'astro';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
