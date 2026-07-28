import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import nodemailer from 'nodemailer';
import { Readable } from 'stream';

const s3Client = new S3Client({
  region: process.env.SPACES_REGION,
  endpoint: process.env.SPACES_ENDPOINT,
  credentials: {
    accessKeyId: process.env.SPACES_ACCESS_KEY!,
    secretAccessKey: process.env.SPACES_SECRET_KEY!,
  },
});

const BUCKET = process.env.SPACES_BUCKET!;
const FOLDER = process.env.UPLOAD_FOLDER || 'placewell-careers';

function bufferToStream(buffer: Buffer) {
  const readable = new Readable();
  readable._read = () => {};
  readable.push(buffer);
  readable.push(null);
  return readable;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const position = formData.get('position') as string;
    const experience = formData.get('experience') as string;
    const cv = formData.get('cv') as File;

    if (!name || !email || !phone || !position || !experience || !cv) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(cv.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload PDF, DOC, or DOCX files only.' },
        { status: 400 }
      );
    }

    // Validate file size (10MB max)
    if (cv.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // Upload CV to Digital Ocean Spaces
    const timestamp = Date.now();
    const sanitizedName = name.replace(/[^a-zA-Z0-9]/g, '_');
    const fileExtension = cv.name.split('.').pop() || 'pdf';
    const fileName = `${FOLDER}/cv/${sanitizedName}_${timestamp}.${fileExtension}`;

    const arrayBuffer = await cv.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await s3Client.send(new PutObjectCommand({
      Bucket: BUCKET,
      Key: fileName,
      Body: bufferToStream(buffer),
      ContentType: cv.type,
      ACL: 'private',
    }));

    const cvUrl = `${process.env.SPACES_ENDPOINT}/${BUCKET}/${fileName}`;

    // Send email with CV link
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #14181D; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0E6F66 0%, #0A5A52 100%); padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 700;">New CV Submission</h1>
            <p style="color: #D8EFEB; margin: 8px 0 0 0; font-size: 14px;">Placewell Careers - Career Application</p>
          </div>
          <div style="background: #FAF8F4; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #E6E2DB; border-top: none;">
            <div style="background: white; padding: 24px; border-radius: 8px; border: 1px solid #E6E2DB; margin-bottom: 20px;">
              <h2 style="color: #0E6F66; margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">Candidate Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #3B434C; font-weight: 500; width: 140px;">Name:</td>
                  <td style="padding: 8px 0; color: #14181D; font-weight: 500;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #3B434C; font-weight: 500;">Email:</td>
                  <td style="padding: 8px 0; color: #14181D; font-weight: 500;"><a href="mailto:${email}" style="color: #0E6F66; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #3B434C; font-weight: 500;">Phone:</td>
                  <td style="padding: 8px 0; color: #14181D; font-weight: 500;"><a href="tel:${phone}" style="color: #0E6F66; text-decoration: none;">${phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #3B434C; font-weight: 500;">Position:</td>
                  <td style="padding: 8px 0; color: #14181D; font-weight: 500;">${position}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #3B434C; font-weight: 500;">Experience:</td>
                  <td style="padding: 8px 0; color: #14181D; font-weight: 500;">${experience}</td>
                </tr>
              </table>
            </div>

            <div style="background: white; padding: 24px; border-radius: 8px; border: 1px solid #E6E2DB; margin-bottom: 20px;">
              <h2 style="color: #0E6F66; margin: 0 0 12px 0; font-size: 18px; font-weight: 600;">CV Document</h2>
              <p style="margin: 0 0 16px 0; color: #22282F;">The candidate's CV has been uploaded to secure storage.</p>
              <a href="${cvUrl}" style="display: inline-block; background: #0E6F66; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500;">Download CV</a>
              <p style="margin: 12px 0 0 0; font-size: 12px; color: #5E6670;">Link expires in 7 days. File: ${cv.name} (${(cv.size / 1024).toFixed(1)} KB)</p>
            </div>

            <div style="margin-top: 24px; padding: 16px; background: #E8F4F1; border-radius: 8px; border: 1px solid #D8EFEB;">
              <p style="margin: 0; font-size: 12px; color: #0A5A52;">
                <strong>Reply to:</strong> ${email} | <strong>Phone:</strong> ${phone}
              </p>
            </div>
          </div>
          <p style="text-align: center; color: #5E6670; font-size: 12px; margin-top: 20px;">
            This email was sent from the Placewell Careers career application form.
          </p>
        </body>
      </html>
    `;

    const textContent = `
New CV Submission - Placewell Careers

Name: ${name}
Email: ${email}
Phone: ${phone}
Position: ${position}
Experience: ${experience}

CV Download: ${cvUrl}
File: ${cv.name} (${(cv.size / 1024).toFixed(1)} KB)

---
Reply to: ${email} | Phone: ${phone}
    `.trim();

    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `New CV: ${name} - ${position}`,
      text: textContent,
      html: emailHtml,
      replyTo: email,
    });

    // Send confirmation email to candidate
    const userEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #14181D; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0E6F66 0%, #0A5A52 100%); padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 700;">CV Received!</h1>
            <p style="color: #D8EFEB; margin: 8px 0 0 0; font-size: 14px;">Placewell Careers</p>
          </div>
          <div style="background: #FAF8F4; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #E6E2DB; border-top: none;">
            <p style="color: #22282F; font-size: 16px;">Dear ${name},</p>
            <p style="color: #22282F;">Thank you for submitting your CV for the <strong>${position}</strong> position. We have received your application and our recruitment team will review your profile.</p>
            <p style="color: #22282F;">If your experience matches our current or upcoming requirements, we will reach out to you within <strong>5-7 business days</strong>.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #E6E2DB; margin: 24px 0;">
              <h3 style="color: #0E6F66; margin: 0 0 12px 0; font-size: 16px;">Application Summary</h3>
              <p style="margin: 4px 0; color: #22282F;"><strong>Position:</strong> ${position}</p>
              <p style="margin: 4px 0; color: #22282F;"><strong>Experience:</strong> ${experience}</p>
              <p style="margin: 4px 0; color: #22282F;"><strong>CV:</strong> ${cv.name}</p>
            </div>

            <p style="color: #3B434C; font-size: 14px;">For any queries, you can reach us at:</p>
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
      subject: `Application Received: ${position} - Placewell Careers`,
      html: userEmailHtml,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'CV submitted successfully' 
    });
  } catch (error) {
    console.error('CV upload error:', error);
    return NextResponse.json(
      { error: 'Failed to submit CV. Please try again.' },
      { status: 500 }
    );
  }
}