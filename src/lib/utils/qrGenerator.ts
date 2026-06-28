import QRCode from 'qrcode';

export interface QROptions {
  size: number;
  fgColor: string;
  bgColor: string;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
}

export const generateQRToCanvas = async (canvas: HTMLCanvasElement, text: string, options: QROptions) => {
  if (!text) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    return;
  }
  
  try {
    await QRCode.toCanvas(canvas, text, {
      width: options.size,
      margin: 2,
      color: {
        dark: options.fgColor,
        light: options.bgColor,
      },
      errorCorrectionLevel: options.errorCorrectionLevel
    });
  } catch (err) {
    console.error("QR Generation error", err);
  }
};
