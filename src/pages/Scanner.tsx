import { PageTransition } from '@/components/layout/PageTransition';
import { Html5Qrcode } from 'html5-qrcode';
import { useEffect, useRef, useState } from 'react';
import { useScanHistory } from '@/hooks/useScanHistory';
import { detectType } from '@/lib/utils/detectType';
import { toast } from 'sonner';
import { Camera, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Scanner() {
  const [isScanning, setIsScanning] = useState(false);
  const { addScan } = useScanHistory();
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    scannerRef.current = new Html5Qrcode("reader");
    
    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, []);

  const startScanner = async () => {
    try {
      if (!scannerRef.current) return;
      
      setIsScanning(true);
      await scannerRef.current.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          if (scannerRef.current?.isScanning) {
            scannerRef.current.pause();
            
            const type = detectType(decodedText);
            addScan({
              content: decodedText,
              type,
              rawData: decodedText,
              source: "camera"
            });
            
            toast.success("Scanned successfully!");
            // In a full implementation, we would show a result card here instead of just a toast
            setTimeout(() => {
              scannerRef.current?.resume();
            }, 3000);
          }
        },
        () => {
          // Ignore parse errors (they happen every frame when no QR is in view)
        }
      );
    } catch (err) {
      console.error(err);
      toast.error("Could not start camera");
      setIsScanning(false);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current?.isScanning) {
      await scannerRef.current.stop();
      setIsScanning(false);
    }
  };

  return (
    <PageTransition className="flex flex-col items-center justify-center p-0">
      <div className="absolute inset-0 bg-black z-0" />
      
      <div className="relative z-10 w-full h-[60vh] max-w-md mx-auto overflow-hidden rounded-b-3xl shadow-2xl bg-black flex items-center justify-center">
        <div id="reader" className="w-full h-full" />
        
        {isScanning && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px]">
              <div className="absolute inset-0 border-2 border-primary/30 rounded-2xl" />
              <div className="w-full h-0.5 bg-primary shadow-[0_0_8px_2px_theme('colors.primary.DEFAULT')] animate-sweep" />
              
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl" />
            </div>
          </div>
        )}
      </div>

      <div className="relative z-10 p-8 w-full max-w-md mx-auto text-center space-y-6">
        <h2 className="text-2xl font-bold">Scan QR & Barcode</h2>
        <p className="text-muted-foreground text-sm">
          Point your camera at a QR code or barcode to scan it automatically.
        </p>
        
        <div className="flex justify-center mt-8">
          {!isScanning ? (
            <Button 
              size="lg" 
              className="rounded-full w-20 h-20 shadow-lg bg-gradient-to-tr from-primary to-secondary"
              onClick={startScanner}
            >
              <Camera className="w-8 h-8 text-white" />
            </Button>
          ) : (
            <Button 
              size="lg" 
              variant="destructive"
              className="rounded-full w-20 h-20 shadow-lg"
              onClick={stopScanner}
            >
              <X className="w-8 h-8" />
            </Button>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
