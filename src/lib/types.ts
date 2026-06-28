export type ScanType = "url" | "phone" | "email" | "sms" | "wifi" | "contact" | "location" | "text" | "product" | "other";

export interface ScanRecord {
  id: string; // uuid
  content: string;
  type: ScanType;
  rawData: string;
  timestamp: number;
  isFavorite: boolean;
  source: "camera" | "image" | "generated";
}

export interface AppSettings {
  theme: "light" | "dark" | "system";
  animationSpeed: "reduced" | "normal" | "fast";
  scannerSound: boolean;
  scannerVibration: boolean;
  accentColor: string;
}
