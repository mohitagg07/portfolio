"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const hash = (x: number, y: number, z: number) => {
  const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return s - Math.floor(s);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
function noise(x: number, y: number, z: number) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const xf = x - xi, yf = y - yi, zf = z - zi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf), w = zf * zf * (3 - 2 * zf);
  const f = (a: number, b: number, c: number) => hash(xi + a, yi + b, zi + c);
  return lerp(
    lerp(lerp(f(0, 0, 0), f(1, 0, 0), u), lerp(f(0, 1, 0), f(1, 1, 0), u), v),
    lerp(lerp(f(0, 0, 1), f(1, 0, 1), u), lerp(f(0, 1, 1), f(1, 1, 1), u), v),
    w
  );
}
function fbm(x: number, y: number, z: number) {
  let a = 0.5, f = 1, sum = 0, norm = 0;
  for (let i = 0; i < 4; i++) { sum += a * noise(x * f, y * f, z * f); norm += a; a /= 2; f *= 2; }
  return sum / norm;
}

// deep water, shallow water, sand, land, rock, peak
const WORLDS = [
  ["#1b2f8a", "#2aa6b8", "#e0c27a", "#3f9b45", "#8a6a3d", "#f4f7fb"],
  ["#2b1a6b", "#5b6fe0", "#f0b36a", "#c9622f", "#7a3b2a", "#f6e6d0"],
  ["#10384f", "#27c2a4", "#d9f2c2", "#7a5cd6", "#4a3a8f", "#ffffff"],
];

function makePlanet(detail: number) {
  const off = new THREE.Vector3(Math.random() * 100, Math.random() * 100, Math.random() * 100);
  const pal = WORLDS[Math.floor(Math.random() * WORLDS.length)].map((c) => new THREE.Color(c));
  const geo = new THREE.IcosahedronGeometry(1, detail);
  const pos = geo.attributes.position;
  const col = new Float32Array(pos.count * 3);
  const v = new THREE.Vector3();
  const c = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i).normalize();
    const h = fbm(v.x * 1.8 + off.x, v.y * 1.8 + off.y, v.z * 1.8 + off.z);
    v.multiplyScalar(1 + Math.max(h - 0.5, 0) * 0.28);
    pos.setXYZ(i, v.x, v.y, v.z);
    if (h < 0.4) c.copy(pal[0]);
    else if (h < 0.5) c.copy(pal[0]).lerp(pal[1], (h - 0.4) / 0.1);
    else if (h < 0.53) c.copy(pal[2]);
    else if (h < 0.62) c.copy(pal[3]);
    else if (h < 0.7) c.copy(pal[4]);
    else c.copy(pal[5]);
    col.set([c.r, c.g, c.b], i * 3);
  }
  geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  geo.computeVertexNormals();
  return new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 1 }));
}

export default function Planet() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const small = window.innerWidth < 768;
    const detail = small ? 14 : 22;
    const renderer = new THREE.WebGLRenderer({ antialias: !small, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1 : 1.5));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 20);
    camera.position.z = 5;
    scene.add(new THREE.AmbientLight(0x8899bb, 0.9));
    const sun = new THREE.DirectionalLight(0xffffff, 2.2);
    sun.position.set(3, 2, 4);
    scene.add(sun);
    scene.add(new THREE.Mesh(
      new THREE.SphereGeometry(1.14, 48, 48),
      new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.07, side: THREE.BackSide })
    ));

    const group = new THREE.Group();
    group.rotation.z = 0.2;
    scene.add(group);
    let planet = makePlanet(detail);
    group.add(planet);
    let born = performance.now();

    const resize = () => {
      renderer.setSize(el.clientWidth, el.clientHeight);
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    let dragging = false, moved = 0, lastX = 0, lastY = 0;
    const canvas = renderer.domElement;
    const down = (e: PointerEvent) => { dragging = true; moved = 0; lastX = e.clientX; lastY = e.clientY; };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      moved += Math.abs(dx) + Math.abs(dy);
      group.rotation.y += dx * 0.008;
      group.rotation.x = Math.max(-0.8, Math.min(0.8, group.rotation.x + dy * 0.005));
      lastX = e.clientX; lastY = e.clientY;
    };
    const up = () => {
      if (dragging && moved < 6) {
        group.remove(planet);
        planet.geometry.dispose();
        (planet.material as THREE.Material).dispose();
        planet = makePlanet(detail);
        group.add(planet);
        born = performance.now();
      }
      dragging = false;
    };
    canvas.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(el);
    let raf = 0;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      if (!dragging && !reduce) group.rotation.y += 0.0025;
      const k = Math.min((t - born) / 700, 1);
      planet.scale.setScalar(Math.max(1 - Math.pow(1 - k, 3), 0.001));
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      planet.geometry.dispose();
      renderer.dispose();
      el.removeChild(canvas);
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <div ref={ref} className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing" />
      <p className="pointer-events-none absolute bottom-8 left-1/2 w-full -translate-x-1/2 px-6 text-center text-sm text-[var(--fg-muted)]">
        This world was made just for you. Tap it to make another.
      </p>
    </div>
  );
}
