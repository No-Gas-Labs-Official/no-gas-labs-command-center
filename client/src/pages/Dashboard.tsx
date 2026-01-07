import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Activity, Server, Users, Zap, Database, Network, FileText, User } from "lucide-react";
import { Link } from "wouter";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar, Legend } from "recharts";

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

export default function Dashboard() {
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

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-card/50 border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium font-mono text-muted-foreground">
                  CAMPAIGN_VELOCITY
                </CardTitle>
                <Zap className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-mono">87.4%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +12% from last cycle
                </p>
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
                <p className="text-xs text-muted-foreground mt-1">
                  Distributed infrastructure
                </p>
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
                <p className="text-xs text-muted-foreground mt-1">
                  Adversarial filtering active
                </p>
              </CardContent>
            </Card>
            
            <Link href="/assessment">
              <Card className="bg-card/50 border-border hover:bg-card/80 transition-colors cursor-pointer group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium font-mono text-muted-foreground group-hover:text-primary transition-colors">
                    SUBJECT_ASSESSMENT
                  </CardTitle>
                  <User className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-mono">LATEST</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Autobio-Social Audit
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Signal vs Noise Chart */}
            <Card className="col-span-1 lg:col-span-2 bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="font-mono text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  SIGNAL_TO_NOISE_RATIO
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activityData}>
                    <defs>
                      <linearGradient id="colorSignal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorNoise" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--destructive)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--destructive)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                    <XAxis dataKey="time" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '0px' }}
                      itemStyle={{ color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}
                    />
                    <Area type="monotone" dataKey="signal" stroke="var(--primary)" fillOpacity={1} fill="url(#colorSignal)" strokeWidth={2} />
                    <Area type="monotone" dataKey="noise" stroke="var(--destructive)" fillOpacity={1} fill="url(#colorNoise)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Node Status Chart */}
            <Card className="col-span-1 bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="font-mono text-lg flex items-center gap-2">
                  <Server className="w-5 h-5 text-secondary" />
                  NODE_PERFORMANCE
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={nodeData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} horizontal={false} />
                    <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis dataKey="name" type="category" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} width={60} />
                    <Tooltip 
                      cursor={{fill: 'var(--muted)', opacity: 0.2}}
                      contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '0px' }}
                      itemStyle={{ color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}
                    />
                    <Bar dataKey="value" fill="var(--secondary)" radius={[0, 4, 4, 0]} barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

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
                    <span className="text-primary w-24">16:42:01</span>
                    <span className="text-foreground">System handshake initiated with Ninja AI.</span>
                  </div>
                  <div className="flex gap-4 border-b border-border/50 pb-2">
                    <span className="text-primary w-24">16:41:55</span>
                    <span className="text-foreground">Temporal loop closure confirmed. Coherence locked.</span>
                  </div>
                  <div className="flex gap-4 border-b border-border/50 pb-2">
                    <span className="text-primary w-24">16:40:12</span>
                    <span className="text-foreground">Damie campaign announcement deployed to main vector.</span>
                  </div>
                  <div className="flex gap-4 border-b border-border/50 pb-2">
                    <span className="text-primary w-24">16:38:00</span>
                    <span className="text-foreground">Infrastructure rebranded to No_Gas_Labs™ Command Center.</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-primary w-24">16:35:22</span>
                    <span className="text-foreground">Initial scaffold generated. Cybernetic Clarity theme applied.</span>
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
