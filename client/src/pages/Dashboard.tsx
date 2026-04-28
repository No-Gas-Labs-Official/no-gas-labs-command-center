import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Activity, Server, Users, Zap, Database, Network, FileText, User, MessageSquare, Send, Globe, ShieldCheck, Cpu } from "lucide-react";
import { Link } from "wouter";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar } from "recharts";
import { useState } from "react";

// Simulated data for the dashboard
const activityData = [
  { time: "00:00", signal: 45, noise: 20 },
  { time: "04:00", signal: 55, noise: 15 },
  { time: "08:00", signal: 75, noise: 25 },
  { time: "12:00", signal: 90, noise: 30 },
  { time: "16:00", signal: 85, noise: 20 },
  { time: "20:00", signal: 65, noise: 15 },
  { time: "24:00", signal: 50, noise: 10 },
];

const nodeData = [
  { name: "Core", value: 100, status: "active" },
  { name: "Edge 1", value: 85, status: "active" },
  { name: "Edge 2", value: 70, status: "standby" },
  { name: "Edge 3", value: 95, status: "active" },
];

const platforms = [
  { name: "ChatGPT", status: "CONNECTED", type: "AI", icon: MessageSquare },
  { name: "Claude", status: "CONNECTED", type: "AI", icon: MessageSquare },
  { name: "Gemini", status: "OFFLINE", type: "AI", icon: MessageSquare },
  { name: "Grok", status: "CONNECTED", type: "AI", icon: MessageSquare },
  { name: "Discord", status: "CONFIGURED", type: "BROADCAST", icon: Globe },
  { name: "Telegram", status: "CONFIGURED", type: "BROADCAST", icon: Globe },
  { name: "X (Twitter)", status: "STANDBY", type: "BROADCAST", icon: Globe },
];

