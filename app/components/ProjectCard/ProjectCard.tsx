"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface Props {
    title: string
    description: string
    image: string
    tech: string
    github: string
}

export default function ProjectCard({
    title,
    description,
    image,
    tech,
    github,
}: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="group relative bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-6 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 border border-zinc-700/50 hover:border-purple-500/50"
        >
            {/* Image with overlay effect */}
            <div className="relative overflow-hidden rounded-xl mb-4">
                <Image
                    src={image}
                    alt={title}
                    width={500}
                    height={300}
                    className="rounded-xl object-cover w-full h-auto transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {title}
            </h3>
            <p className="text-gray-400 mb-3 leading-relaxed">{description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
                {tech.split(" | ").map((t, i) => (
                    <span
                        key={i}
                        className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30"
                    >
                        {t}
                    </span>
                ))}
            </div>

            <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/50 transform hover:-translate-y-0.5"
            >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View on GitHub
            </a>
        </motion.div>
    )
}
