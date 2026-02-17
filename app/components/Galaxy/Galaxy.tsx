"use client"

import { useEffect, useRef } from "react"
import { Renderer, Camera, Transform, Program, Mesh, Geometry } from "ogl"

interface GalaxyProps {
    mouseRepulsion?: boolean
    mouseInteraction?: boolean
    density?: number
    glowIntensity?: number
    saturation?: number
    hueShift?: number
    twinkleIntensity?: number
    rotationSpeed?: number
    repulsionStrength?: number
    autoCenterRepulsion?: number
    starSpeed?: number
    speed?: number
}

export default function Galaxy({
    mouseRepulsion = false,
    mouseInteraction = false,
    density = 1,
    glowIntensity = 0.5,
    saturation = 1,
    hueShift = 0,
    twinkleIntensity = 0.5,
    rotationSpeed = 0.05,
    repulsionStrength = 1,
    autoCenterRepulsion = 0,
    starSpeed = 0.3,
    speed = 1,
}: GalaxyProps) {
    const containerRef = useRef<HTMLCanvasElement>(null)
    const mousePos = useRef({ x: 0, y: 0 })

    useEffect(() => {
        if (!containerRef.current) return

        const canvas = containerRef.current
        const renderer = new Renderer({ canvas, alpha: true, dpr: 2 })
        const gl = renderer.gl

        // Create camera first
        const camera = new Camera(gl, { fov: 75 })
        camera.position.set(0, 0, 5)
        camera.lookAt([0, 0, 0])

        // Set canvas size to match container
        const resize = () => {
            const width = canvas.parentElement?.clientWidth || window.innerWidth
            const height = canvas.parentElement?.clientHeight || window.innerHeight

            // Set canvas internal size
            canvas.width = width
            canvas.height = height

            // Update renderer size  
            renderer.setSize(width, height)

            // Update camera aspect ratio
            camera.perspective({ aspect: width / height })
        }

        // Initial resize
        resize()

        const scene = new Transform()

        // Create galaxy particles based on density
        const numParticles = Math.floor(3000 * density)
        const positions = new Float32Array(numParticles * 3)
        const originalPositions = new Float32Array(numParticles * 3)
        const colors = new Float32Array(numParticles * 3)
        const sizes = new Float32Array(numParticles)
        const twinkleSpeeds = new Float32Array(numParticles)

        for (let i = 0; i < numParticles; i++) {
            const i3 = i * 3

            // Create spiral galaxy shape with bigger radius
            const radius = Math.random() * 10
            const spinAngle = radius * 2
            const branchAngle = ((i % 3) / 3) * Math.PI * 2

            const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5
            const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5
            const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5

            const x = Math.cos(branchAngle + spinAngle) * radius + randomX
            const y = randomY * 0.5
            const z = Math.sin(branchAngle + spinAngle) * radius + randomZ

            positions[i3] = x
            positions[i3 + 1] = y
            positions[i3 + 2] = z

            originalPositions[i3] = x
            originalPositions[i3 + 1] = y
            originalPositions[i3 + 2] = z

            // Apply hue shift and saturation to colors
            const colorMix = radius / 10
            const baseR = 0.3 + colorMix * 0.7
            const baseG = 0.5 + colorMix * 0.3
            const baseB = 1.0

            // Simple hue shift (rotate RGB values)
            const hueRad = (hueShift / 360) * Math.PI * 2
            const cosH = Math.cos(hueRad)
            const sinH = Math.sin(hueRad)

            // Luminance preserving color mixing for saturation
            const lum = 0.299 * baseR + 0.587 * baseG + 0.114 * baseB;

            const r = (baseR - lum) * cosH - (baseG - lum) * sinH + lum;
            const g = (baseR - lum) * sinH + (baseG - lum) * cosH + lum;
            const b = baseB; // Keeping blue as is for simplicity in this basic shift

            colors[i3] = baseR * saturation + (1 - saturation) * 0.5
            colors[i3 + 1] = baseG * saturation + (1 - saturation) * 0.5
            colors[i3 + 2] = baseB * saturation + (1 - saturation) * 0.5

            sizes[i] = Math.random() * 30 + 15
            twinkleSpeeds[i] = Math.random() * 2 + 1
        }

        const geometry = new Geometry(gl, {
            position: { size: 3, data: positions },
            color: { size: 3, data: colors },
            size: { size: 1, data: sizes },
        })

        const program = new Program(gl, {
            vertex: `
                precision highp float;
                
                attribute vec3 position;
                attribute vec3 color;
                attribute float size;
                
                uniform mat4 modelViewMatrix;
                uniform mat4 projectionMatrix;
                uniform float uTime;
                uniform float uTwinkleIntensity;
                
                varying vec3 vColor;
                varying float vTwinkle;
                
                void main() {
                    vColor = color;
                    
                    // Twinkle effect
                    vTwinkle = 1.0 - uTwinkleIntensity * 0.5 + uTwinkleIntensity * 0.5 * sin(uTime + position.x * 10.0);
                    
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_Position = projectionMatrix * mvPosition;
                    
                    // Size attenuation
                    gl_PointSize = size * (1.0 / -mvPosition.z) * vTwinkle;
                }
            `,
            fragment: `
                precision highp float;
                
                varying vec3 vColor;
                varying float vTwinkle;
                uniform float uGlowIntensity;
                
                void main() {
                    // Circular particles
                    vec2 center = gl_PointCoord - vec2(0.5);
                    float dist = length(center);
                    
                    if (dist > 0.5) discard;
                    
                    // Soft edges with glow
                    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
                    alpha = pow(alpha, 1.0 - uGlowIntensity);
                    alpha *= vTwinkle;
                    
                    gl_FragColor = vec4(vColor * (1.0 + uGlowIntensity), alpha);
                }
            `,
            uniforms: {
                uTime: { value: 0 },
                uTwinkleIntensity: { value: twinkleIntensity },
                uGlowIntensity: { value: glowIntensity },
            },
            transparent: true,
            depthTest: false,
        })

        const particles = new Mesh(gl, {
            mode: gl.POINTS,
            geometry,
            program,
        })
        particles.setParent(scene)

        // Mouse interaction
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            mousePos.current = {
                x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
                y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
            }
        }

        if (mouseInteraction || mouseRepulsion) {
            window.addEventListener('mousemove', handleMouseMove)
        }

        window.addEventListener('resize', resize)

        // Animation
        let animationFrameId: number
        const animate = (t: number) => {
            animationFrameId = requestAnimationFrame(animate)

            // Rotate galaxy
            particles.rotation.y += rotationSpeed * 0.001 * speed
            particles.rotation.x = Math.sin(t * 0.0001 * speed) * 0.1

            // Update time uniform
            program.uniforms.uTime.value = t * 0.001 * starSpeed * speed

            // Mouse repulsion effect
            if (mouseRepulsion && (mousePos.current.x !== 0 || mousePos.current.y !== 0)) {
                const mouseX = mousePos.current.x * 8
                const mouseY = mousePos.current.y * 8

                for (let i = 0; i < numParticles; i++) {
                    const i3 = i * 3

                    const dx = positions[i3] - mouseX
                    const dy = positions[i3 + 1] - mouseY
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 3) {
                        const force = (1 - distance / 3) * repulsionStrength * 0.1
                        positions[i3] += dx * force
                        positions[i3 + 1] += dy * force
                    }

                    // Return to original position
                    const returnSpeed = 0.05 * (1 + autoCenterRepulsion)
                    positions[i3] += (originalPositions[i3] - positions[i3]) * returnSpeed
                    positions[i3 + 1] += (originalPositions[i3 + 1] - positions[i3 + 1]) * returnSpeed
                    positions[i3 + 2] += (originalPositions[i3 + 2] - positions[i3 + 2]) * returnSpeed
                }

                geometry.attributes.position.needsUpdate = true
            }

            renderer.render({ scene, camera })
        }

        animate(0)

        // Cleanup
        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener('resize', resize)
            if (mouseInteraction || mouseRepulsion) {
                window.removeEventListener('mousemove', handleMouseMove)
            }
            geometry.remove()
            program.remove()
        }
    }, [
        mouseRepulsion,
        mouseInteraction,
        density,
        glowIntensity,
        saturation,
        hueShift,
        twinkleIntensity,
        rotationSpeed,
        repulsionStrength,
        autoCenterRepulsion,
        starSpeed,
        speed
    ])

    return (
        <canvas
            ref={containerRef}
            className="absolute inset-0"
            style={{
                width: '100%',
                height: '100%',
                display: 'block',
                background: 'radial-gradient(ellipse at center, #0a0a1a 0%, #000000 100%)'
            }}
        />
    )
}
