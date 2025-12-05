import { useRef, useEffect } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { useScore } from "@/pages/diagnostic/features/score-context";

export default function AnimatedSphere() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number | null>(null);
  const { score } = useScore();
  const scoreRef = useRef<number>(score);
  const smoothScoreRef = useRef<number>(score);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const smoothBloomRef = useRef<number>(0.15);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 10, 20);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 8;

    // Renderer optimisé
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // Post-processing avec Bloom intense
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      0.4,
      0.6,
      0.5,
    );
    composer.addPass(bloomPass);

    // Géométrie optimisée 64x64
    const geometry = new THREE.SphereGeometry(2.0, 64, 64);
    const positionAttribute = geometry.attributes.position;
    const originalPositions = new Float32Array(positionAttribute.count * 3);

    for (let i = 0; i < positionAttribute.count * 3; i++) {
      originalPositions[i] = positionAttribute.array[i];
    }

    // Cache directions pour optimisation
    const cachedDirections: THREE.Vector3[] = [];
    for (let i = 0; i < positionAttribute.count; i++) {
      const i3 = i * 3;
      const direction = new THREE.Vector3(
        originalPositions[i3],
        originalPositions[i3 + 1],
        originalPositions[i3 + 2],
      ).normalize();
      cachedDirections.push(direction);
    }

    // Vertex Shader avec déformations GPU
    const vertexShader = `
      uniform float time;
      uniform float chaos;
      uniform vec3 mousePos;

      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec3 vWorldPosition;
      varying float vDisplacement;

      // Simplex noise
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);

        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);

        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;

        i = mod289(i);
        vec4 p = permute(permute(permute(
          i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));

        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;

        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);

        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);

        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);

        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));

        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);

        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;

        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }

      void main() {
        vPosition = position;
        vec3 pos = position;

        // Déformation chaotique pour score bas, quasi nulle pour bon score
        float noiseScale = 1.0 + chaos * 2.0;
        float noiseFreq = time * (0.2 + chaos * 0.8);

        // Multi-octave noise pour effet organique (réduit)
        float noise1 = snoise(pos * noiseScale + noiseFreq);
        float noise2 = snoise(pos * noiseScale * 2.0 - noiseFreq * 0.7) * 0.5;
        float noise3 = snoise(pos * noiseScale * 4.0 + noiseFreq * 0.5) * 0.25;
        float totalNoise = noise1 + noise2 + noise3;

        // Spikes seulement pour mauvais score
        float spikeIntensity = chaos * chaos * 0.4; // Quadratique pour adoucir
        float spikes = abs(sin(pos.x * 8.0 + time)) *
                       abs(sin(pos.y * 8.0 - time * 0.8)) *
                       abs(sin(pos.z * 8.0 + time * 0.6));
        spikes = pow(spikes, 3.0 - chaos * 2.0); // Plus pointu si chaos élevé

        // Displacement total (beaucoup réduit pour bon score)
        float displacement = totalNoise * (0.03 + chaos * 0.5) + spikes * spikeIntensity;

        // Pulsation globale (très douce pour bon score)
        float pulse = sin(time * (0.3 + chaos * 1.5)) * (0.01 + chaos * 0.12);

        // Influence souris
        vec3 toMouse = mousePos - pos;
        float mouseDist = length(toMouse);
        float mouseEffect = smoothstep(3.0, 0.0, mouseDist) * 0.2;

        pos += normalize(pos) * (displacement + pulse + mouseEffect);
        vDisplacement = displacement;

        vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
        vWorldPosition = worldPosition.xyz;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        vNormal = normalize(normalMatrix * normal);

        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    // Fragment Shader dramatique
    const fragmentShader = `
      uniform vec3 colorDanger;
      uniform vec3 colorWarning;
      uniform vec3 colorSafe;
      uniform vec3 colorGlow;
      uniform float time;
      uniform float chaos;
      uniform vec2 mouse;

      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec3 vWorldPosition;
      varying float vDisplacement;

      void main() {
        // Direction de vue
        vec3 viewDir = normalize(cameraPosition - vWorldPosition);

        // Fresnel fort
        float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.5);

        // Couleur selon le chaos
        vec3 dangerColor = mix(colorWarning, colorDanger, chaos);
        vec3 baseColor = mix(colorSafe, dangerColor, chaos);

        // Vagues énergétiques (réduites)
        float wave1 = sin(vPosition.y * 5.0 + time * 2.0) * 0.5 + 0.5;
        float wave2 = sin(vPosition.x * 4.0 - time * 1.5) * 0.5 + 0.5;
        float wave3 = sin(length(vPosition.xz) * 6.0 + time * 2.5) * 0.5 + 0.5;
        float waves = (wave1 + wave2 + wave3) / 3.0;

        // Mix avec vagues (réduit)
        vec3 waveColor = mix(baseColor, colorGlow, waves * chaos * 0.2);

        // Énergie sur les zones déplacées (spikes) - réduit
        float energy = smoothstep(0.2, 0.8, vDisplacement) * chaos;
        waveColor = mix(waveColor, colorGlow, energy * 0.3);

        // Fresnel glow (beaucoup plus doux)
        vec3 finalColor = waveColor + fresnel * colorGlow * (0.2 + chaos * 0.8);

        // Pulsation d'énergie (réduite)
        float pulse = sin(time * 3.0) * 0.5 + 0.5;
        finalColor += colorDanger * pulse * chaos * 0.15;

        // Opacité
        float alpha = 0.85 + fresnel * 0.15;

        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    // Palette menaçante/paisible
    const getColorPalette = (normalizedScore: number) => {
      if (normalizedScore < 0.3) {
        // DANGER - Rouge/Orange agressif
        return {
          danger: new THREE.Color(0xdd3333),
          warning: new THREE.Color(0xee5533),
          safe: new THREE.Color(0xff7744),
          glow: new THREE.Color(0xff9955),
        };
      } else if (normalizedScore < 0.7) {
        // ATTENTION - Orange/Jaune doux
        return {
          danger: new THREE.Color(0xdd8844),
          warning: new THREE.Color(0xeeaa55),
          safe: new THREE.Color(0xffcc66),
          glow: new THREE.Color(0xffdd88),
        };
      } else {
        // SÉCURITÉ - Bleu/Cyan très doux et apaisant
        return {
          danger: new THREE.Color(0x6699dd),
          warning: new THREE.Color(0x88bbee),
          safe: new THREE.Color(0xaaddff),
          glow: new THREE.Color(0xccf0ff),
        };
      }
    };

    const initialPalette = getColorPalette(0.5);

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        colorDanger: { value: initialPalette.danger },
        colorWarning: { value: initialPalette.warning },
        colorSafe: { value: initialPalette.safe },
        colorGlow: { value: initialPalette.glow },
        time: { value: 0 },
        chaos: { value: 0.5 },
        mousePos: { value: new THREE.Vector3(0, 0, 0) },
        mouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.FrontSide,
      depthWrite: true,
      depthTest: true,
    });

    const mesh = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(mesh);

    // === DISQUE D'ACCRÉTION TROU NOIR (discret) ===
    const discGeometry = new THREE.RingGeometry(2.5, 4.5, 64, 8);

    const discVertexShader = `
      varying vec2 vUv;
      varying vec3 vPosition;

      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const discFragmentShader = `
      uniform float time;
      uniform float chaos;
      uniform vec3 colorInner;
      uniform vec3 colorOuter;

      varying vec2 vUv;
      varying vec3 vPosition;

      void main() {
        // Distance du centre
        float dist = length(vPosition.xy);
        float normalizedDist = (dist - 2.5) / 2.5;

        // Spirale (réduite)
        float angle = atan(vPosition.y, vPosition.x);
        float spiral = sin(angle * 6.0 - time * 1.5 + dist * 2.5) * 0.5 + 0.5;

        // Turbulence (réduite)
        float turbulence = sin(dist * 8.0 - time * 2.0) *
                          cos(angle * 5.0 + time * 1.0) * 0.5 + 0.5;

        // Couleur gradient (plus doux)
        vec3 color = mix(colorInner, colorOuter, normalizedDist);
        color = mix(color, colorInner * 1.3, spiral * 0.25);
        color += turbulence * 0.1 * chaos;

        // Opacité selon distance et chaos (beaucoup réduite pour bon score)
        float alpha = (1.0 - normalizedDist) * (0.15 + chaos * 0.4);
        alpha *= smoothstep(0.0, 0.2, normalizedDist); // Fade au centre

        gl_FragColor = vec4(color, alpha);
      }
    `;

    const discMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        chaos: { value: 0.5 },
        colorInner: { value: new THREE.Color(0xff4400) },
        colorOuter: { value: new THREE.Color(0x440000) },
      },
      vertexShader: discVertexShader,
      fragmentShader: discFragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const accretionDisc = new THREE.Mesh(discGeometry, discMaterial);
    accretionDisc.rotation.x = Math.PI / 2 + 0.3; // Incliné
    scene.add(accretionDisc);

    // Halo externe type trou noir
    const haloGeometry = new THREE.RingGeometry(4.5, 6.0, 64, 1);
    const haloMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        chaos: { value: 0.5 },
        color: { value: new THREE.Color(0xff6600) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float chaos;
        uniform vec3 color;
        varying vec2 vUv;

        void main() {
          float pulse = sin(time * 1.5) * 0.2 + 0.8;
          float alpha = (1.0 - vUv.y) * 0.12 * chaos * pulse;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    halo.rotation.x = Math.PI / 2 + 0.3;
    scene.add(halo);

    // Particules en orbite (effet accrétion)
    const particleCount = 150;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    const particleAngles = new Float32Array(particleCount);
    const particleRadii = new Float32Array(particleCount);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.8 + Math.random() * 2.5;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 0.3;

      particleRadii[i] = radius;
      particleAngles[i] = angle;
      particleSpeeds[i] = (1.0 / radius) * (0.5 + Math.random() * 0.5);

      particlePositions[i * 3] = radius * Math.cos(angle);
      particlePositions[i * 3 + 1] = height;
      particlePositions[i * 3 + 2] = radius * Math.sin(angle);

      particleSizes[i] = Math.random() * 0.04 + 0.02;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3),
    );
    particlesGeometry.setAttribute(
      "size",
      new THREE.BufferAttribute(particleSizes, 1),
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xff6600,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Lumières dynamiques
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(0xff6600, 2, 20);
    keyLight.position.set(5, 3, 5);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x4488ff, 1, 15);
    fillLight.position.set(-5, -2, 3);
    scene.add(fillLight);

    // Variables
    let time = 0;

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      targetMouseRef.current.x = (e.clientX / width) * 2 - 1;
      targetMouseRef.current.y = -(e.clientY / height) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      // Score interpolé
      const targetScore = scoreRef.current / 100;
      smoothScoreRef.current += (targetScore - smoothScoreRef.current) * 0.05;
      const normalizedScore = smoothScoreRef.current;

      // Chaos level (inversé : 1 = danger, 0 = sécurité)
      const chaosLevel = 1 - normalizedScore;

      // Interpolation souris
      mouseRef.current.x +=
        (targetMouseRef.current.x - mouseRef.current.x) * 0.08;
      mouseRef.current.y +=
        (targetMouseRef.current.y - mouseRef.current.y) * 0.08;

      // Vitesse selon chaos (beaucoup plus lent pour bon score)
      const timeSpeed = 0.003 + chaosLevel * 0.02;
      time += timeSpeed;

      // Update uniforms sphère
      shaderMaterial.uniforms.time.value = time;
      shaderMaterial.uniforms.chaos.value = chaosLevel;
      shaderMaterial.uniforms.mousePos.value.set(
        mouseRef.current.x * 2,
        mouseRef.current.y * 2,
        0,
      );
      shaderMaterial.uniforms.mouse.value.set(
        mouseRef.current.x,
        mouseRef.current.y,
      );

      // Update couleurs
      const targetPalette = getColorPalette(normalizedScore);
      shaderMaterial.uniforms.colorDanger.value.lerp(
        targetPalette.danger,
        0.05,
      );
      shaderMaterial.uniforms.colorWarning.value.lerp(
        targetPalette.warning,
        0.05,
      );
      shaderMaterial.uniforms.colorSafe.value.lerp(targetPalette.safe, 0.05);
      shaderMaterial.uniforms.colorGlow.value.lerp(targetPalette.glow, 0.05);

      // Rotation sphère (quasi immobile si sécurité, erratique si danger)
      const rotSpeed = 0.001 + chaosLevel * 0.006;
      const wobble = chaosLevel * chaosLevel * 0.08; // Quadratique
      mesh.rotation.y += rotSpeed;
      mesh.rotation.x = Math.sin(time * 0.3) * wobble;
      mesh.rotation.z = Math.cos(time * 0.2) * wobble * 0.5;

      // Update disque d'accrétion
      discMaterial.uniforms.time.value = time;
      discMaterial.uniforms.chaos.value = chaosLevel;
      discMaterial.uniforms.colorInner.value.lerp(targetPalette.glow, 0.05);
      discMaterial.uniforms.colorOuter.value.lerp(
        new THREE.Color(0x000000).lerp(targetPalette.danger, 0.3),
        0.05,
      );

      // Rotation disque (très lente si bon score)
      accretionDisc.rotation.z += 0.0005 + chaosLevel * 0.0025;

      // Update halo
      haloMaterial.uniforms.time.value = time;
      haloMaterial.uniforms.chaos.value = chaosLevel;
      haloMaterial.uniforms.color.value.lerp(targetPalette.glow, 0.05);
      halo.rotation.z -= 0.0003 + chaosLevel * 0.0015;

      // Particules en orbite (beaucoup plus lentes si bon score)
      const particlePos = particlesGeometry.attributes.position
        .array as Float32Array;
      const speedMultiplier = 0.5 + chaosLevel * 2.5;

      for (let i = 0; i < particleCount; i += 2) {
        particleAngles[i] += particleSpeeds[i] * 0.01 * speedMultiplier;
        const radius = particleRadii[i];
        const angle = particleAngles[i];

        particlePos[i * 3] = radius * Math.cos(angle);
        particlePos[i * 3 + 2] = radius * Math.sin(angle);
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      // Couleur particules
      particlesMaterial.color.lerp(targetPalette.glow, 0.05);
      particlesMaterial.opacity = 0.4 + chaosLevel * 0.4;

      // Lumières dynamiques (plus douces)
      keyLight.color.lerp(targetPalette.danger, 0.05);
      keyLight.intensity = 1.0 + chaosLevel * 1.2;
      fillLight.color.lerp(targetPalette.safe, 0.05);
      fillLight.intensity = 0.8 + chaosLevel * 0.4;

      // Bloom (beaucoup réduit)
      const targetBloom = 0.15 + chaosLevel * 0.6;
      smoothBloomRef.current += (targetBloom - smoothBloomRef.current) * 0.05;
      bloomPass.strength = smoothBloomRef.current;

      composer.render();
    };

    animate();

    // Resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      composer.setSize(newWidth, newHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      shaderMaterial.dispose();
      discGeometry.dispose();
      discMaterial.dispose();
      haloGeometry.dispose();
      haloMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
      composer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0"
      style={{
        background:
          "radial-gradient(circle at center, #1a1a2e 0%, #0a0a0f 100%)",
        pointerEvents: "none",
      }}
    />
  );
}
