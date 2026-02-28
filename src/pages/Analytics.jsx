import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { Leaf, Recycle, ShieldAlert, Filter } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Analytics() {
  const [filter, setFilter] = useState('all');

  const { data: scans = [], isLoading } = useQuery({
    queryKey: ['scan_results_analytics'],
    queryFn: () => base44.entities.ScanResult.list('-created_date', 500),
  });

  const filteredScans = filter === 'all' ? scans : scans.filter(s => s.category === filter);

  // Prepare timeline data
  const dateMap = {};
  [...scans].reverse().forEach(scan => {
    if (!scan.created_date) return;
    const date = new Date(scan.created_date).toISOString().split('T')[0];
    if (!dateMap[date]) dateMap[date] = 0;
    dateMap[date] += (scan.carbon_saved || 0);
  });

  let cumulative = 0;
  const lineData = Object.keys(dateMap).sort().map(date => {
    cumulative += dateMap[date];
    return {
      date: format(new Date(date), 'MMM d'),
      saved: parseFloat(cumulative.toFixed(2))
    };
  });

  const getCategoryBadge = (cat) => {
    if (cat === 'recyclable') return <span className="px-2 py-1 rounded-full text-xs font-medium bg-cyan-400/20 text-cyan-400 flex items-center w-fit gap-1"><Recycle className="w-3 h-3"/> Recyclable</span>;
    if (cat === 'biodegradable') return <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#00C853]/20 text-[#00C853] flex items-center w-fit gap-1"><Leaf className="w-3 h-3"/> Biodegradable</span>;
    if (cat === 'hazardous') return <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-400/20 text-red-400 flex items-center w-fit gap-1"><ShieldAlert className="w-3 h-3"/> Hazardous</span>;
    return <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-600/50 text-slate-300">Unknown</span>;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Analytics & History</h1>
        <p className="text-slate-400">Detailed breakdown of your waste segregation and environmental impact.</p>
      </div>

      <Card className="glass-card border-none">
        <CardHeader>
          <CardTitle className="text-lg text-white">Cumulative CO₂ Saved Over Time</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
              />
              <Line type="monotone" dataKey="saved" stroke="#00C853" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="glass-card border-none">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg text-white">Scan History</CardTitle>
          <div className="flex gap-2">
            {['all', 'biodegradable', 'recyclable', 'hazardous'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filter === cat ? 'bg-[#00C853] text-slate-900' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700 hover:bg-transparent">
                  <TableHead className="text-slate-400">Date</TableHead>
                  <TableHead className="text-slate-400">Image</TableHead>
                  <TableHead className="text-slate-400">Item</TableHead>
                  <TableHead className="text-slate-400">Category</TableHead>
                  <TableHead className="text-slate-400 text-right">CO₂ Saved</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00C853] mx-auto"></div>
                    </TableCell>
                  </TableRow>
                ) : filteredScans.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-slate-500">
                      No records found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredScans.map((scan) => (
                    <TableRow key={scan.id} className="border-slate-700/50 hover:bg-white/5 transition-colors">
                      <TableCell className="text-slate-300">
                        {scan.created_date ? format(new Date(scan.created_date), 'MMM d, yyyy HH:mm') : 'N/A'}
                      </TableCell>
                      <TableCell>
                        {scan.image_url ? (
                          <div className="w-12 h-12 rounded bg-black overflow-hidden">
                            <img src={scan.image_url} alt="Scan" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded bg-slate-800 flex items-center justify-center text-xs text-slate-500">No Img</div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium text-white capitalize">{scan.item_name}</TableCell>
                      <TableCell>{getCategoryBadge(scan.category)}</TableCell>
                      <TableCell className="text-right text-[#00C853] font-bold">+{scan.carbon_saved} kg</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}