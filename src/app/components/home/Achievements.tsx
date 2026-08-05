"use client";
import React from "react";
import SectionHeader from "../ui/SectionHeader";
import { motion } from "framer-motion";

const Achievements = () => {
    return (
        <section
            className="w-full mt-20 sm:mt-25 px-4 sm:px-6"
            id="achievements"
            aria-labelledby="achievements-heading"
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
                        id="achievements-heading"
                        title="Achievements & Certificates"
                        subtitle="Highlights"
                        description="Recognitions and certifications throughout my journey."
                    />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full max-w-5xl mt-6 sm:mt-8">
                    {/* Achievements */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="border border-line-strong bg-surface-raised/70 backdrop-blur-3xl p-5 sm:p-8 rounded-2xl"
                    >
                        <h3 className="text-lg sm:text-xl font-bold text-ink mb-5 border-b border-line-strong pb-2">Achievements & Activities</h3>
                        <ul className="space-y-4 text-sm sm:text-base text-body">
                            <li className="flex gap-3">
                                <span className="text-yellow-500 text-lg">★</span>
                                <span>Awarded <strong className="text-ink">“Rising Star of the Company”</strong> along with a cash prize for exceptional performance and contribution.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-accent text-lg">★</span>
                                <span><strong className="text-ink">AdVITya Fest 2023</strong> – Led a team of 30 members, increasing event attendance by 20% and sponsorship revenue by 15%.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-purple-500 text-lg">★</span>
                                <div className="flex flex-col gap-1">
                                    <span><strong className="text-ink">Research Publication</strong> – Published a research paper on advanced engineering in the International Research Journal on Advanced Engineering Hub (IRJAEH).</span>
                                    <a
                                        href="https://irjaeh.com/index.php/journal/article/view/243"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-accent hover:text-accent-soft text-sm inline-flex items-center gap-1 transition-colors w-fit min-h-9"
                                    >
                                        View Publication <span className="text-xs">↗</span>
                                    </a>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-positive text-lg">★</span>
                                <span><strong className="text-ink">Vice-Captain, School Football Team</strong> – Led team coordination and strategy development.</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Certificates */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="border border-line-strong bg-surface-raised/70 backdrop-blur-3xl p-5 sm:p-8 rounded-2xl"
                    >
                        <h3 className="text-lg sm:text-xl font-bold text-ink mb-5 border-b border-line-strong pb-2">Certifications</h3>
                        <ul className="space-y-4 text-sm sm:text-base text-body">
                            <li className="flex items-center gap-3 p-3 rounded-lg bg-tint-strong/30 hover:bg-tint-strong/60 transition-colors text-sm sm:text-base">
                                <span className="w-2 h-2 shrink-0 rounded-full bg-blue-400" aria-hidden></span>
                                <span>IBM Data Science Professional Course</span>
                            </li>
                            <li className="flex items-center gap-3 p-3 rounded-lg bg-tint-strong/30 hover:bg-tint-strong/60 transition-colors text-sm sm:text-base">
                                <span className="w-2 h-2 shrink-0 rounded-full bg-blue-400" aria-hidden></span>
                                <span>Meta iOS Developer Course</span>
                            </li>
                            <li className="flex items-center gap-3 p-3 rounded-lg bg-tint-strong/30 hover:bg-tint-strong/60 transition-colors text-sm sm:text-base">
                                <span className="w-2 h-2 shrink-0 rounded-full bg-blue-400" aria-hidden></span>
                                <span>Google Data Analytics Professional Course</span>
                            </li>
                        </ul>

                        <h3 className="text-lg sm:text-xl font-bold text-ink mb-4 mt-8 border-b border-line-strong pb-2">Extracurricular</h3>
                        <ul className="space-y-3 text-body text-sm">
                            <li>• Created education tech content through reels/shorts.</li>
                            <li>• Volunteer, Unnat Bharat Abhiyan (300+ rural children).</li>
                            <li>• Industry Visits to CDAC and OBEEV.</li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Achievements;
