'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface Stage3DCanvasProps {
  className?: string;
  scrollProgress?: number;
  activePreset?: number; // 0: Vedic, 1: Imperial, 2: Floral, 3: Royal Sanctum
}

export const Stage3DCanvas: React.FC<Stage3DCanvasProps> = ({
  className = '',
  scrollProgress = 0,
  activePreset = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(scrollProgress);
  const activePresetRef = useRef(activePreset);

  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    activePresetRef.current = activePreset;
  }, [activePreset]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    if (width === 0 || height === 0) return;

    const mediaQueryReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQueryReducedMotion.matches;

    // 1. Scene & Camera Setup (Composed to offset stage to the right on desktop)
    const isDesktop = width >= 1024;
    const isMobile = width < 768;

    const scene = new THREE.Scene();
    // Fog for deep atmospheric cinematic depth
    scene.fog = new THREE.FogExp2(0x16070B, 0.045);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    // On desktop, target camera so stage sits proudly in the right ~55%
    const defaultCamX = isDesktop ? -1.2 : 0;
    const defaultCamY = 0.6;
    const defaultCamZ = isMobile ? 10.5 : 8.8;
    camera.position.set(defaultCamX, defaultCamY, defaultCamZ);

    // 2. WebGL Renderer with High-Performance Settings
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
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 3. Cinematic Theatrical Lighting System
    // Ambient Soft Warmth
    const ambientLight = new THREE.AmbientLight(0xFFF8ED, 0.5);
    scene.add(ambientLight);

    // Overhead Theatrical Golden Key Spotlight
    const stageSpotLight = new THREE.SpotLight(0xE0C078, 5.0, 35, Math.PI / 3.8, 0.45, 1.4);
    stageSpotLight.position.set(isDesktop ? 2.5 : 0, 9, 5);
    stageSpotLight.target.position.set(isDesktop ? 2.0 : 0, 0, 0);
    scene.add(stageSpotLight);
    scene.add(stageSpotLight.target);

    // Warm Amber Side Key Light
    const warmKeyLight = new THREE.PointLight(0xC6A15B, 2.4, 25);
    warmKeyLight.position.set(isDesktop ? 6.5 : 4, 3.5, 3);
    scene.add(warmKeyLight);

    // Deep Burgundy Atmosphere Fill Light
    const burgundyFillLight = new THREE.PointLight(0x7A1F3D, 3.0, 24);
    burgundyFillLight.position.set(isDesktop ? -5.5 : -3.5, -0.5, 2.5);
    scene.add(burgundyFillLight);

    // Subtle Gold Rim Light Behind Stage
    const rimLight = new THREE.DirectionalLight(0xF3E5AB, 1.2);
    rimLight.position.set(isDesktop ? 3 : 0, 5, -6);
    scene.add(rimLight);

    // 4. Layer 01: Architectural Ground Matrix & Blueprint Floor
    const gridHelper = new THREE.GridHelper(20, 32, 0xC6A15B, 0x350D19);
    gridHelper.position.set(isDesktop ? 1.8 : 0, -2.3, 0);
    const gridMat = gridHelper.material as THREE.Material;
    gridMat.transparent = true;
    gridMat.opacity = 0.18;
    scene.add(gridHelper);

    // 5. Layer 02: Vedic Scenography Stage Structure
    const stageRootGroup = new THREE.Group();
    stageRootGroup.position.set(isDesktop ? 2.0 : 0, 0, 0);

    // Materials
    const darkWoodMat = new THREE.MeshStandardMaterial({
      color: 0x2A0610,
      roughness: 0.4,
      metalness: 0.65,
    });

    const goldPillarMat = new THREE.MeshStandardMaterial({
      color: 0xC6A15B,
      roughness: 0.22,
      metalness: 0.88,
    });

    const wireframeMat = new THREE.MeshStandardMaterial({
      color: 0xE0C078,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    // Four Vedic Temple Columns
    const pillarGeo = new THREE.CylinderGeometry(0.15, 0.19, 4.2, 24);
    const capitalRingGeo = new THREE.TorusGeometry(0.24, 0.05, 12, 24);
    const pedestalGeo = new THREE.BoxGeometry(0.52, 0.28, 0.52);

    const pillarCoords = [
      [-2.4, 0, -1.6],
      [2.4, 0, -1.6],
      [-1.8, 0, 1.1],
      [1.8, 0, 1.1],
    ];

    const pillarsGroup = new THREE.Group();
    pillarCoords.forEach(([px, py, pz]) => {
      const pMesh = new THREE.Mesh(pillarGeo, darkWoodMat);
      pMesh.position.set(px, py, pz);

      // Capital Ring Top
      const capTop = new THREE.Mesh(capitalRingGeo, goldPillarMat);
      capTop.rotation.x = Math.PI / 2;
      capTop.position.set(px, py + 2.05, pz);

      // Capital Ring Mid
      const capMid = new THREE.Mesh(capitalRingGeo, goldPillarMat);
      capMid.rotation.x = Math.PI / 2;
      capMid.scale.set(0.85, 0.85, 0.85);
      capMid.position.set(px, py + 1.25, pz);

      // Base Pedestal
      const base = new THREE.Mesh(pedestalGeo, goldPillarMat);
      base.position.set(px, py - 2.0, pz);

      pillarsGroup.add(pMesh, capTop, capMid, base);
    });
    stageRootGroup.add(pillarsGroup);

    // 6. Layer 03: Architectural Torana Canopy & Royal Gopuram Arches
    const archCurve = new THREE.EllipseCurve(0, 0, 2.6, 2.3, 0, Math.PI, false, 0);
    const archPoints = archCurve.getPoints(48);
    const archGeo = new THREE.BufferGeometry().setFromPoints(archPoints);
    const archLineMat = new THREE.LineBasicMaterial({
      color: 0xE0C078,
      transparent: true,
      opacity: 0.7,
    });

    const frontArch = new THREE.Line(archGeo, archLineMat);
    frontArch.position.set(0, 0.1, 1.1);
    stageRootGroup.add(frontArch);

    const backArch = new THREE.Line(archGeo, archLineMat);
    backArch.position.set(0, 0.1, -1.6);
    backArch.scale.set(1.15, 1.15, 1.15);
    stageRootGroup.add(backArch);

    // Overhead Gopuram Crown Canopy
    const gopuramGeo = new THREE.ConeGeometry(1.5, 1.2, 16, 2, true);
    const gopuramMesh = new THREE.Mesh(gopuramGeo, wireframeMat);
    gopuramMesh.position.set(0, 2.8, -0.25);
    stageRootGroup.add(gopuramMesh);

    // Tiered Circular Stage Platform
    const platformBaseGeo = new THREE.CylinderGeometry(2.4, 2.6, 0.22, 36);
    const platformBaseMesh = new THREE.Mesh(platformBaseGeo, darkWoodMat);
    platformBaseMesh.position.set(0, -2.15, -0.25);

    const platformGoldRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.52, 0.04, 12, 48),
      goldPillarMat
    );
    platformGoldRing.rotation.x = Math.PI / 2;
    platformGoldRing.position.set(0, -2.05, -0.25);
    stageRootGroup.add(platformBaseMesh, platformGoldRing);

    scene.add(stageRootGroup);

    // 7. Layer 04: Theatrical Atmospheric Jasmine Spark Particles
    const particleCount = isMobile ? 30 : 65;
    const particleGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);
    const pSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 14 + (isDesktop ? 2.0 : 0);
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      pSpeeds[i] = Math.random() * 0.0025 + 0.001;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xF3E5AB,
      size: isMobile ? 0.06 : 0.08,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Initial Static Render
    renderer.render(scene, camera);

    // 8. Damped Mouse Parallax Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const { innerWidth, innerHeight } = window;
      mouseX = (e.clientX / innerWidth - 0.5) * 0.8;
      mouseY = (e.clientY / innerHeight - 0.5) * 0.6;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 9. Resize Handling with Projection Recalculation
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;

      const newIsDesktop = newWidth >= 1024;
      const newIsMobile = newWidth < 768;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      // Recalculate camera position offset
      const newCamX = newIsDesktop ? -1.2 : 0;
      const newCamZ = newIsMobile ? 10.5 : 8.8;
      camera.position.x = newCamX;
      camera.position.z = newCamZ;
      stageRootGroup.position.x = newIsDesktop ? 2.0 : 0;

      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, newIsMobile ? 1.25 : 1.75));

      if (prefersReducedMotion) {
        renderer.render(scene, camera);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // 10. Animation Loop with Cinematic Interpolation
    let animationFrameId: number | null = null;
    let isRunning = false;
    let isTabVisible = !document.hidden;
    let isIntersecting = true;
    const clock = new THREE.Clock();

    let currentCamZ = defaultCamZ;
    let currentCamY = defaultCamY;
    let currentRotationY = 0;

    const animate = () => {
      if (!isRunning) return;

      const elapsedTime = clock.getElapsedTime();
      const progress = scrollProgressRef.current; // 0.0 to 1.0
      const preset = activePresetRef.current;

      // Damped Pointer Tracking
      targetMouseX += (mouseX - targetMouseX) * 0.04;
      targetMouseY += (mouseY - targetMouseY) * 0.04;

      // Scroll-Driven Camera & Stage Trajectory:
      // Smoothly tracks the 6-state progression (Arrival -> Structure -> Light -> Floral -> Scenography -> Transition)
      const baseCamZ = isMobile ? 10.5 : 8.8;
      const targetCamZ = THREE.MathUtils.lerp(baseCamZ, baseCamZ - 1.4, Math.min(progress * 1.4, 1.0));
      const targetCamY = THREE.MathUtils.lerp(0.6, 0.95, Math.sin(progress * Math.PI));
      
      // Preset subtle yaw offsets (Vedic, Imperial, Floral, Royal Sanctum)
      const presetYaw = [0, 0.08, -0.06, 0.04][preset] || 0;
      const targetRotY = Math.sin(elapsedTime * 0.2) * 0.03 + (progress * 0.22) + presetYaw;

      currentCamZ += (targetCamZ - currentCamZ) * 0.05;
      currentCamY += (targetCamY - currentCamY) * 0.05;
      currentRotationY += (targetRotY - currentRotationY) * 0.04;

      const camBaseX = isDesktop ? -1.2 : 0;
      camera.position.x = camBaseX + targetMouseX * 0.8;
      camera.position.y = currentCamY - targetMouseY * 0.5;
      camera.position.z = currentCamZ;
      camera.lookAt(isDesktop ? 1.2 : 0, 0.05, -0.2);

      // Subtle Stage Root Breathing
      stageRootGroup.rotation.y = currentRotationY;
      stageRootGroup.position.y = Math.sin(elapsedTime * 0.35) * 0.03;

      // Dynamic Spot Light Pulsing
      stageSpotLight.intensity = 4.5 + Math.sin(elapsedTime * 1.0) * 0.5;
      warmKeyLight.position.x = (isDesktop ? 6.5 : 4) + Math.sin(elapsedTime * 0.4) * 0.6;

      // Atmospheric Jasmine Particle Elevation
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
      capitalRingGeo.dispose();
      pedestalGeo.dispose();
      archGeo.dispose();
      gopuramGeo.dispose();
      platformBaseGeo.dispose();
      particleGeo.dispose();

      // Dispose Materials
      darkWoodMat.dispose();
      goldPillarMat.dispose();
      wireframeMat.dispose();
      archLineMat.dispose();
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
