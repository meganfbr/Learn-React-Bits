import TiltedCard from "./TiltedCard"

export default function About() {
    return (
        <section id="about" className="min-h-screen bg-black text-white flex items-center justify-center px-10 py-20">
            <div className="grid md:grid-cols-2 gap-12 items-stretch max-w-6xl">

                <TiltedCard />

                <div className="flex flex-col justify-center">
                    <h2 className="text-4xl font-bold mb-6">About Me</h2>
                    <p className="text-gray-400 leading-relaxed text-lg">
                        Saya adalah Fullstack Developer dan AI Enthusiast
                        yang memiliki pengalaman dalam pengembangan web,
                        machine learning, serta pernah menjadi asisten dosen.
                    </p>
                </div>

            </div>
        </section>
    )
}
