import dns from "dns";
import { promisify } from "util";
import { disposableDomains } from "./disposableDomains.js";

const resolveMx = promisify(dns.resolveMx);
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = async (email) => {
  if (!email) {
    return { valid: false, reason: "Email is required." };
  }

  if (!emailRegex.test(email)) {
    return { valid: false, reason: "Invalid email format." };
  }

  const domain = email.split("@")[1].toLowerCase();

  if (disposableDomains.includes(domain)) {
    return {
      valid: false,
      reason: "Disposable email addresses are not allowed.",
    };
  }

  try {
    const addresses = await resolveMx(domain);
    if (!addresses || addresses.length === 0) {
      return {
        valid: false,
        reason: "Invalid email domain (no MX records found).",
      };
    }
  } catch (error) {
    return {
      valid: false,
      reason: "Invalid email domain (DNS lookup failed).",
    };
  }

  return { valid: true };
};
