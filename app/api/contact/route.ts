import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const company = formData.get('company') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const requirement = formData.get('requirement') as string;
    const service = formData.get('service') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !phone || !requirement || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const serviceLabels: Record<string, string> = {
      'rpo': 'Recruitment Process Outsourcing',
      'market-research': 'Market Research',
      'talent-mapping': 'Talent Mapping',
      'leadership': 'Leadership & Strategic Hiring',
      'insights': 'Industry Insights',
    };

    const serviceLabel = serviceLabels[service] || service;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #14181D; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0E6F66 0%, #0A5A52 100%); padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 700;">New Corporate Enquiry</h1>
            <p style="color: #D8EFEB; margin: 8px 0 0 0; font-size: 14px;">Placewell Careers - Contact Form</p>
          </div>
          <div style="background: #FAF8F4; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #E6E2DB; border-top: none;">
            <div style="background: white; padding: 24px; border-radius: 8px; border: 1px solid #E6E2DB; margin-bottom: 20px;">
              <h2 style="color: #0E6F66; margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">Contact Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #3B434C; font-weight: 500; width: 140px;">Name:</td>
                  <td style="padding: 8px 0; color: #14181D; font-weight: 500;">${name}</td>
                </tr>
                ${company ? `
                <tr>
                  <td style="padding: 8px 0; color: #3B434C; font-weight: 500;">Company:</td>
                  <td style="padding: 8px 0; color: #14181D; font-weight: 500;">${company}</td>
                </tr>` : ''}
                <tr>
                  <td style="padding: 8px 0; color: #3B434C; font-weight: 500;">Email:</td>
                  <td style="padding: 8px 0; color: #14181D; font-weight: 500;"><a href="mailto:${email}" style="color: #0E6F66; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #3B434C; font-weight: 500;">Phone:</td>
                  <td style="padding: 8px 0; color: #14181D; font-weight: 500;"><a href="tel:${phone}" style="color: #0E6F66; text-decoration: none;">${phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #3B434C; font-weight: 500;">Service:</td>
                  <td style="padding: 8px 0; color: #14181D; font-weight: 500;">${serviceLabel}</td>
                </tr>
              </table>
            </div>

            <div style="background: white; padding: 24px; border-radius: 8px; border: 1px solid #E6E2DB; margin-bottom: 20px;">
              <h2 style="color: #0E6F66; margin: 0 0 12px 0; font-size: 18px; font-weight: 600;">Hiring Requirement</h2>
              <p style="margin: 0; color: #22282F; white-space: pre-wrap;">${requirement}</p>
            </div>

            <div style="background: white; padding: 24px; border-radius: 8px; border: 1px solid #E6E2DB;">
              <h2 style="color: #0E6F66; margin: 0 0 12px 0; font-size: 18px; font-weight: 600;">Message</h2>
              <p style="margin: 0; color: #22282F; white-space: pre-wrap;">${message}</p>
            </div>

            <div style="margin-top: 24px; padding: 16px; background: #E8F4F1; border-radius: 8px; border: 1px solid #D8EFEB;">
              <p style="margin: 0; font-size: 12px; color: #0A5A52;">
                <strong>Reply to:</strong> ${email} | <strong>Phone:</strong> ${phone}
              </p>
            </div>
          </div>
          <p style="text-align: center; color: #5E6670; font-size: 12px; margin-top: 20px;">
            This email was sent from the Placewell Careers contact form.
          </p>
        </body>
      </html>
    `;

    const textContent = `
New Corporate Enquiry - Placewell Careers

Name: ${name}
${company ? `Company: ${company}\n` : ''}Email: ${email}
Phone: ${phone}
Service: ${serviceLabel}
Requirement: ${requirement}

Message:
${message}

---
Reply to: ${email} | Phone: ${phone}
    `.trim();

    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `New Corporate Enquiry: ${name} - ${serviceLabel}`,
      text: textContent,
      html: emailHtml,
      replyTo: email,
    });

    // Send confirmation email to user
    const userEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #14181D; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0E6F66 0%, #0A5A52 100%); padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 700;">Thank You for Contacting Us!</h1>
            <p style="color: #D8EFEB; margin: 8px 0 0 0; font-size: 14px;">Placewell Careers</p>
          </div>
          <div style="background: #FAF8F4; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #E6E2DB; border-top: none;">
            <p style="color: #22282F; font-size: 16px;">Dear ${name},</p>
            <p style="color: #22282F;">Thank you for reaching out to Placewell Careers. We have received your enquiry regarding <strong>${serviceLabel}</strong> and our team will review your requirements.</p>
            <p style="color: #22282F;">Our recruitment specialists will get back to you within <strong>24 hours</strong> during business hours (Mon-Fri, 9:30 AM - 6:30 PM).</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #E6E2DB; margin: 24px 0;">
              <h3 style="color: #0E6F66; margin: 0 0 12px 0; font-size: 16px;">Your Enquiry Summary</h3>
              <p style="margin: 4px 0; color: #22282F;"><strong>Service:</strong> ${serviceLabel}</p>
              <p style="margin: 4px 0; color: #22282F;"><strong>Requirement:</strong> ${requirement}</p>
            </div>

            <p style="color: #3B434C; font-size: 14px;">For urgent hiring requirements, you can also reach us directly at:</p>
            <p style="color: #0E6F66; font-weight: 500; margin: 8px 0;">📞 +91 98150 87070 | 📧 sandeep.grover@placewellcareers.com</p>
            
            <hr style="border: none; border-top: 1px solid #E6E2DB; margin: 24px 0;">
            <p style="color: #5E6670; font-size: 12px; margin: 0;">Placewell Careers | 39, Anand Shopping Complex, Sector 17 A, Chandigarh</p>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: email,
      subject: `Thank you for contacting Placewell Careers - ${serviceLabel}`,
      html: userEmailHtml,
    });

    return NextResponse.json({ success: true, message: 'Enquiry submitted successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send enquiry. Please try again.' },
      { status: 500 }
    );
  }
}