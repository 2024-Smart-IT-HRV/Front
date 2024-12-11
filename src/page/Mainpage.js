import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Header>
        <Logo src="/logo.png" alt="Logo" />
        <Title>집중력 분석 서비스</Title>
        <Subtitle>나만의 학습 데이터를 분석하여 집중력을 높이세요!</Subtitle>
      </Header>
      <MainContent>
        <Section>
          <SectionTitle> 학습 일정 관리</SectionTitle>
          <SectionDescription>
            학습 일정을 기록하고, 실시간 집중력 데이터를 확인하세요.
          </SectionDescription>
          <Button onClick={() => navigate("/study-schedule")}>
            일정 관리하기
          </Button>
        </Section>
        <Section>
          <SectionTitle> 집중도 분석</SectionTitle>
          <SectionDescription>
            심박수 기반 집중도를 분석하고 실시간 그래프로 확인하세요.
          </SectionDescription>
          <Button onClick={() => navigate("/focus-analysis")}>
            집중도 분석하기
          </Button>
        </Section>
        <Section>
          <SectionTitle> 랭킹 및 보상</SectionTitle>
          <SectionDescription>
            나의 학습 성과를 친구들과 비교하고, 보상을 획득하세요.
          </SectionDescription>
          <Button onClick={() => navigate("/ranking")}>랭킹 확인하기</Button>
        </Section>
      </MainContent>
    </Wrapper>
  );
};

export default MainPage;

// Styled Components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: linear-gradient(to bottom, #000000, #4338ca);
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

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    margin-bottom: 30px;
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
  margin-top: 10px;

  @media (max-width: 768px) {
    font-size: 1rem;
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

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  color: #333333;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const SectionDescription = styled.p`
  font-size: 1rem;
  color: #666666;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Button = styled.button`
  background-color: #000000;
  color: white;
  border: 1px solid #ffffff;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #333333;
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px 16px;
  }
`;

const Logo = styled.img`
  display: block;
  margin: 0 auto 1.5rem;
  width: 64px;
  height: 58px;

  @media (max-width: 768px) {
    width: 48px;
    height: 44px;
  }
`;
