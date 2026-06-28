import { useLocalStorage } from './useLocalStorage';
import { ScanRecord } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

export function useScanHistory() {
  const [history, setHistory] = useLocalStorage<ScanRecord[]>('scanx_history', []);

  const addScan = (scan: Omit<ScanRecord, 'id' | 'timestamp' | 'isFavorite'>) => {
    const newRecord: ScanRecord = {
      ...scan,
      id: uuidv4(),
      timestamp: Date.now(),
      isFavorite: false
    };
    setHistory((prev) => [newRecord, ...prev]);
    return newRecord;
  };

  const toggleFavorite = (id: string) => {
    setHistory((prev) => 
      prev.map(r => r.id === id ? { ...r, isFavorite: !r.isFavorite } : r)
    );
  };

  const deleteScan = (id: string) => {
    setHistory((prev) => prev.filter(r => r.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return { history, addScan, toggleFavorite, deleteScan, clearHistory, setHistory };
}
