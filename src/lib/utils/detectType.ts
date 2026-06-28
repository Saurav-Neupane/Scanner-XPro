import { ScanType } from '@/lib/types';

export function detectType(content: string): ScanType {
  const c = content.trim().toLowerCase();
  
  if (c.startsWith('http://') || c.startsWith('https://') || c.startsWith('www.')) {
    return 'url';
  }
  if (c.startsWith('mailto:')) {
    return 'email';
  }
  if (c.startsWith('tel:')) {
    return 'phone';
  }
  if (c.startsWith('smsto:') || c.startsWith('sms:')) {
    return 'sms';
  }
  if (c.startsWith('wifi:')) {
    return 'wifi';
  }
  if (c.startsWith('begin:vcard') || c.startsWith('mecard:')) {
    return 'contact';
  }
  if (c.startsWith('geo:')) {
    return 'location';
  }
  
  // Basic barcode numeric check (UPC, EAN typically 8, 12, 13, 14 digits)
  if (/^\d{8,14}$/.test(c)) {
    return 'product';
  }
  
  return 'text';
}
