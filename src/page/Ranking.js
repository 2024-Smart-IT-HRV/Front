import React from "react";
import styled from "styled-components";
import { RankTable } from "../components/ui/rankTable"
const RankingPage = () => {

  return (
    <Wrapper>
      <Header>
        <Title>🏆 랭킹</Title>
        <Subtitle>학습 성과를 확인하고 경쟁해보세요!</Subtitle>
      </Header>
      <MainContent>
        <Section>
        <RankTable />
        </Section> 
      </MainContent>

    </Wrapper>
  );
};

export default RankingPage;

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

const Avatar = styled.img`
  width: 1rem;
  height: 1rem;
  // padding:1px;
  border-radius: 100%;
  margin-right: 10px;
  border: 2px solid #333;
  // background-color:grey;

  @media (max-width: 768px) {
    width: 2rem;
    height: 2rem;
    margin-right: -3rem;
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

const RankingList = styled.ul`
  list-style: none;
  padding: 0;
  width: 90%;
  max-width: 500px;
`;

const RankingItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  color: #000000;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 5px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Rank = styled.span`
  font-size: 1.5rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Name = styled.span`
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Score = styled.span`
  font-size: 1rem;
  color: dark;
  font-weight:bold;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

