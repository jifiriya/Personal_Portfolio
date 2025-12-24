"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background pt-16 md:pt-0">
            <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                >
                    <h1 className="text-4xl font-bold tracking-tighter font-heading sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-primary bg-[length:200%_auto] animate-gradient">
                        Engineering High-Performance
                        <br className="hidden md:block" />
                        Digital Experiences
                    </h1>
                    <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl leading-relaxed">
                        Hi, I'm <span className="text-white font-semibold">Jifriya</span>.
                        A  Full Stack Developer specializing in crafting scalable, robust, and visually stunning web applications that drive real business value.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-8 flex flex-col gap-4 min-[400px]:flex-row"
                >
                    <Button asChild size="lg" className="gap-2">
                        <Link href="#projects">
                            View Projects <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="gap-2">
                        <a href="/cv.pdf" download="Jifriya_Nargees_CV.pdf">
                            Download CV <Download className="h-4 w-4" />
                        </a>
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-12 flex items-center gap-6 text-muted-foreground"
                >
                    <Link href="https://github.com/jifiriya" target="_blank" className="hover:text-primary transition-colors">
                        <Github className="h-6 w-6" />
                        <span className="sr-only">GitHub</span>
                    </Link>
                    <Link href="https://www.linkedin.com/in/jifiriya-m-0a4768229/" target="_blank" className="hover:text-primary transition-colors">
                        <Linkedin className="h-6 w-6" />
                        <span className="sr-only">LinkedIn</span>
                    </Link>
                    <Link href="mailto:jifiriyam@gmail.com" className="hover:text-primary transition-colors">
                        <Mail className="h-6 w-6" />
                        <span className="sr-only">Email</span>
                    </Link>
                </motion.div>
            </div>

            {/* Abstract Background Element */}
            <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[100px]" />
        </section>
    );
}
