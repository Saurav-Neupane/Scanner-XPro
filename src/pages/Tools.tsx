import { PageTransition } from '@/components/layout/PageTransition';
import { useState } from 'react';
import { KeyRound, Hash, Lock, Link as LinkIcon, Clock, Copy, ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

export function Tools() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  // Password Gen
  const [pwdLength, setPwdLength] = useState([16]);
  const [pwdResult, setPwdResult] = useState('');

  // Base64
  const [b64Input, setB64Input] = useState('');
  const [b64Output, setB64Output] = useState('');
  const [b64Mode, setB64Mode] = useState<'encode'|'decode'>('encode');

  const generatePassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let pwd = "";
    for (let i = 0; i < pwdLength[0]; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPwdResult(pwd);
  };

  const handleB64 = () => {
    try {
      if (b64Mode === 'encode') setB64Output(btoa(b64Input));
      else setB64Output(atob(b64Input));
    } catch {
      toast.error('Invalid input for decoding');
    }
  };

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const tools = [
    { id: 'pwd', name: 'Password Gen', icon: KeyRound, desc: 'Secure random strings' },
    { id: 'uuid', name: 'UUID Gen', icon: Hash, desc: 'v4 identifiers' },
    { id: 'b64', name: 'Base64', icon: Lock, desc: 'Encode / Decode' },
  ];

  return (
    <PageTransition className="max-w-md mx-auto space-y-6">
      <header className="pt-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Tools</h1>
          <p className="text-muted-foreground mt-1 font-medium">Power user utilities.</p>
        </div>
        {activeTool && (
          <Button variant="ghost" size="sm" onClick={() => setActiveTool(null)}>
            Back
          </Button>
        )}
      </header>

      {!activeTool ? (
        <div className="grid grid-cols-2 gap-4">
          {tools.map((tool) => (
            <div 
              key={tool.id} 
              onClick={() => {
                setActiveTool(tool.id);
                if (tool.id === 'pwd') generatePassword();
                if (tool.id === 'uuid') {
                  const id = uuidv4();
                  copyToClipboard(id);
                  toast.success('UUID generated & copied: ' + id);
                  setActiveTool(null);
                }
              }}
              className="glass-panel p-5 rounded-2xl cursor-pointer hover:border-primary/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
                <tool.icon className="w-5 h-5 text-foreground" />
              </div>
              <h3 className="font-semibold">{tool.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{tool.desc}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel p-6 rounded-2xl space-y-6">
          {activeTool === 'pwd' && (
            <div className="space-y-4">
              <h2 className="font-bold text-lg">Password Generator</h2>
              <div className="relative">
                <Input value={pwdResult} readOnly className="glass-input pr-12 text-center font-mono" />
                <Button size="icon" variant="ghost" className="absolute right-1 top-1 w-8 h-8" onClick={() => copyToClipboard(pwdResult)}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Length: {pwdLength[0]}</span>
                </div>
                <Slider value={pwdLength} onValueChange={setPwdLength} min={8} max={64} step={1} />
                <Button onClick={generatePassword} className="w-full mt-2">Generate New</Button>
              </div>
            </div>
          )}

          {activeTool === 'b64' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">Base64</h2>
                <Button variant="outline" size="sm" onClick={() => setB64Mode(m => m === 'encode' ? 'decode' : 'encode')}>
                  <ArrowRightLeft className="w-4 h-4 mr-2" />
                  {b64Mode === 'encode' ? 'Encode' : 'Decode'} Mode
                </Button>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Input</label>
                <Input value={b64Input} onChange={e => setB64Input(e.target.value)} className="glass-input" />
              </div>
              <Button onClick={handleB64} className="w-full">Process</Button>
              {b64Output && (
                <div className="relative mt-4">
                  <label className="text-xs text-muted-foreground mb-1 block">Output</label>
                  <Input value={b64Output} readOnly className="glass-input pr-12" />
                  <Button size="icon" variant="ghost" className="absolute right-1 bottom-1 w-8 h-8" onClick={() => copyToClipboard(b64Output)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </PageTransition>
  );
}
