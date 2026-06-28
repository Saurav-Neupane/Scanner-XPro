import { PageTransition } from '@/components/layout/PageTransition';
import { motion } from 'framer-motion';
import { useScanHistory } from '@/hooks/useScanHistory';
import { Link } from 'wouter';
import { QrCode, Zap, History, Settings2 } from 'lucide-react';

export function Home() {
  const { history } = useScanHistory();
  
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const stats = [
    { label: "Today's Scans", value: history.filter(h => new Date(h.timestamp).toDateString() === new Date().toDateString()).length },
    { label: "Total Scans", value: history.length },
    { label: "Favorites", value: history.filter(h => h.isFavorite).length },
  ];

  return (
    <PageTransition className="max-w-md mx-auto space-y-8">
      {/* Header */}
      <header className="pt-4">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-extrabold tracking-tight"
        >
          {greeting}
        </motion.h1>
        <p className="text-muted-foreground mt-1 font-medium">Welcome to ScanX Pro.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center text-center"
          >
            <span className="text-2xl font-bold text-primary">{stat.value}</span>
            <span className="text-xs text-muted-foreground font-semibold mt-1">{stat.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <section>
        <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          <Link href="/scanner">
            <motion.div whileHover={{ y: -4 }} className="glass-panel p-5 rounded-2xl cursor-pointer hover:border-primary/50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <QrCode className="text-primary w-5 h-5" />
              </div>
              <h3 className="font-semibold">Scan QR</h3>
              <p className="text-xs text-muted-foreground mt-1">Camera & Image</p>
            </motion.div>
          </Link>
          
          <Link href="/create">
            <motion.div whileHover={{ y: -4 }} className="glass-panel p-5 rounded-2xl cursor-pointer hover:border-secondary/50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mb-3">
                <Zap className="text-secondary w-5 h-5" />
              </div>
              <h3 className="font-semibold">Create QR</h3>
              <p className="text-xs text-muted-foreground mt-1">Generate custom</p>
            </motion.div>
          </Link>
          
          <Link href="/history">
            <motion.div whileHover={{ y: -4 }} className="glass-panel p-5 rounded-2xl cursor-pointer hover:border-accent/50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                <History className="text-accent w-5 h-5" />
              </div>
              <h3 className="font-semibold">History</h3>
              <p className="text-xs text-muted-foreground mt-1">View past scans</p>
            </motion.div>
          </Link>
          
          <Link href="/tools">
            <motion.div whileHover={{ y: -4 }} className="glass-panel p-5 rounded-2xl cursor-pointer hover:border-warning/50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center mb-3">
                <Settings2 className="text-warning w-5 h-5" />
              </div>
              <h3 className="font-semibold">Tools</h3>
              <p className="text-xs text-muted-foreground mt-1">Power utilities</p>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* Recent Activity Placeholder */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Recent Scans</h2>
          <Link href="/history" className="text-sm font-semibold text-primary">View All</Link>
        </div>
        {history.length > 0 ? (
          <div className="space-y-3">
            {history.slice(0, 3).map((scan) => (
              <div key={scan.id} className="glass-panel p-4 rounded-xl flex items-center justify-between">
                <div className="flex flex-col overflow-hidden">
                  <span className="font-semibold truncate">{scan.type.toUpperCase()}</span>
                  <span className="text-sm text-muted-foreground truncate">{scan.content}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-panel p-6 rounded-2xl text-center">
            <p className="text-muted-foreground text-sm font-medium">No recent scans</p>
          </div>
        )}
      </section>
    </PageTransition>
  );
}
