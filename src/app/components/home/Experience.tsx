"use client";
import React from "react";
import SectionHeader from "../ui/SectionHeader";
import { motion } from "framer-motion";

const responsibilities = [
    "Engineered and maintained high-performance iOS applications with scalable architecture, optimized for App Store deployment.",
    "Boosted app performance and stability across core modules, directly improving user satisfaction and retention; recognized as the youngest recipient of the “Rising Star of the Company” award.",
    "Designed modular iOS SDKs emphasizing reusability and future-proofing, accelerating team productivity by reducing code redundancy.",
    "Developed and integrated VoIP calling and messaging using Telnyx API, CallKit, and PushKit in SecondLine, scaling to 6,000+ active users.",
    "Led UI overhaul of the core calling interface in collaboration with product/design teams, resulting in a 40% boost in DAUs and 25% increase in average call duration.",
    "Implemented advanced features in PhotoVoice Translator, including AI chat, real-time translation, and text/PDF extraction using DeepSeek API and Vision Framework.",
    "Built MathAi, an AI-powered cross-platform homework assistant with real-time math solving, voice interaction, and in-app monetization.",
    "Conducted comprehensive code reviews, unit testing (XCTest), and debugging to ensure stability, compliance, and optimal UX.",
    "Authored detailed internal documentation and followed MVC principles, ensuring team-wide consistency and faster onboarding of new developers.",
];

const Experience = () => {
    return (
        <section
            className="w-full mt-20 sm:mt-25 px-4 sm:px-6"
            id="experience"
            aria-labelledby="experience-heading"
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
                        id="experience-heading"
                        title="Experience"
                        subtitle="Career"
                        description="My professional journey and contributions."
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="w-full max-w-4xl mt-6 border border-line-strong bg-surface-raised/70 backdrop-blur-3xl p-5 sm:p-8 rounded-2xl"
                >
                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between flex-wrap items-start gap-2">
                            <h3 className="text-lg sm:text-xl font-bold text-ink">
                                Junior Mobile Developer
                            </h3>
                            <span className="text-xs sm:text-sm text-positive border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                                Current
                            </span>
                        </div>
                        <p className="text-base sm:text-lg text-accent">
                            iApp Technologies LLP
                        </p>
                        <ul className="list-disc list-outside ml-4 sm:ml-5 mt-4 text-sm sm:text-base text-body space-y-2 leading-relaxed">
                            {responsibilities.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Experience;
