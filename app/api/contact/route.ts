import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, company, budget, details } = await request.json();

    // Lazy init — env var only available at runtime, not build time
    const resend = new Resend(process.env.RESEND_API_KEY);

    if (!name || !email || !details) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Luis Carrasco Films <onboarding@resend.dev>",
      to: "luisalejandrocarrascosaa@gmail.com",
      replyTo: email,
      subject: `New Inquiry — ${name}${company ? ` (${company})` : ""}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; color: #111;">
          <h2 style="font-weight: 300; font-size: 24px; margin-bottom: 24px;">
            New Project Inquiry
          </h2>
          <table style="width:100%; border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0; color:#666; width:140px;">Name</td>
              <td style="padding:8px 0; font-weight:500;">${name}</td>
            </tr>
            <tr>
              <td style="padding:8px 0; color:#666;">Email</td>
              <td style="padding:8px 0;"><a href="mailto:${email}" style="color:#111;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding:8px 0; color:#666;">Company / Brand</td>
              <td style="padding:8px 0;">${company || "—"}</td>
            </tr>
            <tr>
              <td style="padding:8px 0; color:#666;">Budget</td>
              <td style="padding:8px 0;">${budget || "—"}</td>
            </tr>
          </table>
          <hr style="border:none; border-top:1px solid #eee; margin:20px 0;" />
          <p style="color:#666; margin-bottom:8px;">Project Details</p>
          <p style="line-height:1.6; white-space:pre-wrap;">${details}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
