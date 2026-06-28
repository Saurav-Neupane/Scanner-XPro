import { Link, useLocation } from 'wouter';
import { Home, Maximize, PlusCircle, History, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

export function BottomNav() {
  const [location] = useLocation();

  const tabs = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/history', label: 'History', icon: History },
    { path: '/scanner', label: 'Scan', icon: Maximize, isPrimary: true },
    { path: '/create', label: 'Create', icon: PlusCircle },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-3 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-t border-white/20 dark:border-white/10 rounded-t-3xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-around max-w-md mx-auto relative">
        {tabs.map((tab) => {
          const isActive = location === tab.path || (tab.path !== '/' && location.startsWith(tab.path));
          const Icon = tab.icon;

          if (tab.isPrimary) {
            return (
              <Link key={tab.path} href={tab.path} className="relative -top-6 flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-secondary shadow-lg flex items-center justify-center text-white ring-4 ring-background animate-scan-glow"
                >
                  <Icon className="w-7 h-7" />
                </motion.div>
                <span className="text-[10px] mt-1 font-semibold text-primary">Scan</span>
              </Link>
            );
          }

          return (
            <Link key={tab.path} href={tab.path} className="relative flex flex-col items-center p-2 w-14">
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute inset-0 bg-primary/10 rounded-2xl"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <motion.div
                animate={{ scale: isActive ? 1.15 : 1, y: isActive ? -2 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`} />
              </motion.div>
              <span className={`text-[10px] mt-1.5 font-semibold ${isActive ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
