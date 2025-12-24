"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github, Sparkles } from "lucide-react";
import Link from "next/link";
import NextImage from "next/image";
import { cn } from "@/lib/utils";

interface Project {
    title: string;
    description: string;
    imagePath: string;
    tags: string[];
    github: string;
    demo: string;
}

let projects: Project[] = [];

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (window.innerWidth < 768) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="group relative h-full perspective-1000"
        >
            <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 group-hover:bg-white/10 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)]">
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative h-40 md:h-56 w-full overflow-hidden" style={{ transform: "translateZ(20px)" }}>
                    <NextImage
                        src={project.imagePath}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 md:left-4 md:right-auto md:justify-start md:gap-2">
                        {project.tags.map(tag => (
                            <span key={tag} className="rounded-full bg-white/10 px-2.5 py-1 text-[8px] md:text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md border border-white/10">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="p-5 md:p-8 space-y-3 md:space-y-4 text-center md:text-left" style={{ transform: "translateZ(40px)" }}>
                    <div className="flex items-center justify-center md:justify-between">
                        <h3 className="text-lg md:text-2xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">
                            {project.title}
                        </h3>
                        <Sparkles className="hidden md:block h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground line-clamp-3 leading-relaxed">
                        {project.description}
                    </p>

                    <div className="flex items-center justify-center md:justify-start gap-4 pt-2 md:pt-4">
                        <Link href={project.github} target="_blank" className="flex items-center gap-2 text-xs md:text-sm font-semibold text-white/50 hover:text-primary transition-colors group/link">
                            <Github className="h-4 w-4" />
                            <span>Code</span>
                            <div className="h-px w-0 bg-primary group-hover/link:w-full transition-all duration-300" />
                        </Link>
                        <Link href={project.demo} target="_blank" className="flex items-center gap-2 text-xs md:text-sm font-semibold text-white/50 hover:text-primary transition-colors group/link">
                            <ExternalLink className="h-4 w-4" />
                            <span>Live Demo</span>
                            <div className="h-px w-0 bg-primary group-hover/link:w-full transition-all duration-300" />
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export function Projects() {
    const isCarousel = projects.length > 3;

    const [emblaRef, emblaApi] = useEmblaCarousel({
        active: isCarousel,
        loop: true,
        align: "center",
        slidesToScroll: 1,
        breakpoints: {
            "(min-width: 768px)": { align: "start", slidesToScroll: 2 },
            "(min-width: 1024px)": { align: "start", slidesToScroll: 3 },
        }
    });

    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        return () => { emblaApi.off("select", onSelect) };
    }, [emblaApi, onSelect]);

    const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

    return (
        <section id="projects" className="w-full max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-48 relative overflow-x-hidden">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 h-[300px] md:h-[500px] w-[300px] md:w-[500px] rounded-full bg-purple-500/10 blur-[80px] md:blur-[120px]" />

            <div className="flex flex-col items-center text-center md:text-left md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-10 md:mb-16">
                <div className="space-y-3 md:space-y-4 flex flex-col items-center md:items-start w-full">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white"
                    >
                        Featured Projects
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="w-full max-w-[600px] text-base md:text-lg text-muted-foreground"
                    >
                        A curated collection of professional projects and technical deep-dives, focused on building robust, scalable, and user-centric digital solutions.
                    </motion.p>
                </div>
            </div>

            {isCarousel ? (
                <div className="relative mt-8 md:mt-12 group/carousel">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex -ml-4 md:-ml-8 items-center w-full">
                            {projects.map((project, index) => (
                                <div key={index} className="flex-[0_0_80%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 pl-4 md:pl-8 py-4 md:py-8">
                                    <ProjectCard project={project} index={index} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 md:mt-12 flex justify-center gap-2 md:gap-3">
                        {projects.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => scrollTo(index)}
                                className={cn(
                                    "h-1 md:h-1.5 transition-all duration-500 rounded-full",
                                    selectedIndex === index ? "w-6 md:w-8 bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" : "w-1.5 md:w-2 bg-white/20 hover:bg-white/40"
                                )}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="mx-auto grid max-w-7xl gap-6 md:gap-10 pt-8 md:pt-12 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, index) => (
                        <div key={index} className="py-2 md:py-4">
                            <ProjectCard project={project} index={index} />
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
