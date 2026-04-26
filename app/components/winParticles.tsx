import { Particle } from "@/data/types/particles.type";
import { useEffect, useRef, useState } from "react";

const colors = ["var(--balatro-red)", "var(--balatro-blue)", "var(--money-yellow)"]

export default function WinParticles({ originRef }: { originRef: React.RefObject<HTMLDivElement | null> }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const particles = useRef<Particle[]>([])
  const lastSpawn = useRef(0)
  const [tick, setTick] = useState(0)
  
  useEffect(() => {
    if (!originRef.current || !containerRef.current) return;
    
    const originRect = originRef.current.getBoundingClientRect();
    const originX = originRect.left + originRect.width / 2;
    const originY = originRect.top + originRect.height / 2;
    let animationFrame: number;
    
    const createParticle = (): Particle => {
      const colorIndex = Math.floor(Math.random() * colors.length);
      const rotationAngle = Math.floor(Math.random() * 90);
      const vectorAngle = Math.random() * Math.PI * 2;
      const size = Math.floor(Math.random() * 30);

      return {
        x: originX,
        y: originY,
        vx: Math.cos(vectorAngle) / 2,
        vy: Math.sin(vectorAngle) / 2,
        rotation: rotationAngle,
        color: colors[colorIndex],
        opacity: 1,
        size: size
      }
    }

    const animate = (time: number) => {
      if (time - lastSpawn.current > 60) {
        for (let i = 0; i < 1; i++) {
          if (particles.current.length < 50) {
            particles.current.push(createParticle());
          }
        }
        lastSpawn.current = time;
      }

      particles.current = particles.current.map(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        const isOutside = 
          particle.x < originRect.left ||
          particle.x > originRect.right ||
          particle.y < originRect.top ||
          particle.y > originRect.bottom;

        if (isOutside) {
          particle.opacity -= 0.007;
        }

        return particle;
      }).filter(particle => 
        particle.opacity > 0
      )
      
      setTick((t) => t + 1);
      animationFrame = requestAnimationFrame(animate);
    }
    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame)
  }, [originRef])

  return (
    <div ref={containerRef}  className="fixed">
      {particles.current.map((particle, i) => (
          <div
            key={i}
            style={{
              position: "fixed",
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              transform: `rotate(${particle.rotation}deg)`,
              opacity: particle.opacity,
              pointerEvents: "none",
            }}
          />
        ))}
    </div>
  );
}