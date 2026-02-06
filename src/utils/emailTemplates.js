import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getTemplate = (templateName) => {
  const templatePath = path.join(__dirname, "../templates", templateName);
  return fs.readFileSync(templatePath, "utf8");
};

export const getPhysicalLogoPath = () => {
  return path.join(__dirname, "../assets/images", "main_logo.png");
};

export const adminEmailTemplate = (
  departure_city,
  destination_city,
  total_weight,
  phone,
  email,
  message,
) => {
  let template = getTemplate("adminEmail.html");
  template = template.replace(/{{departure_city}}/g, departure_city);
  template = template.replace(/{{destination_city}}/g, destination_city);
  template = template.replace(/{{total_weight}}/g, total_weight);
  template = template.replace(/{{phone}}/g, phone);
  template = template.replace(/{{email}}/g, email);
  template = template.replace(/{{message}}/g, message.replace(/\n/g, "<br>"));
  template = template.replace(/{{logo}}/g, "cid:main_logo");
  return template;
};

export const userEmailTemplate = (email) => {
  let template = getTemplate("userEmail.html");
  template = template.replace(/{{email}}/g, email);
  template = template.replace(/{{year}}/g, new Date().getFullYear());
  template = template.replace(/{{logo}}/g, "cid:main_logo");
  return template;
};