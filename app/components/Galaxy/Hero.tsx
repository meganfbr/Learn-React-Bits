import Galaxy from "./Galaxy"

export default function Hero() {
    return (
        <section id="home" className="relative h-screen w-full overflow-hidden bg-black text-white">

            {/* Galaxy Background (tidak diubah) */}
            <div className="absolute inset-0 z-0 w-full h-full">
                <Galaxy
                    mouseRepulsion
                    mouseInteraction
                    density={1}
                    glowIntensity={0.3}
                    saturation={0.8}
                    hueShift={140}
                    twinkleIntensity={0.3}
                    rotationSpeed={0.1}
                    repulsionStrength={2}
                    autoCenterRepulsion={0}
                    starSpeed={0.5}
                    speed={1}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center h-full px-8 md:px-20">
                <div className="max-w-2xl text-left">
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                        Febrian A
                    </h1>

                    <p className="mt-6 text-lg md:text-xl text-gray-300">
                        Fullstack Developer | AI Enthusiast
                    </p>


                    <div className="mt-8 flex gap-4">
                        {/* Primary Glass Button */}
                        <button className="group px-6 py-3 bg-purple-500/20 backdrop-blur-md border border-purple-400/50 hover:bg-purple-500/30 hover:border-purple-300 transition-all duration-300 rounded-lg font-medium shadow-lg hover:shadow-purple-500/50">
                            <span className="text-white group-hover:text-purple-100">View Projects</span>
                        </button>

                        {/* Secondary Glass Button */}
                        <button className="group px-6 py-3 bg-cyan-500/10 backdrop-blur-md border border-cyan-400/30 hover:bg-cyan-500/20 hover:border-cyan-300/50 transition-all duration-300 rounded-lg font-medium shadow-lg hover:shadow-cyan-400/30">
                            <span className="text-white group-hover:text-cyan-50">Download CV</span>
                        </button>
                    </div>
                </div>
            </div>

        </section>
    )
}
