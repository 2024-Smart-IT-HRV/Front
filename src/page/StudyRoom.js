
import React from "react";
import { StudyRoomChart } from "../components/ui/studyRoomChart";
import styled from "styled-components";


const StudyRoom = () => {
  return (
    <Wrapper>
    <Header>
    <Title>현우진의 16강</Title>
    <Subtitle>Subtitle</Subtitle>
    </Header>

    <StudyRoomChart datasetKey="HrvData" />
    <StudyRoomChart datasetKey="EegData" />
    <StudyRoomChart datasetKey="FocusData" />

    </Wrapper>
    
  );
}

// Styled Components
const Wrapper = styled.div`
  height: 100vh;
  margin: 0 auto;
  width : 100%
  padding: 2rem 2rem;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1.5rem;
  background: linear-gradient(to bottom, #000000, #333333);
  overflow-y: auto;
  padding-bottom: 14vh;
  box-sizing: border-box;
  color: white;

  @media (max-width: 768px) {
    padding-left: 0px;
    padding-right : 0px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: white;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.2rem;
  color: #dcdcdc;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;




export default StudyRoom;
