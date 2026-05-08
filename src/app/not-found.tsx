"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="relative">
          <h1 className="text-[12rem] font-bold text-primary/10 leading-none select-none">404</h1>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold text-foreground">Page Not Found</h2>
            <p className="text-muted-foreground mt-2 max-w-xs">
              The page you are looking for doesn't exist or has been moved.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/"
            className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold shadow-lg hover:scale-105 transition-all"
          >
            <Home size={20} />
            <span>Go Back Home</span>
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-8 py-4 bg-secondary text-foreground rounded-2xl font-bold hover:bg-secondary/80 transition-all"
          >
            <ArrowLeft size={20} />
            <span>Go Back</span>
          </button>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="fixed top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
    </div>
  );
}
