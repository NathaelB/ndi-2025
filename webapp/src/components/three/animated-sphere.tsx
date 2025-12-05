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
  const smoothScoreRef = useRef<number>(score); // Score interpolé pour transitions fluides
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Refs pour interpolation fluide de tous les paramètres
  const smoothAmplitudeRef = useRef<number>(0.08);
  const smoothWaveCountRef = useRef<number>(3);
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
    scene.fog = new THREE.Fog(0xf8f9fa, 8, 15);

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.z = 7;

    // Renderer avec qualité maximale
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Post-processing avec Bloom
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      0.4, // strength
      0.6, // radius
      0.85, // threshold
    );
    composer.addPass(bloomPass);

    // Géométrie haute résolution
    const geometry = new THREE.SphereGeometry(2.0, 256, 256);
    const positionAttribute = geometry.attributes.position;
    const originalPositions = new Float32Array(positionAttribute.count * 3);

    for (let i = 0; i < positionAttribute.count * 3; i++) {
      originalPositions[i] = positionAttribute.array[i];
    }

    // Shader avancé avec glassmorphism et reflets
    const vertexShader = `
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying vec3 vWorldPosition;
      varying vec3 vViewPosition;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        vUv = uv;

        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;

        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = mvPosition.xyz;

        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      uniform vec3 colorTop;
      uniform vec3 colorBottom;
      uniform vec3 colorAccent;
      uniform vec3 colorHighlight;
      uniform float time;
      uniform float opacity;
      uniform vec2 mouse;

      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying vec3 vWorldPosition;
      varying vec3 vViewPosition;

      // Fonction de bruit pour texture organique
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

        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
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
        // Dégradé vertical sophistiqué
        float heightGradient = smoothstep(-1.0, 1.0, vPosition.y);
        vec3 baseColor = mix(colorBottom, colorTop, heightGradient);

        // Texture organique avec bruit
        float noise = snoise(vWorldPosition * 1.2 + time * 0.15) * 0.5 + 0.5;
        vec3 texturedColor = mix(baseColor, colorAccent, noise * 0.12);

        // Ondulations lumineuses complexes
        float wave1 = sin(time * 0.6 + vPosition.y * 3.0 + vPosition.x * 2.0) * 0.5 + 0.5;
        float wave2 = sin(time * 0.4 + vPosition.x * 2.5 - vPosition.z * 2.0) * 0.5 + 0.5;
        float wave3 = sin(time * 0.8 + vPosition.z * 3.0 + vPosition.y * 1.5) * 0.5 + 0.5;
        float combinedWave = (wave1 + wave2 + wave3) / 3.0;

        vec3 waveColor = mix(texturedColor, colorAccent, combinedWave * 0.18);

        // Fresnel pour glassmorphism
        vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
        float fresnel = pow(1.0 - max(dot(viewDirection, vNormal), 0.0), 3.0);

        // Reflet spéculaire doux
        vec3 reflectDir = reflect(-viewDirection, vNormal);
        float specular = pow(max(dot(reflectDir, normalize(vec3(1.0, 1.0, 1.0))), 0.0), 32.0);

        // Interaction avec la souris - reflet dynamique
        vec2 mouseInfluence = mouse * 2.0;
        vec3 mouseLightDir = normalize(vec3(mouseInfluence.x, mouseInfluence.y, 1.0));
        float mouseLighting = max(dot(vNormal, mouseLightDir), 0.0);
        mouseLighting = pow(mouseLighting, 2.0) * 0.3;

        // Effet de verre dépoli (frosted glass)
        float frosted = smoothstep(0.3, 0.7, noise) * 0.1;

        // Highlight dynamique en haut de la sphère
        float topHighlight = smoothstep(0.4, 1.0, vPosition.y) * 0.4;
        vec3 highlightColor = mix(waveColor, colorHighlight, topHighlight);

        // Composition finale
        vec3 finalColor = highlightColor;
        finalColor += fresnel * 0.25; // Bord lumineux
        finalColor += specular * colorHighlight * 0.4; // Reflet spéculaire
        finalColor += mouseLighting; // Interaction souris
        finalColor = mix(finalColor, vec3(1.0), frosted); // Effet dépoli

        // Opacité variable selon Fresnel (glassmorphism)
        float finalOpacity = opacity * (0.88 + fresnel * 0.12);

        // Assombrir légèrement les bords pour plus de profondeur
        float edgeDarken = 1.0 - pow(fresnel, 0.5) * 0.15;
        finalColor *= edgeDarken;

        gl_FragColor = vec4(finalColor, finalOpacity);
      }
    `;

    // Palette de couleurs différente selon le score
    const getColorPalette = (normalizedScore: number) => {
      if (normalizedScore < 0.3) {
        // MAUVAIS score : Rouge doux mais visible
        return {
          top: new THREE.Color(0xff6b85),
          bottom: new THREE.Color(0xff5770),
          accent: new THREE.Color(0xff8fa3),
          highlight: new THREE.Color(0xffb3c1),
        };
      } else if (normalizedScore < 0.7) {
        // Score moyen : Jaune/Orange doux
        return {
          top: new THREE.Color(0xffd97d),
          bottom: new THREE.Color(0xffbb55),
          accent: new THREE.Color(0xffe5a7),
          highlight: new THREE.Color(0xfff2d9),
        };
      } else {
        // BON score : Bleu/Vert calme et apaisant
        return {
          top: new THREE.Color(0x74b9ff),
          bottom: new THREE.Color(0x81ecec),
          accent: new THREE.Color(0xa29bfe),
          highlight: new THREE.Color(0xe3f2fd),
        };
      }
    };

    const initialPalette = getColorPalette(0.5);

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        colorTop: { value: initialPalette.top },
        colorBottom: { value: initialPalette.bottom },
        colorAccent: { value: initialPalette.accent },
        colorHighlight: { value: initialPalette.highlight },
        time: { value: 0 },
        opacity: { value: 0.95 },
        mouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const mesh = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(mesh);

    // Couche externe glassmorphism renforcée
    const outerGeometry = new THREE.SphereGeometry(2.12, 128, 128);
    const outerMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.08,
      roughness: 0.1,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.2,
      side: THREE.FrontSide,
      depthWrite: false,
    });
    const outerMesh = new THREE.Mesh(outerGeometry, outerMaterial);
    scene.add(outerMesh);

    // Couche interne pour profondeur
    const innerGeometry = new THREE.SphereGeometry(1.88, 128, 128);
    const innerMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.05,
      roughness: 0.8,
      metalness: 0.0,
      side: THREE.BackSide,
      depthWrite: false,
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    scene.add(innerMesh);

    // Particules améliorées avec trails
    const particleCount = 50;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    const particleColors = new Float32Array(particleCount * 3);
    const particleVelocities: THREE.Vector3[] = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.6 + Math.random() * 1.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      particleSizes[i] = Math.random() * 0.025 + 0.015;

      const color = new THREE.Color();
      color.setHSL(0.5 + Math.random() * 0.2, 0.5, 0.8);
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;

      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.002,
      );
      particleVelocities.push(velocity);
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3),
    );
    particlesGeometry.setAttribute(
      "size",
      new THREE.BufferAttribute(particleSizes, 1),
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(particleColors, 3),
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.04,
      transparent: true,
      opacity: 0.4,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      depthWrite: false,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Lumières sophistiquées
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const topLight = new THREE.DirectionalLight(0xfff5f0, 1.2);
    topLight.position.set(3, 6, 4);
    scene.add(topLight);

    const fillLight = new THREE.DirectionalLight(0xc9e4ff, 0.6);
    fillLight.position.set(-4, -3, -3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffe5f0, 0.8);
    rimLight.position.set(0, 0, -5);
    scene.add(rimLight);

    // Ondes pour animation - Seront modulées selon le score
    let time = 0;
    const baseWaveParams: Array<{ freq: number; phase: number; amp: number; axis: THREE.Vector3 }> = [];

    // Créer 10 ondes (certaines seront désactivées pour bon score)
    for (let i = 0; i < 10; i++) {
      baseWaveParams.push({
        freq: 0.3 + Math.random() * 1.0,
        phase: Math.random() * Math.PI * 2,
        amp: 0.015 + Math.random() * 0.04,
        axis: new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5,
        ).normalize(),
      });
    }

    // Mouse tracking
    const handleMouseMove = (event: MouseEvent) => {
      targetMouseRef.current = {
        x: (event.clientX / width) * 2 - 1,
        y: -(event.clientY / height) * 2 + 1,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      // Interpolation ultra-fluide du score pour éviter les coupures
      const targetScore = scoreRef.current / 100;
      smoothScoreRef.current += (targetScore - smoothScoreRef.current) * 0.015; // Transition encore plus douce
      const normalizedScore = smoothScoreRef.current;

      // Facteur de chaos : 1 = mauvais score (chaotique), 0 = bon score (calme)
      const chaosLevel = 1 - normalizedScore;

      // Vitesse d'animation différente mais fluide selon le chaos
      // Utiliser smoothScoreRef pour éviter les sauts
      const smoothChaos = 1 - smoothScoreRef.current;
      const timeSpeed = 0.004 + smoothChaos * 0.012; // Plus rapide pour mauvais score mais moins extrême
      time += timeSpeed;

      // Interpolation douce de la souris
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;

      // Rotation différente selon le score mais douce
      // Mauvais score : rotation plus rapide mais fluide
      // Bon score : rotation lente et zen
      const rotationSpeed = 0.03 + smoothChaos * 0.15; // Différence visible mais pas extrême
      const jitterAmount = smoothChaos * 0.12; // Tremblement léger

      mesh.rotation.y = time * rotationSpeed + mouseRef.current.x * 0.1;
      mesh.rotation.x = Math.sin(time * (0.12 + smoothChaos * 0.4)) * (0.03 + jitterAmount) + mouseRef.current.y * 0.08;
      mesh.rotation.z = Math.cos(time * (0.1 + smoothChaos * 0.3)) * (0.015 + jitterAmount * 0.5);

      outerMesh.rotation.y = time * (0.025 + smoothChaos * 0.1);
      outerMesh.rotation.x = Math.cos(time * 0.12) * (0.025 + jitterAmount);

      innerMesh.rotation.y = -time * (0.02 + smoothChaos * 0.08);
      innerMesh.rotation.x = Math.sin(time * 0.1) * (0.03 + jitterAmount);

      particles.rotation.y = time * (0.015 + smoothChaos * 0.06);
      particles.rotation.z = Math.sin(time * 0.08) * (0.01 + jitterAmount * 0.5);

      // Update palette - Transition ultra-fluide avec interpolation encore plus douce
      const targetPalette = getColorPalette(normalizedScore);
      shaderMaterial.uniforms.colorTop.value.lerp(targetPalette.top, 0.008);
      shaderMaterial.uniforms.colorBottom.value.lerp(targetPalette.bottom, 0.008);
      shaderMaterial.uniforms.colorAccent.value.lerp(targetPalette.accent, 0.008);
      shaderMaterial.uniforms.colorHighlight.value.lerp(targetPalette.highlight, 0.008);
      shaderMaterial.uniforms.time.value = time;
      shaderMaterial.uniforms.mouse.value.set(mouseRef.current.x, mouseRef.current.y);

      // Ondulations différentes selon le score mais proportionnées
      const positions = positionAttribute.array as Float32Array;

      // Amplitude : Différence visible mais raisonnable avec interpolation fluide
      // Mauvais score = modérément déformé, Bon score = lisse
      const targetAmplitude = 0.08 + smoothChaos * 0.5; // 0.08 (lisse) à 0.58 (déformé)
      smoothAmplitudeRef.current += (targetAmplitude - smoothAmplitudeRef.current) * 0.02; // Transition encore plus douce
      const baseAmplitude = smoothAmplitudeRef.current;

      // Nombre d'ondes actives : Différence modérée avec interpolation fluide
      const targetWaveCount = 3 + smoothChaos * 7; // 3-10 ondes
      smoothWaveCountRef.current += (targetWaveCount - smoothWaveCountRef.current) * 0.02;
      const activeWaveCount = Math.floor(smoothWaveCountRef.current);

      // Irrégularité : Ondulations légères pour mauvais score
      const irregularity = smoothChaos * 0.4;

      for (let i = 0; i < positionAttribute.count; i++) {
        const i3 = i * 3;
        const x = originalPositions[i3];
        const y = originalPositions[i3 + 1];
        const z = originalPositions[i3 + 2];

        const vertexPos = new THREE.Vector3(x, y, z);
        const direction = vertexPos.clone().normalize();

        let totalDisplacement = 0;
        let irregularDisplacement = 0;

        // Appliquer seulement les ondes actives
        for (let w = 0; w < activeWaveCount && w < baseWaveParams.length; w++) {
          const wave = baseWaveParams[w];
          const dotProduct = direction.dot(wave.axis);

          // Onde sinusoïdale de base
          const waveValue =
            Math.sin(time * wave.freq + dotProduct * 3.0 + wave.phase) *
            wave.amp;
          totalDisplacement += waveValue;

          // Déformation irrégulière légère pour mauvais score
          if (chaosLevel > 0.3) {
            const angularWave = Math.abs(Math.sin(time * wave.freq * 2.0 + dotProduct * 4.0));
            const softEffect = Math.pow(angularWave, 0.8); // Forme plus douce
            irregularDisplacement += softEffect * wave.amp * irregularity * 1.5;
          }
        }

        // Influence de la souris
        const mouseInfluence = new THREE.Vector3(
          mouseRef.current.x * 0.5,
          mouseRef.current.y * 0.5,
          0,
        );
        const mouseDist = direction.distanceTo(mouseInfluence);
        const mouseEffect = Math.max(0, 1 - mouseDist * 2) * 0.08;

        // Déplacement final : Différence claire mais élégante
        const smoothDisplacement = totalDisplacement * baseAmplitude;
        const chaoticDisplacement = irregularDisplacement * (1 + chaosLevel * 1.5);
        const displacement = smoothDisplacement + chaoticDisplacement + mouseEffect;

        positions[i3] = x + direction.x * displacement;
        positions[i3 + 1] = y + direction.y * displacement;
        positions[i3 + 2] = z + direction.z * displacement;
      }

      positionAttribute.needsUpdate = true;

      // Animation des particules - Plus agitées pour mauvais score mais fluide
      const particlePos = particlesGeometry.attributes.position.array as Float32Array;
      const particleSpeedMultiplier = 0.6 + smoothChaos * 2.5; // 0.6x à 3.1x plus rapide

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        particlePos[i3] += particleVelocities[i].x * particleSpeedMultiplier;
        particlePos[i3 + 1] += particleVelocities[i].y * particleSpeedMultiplier;
        particlePos[i3 + 2] += particleVelocities[i].z * particleSpeedMultiplier;

        const pos = new THREE.Vector3(
          particlePos[i3],
          particlePos[i3 + 1],
          particlePos[i3 + 2],
        );
        const dist = pos.length();

        if (dist > 4.0 || dist < 2.5) {
          particleVelocities[i].negate();
        }
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      // Pulsation modérée pour mauvais score
      const pulseIntensity = 0.02 + smoothChaos * 0.08;
      const pulseSpeed = 0.5 + smoothChaos * 0.8; // Pulsation plus rapide mais douce
      outerMaterial.opacity = (0.05 + smoothChaos * 0.08) + Math.sin(time * pulseSpeed) * pulseIntensity;
      innerMaterial.opacity = (0.04 + smoothChaos * 0.05) + Math.cos(time * pulseSpeed * 0.8) * pulseIntensity;
      particlesMaterial.opacity = (0.25 + smoothChaos * 0.35) + Math.sin(time * pulseSpeed * 1.2) * (0.1 + smoothChaos * 0.15);

      // Update bloom - Différence visible mais élégante avec interpolation fluide
      const targetBloom = 0.15 + smoothChaos * 0.6; // 0.15-0.75 (différence claire)
      smoothBloomRef.current += (targetBloom - smoothBloomRef.current) * 0.02; // Transition encore plus douce
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
      outerGeometry.dispose();
      outerMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
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
        background: "linear-gradient(135deg, #f5f7fa 0%, #ffffff 50%, #f0f4f8 100%)",
        pointerEvents: "none",
      }}
    />
  );
}
