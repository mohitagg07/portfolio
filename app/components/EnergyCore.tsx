"use client";

import { useSpatialMotion } from "./useInView";

export default function EnergyCore() {
  const [sceneRef, visible] = useSpatialMotion<HTMLDivElement>(2.4, 3, 8);

  return (
    <div ref={sceneRef} className="hero-art" data-visible={visible} aria-hidden="true">
      <div className="hero-art__aura" aria-hidden="true" />
      <div className="hero-art__body">
        <span className="hero-art__ribbon hero-art__ribbon--one" />
        <span className="hero-art__ribbon hero-art__ribbon--two" />
        <span className="hero-art__ribbon hero-art__ribbon--three" />
        <span className="hero-art__flare" />
        <span className="hero-art__spark hero-art__spark--one" />
        <span className="hero-art__spark hero-art__spark--two" />
        <span className="hero-art__spark hero-art__spark--three" />
      </div>
      <p className="hero-art__caption"><span /> SYSTEMS IN MOTION <i /> IDEAS INTO REALITY</p>
    </div>
  );
}
