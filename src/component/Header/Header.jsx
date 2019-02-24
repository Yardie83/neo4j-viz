import React, { useGlobal } from "reactn";
import { useState, useEffect, useRef } from "react";
import { fetchData } from "../../service/neo4jAPI";
import {
  StyledWrapper,
  SearchContainer,
  StyledInput,
  StyledButton
} from "./HeaderStyle";
import { ArrowForward } from "styled-icons/material";

export default function Header() {
  const [, setGraphData] = useGlobal("graphData");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    fetchData(search).then(result => {
      setGraphData(result);
    });
  }, [search]);

  return (
    <StyledWrapper>
      <SearchContainer>
        <StyledInput
          type="search"
          placeholder="Enter Movie name"
          onChange={event => setQuery(event.target.value)}
          onKeyPress={event => {
            if (event.key === "Enter") {
              setSearch(event.target.value);
            }
          }}
        />
        <StyledButton
          onClick={() => {
            setSearch(query);
          }}
        >
          <ArrowForward size="36" />
        </StyledButton>
      </SearchContainer>
    </StyledWrapper>
  );
}
