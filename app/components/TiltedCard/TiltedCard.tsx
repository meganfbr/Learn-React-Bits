"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"

export default function TiltedCard() {
    const ref = useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = ref.current
        if (!card) return

        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const rotateX = -(y - rect.height / 2) / 15
        const rotateY = (x - rect.width / 2) / 15

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }

    const resetTilt = () => {
        if (ref.current) {
            ref.current.style.transform = "rotateX(0deg) rotateY(0deg)"
        }
    }

    return (
        <div className="tilted-card-figure">
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={resetTilt}
                className="tilted-card-inner"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <Image
                    src="/Megan.png"
                    alt="Febrian"
                    width={400}
                    height={533}
                    className="tilted-card-img"
                    priority
                />
            </motion.div>
        </div>
    )
}
