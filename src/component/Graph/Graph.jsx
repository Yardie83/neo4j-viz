import React, { useGlobal } from "reactn";
import { useState, useEffect } from "react";
import D3Component from "../D3Component/D3Component";

import * as d3 from "d3";

export default function Graph() {
  const [graphData] = useGlobal("graphData");
  const [width,] = useState(1400);
  const [height,] = useState(700);

  const D3blackbox = ({ x, y, render }) => {
    const refAnchor = React.useRef(null);

    useEffect(() => {
      render(d3.select(refAnchor.current));
    }, [graphData, width, height]);
    return <svg ref={refAnchor} />;
  };

  return (
      <div width={width} height={height}>
        <D3blackbox
          x={0}
          y={0}
          render={svg => D3Component(svg, width, height, graphData)}
        />
      </div>
  );
}
