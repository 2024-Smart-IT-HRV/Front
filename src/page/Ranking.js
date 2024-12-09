import React from "react";
import styled from "styled-components";

const RankingPage = () => {
  const mockData = [
    { rank: 1, name: "김종혁", score: 1200, image: 'https://cdn-icons-png.flaticon.com/512/159/159833.png' },
    { rank: 2, name: "김봉민", score: 1100, image: 'https://cdn-icons-png.flaticon.com/512/159/159833.png' },
    { rank: 3, name: "이지예", score: 1050, image: 'https://cdn-icons-png.flaticon.com/512/159/159833.png' },
    { rank: 3, name: "김도현", score: 1050, image: 'https://cdn-icons-png.flaticon.com/512/159/159833.png' },
    { rank: 5, name: "강전하", score: 1000, image: 'https://cdn-icons-png.flaticon.com/512/159/159833.png' },
  ];

  return (
    <Wrapper>
      <Header>
        <Title>🏆 랭킹</Title>
        <Subtitle>학습 성과를 확인하고 경쟁해보세요!</Subtitle>
      </Header>
      <RankingList>
        {mockData.map((user) => (
          <RankingItem key={user.rank}>
            <Rank>{user.rank}</Rank>
            <Avatar src={user.image} alt={`${user.name} avatar`} />
            <Name>{user.name}</Name>
            <Score>{user.score}점</Score>
          </RankingItem>
        ))}
      </RankingList>
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
  padding-bottom: 80px; /* Navbar 높이만큼 여유 공간 추가 */
  overflow-y: auto; /* 스크롤 활성화 */
  box-sizing: border-box; /* 패딩 포함한 높이 계산 */
  background: linear-gradient(to bottom, #000000, #333333);
  height: 100vh;
  padding: 20px;
  color: white;

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

