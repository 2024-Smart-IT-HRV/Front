// src/page/StudyRoom.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StudyRoomChart } from "../components/ui/HRVChart";
import styled from "styled-components";
import api from "../api"; // 백엔드 통신
import { useLocation} from "react-router-dom";
import { EegChart } from "../components/ui/EegChart";
import { FocusScoresChart } from "../components/ui/focus_scores";

const StudyRoom = () => {
  const { subject_id } = useParams(); // URL에서 subjectId 가져오기
  const location = useLocation();
  
  // URL에서 subject_name 가져오기
  const [subject_name, setSubjectName] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get("subject_name") || "알 수 없는 과목";
  });
  
  useEffect(() => {
    // subjectId를 기반으로 과목 이름 가져오기 (예: "현우진의 16강")
    const fetchSubjectName = async () => {
      try {
        const response = await api.get(`/subjects/${subject_id}`);
        if (response.status === 200 && response.data) {
          setSubjectName(response.data.subject_name);
        }
      } catch (error) {
        console.error("과목 이름을 가져오는 중 오류 발생:", error.response?.data || error.message);
        setSubjectName("알 수 없는 과목");
      }
    };
    fetchSubjectName();
  }, [subject_id]);

  console.log("subject_id:", subject_id);
  console.log("subject_name:", subject_name);

  if (!subject_name) return <div>Loading...</div>;

  return (
    <Wrapper>
      <Header>
        <Title>{subject_name}의 학습 분석</Title>
        <Subtitle>Subject ID: {subject_id}</Subtitle>
      </Header>

      <MainContent>
      <Section>
       <StudyRoomChart subjectId={Number(subject_id)} />
      </Section>    
      <Section>
       <EegChart datasetKey="EegData" />
      </Section>
      <Section>
       <FocusScoresChart subjectId={Number(subject_id)} />
      </Section>
    </MainContent>

    </Wrapper>
  );
};

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
