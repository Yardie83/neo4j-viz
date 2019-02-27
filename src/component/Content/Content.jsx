import React from "react";
import { StyledWrapper } from "./ContentStyle";
import Graph from "../Graph/Graph";

const Content = () => {

  return (
    <StyledWrapper className="content">
      <Graph/>
    </StyledWrapper>
  );
};

export default Content;
