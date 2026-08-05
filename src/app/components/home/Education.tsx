"use client";
import React from "react";
import SectionHeader from "../ui/SectionHeader";
import { motion } from "framer-motion";

const education = [
    {
        school: "Vellore Institute of Technology",
        course:
            "B.Tech in Computer Science Engineering with Specialisation in Artificial Intelligence and Machine Learning",
        period: "08/2020 - 07/2024",
        result: "CGPA - 8.81/10",
    },
    {
        school: "Shivalik Public School, Chandigarh",
        course: "Senior Secondary Education",
        period: "Graduated - 07/2020",
        result: "CGPA - 9.0/10",
    },
];

const Education = () => {
    return (
        <section
            className="w-full mt-20 sm:mt-25 px-4 sm:px-6"
            id="education"
            aria-labelledby="education-heading"
        >
            <div className="max-w-7xl mx-auto flex flex-col gap-2 justify-center items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="w-full"
                >
                    <SectionHeader
                        id="education-heading"
                        title="Education"
                        subtitle="Academic"
                        description="My educational background."
                    />
                </motion.div>

                {education.map((item, index) => (
                    <motion.div
                        key={item.school}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
                        viewport={{ once: true }}
                        className="w-full max-w-4xl mt-4 sm:mt-6 border border-line-strong bg-surface-raised/70 backdrop-blur-3xl p-5 sm:p-8 rounded-2xl hover:border-blue-500/50 transition-colors"
                    >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold text-ink">
                                    {item.school}
                                </h3>
                                <p className="text-sm sm:text-base text-accent mt-1 leading-relaxed">
                                    {item.course}
                                </p>
                            </div>
                            {/* Left-aligned on phones, right-aligned once there's room */}
                            <div className="text-left md:text-right shrink-0">
                                <span className="block text-sm text-muted">
                                    {item.period}
                                </span>
                                <span className="block text-sm text-body font-medium mt-0.5">
                                    {item.result}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Education;
