import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Stage3DCanvasProps {
  className?: string;
}

export const Stage3DCanvas: React.FC<Stage3DCanvasProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check dimensions
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    if (width === 0 || height === 0) return;

    // Reduced motion preference
    const mediaQueryReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = mediaQueryReducedMotion.matches;

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion) {
        stopAnimation();
        // Render one static frame
        renderer.render(scene, camera);
      } else {
        startAnimation();
      }
    };
    mediaQueryReducedMotion.addEventListener('change', handleReducedMotionChange);

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 10);

    // 2. Optimized WebGL Renderer with Capped Pixel Ratio
    const isMobile = width < 768;
    const maxPixelRatio = isMobile ? 1.5 : 1.75;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile, // antialias on desktop, disabled on mobile for max GPU efficiency
        powerPreference: 'high-performance',
      });
    } catch (e) {
      // Fallback in case WebGL is unavailable
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxPixelRatio));
    container.appendChild(renderer.domElement);

    // 3. Warm Ambient and Point Lighting
    const ambientLight = new THREE.AmbientLight(0xFFF8ED, 1.0);
    scene.add(ambientLight);

    const warmPointLight = new THREE.PointLight(0x8B3A4E, 2.5, 22);
    warmPointLight.position.set(2, 3, 4);
    scene.add(warmPointLight);

    const burgundyPointLight = new THREE.PointLight(0x6E1830, 2.0, 20);
    burgundyPointLight.position.set(-3, -2, 2);
    scene.add(burgundyPointLight);

    // 4. Floating Particles / Jasmine Sparks
    const particleCount = isMobile ? 25 : 60;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      speeds[i] = Math.random() * 0.003 + 0.0015;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xFFF8ED,
      size: isMobile ? 0.08 : 0.1,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 5. Geometric Arches / Torana Silhouette Wireframes
    const archGroup = new THREE.Group();

    // Outer Arch
    const outerCurve = new THREE.EllipseCurve(0, 0, 4.5, 3.8, 0, Math.PI, false, 0);
    const outerPoints = outerCurve.getPoints(40);
    const outerGeo = new THREE.BufferGeometry().setFromPoints(outerPoints);
    const outerLineMat = new THREE.LineBasicMaterial({
      color: 0xFFF8ED,
      transparent: true,
      opacity: 0.15,
    });
    const outerArch = new THREE.Line(outerGeo, outerLineMat);
    archGroup.add(outerArch);

    // Inner Arch
    const innerCurve = new THREE.EllipseCurve(0, 0, 3.8, 3.2, 0, Math.PI, false, 0);
    const innerPoints = innerCurve.getPoints(40);
    const innerGeo = new THREE.BufferGeometry().setFromPoints(innerPoints);
    const innerLineMat = new THREE.LineBasicMaterial({
      color: 0xFFF8ED,
      transparent: true,
      opacity: 0.12,
    });
    const innerArch = new THREE.Line(innerGeo, innerLineMat);
    archGroup.add(innerArch);

    // Central Subtle Mandala Ring
    const ringGeo = new THREE.RingGeometry(1.6, 1.63, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xFFF8ED,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.15,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.set(0, 1.8, -0.5);
    archGroup.add(ringMesh);

    archGroup.position.set(0, -1.2, -1);
    scene.add(archGroup);

    // Initial static frame render
    renderer.render(scene, camera);

    // 6. Interactive Mouse Parallax (Passive & Throttled)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const { innerWidth, innerHeight } = window;
      mouseX = (e.clientX / innerWidth - 0.5) * 1.0;
      mouseY = (e.clientY / innerHeight - 0.5) * 1.0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 7. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, newWidth < 768 ? 1.5 : 1.75));

      if (prefersReducedMotion) {
        renderer.render(scene, camera);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // 8. Animation Loop Lifecycle Management (Guaranteed Single RAF & Sleeping on Inactive Tab/Scroll)
    let animationFrameId: number | null = null;
    let isRunning = false;
    let isTabVisible = !document.hidden;
    let isIntersecting = true;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isRunning) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;
      camera.position.x = targetX * 1.2;
      camera.position.y = -targetY * 1.2;
      camera.lookAt(0, 0, 0);

      // Subtle Arch & Particles Floating
      archGroup.rotation.y = Math.sin(elapsedTime * 0.3) * 0.06;
      archGroup.rotation.z = Math.cos(elapsedTime * 0.2) * 0.02;

      // Slowly elevate particles
      const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        let y = posAttr.getY(i);
        y += speeds[i];
        if (y > 4.5) {
          y = -4.5;
        }
        posAttr.setY(i, y);
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

    // 9. Document Visibility Change Handling
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && isIntersecting && !prefersReducedMotion) {
        startAnimation();
      } else {
        stopAnimation();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 10. IntersectionObserver to Pause When Scrolled Below Viewport
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

    // Initial start if applicable
    if (!prefersReducedMotion && isTabVisible) {
      startAnimation();
    }

    // 11. Complete Memory & DOM Cleanup on Unmount
    return () => {
      stopAnimation();

      if (observer) {
        observer.disconnect();
      }

      mediaQueryReducedMotion.removeEventListener('change', handleReducedMotionChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Memory disposal
      renderer.dispose();
      renderer.forceContextLoss();

      particleGeometry.dispose();
      particleMaterial.dispose();
      outerGeo.dispose();
      innerGeo.dispose();
      outerLineMat.dispose();
      innerLineMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
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
