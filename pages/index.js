// pages/index.js
import { useEffect, useRef } from "react";
// CSS도 함께 import해야 canvas 스타일이 적용됩니다.
import "vis-network/styles/vis-network.css";

const options = {
  nodes: { shape: "dot", size: 10 },
  edges: { smooth: true },
  physics: { stabilization: false },
};

export default function Home() {
  const container = useRef(null);

  useEffect(() => {
    async function drawGraph() {
      // peer/esm 번들에서 Network만 불러옵니다
      const { Network } = await import("vis-network/peer/esm/vis-network"); // :contentReference[oaicite:0]{index=0}

      // graph.json 가져오기
      const res = await fetch("data/graph.json");
      const data = await res.json();
      console.log("Loaded graph data:", data);

      // 배열 형태의 nodes/edges
      const nodes = data.nodes.map((n) => ({ id: n.id, label: n.id }));
      const edges = data.edges.map((e) => ({ from: e.source, to: e.target }));

      // 이제 제대로 Network 인스턴스 생성
      new Network(container.current, { nodes, edges }, options);
    }

    drawGraph();
  }, []);

  return (
    <div
      ref={container}
      style={{
        width: "100%",
        height: "80vh",
        border: "1px solid #ddd",
      }}
    />
  );
}
