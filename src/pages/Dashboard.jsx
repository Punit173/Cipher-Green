import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Recycle, ShieldAlert, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#00C853', '#22d3ee', '#ef4444', '#94a3b8'];

export default function Dashboard() {
  const { data: scans = [], isLoading } = useQuery({
    queryKey: ['scan_results'],
    queryFn: () => base44.entities.ScanResult.list('-created_date', 100),
  });

  const totalScans = scans.length;
  const totalCo2 = scans.reduce((acc, scan) => acc + (scan.carbon_saved || 0), 0).toFixed(2);
  
  const recyclableCount = scans.filter(s => s.category === 'recyclable').length;
  const recyclablePercent = totalScans > 0 ? ((recyclableCount / totalScans) * 100).toFixed(1) : 0;
  
  const hazardousCount = scans.filter(s => s.category === 'hazardous').length;

  const categoryData = [
    { name: 'Biodegradable', value: scans.filter(s => s.category === 'biodegradable').length },
    { name: 'Recyclable', value: recyclableCount },
    { name: 'Hazardous', value: hazardousCount },
    { name: 'Unknown', value: scans.filter(s => s.category === 'unknown').length },
  ].filter(d => d.value > 0);

  // Group by date for bar chart (last 7 days)
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split('T')[0];
  }).reverse();

  const barData = last7Days.map(date => {
    const dayScans = scans.filter(s => {
      if(!s.created_date) return false;
      return new Date(s.created_date).toISOString().split('T')[0] === date;
    });
    return {
      name: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      scans: dayScans.length,
    };
  });

  const stats = [
    { title: 'Total Analyzed', value: totalScans, icon: BarChart3, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { title: 'CO₂ Saved (kg)', value: totalCo2, icon: Leaf, color: 'text-[#00C853]', bg: 'bg-[#00C853]/10' },
    { title: 'Recyclable %', value: `${recyclablePercent}%`, icon: Recycle, color: 'text-[#22d3ee]', bg: 'bg-[#22d3ee]/10' },
    { title: 'Hazard Alerts', value: hazardousCount, icon: ShieldAlert, color: 'text-red-400', bg: 'bg-red-400/10' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-slate-400">Overview of your waste footprint and AI analysis.</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00C853]"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="glass-card border-none text-white">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm font-medium mb-1">{stat.title}</p>
                      <h3 className="text-3xl font-bold">{stat.value}</h3>
                    </div>
                    <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                      <stat.icon className="w-8 h-8" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
              <Card className="glass-card border-none">
                <CardHeader>
                  <CardTitle className="text-lg font-medium text-white">Waste Categories</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  {categoryData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                          itemStyle={{ color: '#fff' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-500">No data available</div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}>
              <Card className="glass-card border-none">
                <CardHeader>
                  <CardTitle className="text-lg font-medium text-white">Scans (Last 7 Days)</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                      <XAxis dataKey="name" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" allowDecimals={false} />
                      <Tooltip 
                        cursor={{ fill: '#334155', opacity: 0.4 }}
                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                      />
                      <Bar dataKey="scans" fill="#00C853" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
}