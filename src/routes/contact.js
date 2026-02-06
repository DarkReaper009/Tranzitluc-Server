import { Router } from "express";
import nodemailer from "nodemailer";
import {
  adminEmailTemplate,
  userEmailTemplate,
  getPhysicalLogoPath,
} from "../utils/emailTemplates.js";
import { validateEmail } from "../utils/emailValidator.js";
import { contactLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post("/", contactLimiter, async (req, res) => {
  const {
    departure_city,
    destination_city,
    total_weight,
    phone,
    email,
    message,
  } = req.body;

  // 1. Validate data
  if (
    !departure_city ||
    !destination_city ||
    !total_weight ||
    !phone ||
    !email ||
    !message
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const emailValidation = await validateEmail(email);
  if (!emailValidation.valid) {
    return res.status(400).json({ error: emailValidation.reason });
  }

  // 2. Configure Nodemailer Transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 3. Configure email options (Admin & User)
  const adminMailOptions = {
    from: `"Formular Contact" <noreply@tranzitluc.ro>`,
    to: process.env.EMAIL_USER,
    subject: `New Contact Form Submission from ${email}`,
    html: adminEmailTemplate(
      departure_city,
      destination_city,
      total_weight,
      phone,
      email,
      message,
    ),
    attachments: [
      {
        filename: "main_logo.png",
        path: getPhysicalLogoPath(),
        cid: "main_logo",
      },
    ],
  };

  const userMailOptions = {
    from: `"Tranzitluc Support" <support@tranzitluc.ro>`,
    to: email,
    subject: "We received your message!",
    html: userEmailTemplate(email),
    attachments: [
      {
        filename: "main_logo.png",
        path: getPhysicalLogoPath(),
        cid: "main_logo",
      },
    ],
  };

  // 4. Send Emails
  try {
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    res.status(200).json({ success: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ error: "Failed to send message." });
  }
});

export default router;
