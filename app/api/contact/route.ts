import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        const apiKey = process.env.MAILJET_API_KEY;
        const secretKey = process.env.MAILJET_SECRET_KEY;

        if (!apiKey || !secretKey) {
            console.error("Mailjet credentials not configured");
            return NextResponse.json(
                { error: "Email service not configured" },
                { status: 500 }
            );
        }

        const response = await fetch("https://api.mailjet.com/v3.1/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${Buffer.from(`${apiKey}:${secretKey}`).toString("base64")}`,
            },
            body: JSON.stringify({
                Messages: [
                    // Email to you (notification)
                    {
                        From: {
                            Email: "solankibhavik9112@gmail.com",
                            Name: "Portfolio Contact Form",
                        },
                        To: [
                            {
                                Email: "solankibhavik92@gmail.com",
                                Name: "Bhavik",
                            },
                        ],
                        Subject: `New Contact Form Message from ${name}`,
                        TextPart: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
                        HTMLPart: `
              <h3>New Contact Form Submission</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, "<br>")}</p>
            `,
                        ReplyTo: {
                            Email: email,
                            Name: name,
                        },
                    },
                    // Thank you email to the sender
                    {
                        From: {
                            Email: "solankibhavik9112@gmail.com",
                            Name: "Bhavik Solanki",
                        },
                        To: [
                            {
                                Email: email,
                                Name: name,
                            },
                        ],
                        Subject: "Thank You for Reaching Out! 🙏",
                        TextPart: `Hi ${name},\n\nThank you so much for taking the time to reach out to me! I truly appreciate your effort in contacting me.\n\nI have received your message and will get back to you as soon as possible.\n\nHere's a copy of your message:\n"${message}"\n\nBest regards,\nBhavik Solanki`,
                        HTMLPart: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #e8390d;">Thank You for Reaching Out! 🙏</h2>
                <p>Hi <strong>${name}</strong>,</p>
                <p>Thank you so much for taking the time to reach out to me! I truly appreciate your effort in contacting me.</p>
                <p>I have received your message and will get back to you as soon as possible.</p>
                <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 0; color: #666;"><strong>Your message:</strong></p>
                  <p style="margin: 10px 0 0 0; color: #333;">"${message.replace(/\n/g, "<br>")}"</p>
                </div>
                <p>Best regards,<br><strong>Bhavik Solanki</strong></p>
              </div>
            `,
                    },
                ],
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Mailjet API Error:", data);
            return NextResponse.json(
                { error: "Failed to send email" },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, message: "Email sent successfully" });
    } catch (error) {
        console.error("Contact API Error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
