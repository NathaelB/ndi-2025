import { useRef, useEffect } from "react";
import * as THREE from "three";

interface AnimatedSphereProps {
  score?: number;
}

export default function AnimatedSphere({ score = 50 }: AnimatedSphereProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number | null>(null);
  const scoreRef = useRef<number>(score);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Sphère de base avec bonne résolution
    const geometry = new THREE.SphereGeometry(1.5, 64, 64);
    const positionAttribute = geometry.attributes.position;
    const originalPositions = new Float32Array(positionAttribute.count * 3);

    // Stocker les positions originales
    for (let i = 0; i < positionAttribute.count * 3; i++) {
      originalPositions[i] = positionAttribute.array[i];
    }

    // Créer ~30 spikes style virus (protéines) répartis sur la sphère
    const spikeCount = 30;
    const spikePositions: THREE.Vector3[] = [];
    const spikeIntensities: number[] = [];
    const spikePhases: number[] = [];
    const spikeBaseHeights: number[] = []; // Hauteur de base de chaque spike

    // Distribution de Fibonacci pour bien répartir les spikes
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < spikeCount; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / spikeCount);

      const x = Math.cos(theta) * Math.sin(phi);
      const y = Math.sin(theta) * Math.sin(phi);
      const z = Math.cos(phi);

      spikePositions.push(new THREE.Vector3(x, y, z));
      spikeIntensities.push(0);
      spikePhases.push(Math.random() * Math.PI * 2);
      spikeBaseHeights.push(0.3 + Math.random() * 0.4); // Hauteur de base variable
    }

    // Shader personnalisé pour l'effet d'énergie
    const vertexShader = `
      varying vec3 vNormal;
      varying vec3 vPosition;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform vec3 color;
      uniform float time;
      uniform float opacity;
      varying vec3 vNormal;
      varying vec3 vPosition;

      void main() {
        // Fresnel effect pour les bords lumineux
        vec3 viewDirection = normalize(cameraPosition - vPosition);
        float fresnel = pow(1.0 - dot(viewDirection, vNormal), 3.0);

        // Effet d'énergie qui pulse
        float energy = sin(time * 2.0 + vPosition.x * 3.0) * 0.3 + 0.7;

        // Couleur avec effet de bord
        vec3 finalColor = color + fresnel * 0.5;
        float finalOpacity = opacity * (0.6 + fresnel * 0.4) * energy;

        gl_FragColor = vec4(finalColor, finalOpacity);
      }
    `;

    // Material principal avec shader
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0xff4d4d) },
        time: { value: 0 },
        opacity: { value: 0.7 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(mesh);

    // Couche externe d'énergie
    const outerGeometry = new THREE.SphereGeometry(1.65, 32, 32);
    const outerMaterial = new THREE.MeshBasicMaterial({
      color: 0x4fd1c5,
      transparent: true,
      opacity: 0.15,
      wireframe: true,
    });
    const outerMesh = new THREE.Mesh(outerGeometry, outerMaterial);
    scene.add(outerMesh);

    // Particules d'énergie autour
    const particleCount = 100;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.8 + Math.random() * 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3),
    );
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x4fd1c5,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Lumières
    const light1 = new THREE.PointLight(0xffffff, 2, 100);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x4fd1c5, 1.5, 100);
    light2.position.set(-5, -5, -5);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    // Animation
    let time = 0;

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      time += 0.01;

      // Rotation
      mesh.rotation.y += 0.003;
      mesh.rotation.x += 0.001;
      outerMesh.rotation.y -= 0.005;
      outerMesh.rotation.x += 0.002;
      particles.rotation.y += 0.002;

      // Instabilité basée sur le score (agressif = beaucoup de spikes, paisible = peu de spikes)
      const instability = 1 - scoreRef.current / 100;

      // Mettre à jour les intensités des spikes (style virus organique)
      for (let i = 0; i < spikeCount; i++) {
        // Hauteur du spike varie :
        // - Score bas (agressif) : spikes longs et nombreux
        // - Score haut (paisible) : spikes courts et rares
        const spikeActivity = Math.sin(time * 1.5 + spikePhases[i]) * 0.5 + 0.5;
        const targetIntensity =
          spikeBaseHeights[i] * instability * (0.8 + spikeActivity * 0.4);
        spikeIntensities[i] += (targetIntensity - spikeIntensities[i]) * 0.05;
      }

      // Appliquer les spikes à la géométrie
      const positions = positionAttribute.array as Float32Array;

      for (let i = 0; i < positionAttribute.count; i++) {
        const i3 = i * 3;
        const x = originalPositions[i3];
        const y = originalPositions[i3 + 1];
        const z = originalPositions[i3 + 2];

        const vertexPos = new THREE.Vector3(x, y, z);
        //const length = vertexPos.length();
        const direction = vertexPos.clone().normalize();

        // Calculer l'influence de chaque spike (forme de virus organique)
        let totalDisplacement = 0;

        for (let s = 0; s < spikeCount; s++) {
          const distance = direction.distanceTo(spikePositions[s]);
          // Influence plus concentrée pour des spikes plus pointus
          const influence = Math.max(0, 1 - distance * 2.5);

          if (influence > 0) {
            // Pulsation organique des spikes
            const pulse = Math.sin(time * 1.2 + spikePhases[s]) * 0.3 + 0.7;
            // Forme conique du spike (plus pointu au bout)
            const conicShape = Math.pow(influence, 1.5);
            totalDisplacement += conicShape * spikeIntensities[s] * pulse;
          }
        }

        // Appliquer le déplacement (spikes style protéines de virus)
        // Score bas = spikes longs et agressifs
        // Score haut = spikes courts et doux
        const displacement = totalDisplacement * (0.8 + instability * 0.7);
        positions[i3] = x + direction.x * displacement;
        positions[i3 + 1] = y + direction.y * displacement;
        positions[i3 + 2] = z + direction.z * displacement;
      }

      positionAttribute.needsUpdate = true;

      // Mise à jour couleur
      const targetColor =
        instability > 0.5
          ? new THREE.Color(0xff4d4d)
          : new THREE.Color(0x4fd1c5);

      shaderMaterial.uniforms.color.value.lerp(targetColor, 0.05);
      shaderMaterial.uniforms.time.value = time;

      // Mise à jour opacité de la couche externe
      outerMaterial.opacity = 0.1 + instability * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      shaderMaterial.dispose();
      outerGeometry.dispose();
      outerMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0"
      style={{
        background: "linear-gradient(to bottom, #0a0a0a, #1a1a2e, #0a0a0a)",
      }}
    />
  );
}
