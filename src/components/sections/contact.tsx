"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Github, Globe, Linkedin, Mail, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Contact() {
    const [copied, setCopied] = useState(false);
    const email = "contact@jifriya.com";

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    };

    return (
        <section id="contact" className="max-w-7xl mx-auto px-6 py-32 md:py-48 relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[150px]" />

            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold uppercase tracking-widest"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Available for new projects
                    </motion.div>

                    <div className="space-y-4">
                        <h2 className="text-4xl font-bold font-heading tracking-tighter sm:text-5xl md:text-6xl text-white">
                            Let's Build Something <span className="text-primary">Great.</span>
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                        <Button
                            onClick={copyToClipboard}
                            variant="outline"
                            size="lg"
                            className="h-14 px-8 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/50 transition-all group w-full sm:w-auto"
                        >
                            <span className="mr-3">{email}</span>
                            {copied ? (
                                <Check className="h-4 w-4 text-emerald-500" />
                            ) : (
                                <Copy className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            )}
                        </Button>
                        <Button asChild size="lg" className="h-14 px-8 rounded-2xl shadow-lg shadow-primary/20 w-full sm:w-auto">
                            <a href={`mailto:${email}`}>
                                Send an Email
                            </a>
                        </Button>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative group"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative grid grid-cols-2 gap-4">
                        {[
                            { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/jifriya", color: "hover:text-[#0077b5]" },
                            { name: "GitHub", icon: Github, href: "https://github.com/jifriya", color: "hover:text-white" },
                            { name: "Gmail", icon: Mail, href: `mailto:${email}`, color: "hover:text-primary" },
                            { name: "Gallery", icon: Globe, href: "https://jifriya.dev", color: "hover:text-emerald-400" },
                        ].map((social, i) => (
                            <Link
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                className="flex flex-col items-center justify-center p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-primary/50 transition-all duration-300 group/link"
                            >
                                <social.icon className={cn("h-8 w-8 text-muted-foreground transition-all duration-500 group-hover/link:scale-110", social.color)} />
                                <span className="mt-4 text-sm font-semibold text-muted-foreground group-hover/link:text-white transition-colors">{social.name}</span>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
