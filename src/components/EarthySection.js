"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function EarthySection() {
  const sectionRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const elements = elementsRef.current;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const moveX = (clientX - centerX) / centerX;
      const moveY = (clientY - centerY) / centerY;

      elements.forEach((el) => {
        const depth = el.dataset.depth;
        const x = -moveX * 30 * depth;
        const y = -moveY * 30 * depth;

        gsap.to(el, {
          x,
          y,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    };

    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="earthy-section" ref={sectionRef}>
      <div className="container text-center">
        
      </div>
      <div
        className="bg-map"
        data-depth=".5"
        ref={(el) => (elementsRef.current[0] = el)}
      >
        <img src="/world-map.svg" alt="Map" />
      </div>

      <img
        src="/earth.png"
        alt="Earth"
        className="earth-image"
        data-depth="1"
        ref={(el) => (elementsRef.current[1] = el)}
      />

      <div
        className="text-container container"
      >
        <h2>Earthy Project Benefits</h2>
        <p>
          We are committed to preserving our planet through sustainable practices and eco-friendly innovations.
        </p>

        <div className="benefits">
          {[
            { icon: "/icon1.svg", text: "Use compostable materials to reduce waste in nature" },
            { icon: "/icon2.svg", text: "Maintain a sustainable living planet using recyclable materials only" },
            { icon: "/icon3.svg", text: "Bioplastics made from plants and biodegradable substances" },
            { icon: "/icon4.svg", text: "Cooperate with like-minded business partners to ensure every step is compliance with the lawful rules of Australia." },
          ].map((item, i) => (
            <div
              className="benefit"
              key={i}
              data-depth=".5"
              ref={(el) => (elementsRef.current[i + 3] = el)}
            >
              <div className="icon">
                   <img src={item.icon} alt={item.text} />
              </div>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
