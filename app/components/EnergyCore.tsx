"use client";

import { useState } from "react";

const MODES = ["electric", "violet", "solar"] as const;

export default function EnergyCore() {
  const [mode, setMode] = useState(0);

  const shiftField = () => {
    setMode((current) => (current + 1) % MODES.length);
  };

  const moveField = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--energy-x", `${x * 12}px`);
    event.currentTarget.style.setProperty("--energy-y", `${y * 12}px`);
  };

  const resetField = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--energy-x", "0px");
    event.currentTarget.style.setProperty("--energy-y", "0px");
  };

  return (
    <div
      className="energy-scene"
      data-mode={MODES[mode]}
      onPointerMove={moveField}
      onPointerLeave={resetField}
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
