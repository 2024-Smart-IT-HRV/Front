
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
    <MainContent>
      <Section>
        <StudyRoomChart datasetKey="HrvData" />
      </Section>
      <Section>
        <StudyRoomChart datasetKey="EegData" />
      </Section>
      <Section>
        <StudyRoomChart datasetKey="FocusData" />
      </Section>
    </MainContent>
    </Wrapper>
    
  );
}

// Styled Components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: linear-gradient(to bottom, #333333,#000000 );
  height: 100vh;
  padding: 20px;
  color: white;
  padding-bottom: 150px; /* Navbar 높이만큼 여유 공간 추가 */
  overflow-y: auto; /* 스크롤 활성화 */
  box-sizing: border-box; /* 패딩 포함한 높이 계산 */
  @media (max-width: 768px) {
    padding: 15px;
    padding-bottom: 150px; /* Navbar 높이만큼 여유 공간 추가 */
  overflow-y: auto; /* 스크롤 활성화 */
  box-sizing: border-box; /* 패딩 포함한 높이 계산 */
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const Section = styled.div`
  background-color: #ffffff;
  color: #000000;
  width: 90%;
  max-width: 400px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1);
  padding: 20px;
  text-align: center;

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

