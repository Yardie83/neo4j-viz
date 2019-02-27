import React, { useGlobal } from "reactn";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { fetchNodebyId } from "../../service/neo4jAPI";

var prettifyJSON = require("prettify-json");

const Wrapper = styled.div`
  background-color: palegreen;
  width: 100%;
  height: 100%;
  display: flex;
  /* overflow: hidden; */
`;

const StyledPre = styled.pre`
    white-space: pre-wrap;       /* Since CSS 2.1 */
    white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
    white-space: -pre-wrap;      /* Opera 4-6 */
    white-space: -o-pre-wrap;    /* Opera 7 */
    word-wrap: break-word;       /* Internet Explorer 5.5+ */
`;

export default function AsideRight() {
  const [selectedNode] = useGlobal("selectedNode");
  const [node, setNode] = useState([]);

  // function mapObject(object, callback) {
  //   return Object.keys(object).map(function(key) {
  //     return callback(key, object[key]);
  //   });
  // }

  useEffect(() => {
    fetchNodebyId(selectedNode).then(result => {
      console.log(result);
      if (result) setNode(result.node[0]);
    });
  }, [selectedNode]);

  return (
    <Wrapper>
      <StyledPre>{prettifyJSON(node)}</StyledPre>
    </Wrapper>
  );
}
