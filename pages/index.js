import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

// vis-network를 클라이언트 전용으로 동적 import
const Network = dynamic(
  async () => {
    const { Network } = await import("vis-network/standalone");
    return Network;
  },
  { ssr: false }
);

export default function Home() {
  const container = useRef(null);

  useEffect(() => {
    fetch("/data/graph.json")
      .then((res) => res.json())
      .then((data) => {
        const nodes = data.nodes.map((n) => ({ id: n.id, label: n.id }));
        const edges = data.edges.map((e) => ({ from: e.source, to: e.target }));
        new Network(
          container.current,
          { nodes, edges },
          {
            nodes: { shape: "dot", size: 10 },
            edges: { smooth: true },
            physics: { stabilization: false },
          }
        );
      });
  }, []);

  return <div ref={container} style={{ width: "100%", height: "80vh" }} />;
}
