import React, { useGlobal } from "reactn";
import { useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: palegreen;
  width: 100%;
  height: 100%;
  display: flex;
`;

export default function AsideRight() {

  const [selectedNode,] = useGlobal("selectedNode")

  useEffect(() => {
    // console.log("[selectedNode]", selectedNode);
  }, [selectedNode]);

  return <Wrapper>
    {selectedNode}
  </Wrapper>;
}
