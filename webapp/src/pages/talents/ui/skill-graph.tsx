import { useEffect, useRef, useState } from "react";
import type { SkillFrequency } from "../features/skills-utils";

interface SkillGraphProps {
  skills: SkillFrequency[];
}

interface Node {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  count: number;
  color: string;
}

const COLORS = [
  "#3b82f6", // blue
  "#8b5cf6", // purple
  "#ec4899", // pink
  "#f59e0b", // amber
  "#10b981", // emerald
  "#06b6d4", // cyan
  "#f97316", // orange
  "#6366f1", // indigo
];

function createInitialNodes(
  skills: SkillFrequency[],
  width: number,
  height: number
): Node[] {
  if (skills.length === 0) return [];

  const counts = skills.map((s) => s.count);
  const maxCount = counts.length > 0 ? Math.max(...counts) : 1;
  const minCount = counts.length > 0 ? Math.min(...counts) : 1;
  const countRange = maxCount - minCount || 1;

  return skills.map((skill, index) => {
    const normalized = (skill.count - minCount) / countRange;
    const radius = 20 + normalized * 40;

    return {
      id: skill.skill,
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      radius,
      count: skill.count,
      color: COLORS[index % COLORS.length],
    };
  });
}

export function SkillGraph({ skills }: SkillGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationRef = useRef<number | undefined>(undefined);

  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
  const [initialized, setInitialized] = useState(false);

  // Update dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = Math.min(600, Math.max(400, width * 0.6));
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Initialize nodes when skills or dimensions change
  useEffect(() => {
    nodesRef.current = createInitialNodes(skills, dimensions.width, dimensions.height);
    setInitialized(true);
  }, [skills, dimensions.width, dimensions.height]);

  // Animation loop
  useEffect(() => {
    if (!initialized || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      const nodes = nodesRef.current;
      if (nodes.length === 0) return;

      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Update physics
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Apply velocity with damping
        node.x += node.vx;
        node.y += node.vy;
        node.vx *= 0.98;
        node.vy *= 0.98;

        // Bounce off walls
        if (node.x - node.radius < 0 || node.x + node.radius > dimensions.width) {
          node.vx *= -0.8;
          node.x = Math.max(node.radius, Math.min(dimensions.width - node.radius, node.x));
        }
        if (node.y - node.radius < 0 || node.y + node.radius > dimensions.height) {
          node.vy *= -0.8;
          node.y = Math.max(node.radius, Math.min(dimensions.height - node.radius, node.y));
        }
      }

      // Node repulsion
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeA = nodes[i];
          const nodeB = nodes[j];

          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const minDistance = nodeA.radius + nodeB.radius + 10;

          if (distance < minDistance && distance > 0) {
            const force = (minDistance - distance) / distance;
            const fx = (dx / distance) * force * 0.5;
            const fy = (dy / distance) * force * 0.5;

            nodeA.vx -= fx;
            nodeA.vy -= fy;
            nodeB.vx += fx;
            nodeB.vy += fy;
          }
        }
      }

      // Draw connections
      ctx.strokeStyle = "rgba(148, 163, 184, 0.1)";
      ctx.lineWidth = 1;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeA = nodes[i];
          const nodeB = nodes[j];
          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            ctx.globalAlpha = 1 - distance / 200;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      // Draw nodes
      for (const node of nodes) {
        const isHovered = hoveredNode?.id === node.id;
        const scale = isHovered ? 1.1 : 1;

        // Shadow
        ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 2;

        // Main circle
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * scale, 0, Math.PI * 2);
        ctx.fill();

        // Inner highlight
        ctx.shadowColor = "transparent";
        ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * scale * 0.6, 0, Math.PI * 2);
        ctx.fill();

        // Text
        ctx.fillStyle = "#ffffff";
        ctx.font = `bold ${Math.max(10, node.radius * 0.4)}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        ctx.shadowBlur = 4;

        const text = node.id;
        const maxWidth = node.radius * 1.6;
        const metrics = ctx.measureText(text);

        if (metrics.width > maxWidth && node.radius > 25) {
          const words = text.split(" ");
          if (words.length > 1) {
            ctx.fillText(words[0], node.x, node.y - 5);
            ctx.fillText(words.slice(1).join(" "), node.x, node.y + 8);
          } else {
            ctx.fillText(text, node.x, node.y);
          }
        } else {
          ctx.fillText(text, node.x, node.y);
        }

        ctx.shadowColor = "transparent";
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initialized, dimensions, hoveredNode]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    let foundNode: Node | null = null;
    for (const node of nodesRef.current) {
      const dx = mouseX - node.x;
      const dy = mouseY - node.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < node.radius) {
        foundNode = node;
        break;
      }
    }

    setHoveredNode(foundNode);
    canvas.style.cursor = foundNode ? "pointer" : "default";
  };

  const handleMouseLeave = () => {
    setHoveredNode(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Find clicked node and apply impulse
    const nodes = nodesRef.current;
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const dx = mouseX - node.x;
      const dy = mouseY - node.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < node.radius) {
        // Create new array with updated node to avoid mutation issues
        const impulseX = (Math.random() - 0.5) * 10;
        const impulseY = (Math.random() - 0.5) * 10;

        nodesRef.current = nodes.map((n, idx) =>
          idx === i
            ? { ...n, vx: n.vx + impulseX, vy: n.vy + impulseY }
            : n
        );
        break;
      }
    }
  };

  if (skills.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Aucune compétence à afficher
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="w-full rounded-lg"
        style={{ maxWidth: "100%" }}
      />

      {hoveredNode && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-popover border rounded-lg px-4 py-2 shadow-lg pointer-events-none z-10 animate-in fade-in duration-200">
          <div className="text-sm font-semibold">{hoveredNode.id}</div>
          <div className="text-xs text-muted-foreground">
            {hoveredNode.count} {hoveredNode.count > 1 ? "talents" : "talent"}
          </div>
        </div>
      )}

      <div className="mt-4 text-center text-xs text-muted-foreground">
        💡 Cliquez sur les bulles pour les faire rebondir • Survolez pour voir les détails
      </div>
    </div>
  );
}
