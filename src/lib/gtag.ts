export const GA_TRACKING_ID = "G-9LTN2RYHPG";

// Google Sheets Web App URL
export const GOOGLE_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxKaEFT5mxUSmAc80-eF7j9WH0lZi9VB4YF5DcZlPwiZVAV9qXnMIAG9-H9u6I6yzPhgA/exec";

// Generate a simple session ID for tracking
const getSessionId = () => {
  if (typeof window === "undefined") return "";

  let sessionId = sessionStorage.getItem("session_id");
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem("session_id", sessionId);
  }
  return sessionId;
};

// Send event to Google Sheets
const sendToGoogleSheets = async ({
  action,
  category,
  label,
}: {
  action: string;
  category: string;
  label?: string;
}) => {
  if (!GOOGLE_SHEETS_WEBHOOK_URL || typeof window === "undefined") return;

  try {
    const payload = {
      action,
      category,
      label: label || "",
      page_url: window.location.href,
      user_agent: navigator.userAgent,
      session_id: getSessionId(),
    };

    // Use fetch with no-cors mode for cross-origin requests to Apps Script
    await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    // Silently fail - don't break the app if sheets logging fails
    console.warn("Failed to log to Google Sheets:", error);
  }
};

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }

  // Also log to Google Sheets
  sendToGoogleSheets({
    action: "pageview",
    category: "navigation",
    label: url,
  });
};

// Track custom events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  // Send to Google Analytics
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }

  // Also send to Google Sheets
  sendToGoogleSheets({
    action,
    category,
    label,
  });
};

// Declare gtag on window
declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js",
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}
