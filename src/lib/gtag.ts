export const GA_TRACKING_ID = "G-T4WL3EMP7W";

// Google Sheets Web App URL
export const GOOGLE_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxKaEFT5mxUSmAc80-eF7j9WH0lZi9VB4YF5DcZlPwiZVAV9qXnMIAG9-H9u6I6yzPhgA/exec";

// Send event to Google Sheets ONLY (for LinksPage)
export const sendToSheets = async (eventName: string) => {
  if (!GOOGLE_SHEETS_WEBHOOK_URL || typeof window === "undefined") return;

  try {
    const payload = {
      date: new Date().toLocaleDateString("de-DE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      event: eventName,
    };

    await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.warn("Failed to log to Google Sheets:", error);
  }
};

// Track page views (Google Analytics only)
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track custom events (Google Analytics only)
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
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
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
