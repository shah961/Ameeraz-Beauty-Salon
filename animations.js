/**
 * AMEERAZ BEAUTY SALON - ANIMATIONS ARCHITECTURE
 * Handles GSAP ScrollReveals & Lightweight WebGL Luxury Background
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Check for prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- GSAP Scroll-Triggered Reveal Animations --- */
  const initGSAPAnimations = () => {
    if (prefersReducedMotion || typeof gsap === 'undefined') return;

    // Register ScrollTrigger if available
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    const revealElements = document.querySelectorAll('.gs-reveal');

    revealElements.forEach((el) => {
      gsap.fromTo(el, 
        {
          opacity: 0,
          y: 35
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  };

  /* --- Lightweight Three.js Luxury Background (Hero) --- */
  const initThreeJSBackground = () => {
    const container = document.getElementById('webgl-canvas-container');
    if (!container || prefersReducedMotion || typeof THREE === 'undefined') return;

    try {
      // Scene setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
      camera.position.z = 4;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Create subtle floating particles (Gold aesthetic)
      const particleCount = 45;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 8;
        positions[i + 1] = (Math.random() - 0.5) * 8;
        positions[i + 2] = (Math.random() - 0.5) * 5;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color: 0xC5A059,
        size: 0.04,
        transparent: true,
        opacity: 0.6
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      // Animation Loop with low GPU overhead
      let animationFrameId;
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        particles.rotation.y += 0.0008;
        particles.rotation.x += 0.0004;
        renderer.render(scene, camera);
      };

      animate();

      // Handle Resize gracefully
      window.addEventListener('resize', () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      }, { passive: true });

      // Pause when page is not visible for performance
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          cancelAnimationFrame(animationFrameId);
        } else {
          animate();
        }
      });

    } catch (e) {
      console.log('WebGL initialization skipped or unsupported gracefully fallback.');
    }
  };

  // Safely execute initializers
  initGSAPAnimations();
  initThreeJSBackground();
});
