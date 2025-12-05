import { useEffect, useRef } from "react";
import * as THREE from "three";

interface StarryBackgroundProps {
  starCount?: number;
  starSize?: number;
  speed?: number;
  shootingStars?: boolean;
  shootingStarCount?: number;
  className?: string;
}

export function StarryBackground({
  starCount = 2000,
  starSize = 1.5,
  speed = 0.0005,
  shootingStars = true,
  shootingStarCount = 3,
  className = "",
}: StarryBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const currentRotationRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(0);
  const shootingStarsRef = useRef<
    Array<{
      mesh: THREE.Line;
      velocity: THREE.Vector3;
      life: number;
      maxLife: number;
    }>
  >(
    [] as Array<{
      mesh: THREE.Line;
      velocity: THREE.Vector3;
      life: number;
      maxLife: number;
    }>,
  );
  const shootingStarTimerRef = useRef<number>(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Create stars
    const starsGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      // Position: distribute stars in a sphere around camera
      const i3 = i * 3;
      const radius = 50 + Math.random() * 450;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i3 + 2] = radius * Math.cos(phi);

      // Color: mix of white, blue-ish, and slightly yellow stars
      const colorChoice = Math.random();
      if (colorChoice < 0.7) {
        // White/blue-white stars (majority)
        starColors[i3] = 0.8 + Math.random() * 0.2;
        starColors[i3 + 1] = 0.8 + Math.random() * 0.2;
        starColors[i3 + 2] = 1.0;
      } else if (colorChoice < 0.9) {
        // Slightly yellow/warm stars
        starColors[i3] = 1.0;
        starColors[i3 + 1] = 0.9 + Math.random() * 0.1;
        starColors[i3 + 2] = 0.7 + Math.random() * 0.2;
      } else {
        // Cyan/blue stars
        starColors[i3] = 0.6 + Math.random() * 0.2;
        starColors[i3 + 1] = 0.8 + Math.random() * 0.2;
        starColors[i3 + 2] = 1.0;
      }

      // Size variation
      starSizes[i] = starSize * (0.5 + Math.random() * 1.5);
    }

    starsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3),
    );
    starsGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(starColors, 3),
    );
    starsGeometry.setAttribute("size", new THREE.BufferAttribute(starSizes, 1));

    // Star material with shader for better rendering
    const starsMaterial = new THREE.PointsMaterial({
      size: starSize,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
    starsRef.current = stars;

    // Add some nebula-like particles (bigger, more transparent)
    const nebulaGeometry = new THREE.BufferGeometry();
    const nebulaCount = 100;
    const nebulaPositions = new Float32Array(nebulaCount * 3);
    const nebulaColors = new Float32Array(nebulaCount * 3);
    const nebulaSizes = new Float32Array(nebulaCount);

    for (let i = 0; i < nebulaCount; i++) {
      const i3 = i * 3;
      const radius = 100 + Math.random() * 400;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      nebulaPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      nebulaPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      nebulaPositions[i3 + 2] = radius * Math.cos(phi);

      // Nebula colors: purple, blue, cyan
      const nebulaColorChoice = Math.random();
      if (nebulaColorChoice < 0.4) {
        // Purple
        nebulaColors[i3] = 0.5 + Math.random() * 0.3;
        nebulaColors[i3 + 1] = 0.3 + Math.random() * 0.2;
        nebulaColors[i3 + 2] = 0.8 + Math.random() * 0.2;
      } else if (nebulaColorChoice < 0.7) {
        // Blue
        nebulaColors[i3] = 0.2 + Math.random() * 0.3;
        nebulaColors[i3 + 1] = 0.4 + Math.random() * 0.3;
        nebulaColors[i3 + 2] = 0.8 + Math.random() * 0.2;
      } else {
        // Cyan
        nebulaColors[i3] = 0.3 + Math.random() * 0.2;
        nebulaColors[i3 + 1] = 0.6 + Math.random() * 0.3;
        nebulaColors[i3 + 2] = 0.9 + Math.random() * 0.1;
      }

      nebulaSizes[i] = 15 + Math.random() * 30;
    }

    nebulaGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(nebulaPositions, 3),
    );
    nebulaGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(nebulaColors, 3),
    );
    nebulaGeometry.setAttribute(
      "size",
      new THREE.BufferAttribute(nebulaSizes, 1),
    );

    const nebulaMaterial = new THREE.PointsMaterial({
      size: 20,
      vertexColors: true,
      transparent: true,
      opacity: 0.15,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const nebula = new THREE.Points(nebulaGeometry, nebulaMaterial);
    scene.add(nebula);

    // Create shooting star function
    const createShootingStar = () => {
      if (
        !shootingStars ||
        shootingStarsRef.current.length >= shootingStarCount
      )
        return;

      const startPosition = new THREE.Vector3(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100 + 50,
        (Math.random() - 0.5) * 100,
      );

      const direction = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        -(0.5 + Math.random() * 0.5), // Mostly downward
        (Math.random() - 0.5) * 2,
      ).normalize();

      const velocity = direction.multiplyScalar(0.5 + Math.random() * 0.5);

      // Create a line for the shooting star trail
      const points = [];
      const trailLength = 5 + Math.random() * 10;
      for (let i = 0; i < 2; i++) {
        points.push(
          startPosition
            .clone()
            .add(direction.clone().multiplyScalar(-i * trailLength)),
        );
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.8,
        linewidth: 2,
      });

      const line = new THREE.Line(geometry, material);
      scene.add(line);

      shootingStarsRef.current.push({
        mesh: line,
        velocity,
        life: 0,
        maxLife: 60 + Math.random() * 40,
      });
    };

    // Update shooting stars
    const updateShootingStars = () => {
      if (!shootingStars) return;

      // Update existing shooting stars
      shootingStarsRef.current = shootingStarsRef.current.filter((star) => {
        star.life++;

        // Move the star
        const positions = star.mesh.geometry.attributes.position
          .array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += star.velocity.x;
          positions[i + 1] += star.velocity.y;
          positions[i + 2] += star.velocity.z;
        }
        star.mesh.geometry.attributes.position.needsUpdate = true;

        // Fade out
        const material = star.mesh.material as THREE.LineBasicMaterial;
        material.opacity = Math.max(0, 1 - star.life / star.maxLife);

        // Remove if dead
        if (star.life >= star.maxLife) {
          scene.remove(star.mesh);
          star.mesh.geometry.dispose();
          material.dispose();
          return false;
        }

        return true;
      });

      // Spawn new shooting stars randomly
      shootingStarTimerRef.current++;
      if (shootingStarTimerRef.current > 60 + Math.random() * 120) {
        createShootingStar();
        shootingStarTimerRef.current = 0;
      }
    };

    // Mouse move handler for parallax effect
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      targetRotationRef.current.x = mouseRef.current.y * 0.1;
      targetRotationRef.current.y = mouseRef.current.x * 0.1;
    };

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;

      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    // Animation loop
    let time = 0;
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      time += speed;

      if (starsRef.current) {
        // Smooth camera rotation based on mouse position
        currentRotationRef.current.x +=
          (targetRotationRef.current.x - currentRotationRef.current.x) * 0.05;
        currentRotationRef.current.y +=
          (targetRotationRef.current.y - currentRotationRef.current.y) * 0.05;

        starsRef.current.rotation.x = currentRotationRef.current.x + time * 0.3;
        starsRef.current.rotation.y = currentRotationRef.current.y + time * 0.5;
      }

      if (nebula) {
        nebula.rotation.x = time * 0.1;
        nebula.rotation.y = time * 0.15;
      }

      // Update shooting stars
      updateShootingStars();

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    // Start animation
    animate();

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Clean up shooting stars
      shootingStarsRef.current.forEach((star) => {
        scene.remove(star.mesh);
        star.mesh.geometry.dispose();
        (star.mesh.material as THREE.LineBasicMaterial).dispose();
      });
      shootingStarsRef.current = [];

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }

      if (starsGeometry) {
        starsGeometry.dispose();
      }

      if (starsMaterial) {
        starsMaterial.dispose();
      }

      if (nebulaGeometry) {
        nebulaGeometry.dispose();
      }

      if (nebulaMaterial) {
        nebulaMaterial.dispose();
      }
    };
  }, [starCount, starSize, speed, shootingStars, shootingStarCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 ${className}`}
      style={{
        background:
          "linear-gradient(to bottom, #0a0e27 0%, #1a1a2e 50%, #16213e 100%)",
      }}
    />
  );
}
