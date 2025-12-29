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
                    {
                        From: {
                            Email: "solankibhavik9112@gmail.com",
                            Name: "Portfolio Contact Form",
                        },
                        To: [
                            {
                                Email: "solankibhavik92@gmail.com", // Replace with your email to receive messages
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
