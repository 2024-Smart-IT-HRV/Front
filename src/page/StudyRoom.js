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
      <StudyRoomChart subjectId={Number(subject_id)} />
      <EegChart datasetKey="EegData" />
      <FocusScoresChart subjectId={Number(subject_id)} />
    </Wrapper>
  );
};

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
