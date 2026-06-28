import { useLocalStorage } from './useLocalStorage';
import { AppSettings } from '@/lib/types';
import { useEffect } from 'react';

const defaultSettings: AppSettings = {
  theme: 'system',
  animationSpeed: 'normal',
  scannerSound: true,
  scannerVibration: true,
  accentColor: '#2563EB'
};

export function useSettings() {
  const [settings, setSettings] = useLocalStorage<AppSettings>('scanx_settings', defaultSettings);

  const updateSettings = (updates: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (settings.theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(settings.theme);
    }
  }, [settings.theme]);

  return { settings, updateSettings };
}
