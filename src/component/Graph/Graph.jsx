import React, { useGlobal } from "reactn";
import { useEffect } from "react";

import NetworkGraph from "../NetworkGraph/NetworkGraph";

export default function Graph() {
  const [graphData] = useGlobal("graphData");
  const [selectedNode, setSelectedNode] = useGlobal("selectedNode")

  useEffect(()=>{
    console.log("[selectedNode]", selectedNode)
  }, [selectedNode])

  return (
      <NetworkGraph data={graphData} selectedNode={setSelectedNode}/>
  );
}
