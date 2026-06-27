"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';

export function NotFound() {
  return (
    <>
      <main className="min-h-screen flex items-center justify-center px-6 md:px-12 bg-background">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-8xl md:text-9xl font-bold text-text-primary mb-4">
              404
            </h1>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-secondary mb-8">
              Page Not Found
            </h2>
            <p className="text-lg text-text-secondary mb-12 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
              >
                <Home className="w-4 h-4" />
                Go Home
              </Link>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-surface transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}