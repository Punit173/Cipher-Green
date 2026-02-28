import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, HeartHandshake, Leaf, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Our Mission for a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C853] to-[#22d3ee]">Greener Future</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Ciphera Green leverages state-of-the-art AI to revolutionize waste management, empowering individuals and organizations to track and reduce their carbon footprint effortlessly.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="glass-card border-none h-full">
            <CardContent className="p-8 space-y-4">
              <div className="w-12 h-12 bg-[#00C853]/20 rounded-xl flex items-center justify-center text-[#00C853]">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">The Goal</h3>
              <p className="text-slate-400 leading-relaxed">
                By automating waste segregation using computer vision, we eliminate human error and dramatically increase the efficiency of recycling streams. Our goal is to divert millions of tons of waste from landfills globally.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="glass-card border-none h-full">
            <CardContent className="p-8 space-y-4">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-400">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">Sustainable Development Goals</h3>
              <p className="text-slate-400 leading-relaxed">
                We align with UN SDGs, specifically Goal 12 (Responsible Consumption and Production) and Goal 13 (Climate Action), providing actionable metrics for sustainability reporting.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="text-center pt-12 border-t border-slate-700/50">
        <h2 className="text-3xl font-bold text-white mb-12">The Team Behind Ciphera</h2>
        
        <div className="flex justify-center">
          <div className="glass-card p-8 rounded-2xl text-center max-w-sm">
            <div className="w-24 h-24 bg-gradient-to-br from-[#00C853] to-[#22d3ee] rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
              <HeartHandshake className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Eco Innovators</h3>
            <p className="text-slate-400">
              Built by a dedicated team of engineers and sustainability advocates passionate about using AI for environmental good.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}