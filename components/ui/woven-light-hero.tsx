"use client";

import React, { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import * as THREE from "three";

// --- Hiring-focused split hero -------------------------------------------
// Layout: left content (55-60%) + right WovenCanvas visual (40-45%).
// The hero is intentionally locked to a dark surface in both themes so the
// role, proof and CTAs stay readable during screen-share. Canvas is sized to
// its own container (not the window) and fades toward the text column.

export interface HeroStat {
  value: string;
  label: string;
}

interface WovenLightHeroProps {
  name?: string;
  role?: string;
  proof?: string;
  availability?: string;
  primaryCta?: string;
  onPrimaryCta?: () => void;
  secondaryCtaHref?: string;
  githubHref?: string;
  linkedinHref?: string;
  stats?: HeroStat[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
  }),
};

export const WovenLightHero = ({
  name = "Abhishek Gharat",
  role = "Frontend Developer — React, Next.js, React Flow",
  proof = "Building production-ready interfaces, workflow systems, and data-driven web experiences.",
  availability = "● Open to Frontend Roles · Mumbai / Remote",
  primaryCta = "View My Work",
  onPrimaryCta,
  secondaryCtaHref = "/resume",
  githubHref = "https://github.com/Abhishek-Gharat",
  linkedinHref = "https://www.linkedin.com/in/abhishek-gharat-922237218/",
  stats = [],
}: WovenLightHeroProps = {}) => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative w-full overflow-hidden bg-[#09090b] text-white">
      {/* Base depth — subtle emerald wash, never behind text at full strength */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_80%_at_12%_18%,rgba(16,185,129,0.10),transparent_52%),radial-gradient(90%_90%_at_88%_45%,rgba(255,255,255,0.05),transparent_55%)]"
      />

      <div className="relative mx-auto grid min-h-[100svh] w-full max-w-6xl grid-cols-1 items-center gap-10 px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6 lg:pb-24 lg:pt-36">
        {/* ---- Left: hiring content (55-60%) ---- */}
        <div className="max-w-xl">
          <motion.p
            variants={fadeUp}
            initial={reduceMotion ? "visible" : "hidden"}
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-emerald-300"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {availability.replace(/^●\s*/, "")}
          </motion.p>

          {/* Name is visual lead; the h1 is the role so recruiters + SEO scan it first */}
          <motion.p
            variants={fadeUp}
            initial={reduceMotion ? "visible" : "hidden"}
            animate="visible"
            custom={0.08}
            className="mt-6 text-[clamp(2.25rem,4.5vw,3.75rem)] font-extrabold leading-[1.02] tracking-tight text-white"
          >
            {name}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial={reduceMotion ? "visible" : "hidden"}
            animate="visible"
            custom={0.16}
            className="mt-3 text-[clamp(1.25rem,2.2vw,1.75rem)] font-bold leading-snug tracking-tight text-zinc-100"
          >
            {role}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial={reduceMotion ? "visible" : "hidden"}
            animate="visible"
            custom={0.24}
            className="mt-4 max-w-lg text-base leading-7 text-zinc-400 sm:text-lg"
          >
            {proof}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial={reduceMotion ? "visible" : "hidden"}
            animate="visible"
            custom={0.32}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={onPrimaryCta}
              className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090b]"
            >
              {primaryCta}
            </button>
            <a
              href={secondaryCtaHref}
              className="rounded-full border border-white/25 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090b]"
            >
              Download Resume
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial={reduceMotion ? "visible" : "hidden"}
            animate="visible"
            custom={0.4}
            className="mt-5 flex items-center gap-5 text-sm font-medium text-zinc-400"
          >
            <a
              href={githubHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090b] rounded"
            >
              GitHub
            </a>
            <a
              href={linkedinHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090b] rounded"
            >
              LinkedIn
            </a>
          </motion.div>

          {stats.length > 0 && (
            <motion.dl
              variants={fadeUp}
              initial={reduceMotion ? "visible" : "hidden"}
              animate="visible"
              custom={0.48}
              className="mt-10 grid max-w-md grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-6"
            >
              {stats.map((s) => (
                <div key={s.label} className="px-4 first:pl-0 last:pr-0">
                  <dt className="order-2 mt-1 text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">
                    {s.label}
                  </dt>
                  <dd className="order-1 text-xl font-bold text-white">{s.value}</dd>
                </div>
              ))}
            </motion.dl>
          )}
        </div>

        {/* ---- Right: supporting visual (40-45%) ---- */}
        <div className="relative h-[320px] w-full sm:h-[380px] lg:h-[520px]">
          <div className="absolute inset-0 overflow-hidden rounded-3xl border border-white/10 bg-black">
            <WovenCanvas />
            {/* Fade toward the text column so no bright cluster sits behind copy */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#09090b] via-[#09090b]/35 to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09090b]/70 via-transparent to-[#09090b]/30"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Three.js canvas ------------------------------------------------------
// Container-sized renderer. Desktop ~15k particles at 0.5 opacity (was 50k @
// 0.8 fullscreen). Mobile / reduced-motion render fewer, static particles.

const DESKTOP_PARTICLES = 15000;
const MOBILE_PARTICLES = 6000;
const STATIC_PARTICLES = 4000;

const WovenCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const host = mount.parentElement ?? mount;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const particleCount = reduceMotion
      ? STATIC_PARTICLES
      : isMobile
        ? MOBILE_PARTICLES
        : DESKTOP_PARTICLES;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 1.75));
    mount.appendChild(renderer.domElement);

    const resize = () => {
      const w = host.clientWidth || 1;
      const h = host.clientHeight || 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    // Bright weave on the locked dark surface.
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const geometry = new THREE.BufferGeometry();
    const torusKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32);
    const color = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      const vertexIndex = i % torusKnot.attributes.position.count;
      const x = torusKnot.attributes.position.getX(vertexIndex);
      const y = torusKnot.attributes.position.getY(vertexIndex);
      const z = torusKnot.attributes.position.getZ(vertexIndex);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      color.setHSL(Math.random(), 0.8, 0.7);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.5,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const mouse = new THREE.Vector2(0, 0);
    const onMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      if (rect.width === 0) return;
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };
    if (!reduceMotion) window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Scratch objects hoisted out of the per-particle loop.
    const currentPos = new THREE.Vector3();
    const originalPos = new THREE.Vector3();
    const velocity = new THREE.Vector3();
    const direction = new THREE.Vector3();
    const returnForce = new THREE.Vector3();
    const mouseWorld = new THREE.Vector3();

    let raf = 0;
    let visible = true;
    const startTime = performance.now();

    const io = new IntersectionObserver(
      ([entry]) => {
        const nowVisible = entry.isIntersecting && document.visibilityState === "visible";
        if (nowVisible && !visible) {
          visible = true;
          raf = requestAnimationFrame(animate);
        } else if (!nowVisible && visible) {
          visible = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.05 }
    );
    io.observe(mount);

    const onVisibility = () => {
      if (document.visibilityState !== "visible") {
        visible = false;
        cancelAnimationFrame(raf);
      } else {
        const rect = mount.getBoundingClientRect();
        const inView = rect.bottom > 0 && rect.top < window.innerHeight;
        if (inView && !visible && !reduceMotion) {
          visible = true;
          raf = requestAnimationFrame(animate);
        }
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const animate = () => {
      if (!visible) return;
      raf = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) / 1000;

      mouseWorld.set(mouse.x * 3, mouse.y * 3, 0);

      const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        currentPos.set(arr[ix], arr[iy], arr[iz]);
        originalPos.set(originalPositions[ix], originalPositions[iy], originalPositions[iz]);
        velocity.set(velocities[ix], velocities[iy], velocities[iz]);

        const dist = currentPos.distanceTo(mouseWorld);
        if (dist < 1.5) {
          const force = (1.5 - dist) * 0.01;
          direction.subVectors(currentPos, mouseWorld).normalize();
          velocity.addScaledVector(direction, force);
        }

        returnForce.subVectors(originalPos, currentPos).multiplyScalar(0.001);
        velocity.add(returnForce);
        velocity.multiplyScalar(0.95);

        arr[ix] += velocity.x;
        arr[iy] += velocity.y;
        arr[iz] += velocity.z;

        velocities[ix] = velocity.x;
        velocities[iy] = velocity.y;
        velocities[iz] = velocity.z;
      }
      posAttr.needsUpdate = true;

      points.rotation.y = elapsed * 0.05;
      renderer.render(scene, camera);
    };

    if (reduceMotion) {
      // Single static frame — no loop, no motion cost.
      renderer.render(scene, camera);
    } else {
      animate();
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (!reduceMotion) window.removeEventListener("mousemove", onMouseMove);
      scene.remove(points);
      geometry.dispose();
      material.dispose();
      torusKnot.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />;
};
