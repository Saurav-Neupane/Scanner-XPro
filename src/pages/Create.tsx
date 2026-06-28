import { PageTransition } from '@/components/layout/PageTransition';
import { useState, useRef, useEffect } from 'react';
import { generateQRToCanvas } from '@/lib/utils/qrGenerator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Download, Copy, Share2 } from 'lucide-react';
import { useScanHistory } from '@/hooks/useScanHistory';
import { detectType } from '@/lib/utils/detectType';

export function Create() {
  const [content, setContent] = useState('');
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { addScan } = useScanHistory();

  useEffect(() => {
    if (canvasRef.current) {
      generateQRToCanvas(canvasRef.current, content, {
        size,
        fgColor,
        bgColor,
        errorCorrectionLevel: 'M'
      });
    }
  }, [content, size, fgColor, bgColor]);

  const handleDownload = () => {
    if (!content) return;
    const url = canvasRef.current?.toDataURL('image/png');
    if (url) {
      const a = document.createElement('a');
      a.href = url;
      a.download = 'scanx-qr.png';
      a.click();
      
      addScan({
        content,
        type: detectType(content),
        rawData: content,
        source: 'generated'
      });
      toast.success('QR Code saved');
    }
  };

  const handleCopy = () => {
    if (!content) return;
    canvasRef.current?.toBlob((blob) => {
      if (blob) {
        navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]).then(() => {
          toast.success('Image copied to clipboard');
        }).catch(() => {
          toast.error('Failed to copy image');
        });
      }
    });
  };

  return (
    <PageTransition className="max-w-md mx-auto space-y-6">
      <header className="pt-4">
        <h1 className="text-3xl font-extrabold tracking-tight">Create</h1>
        <p className="text-muted-foreground mt-1 font-medium">Generate custom QR codes offline.</p>
      </header>

      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Content</label>
          <Input 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter text or URL..."
            className="glass-input"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Foreground</label>
            <div className="flex items-center gap-2">
              <input type="color" value={fgColor} onChange={e => setFgColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer" />
              <span className="text-sm text-muted-foreground">{fgColor}</span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Background</label>
            <div className="flex items-center gap-2">
              <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer" />
              <span className="text-sm text-muted-foreground">{bgColor}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center py-6">
          <div className="p-2 bg-white rounded-xl shadow-sm">
            <canvas ref={canvasRef} width={size} height={size} className="w-48 h-48" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button onClick={handleDownload} disabled={!content} className="w-full" variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button onClick={handleCopy} disabled={!content} className="w-full" variant="outline">
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
          <Button onClick={() => {
            if (navigator.share && content) {
              navigator.share({ title: 'QR Code', text: content });
            } else {
              toast.error('Sharing not supported');
            }
          }} disabled={!content} className="w-full" variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
    </PageTransition>
  );
}
