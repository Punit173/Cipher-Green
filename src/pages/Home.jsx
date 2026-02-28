import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Recycle, ShieldAlert, Cpu } from 'lucide-react';

export default function Home() {
  return (
    <div className="pt-24 min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-6 sm:px-12 lg:px-24 pt-20 pb-32 flex flex-col lg:flex-row items-center gap-12">
        {/* Background elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00C853]/20 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#22d3ee]/20 rounded-full blur-[120px] -z-10" />

        <div className="flex-1 space-y-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-[#00C853]/30 text-[#00C853] text-sm font-semibold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C853] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00C853]"></span>
              </span>
              AI-Powered Waste Segregation
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-white mb-6">
              Smart Waste <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C853] to-[#22d3ee]">Intelligence.</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
              Transforming sustainability with cutting-edge computer vision. Ciphera Green instantly identifies, categorizes, and tracks your waste to reduce carbon footprints seamlessly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to={createPageUrl('Scanner')}
              className="px-8 py-4 bg-[#00C853] hover:bg-[#00C853]/90 text-slate-900 font-bold rounded-xl flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,200,83,0.4)]"
            >
              Start Scanning <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to={createPageUrl('Dashboard')}
              className="px-8 py-4 glass-card hover:bg-white/10 text-white font-semibold rounded-xl flex items-center gap-2 transition-all"
            >
              View Dashboard
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1 relative z-10 w-full max-w-lg"
        >
          <div className="relative aspect-square">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00C853]/20 to-[#22d3ee]/20 rounded-[2rem] transform rotate-6 animate-pulse"></div>
            <div className="absolute inset-0 glass-card rounded-[2rem] border border-white/10 p-8 flex items-center justify-center animate-float">
              <Recycle className="w-48 h-48 text-[#00C853] opacity-80" />
            </div>
            
            {/* Floating badges */}
            <div className="absolute top-10 -left-10 glass-card px-4 py-3 rounded-xl flex items-center gap-3 animate-float" style={{ animationDelay: '1s' }}>
              <div className="p-2 bg-green-500/20 rounded-lg text-green-400"><Leaf className="w-5 h-5" /></div>
              <div>
                <p className="text-xs text-slate-400">Biodegradable</p>
                <p className="text-sm font-bold">98% Accuracy</p>
              </div>
            </div>

            <div className="absolute bottom-20 -right-10 glass-card px-4 py-3 rounded-xl flex items-center gap-3 animate-float" style={{ animationDelay: '2s' }}>
              <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400"><Cpu className="w-5 h-5" /></div>
              <div>
                <p className="text-xs text-slate-400">AI Vision</p>
                <p className="text-sm font-bold">Real-time Scan</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-6 sm:px-12 lg:px-24 py-24 bg-slate-900/50 border-y border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Our advanced AI model analyzes your waste and provides actionable insights to minimize environmental impact.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Recycle,
              title: "Smart Segregation",
              desc: "Instantly categorize waste into recyclable, biodegradable, or hazardous materials.",
              color: "text-blue-400",
              bg: "bg-blue-400/10"
            },
            {
              icon: Leaf,
              title: "Carbon Tracking",
              desc: "Calculate the exact carbon footprint reduction for every correctly segregated item.",
              color: "text-[#00C853]",
              bg: "bg-[#00C853]/10"
            },
            {
              icon: ShieldAlert,
              title: "Hazard Detection",
              desc: "Automatically flag dangerous materials to ensure safe disposal procedures.",
              color: "text-red-400",
              bg: "bg-red-400/10"
            }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="glass-card p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${feature.bg} ${feature.color}`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}