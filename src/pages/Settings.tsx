import { PageTransition } from '@/components/layout/PageTransition';
import { useSettings } from '@/hooks/useSettings';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useScanHistory } from '@/hooks/useScanHistory';
import { toast } from 'sonner';

export function Settings() {
  const { settings, updateSettings } = useSettings();
  const { history, setHistory } = useScanHistory();

  const handleExport = () => {
    const dataStr = JSON.stringify(history);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'scanx-backup.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    toast.success('Data exported successfully');
  };

  return (
    <PageTransition className="max-w-md mx-auto space-y-6">
      <header className="pt-4">
        <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1 font-medium">Customize your experience.</p>
      </header>

      <div className="space-y-4">
        <div className="glass-panel p-5 rounded-2xl space-y-5">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Appearance</h3>
          
          <div className="flex justify-between items-center">
            <span className="font-medium">Theme</span>
            <select 
              className="glass-input px-3 py-1.5 rounded-lg text-sm bg-transparent"
              value={settings.theme}
              onChange={(e) => updateSettings({ theme: e.target.value as any })}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-medium">Animation Speed</span>
            <select 
              className="glass-input px-3 py-1.5 rounded-lg text-sm bg-transparent"
              value={settings.animationSpeed}
              onChange={(e) => updateSettings({ animationSpeed: e.target.value as any })}
            >
              <option value="reduced">Reduced</option>
              <option value="normal">Normal</option>
              <option value="fast">Fast</option>
            </select>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-5">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Scanner</h3>
          
          <div className="flex justify-between items-center">
            <span className="font-medium">Scanner Sound</span>
            <Switch 
              checked={settings.scannerSound}
              onCheckedChange={(c) => updateSettings({ scannerSound: c })}
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="font-medium">Haptic Feedback</span>
            <Switch 
              checked={settings.scannerVibration}
              onCheckedChange={(c) => updateSettings({ scannerVibration: c })}
            />
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-5">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Data</h3>
          
          <Button variant="outline" className="w-full justify-start" onClick={handleExport}>
            Export Data Backup
          </Button>
          
          <div className="text-xs text-muted-foreground text-center">
            <p>ScanX Pro stores all data locally on your device.</p>
            <p className="mt-1">Version 1.0.0</p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
