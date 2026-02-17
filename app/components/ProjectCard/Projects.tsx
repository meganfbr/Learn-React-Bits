"use client"

import { motion } from "framer-motion"
import ProjectCard from "./ProjectCard"

export default function Projects() {
    return (
        <section id="projects" className="min-h-screen bg-black text-white px-10 py-20">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    Featured Projects
                </h2>
                <p className="text-gray-400 text-lg">
                    Beberapa project yang pernah saya kerjakan
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
                <ProjectCard
                    title="AI Fracture Detection"
                    description="CNN model untuk mendeteksi fraktur pada X-ray menggunakan MobileNet."
                    image="/fracture.png"
                    tech="Python | TensorFlow | CNN"
                    github="https://github.com/username/project"
                />

                <ProjectCard
                    title="Sistem Parkir GUI"
                    description="Aplikasi Java GUI untuk sistem parkir dengan perhitungan otomatis biaya dan denda."
                    image="/parkir.png"
                    tech="Java | Swing | MySQL"
                    github="https://github.com/username/project"
                />
            </div>
        </section>
    )
}
