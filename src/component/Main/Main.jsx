import React from "react";
import styled from "styled-components";
import AsideLeft from "../AsideLeft/AsideLeft";
import Content from "../Content/Content";
import AsideRight from "../AsideRight/AsideRight";

const StyledMain = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-row-gap: 20px;
  justify-items: stretch;
  align-items: stretch;
  height: 80vh;
  width: 100vw;
  max-width: 100%;
`;

export default function Main() {
  return (
    <StyledMain>
      <AsideLeft />
      <Content/>
      <AsideRight />
    </StyledMain>
  );
}
