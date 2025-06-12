"use server"

import { z } from "zod"

const ContactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function submitContactForm(
  prevState: { success: boolean; message: string; errors?: Record<string, string[] | undefined> },
  formData: FormData
) {
  // Validate form data
  const validatedFields = ContactFormSchema.safeParse({
    firstName: formData.get("first-name"),
    lastName: formData.get("last-name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  })

  // Return early if form validation fails
  if (!validatedFields.success) {
    return {
      success: false,
      message: "Please check the form for errors",
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Process the form data
  try {
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Here you would typically:
    // - Send an email notification
    // - Save to database
    // - Integrate with CRM
    // - Send auto-response email

    console.log("Contact form submission:", validatedFields.data)

    return {
      success: true,
      message: "Thank you for your message! We'll be in touch within 24 hours.",
    }
  } catch (error) {
    console.error("Contact form error:", error)
    return {
      success: false,
      message: "There was an error submitting your message. Please try again or contact us directly.",
    }
  }
}
