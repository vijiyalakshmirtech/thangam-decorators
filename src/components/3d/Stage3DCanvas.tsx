'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Stage3DCanvasProps {
  className?: string;
  scrollProgress?: number;
}

export const Stage3DCanvas: React.FC<Stage3DCanvasProps> = ({
  className = '',
  scrollProgress = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(scrollProgress);

  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    if (width === 0 || height === 0) return;

    const mediaQueryReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = mediaQueryReducedMotion.matches;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 9.5);

    // 2. WebGL Renderer with Safe Device Pixel Ratio
    const isMobile = width < 768;
    const maxPixelRatio = isMobile ? 1.25 : 1.75;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxPixelRatio));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 3. Cinematic Lighting System (Studio Ambience + Stage Key Lights)
    const ambientLight = new THREE.AmbientLight(0xFFF8ED, 0.8);
    scene.add(ambientLight);

    const goldSpotLight = new THREE.SpotLight(0xE0C078, 4.0, 30, Math.PI / 4, 0.4, 1.2);
    goldSpotLight.position.set(0, 8, 6);
    scene.add(goldSpotLight);

    const warmKeyLight = new THREE.PointLight(0xC6A15B, 2.5, 25);
    warmKeyLight.position.set(4, 3, 4);
    scene.add(warmKeyLight);

    const burgundyFillLight = new THREE.PointLight(0x7A1F3D, 2.8, 22);
    burgundyFillLight.position.set(-4, -1, 3);
    scene.add(burgundyFillLight);

    // 4. Layer 01: Architectural Ground Matrix & Blueprint Grid
    const gridHelper = new THREE.GridHelper(16, 24, 0xC6A15B, 0x4A0E1B);
    gridHelper.position.y = -2.2;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.25;
    scene.add(gridHelper);

    // 5. Layer 02: Vedic Mandapam Pillars & Gopuram Canopy Group
    const stageStructureGroup = new THREE.Group();

    // Pillar Geometry & Material
    const pillarGeo = new THREE.CylinderGeometry(0.16, 0.2, 4.2, 24);
    const pillarCapitalGeo = new THREE.TorusGeometry(0.24, 0.05, 12, 24);
    const pillarBaseGeo = new THREE.BoxGeometry(0.55, 0.25, 0.55);

    const pillarMat = new THREE.MeshStandardMaterial({
      color: 0x4A0E1B,
      roughness: 0.35,
      metalness: 0.6,
    });

    const goldAccentMat = new THREE.MeshStandardMaterial({
      color: 0xC6A15B,
      roughness: 0.25,
      metalness: 0.85,
    });

    const pillarPositions = [
      [-3.2, 0, -1.8],
      [3.2, 0, -1.8],
      [-2.4, 0, 1.2],
      [2.4, 0, 1.2],
    ];

    pillarPositions.forEach(([x, y, z]) => {
      const pMesh = new THREE.Mesh(pillarGeo, pillarMat);
      pMesh.position.set(x, y, z);

      // Capital Ring Top
      const capTop = new THREE.Mesh(pillarCapitalGeo, goldAccentMat);
      capTop.rotation.x = Math.PI / 2;
      capTop.position.set(x, y + 2.05, z);

      // Capital Ring Mid
      const capMid = new THREE.Mesh(pillarCapitalGeo, goldAccentMat);
      capMid.rotation.x = Math.PI / 2;
      capMid.scale.set(0.9, 0.9, 0.9);
      capMid.position.set(x, y + 1.2, z);

      // Pillar Base
      const base = new THREE.Mesh(pillarBaseGeo, goldAccentMat);
      base.position.set(x, y - 2.0, z);

      stageStructureGroup.add(pMesh, capTop, capMid, base);
    });

    // 6. Layer 03: Architectural Torana Canopy & Royal Gopuram Arches
    const archCurve = new THREE.EllipseCurve(0, 0, 3.2, 2.6, 0, Math.PI, false, 0);
    const archPoints = archCurve.getPoints(50);
    const archGeo = new THREE.BufferGeometry().setFromPoints(archPoints);
    const archLineMat = new THREE.LineBasicMaterial({
      color: 0xE0C078,
      transparent: true,
      opacity: 0.6,
    });

    const frontArch = new THREE.Line(archGeo, archLineMat);
    frontArch.position.set(0, 0.2, 1.2);
    stageStructureGroup.add(frontArch);

    const backArch = new THREE.Line(archGeo, archLineMat);
    backArch.position.set(0, 0.2, -1.8);
    backArch.scale.set(1.15, 1.15, 1.15);
    stageStructureGroup.add(backArch);

    // Overhead Crown Dome
    const domeGeo = new THREE.ConeGeometry(1.6, 1.2, 16, 2, true);
    const domeMat = new THREE.MeshStandardMaterial({
      color: 0xC6A15B,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const domeMesh = new THREE.Mesh(domeGeo, domeMat);
    domeMesh.position.set(0, 2.8, -0.3);
    stageStructureGroup.add(domeMesh);

    // Center Stage Couple Platform
    const platformGeo = new THREE.CylinderGeometry(2.4, 2.6, 0.2, 32);
    const platformMat = new THREE.MeshStandardMaterial({
      color: 0x3B0D18,
      roughness: 0.4,
      metalness: 0.5,
    });
    const platformMesh = new THREE.Mesh(platformGeo, platformMat);
    platformMesh.position.set(0, -2.1, -0.3);

    const platformRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.5, 0.04, 12, 48),
      goldAccentMat
    );
    platformRing.rotation.x = Math.PI / 2;
    platformRing.position.set(0, -2.0, -0.3);
    stageStructureGroup.add(platformMesh, platformRing);

    scene.add(stageStructureGroup);

    // 7. Layer 04: Floating Jasmine Blossom Spark Particles
    const particleCount = isMobile ? 35 : 75;
    const particleGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);
    const pSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 12;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      pSpeeds[i] = Math.random() * 0.003 + 0.0015;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xF3E5AB,
      size: isMobile ? 0.07 : 0.09,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Initial Static Render
    renderer.render(scene, camera);

    // 8. Mouse & Pointer Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const { innerWidth, innerHeight } = window;
      mouseX = (e.clientX / innerWidth - 0.5) * 1.2;
      mouseY = (e.clientY / innerHeight - 0.5) * 1.0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 9. Resize Handling
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, newWidth < 768 ? 1.25 : 1.75));

      if (prefersReducedMotion) {
        renderer.render(scene, camera);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // 10. Animation Loop with Scroll-Driven Interpolation
    let animationFrameId: number | null = null;
    let isRunning = false;
    let isTabVisible = !document.hidden;
    let isIntersecting = true;
    const clock = new THREE.Clock();

    let currentCamZ = 9.5;
    let currentCamY = 0.5;
    let currentRotationY = 0;

    const animate = () => {
      if (!isRunning) return;

      const elapsedTime = clock.getElapsedTime();
      const progress = scrollProgressRef.current; // 0.0 to 1.0

      // Damped Pointer Tracking
      targetMouseX += (mouseX - targetMouseX) * 0.05;
      targetMouseY += (mouseY - targetMouseY) * 0.05;

      // Scroll-Linked Camera Trajectory:
      // Entry (0.0): z=9.5, y=0.5 -> Structure (0.4): z=7.5, y=0.8 -> Sanctum (1.0): z=8.5, y=0.2
      const targetCamZ = THREE.MathUtils.lerp(9.5, 7.8, Math.min(progress * 1.5, 1.0));
      const targetCamY = THREE.MathUtils.lerp(0.5, 0.9, Math.sin(progress * Math.PI));
      const targetRotY = Math.sin(elapsedTime * 0.25) * 0.04 + (progress * 0.25);

      currentCamZ += (targetCamZ - currentCamZ) * 0.06;
      currentCamY += (targetCamY - currentCamY) * 0.06;
      currentRotationY += (targetRotY - currentRotationY) * 0.05;

      camera.position.x = targetMouseX * 1.4;
      camera.position.y = currentCamY - targetMouseY * 0.8;
      camera.position.z = currentCamZ;
      camera.lookAt(0, 0.1, -0.3);

      // Subtle Structural Breathing Motion
      stageStructureGroup.rotation.y = currentRotationY;
      stageStructureGroup.position.y = Math.sin(elapsedTime * 0.4) * 0.04;

      // Dynamic Spot Light Pulsing
      goldSpotLight.intensity = 3.5 + Math.sin(elapsedTime * 1.2) * 0.6;
      warmKeyLight.position.x = 4 + Math.sin(elapsedTime * 0.5) * 1.0;

      // Particle Floating Elevation
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        let py = posAttr.getY(i);
        py += pSpeeds[i];
        if (py > 4.5) py = -4.5;
        posAttr.setY(i, py);
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (isRunning || prefersReducedMotion || !isTabVisible || !isIntersecting) return;
      isRunning = true;
      clock.start();
      animationFrameId = requestAnimationFrame(animate);
    };

    const stopAnimation = () => {
      if (!isRunning) return;
      isRunning = false;
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      clock.stop();
    };

    // 11. Visibility Change & IntersectionObserver
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && isIntersecting && !prefersReducedMotion) {
        startAnimation();
      } else {
        stopAnimation();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    let observer: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          isIntersecting = entry.isIntersecting;
          if (isIntersecting && isTabVisible && !prefersReducedMotion) {
            startAnimation();
          } else {
            stopAnimation();
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(container);
    } else {
      startAnimation();
    }

    if (!prefersReducedMotion && isTabVisible) {
      startAnimation();
    }

    // 12. Complete GPU Memory Disposal on Unmount
    return () => {
      stopAnimation();

      if (observer) observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      renderer.forceContextLoss();

      // Dispose Geometries
      pillarGeo.dispose();
      pillarCapitalGeo.dispose();
      pillarBaseGeo.dispose();
      archGeo.dispose();
      domeGeo.dispose();
      platformGeo.dispose();
      particleGeo.dispose();

      // Dispose Materials
      pillarMat.dispose();
      goldAccentMat.dispose();
      archLineMat.dispose();
      domeMat.dispose();
      platformMat.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
};

export default Stage3DCanvas;
