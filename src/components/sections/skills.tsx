"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import React, { useRef } from "react";

const allSkills = [
    "Python","JavaScript", "TypeScript", "React.js","Node.js", "SQL", "C",
    "HTML/CSS",  "Next.js",  "Express", "GraphQL",
    "Tailwind CSS", "Bootstrap", "Jest.js",
    "MongoDB", "PostgreSQL", "Firebase", "MySQL",
    "AWS", "Lambda","Data Analysis",
    "Docker", "Microservices", "Laravel", "PHP"
];

function MagneticBadge({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerXX = left + width / 2;
        const centerYY = top + height / 2;
        const distanceX = clientX - centerXX;
        const distanceY = clientY - centerYY;

        x.set(distanceX * 0.4);
        y.set(distanceY * 0.4);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className="relative"
        >
            <div className="relative overflow-hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 md:px-6 md:py-3 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]">
                <span className="relative z-10 text-xs md:text-sm font-semibold tracking-wide text-white/80 transition-colors duration-300 group-hover:text-white">
                    {children}
                </span>
            </div>
        </motion.div>
    );
}

export function Skills() {
    return (
        <section id="skills" className="relative min-h-[60vh] max-w-7xl mx-auto px-6 py-24 md:py-32 overflow-hidden flex flex-col items-center">
            {/* Background Atmosphere */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[150px] opacity-50" />

            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-20 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white max-w-4xl"
                >
                    My Skills
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="max-w-[700px] text-lg text-muted-foreground leading-relaxed"
                >
                    The technologies and tools I use to bring ideas to life.
                </motion.p>
            </div>

            {/* Skills Canvas */}
            <div className="relative w-full max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-4 md:gap-6">
                {allSkills.map((skill, index) => (
                    <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.5, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            delay: index * 0.02,
                            type: "spring",
                            stiffness: 100,
                            damping: 20
                        }}
                    >
                        <MagneticBadge>{skill}</MagneticBadge>
                    </motion.div>
                ))}
            </div>

            {/* Bottom visual fade for sections */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </section>
    );
}
