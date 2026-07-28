import dotenv from "dotenv";

dotenv.config();

function normalizeKhaltiBaseUrl(value) {
  const baseUrl = (value || "https://dev.khalti.com/api/v2").trim().replace(/\/+$/, "");

  if (baseUrl.endsWith("/api/v2")) {
    return baseUrl;
  }

  return `${baseUrl}/api/v2`;
}

export const env = {
  port: process.env.PORT || 5000,
  frontendOrigins: (process.env.FRONTEND_ORIGIN || "http://localhost:3000,http://localhost:3001")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  khalti: {
    secretKey: process.env.KHALTI_SECRET_KEY || "",
    baseUrl: normalizeKhaltiBaseUrl(process.env.KHALTI_BASE_URL),
    returnUrl: process.env.KHALTI_RETURN_URL || "http://localhost:3000/payment/khalti",
    websiteUrl: process.env.KHALTI_WEBSITE_URL || "http://localhost:3000",
  },
};
