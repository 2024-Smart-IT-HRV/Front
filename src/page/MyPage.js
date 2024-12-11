import React from "react";
import { MyFocusChart } from "../components/ui/myFocusChart"
import styled from "styled-components";

const MyPage = () => {
  const userData = {
    name: "홍길동",
    email: "hong@example.com",
    score: 1200,
  };

  return (
    <Wrapper>
      <Header>
        <Title>👤 마이페이지</Title>
        <Subtitle>내 학습 데이터와 정보를 확인하세요!</Subtitle>
      </Header>
      <ProfileCard>
        <ProfileItem>
          <Label>이름:</Label>
          <Value>{userData.name}</Value>
        </ProfileItem>
        <ProfileItem>
          <Label>이메일:</Label>
          <Value>{userData.email}</Value>
        </ProfileItem>
        <ProfileItem>
          <Label>점수:</Label>
          <Value>{userData.score}점</Value>
        </ProfileItem>
        <MyFocusChart/>
      </ProfileCard>
    </Wrapper>
  );
};

export default MyPage;

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

const ProfileCard = styled.div`
  background-color: #ffffff;
  color: #000000;
  width: 90%;
  max-width: 400px;
  border-radius: 10px;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1);
  padding: 20px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const ProfileItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const Label = styled.span`
  font-size: 1.1rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Value = styled.span`
  font-size: 1.1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