export default function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [deliberating, setDeliberating] = useState(false);
  const [responses, setResponses] = useState<{ai: string, text: string}[]>([]);

  const handleFireRoundTable = () => {
    if (!prompt.trim()) return;
    setDeliberating(true);
    // Simulate AI responses
    setTimeout(() => {
      setResponses([
        { ai: "ChatGPT", text: "Analysis of the current vector suggests a 15% increase in creative autonomy if we decouple the relay token from the main branch." },
        { ai: "Claude", text: "I recommend a more conservative approach to the alignment harness. The ⅔ constraint increase might trigger a bob-factor overflow." },
        { ai: "Grok", text: "Let's go. The system is primed for lateral expansion. Fire the broadcast engine immediately." }
      ]);
      setDeliberating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      
      {/* Header */}
      <header className="border-b border-border bg-card/30 sticky top-0 z-50 backdrop-blur-md">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="font-mono text-muted-foreground hover:text-primary gap-2">
              <ArrowLeft className="w-4 h-4" /> RETURN_TO_COMMAND
            </Button>
          </Link>
          <div className="font-mono text-sm text-secondary flex items-center gap-2 animate-pulse">
            <Activity className="w-3 h-3" />
            SYSTEM_STATUS: LIVE
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container">
          
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-mono font-bold tracking-tight text-primary mb-2">
                PROTOCOL_DASHBOARD
              </h1>
              <p className="text-muted-foreground font-mono text-sm">
                Real-time visualization of distributed intelligence metrics.
              </p>
            </div>
            <div className="text-right font-mono text-xs text-muted-foreground hidden md:block">
              UPTIME: 99.99%<br />
              LAST_SYNC: 00:00:01
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
            {/* Platform Status Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              <h2 className="font-mono text-sm font-bold text-muted-foreground mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> PLATFORM_STATUS
              </h2>
              {platforms.map((p) => (
                <Card key={p.name} className="bg-card/50 border-border p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <p.icon className={`w-4 h-4 ${p.status === 'CONNECTED' || p.status === 'CONFIGURED' ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className="font-mono text-sm font-medium">{p.name}</span>
                    </div>
                    <Badge variant={p.status === 'CONNECTED' || p.status === 'CONFIGURED' ? 'default' : 'outline'} className="text-[10px] font-mono px-1.5 py-0">
                      {p.status}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>

            {/* Main Dashboard Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* AI Round Table Interface */}
              <Card className="bg-card/50 border-primary/20 border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="font-mono text-xl flex items-center gap-2 text-primary">
                    <Cpu className="w-6 h-6" /> AI_ROUND_TABLE
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Textarea 
                      placeholder="ENTER_STRATEGIC_PROMPT..." 
                      className="bg-background/50 font-mono min-h-[100px] border-border focus:border-primary transition-all"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                    <Button 
                      className="absolute bottom-2 right-2 font-mono gap-2" 
                      onClick={handleFireRoundTable}
                      disabled={deliberating || !prompt.trim()}
                    >
                      {deliberating ? <Activity className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      FIRE_DELIBERATION
                    </Button>
                  </div>

                  {responses.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 animate-in fade-in slide-in-from-bottom-4">
                      {responses.map((r) => (
                        <div key={r.ai} className="bg-background/40 border border-border p-3 rounded-sm space-y-2">
                          <div className="flex items-center gap-2 border-b border-border pb-1 mb-2">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            <span className="font-mono text-xs font-bold uppercase">{r.ai}</span>
                          </div>
                          <p className="text-xs font-mono leading-relaxed text-muted-foreground">
                            {r.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Key Metrics Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-card/50 border-border">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium font-mono text-muted-foreground">
                      CAMPAIGN_VELOCITY
                    </CardTitle>
                    <Zap className="h-4 w-4 text-secondary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold font-mono">87.4%</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/50 border-border">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium font-mono text-muted-foreground">
                      ACTIVE_NODES
                    </CardTitle>
                    <Server className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold font-mono">1,024</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/50 border-border">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium font-mono text-muted-foreground">
                      SIGNAL_INTEGRITY
                    </CardTitle>
                    <Network className="h-4 w-4 text-secondary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold font-mono">99.2%</div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-card/50 border-border">
                  <CardHeader>
                    <CardTitle className="font-mono text-lg flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" />
                      SIGNAL_TO_NOISE
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={activityData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                        <XAxis dataKey="time" stroke="var(--muted-foreground)" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis stroke="var(--muted-foreground)" fontSize={10} tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '0px' }}
                          itemStyle={{ color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}
                        />
                        <Area type="monotone" dataKey="signal" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.1} strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border">
                  <CardHeader>
                    <CardTitle className="font-mono text-lg flex items-center gap-2">
                      <Server className="w-5 h-5 text-secondary" />
                      NODE_PERFORMANCE
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={nodeData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} horizontal={false} />
                        <XAxis type="number" stroke="var(--muted-foreground)" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis dataKey="name" type="category" stroke="var(--muted-foreground)" fontSize={10} tickLine={false} axisLine={false} width={40} />
                        <Bar dataKey="value" fill="var(--secondary)" radius={[0, 4, 4, 0]} barSize={20} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          
          {/* System Logs */}
          <div className="mt-8">
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="font-mono text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  SYSTEM_LOGS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-mono text-sm space-y-2 text-muted-foreground">
                  <div className="flex gap-4 border-b border-border/50 pb-2">
                    <span className="text-primary w-24">16:45:12</span>
                    <span className="text-foreground">AGENTS.md alignment harness deployed. Autonomy scale: 40%.</span>
                  </div>
                  <div className="flex gap-4 border-b border-border/50 pb-2">
                    <span className="text-primary w-24">16:44:01</span>
                    <span className="text-foreground">Platform Status UI initialized. All vectors scanning.</span>
                  </div>
                  <div className="flex gap-4 border-b border-border/50 pb-2">
                    <span className="text-primary w-24">16:42:01</span>
                    <span className="text-foreground">System handshake initiated with Ninja AI.</span>
                  </div>
                  <div className="flex gap-4 border-b border-border/50 pb-2">
                    <span className="text-primary w-24">16:41:55</span>
                    <span className="text-foreground">Temporal loop closure confirmed. Coherence locked.</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-primary w-24">16:38:00</span>
                    <span className="text-foreground">Infrastructure rebranded to No_Gas_Labs™ Command Center.</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
}
