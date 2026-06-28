import { PageTransition } from '@/components/layout/PageTransition';
import { useState } from 'react';
import { useScanHistory } from '@/hooks/useScanHistory';
import { Trash2, Search, Star, Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export function History() {
  const { history, deleteScan, clearHistory, toggleFavorite } = useScanHistory();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');

  const filteredHistory = history.filter(scan => {
    if (filter === 'favorites' && !scan.isFavorite) return false;
    if (search && !scan.content.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <PageTransition className="max-w-md mx-auto space-y-6">
      <header className="pt-4 space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">History</h1>
            <p className="text-muted-foreground mt-1 font-medium">Your past scans.</p>
          </div>
          {history.length > 0 && (
            <Button variant="ghost" size="sm" onClick={() => {
              if (confirm('Clear all history?')) clearHistory();
            }} className="text-destructive">
              Clear All
            </Button>
          )}
        </div>
        
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search scans..." 
              className="glass-input pl-9"
            />
          </div>
          <Button 
            variant={filter === 'favorites' ? 'default' : 'outline'} 
            size="icon"
            onClick={() => setFilter(f => f === 'all' ? 'favorites' : 'all')}
          >
            <Star className={`w-4 h-4 ${filter === 'favorites' ? 'fill-current text-yellow-400' : ''}`} />
          </Button>
        </div>
      </header>

      <div className="space-y-3">
        {filteredHistory.length === 0 ? (
          <div className="glass-panel p-10 text-center rounded-2xl">
            <p className="text-muted-foreground font-medium">No records found.</p>
          </div>
        ) : (
          filteredHistory.map(scan => (
            <div key={scan.id} className="glass-panel p-4 rounded-xl flex items-center justify-between group">
              <div className="overflow-hidden flex-1 mr-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="font-bold text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase tracking-wider w-fit">
                    {scan.type}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(scan.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="font-medium truncate">{scan.content}</div>
              </div>
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => toggleFavorite(scan.id)}
                  className="text-muted-foreground"
                >
                  <Star className={`w-4 h-4 ${scan.isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-muted-foreground hover:text-destructive" 
                  onClick={() => {
                    deleteScan(scan.id);
                    toast('Scan deleted', {
                      action: { label: 'Undo', onClick: () => console.log('undo') }
                    });
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </PageTransition>
  );
}
