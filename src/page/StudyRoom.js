
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
    <StudyRoomChart/>
    </Wrapper>
    
  );
}

// Styled Components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: linear-gradient(to bottom, #000000, #333333);
  height: 100vh;
  padding: 20px;
  color: white;

  @media (max-width: 768px) {
    padding: 15px;
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