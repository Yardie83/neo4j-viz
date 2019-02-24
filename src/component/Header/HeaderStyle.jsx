import styled, { keyframes } from "styled-components";

export const StyledWrapper = styled.div`
  width: 100vw;
  max-width:100%;
  height: 200px;
  background-image: radial-gradient(
    circle at 30% 20%,
    #373b52,
    #252736 51%,
    #1d1e26
  );
  display: flex;
  align-items: center;
  justify-content: center;
`;

const inputBackground = "rgba(57, 63, 84, 0.8)";
const inputTextInactive = "#7881a1";
const inputTextActive = "#bfd2ff";

const borderAnimation = keyframes`
 {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 0;
  }
}`;

export const SearchContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  border-radius: 2px;
  padding: 1rem 2rem 1rem;
  background: ${inputBackground};
  &:after {
    content: "";
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 999;
    height: 2px;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    background-position: 0% 0%;
    background: linear-gradient(
      to right,
      #b294ff,
      #57e6e6,
      #feffb8,
      #57e6e6,
      #b294ff,
      #57e6e6
    );
    background-size: 500% auto;
    animation: ${borderAnimation} 3s linear infinite;
  }
`;

export const StyledInput = styled.input`
  border-style: none;
  background: transparent;
  outline: none;
  flex-grow: 1;
  color: ${inputTextActive};
  font-size: 1.8rem;
  line-height: 1.8rem;
  vertical-align: middle;
  &::-webkit-input-placeholder {
    color: ${inputTextInactive};
  }
  &::-ms-clear {
    display: none;
  }
`;

export const StyledButton = styled.button`
  padding: 0;
  background: none;
  border: none;
  outline: none;
  color: ${inputTextInactive};
  font-size: 2.4rem;
  line-height: 2.4rem;
  vertical-align: middle;
  transition: color 0.25s;
  background: transparent;
  border: none;
  &:hover {
    color: ${inputTextActive};
  }
`;
