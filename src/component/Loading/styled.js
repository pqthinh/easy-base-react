import styled from "styled-components";
import { ClimbingBoxLoader } from "react-spinners";

export const LoadingWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9999999999999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
`;
export const LoadingBox = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 15px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: #f0f0f0;
`;
export const LoadingSpinner = styled(ClimbingBoxLoader)``;
