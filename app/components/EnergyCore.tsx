"use client";

import { useEffect, useState } from "react";
import { useSpatialMotion } from "./useInView";

const MODES = ["electric", "violet", "solar"] as const;

export default function EnergyCore() {
  const [mode, setMode] = useState(0);
  const [sceneRef, visible] = useSpatialMotion<HTMLDivElement>(4.5, 5, 22);

  const shiftField = () => {
    setMode((current) => (current + 1) % MODES.length);
  };

  return (
    <div
      ref={sceneRef}
      className="energy-scene"
      data-mode={MODES[mode]}
      data-visible={visible}
    >
      <button
        className="energy-control"
        type="button"
        onClick={shiftField}
        aria-label="Shift the energy field color"
        title="Shift the energy field"
      >
        <span className="energy-halo" />
        <span className="energy-ring energy-ring--outer"><i /></span>
        <span className="energy-ring energy-ring--middle"><i /></span>
        <span className="energy-ring energy-ring--inner" />
        <span className="energy-slice" />
        <span className="energy-core"><i /></span>
        <span className="energy-dust" />
      </button>
      <p className="energy-caption">
        <span /> ENERGY FIELD <i /> CLICK TO SHIFT
      </p>
    </div>
  );
}
