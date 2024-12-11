// Front/scr/page/Sceduler.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const Container = styled.div`
  height: 100vh;
  margin: 0 auto;
  padding: 2rem 2rem;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1.5rem;
  background: linear-gradient(to bottom, #000000, #4338ca);
  overflow-y: auto;
  padding-bottom: 14vh;
  box-sizing: border-box;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  margin-bottom: 1.5rem;
`;

const DateSection = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  position: relative;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  width: 100%;
  color: white;
`;

const Divider = styled.div`
  height: 2px;
  background-color: #ccc;
  margin-top: 0.5rem;
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
  font-weight: bold;
  font-size: 1rem;
  border-bottom: 2px solid #ccc;
  padding-bottom: 0.5rem;
  color: white;
`;

const TodoItem = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
  border-radius: 5px;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #ccc;
  background-color: white;
  width: 100%;
  &:last-child {
    border-bottom: none;
  }
`;

const TodoLeft = styled.div`
  display: flex;
  align-items: center;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #000000;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  margin-right: 0.5rem;
  width: 20px;

  &:hover {
    color: #000000;
  }
`;
const TotalStudyTime = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin-top: 1rem;
  color: white;
  text-align: center;
`;
const Checkbox = styled.input`
  margin-right: 1rem;
  visibility: ${(props) => (props.hidden ? "hidden" : "visible")};
  width: 20px;
`;

const TodoText = styled.p`
  margin: 0;
  font-size: 1rem;
`;

const TodoScore = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 1rem;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  padding: 0.75rem;
  background-color: white;
  color: black;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: white;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

const ModalButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #000000;
  }

  & + & {
    margin-left: 1rem;
  }
`;

const Message = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: ${(props) => (props.error ? "#dc3545" : "#28a745")};
`;

const DeleteModeButton = styled.button`
  padding: 0.75rem;
  background-color: ${(props) => (props.isDeleteMode ? "white" : "white")};
  color: black;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.isDeleteMode ? "white" : "white")};
  }
`;
const Scheduler = () => {
  const [todos, setTodos] = useState([]); // 과목 목록
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [newSubject, setNewSubject] = useState(""); // 새 과목 이름
  const [isDeleteMode, setIsDeleteMode] = useState(false); // 삭제 모드 여부
  const [date, setDate] = useState(""); // 현재 날짜
  const [message, setMessage] = useState(""); // 사용자 메시지
  const navigate = useNavigate();

  // 현재 날짜 설정
  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    setDate(formattedDate);
  }, []);

// 서버에서 과목 목록 불러오기
useEffect(() => {
  const fetchSubjects = async () => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    if (!user_id || !token) {
      setMessage("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    try {
      const response = await api.get(`/subjects`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { user_id }, // user_id 전달
      });
      setTodos(response.data);
    } catch (error) {
      console.error("Failed to fetch subjects:", error.response?.data);
      setMessage("과목 데이터를 가져오는 데 실패했습니다.");
    }
  };
  fetchSubjects();
}, [navigate]);

// 과목 추가 처리
const handleAddSubject = async () => {
  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");

  if (!user_id || !token) {
    setMessage("로그인이 필요합니다.");
    return;
  }
  
  if (!newSubject.trim()) {
    setMessage("과목명을 입력하세요.");
    return;
  }

  try {
    const response = await api.post(
      "/subjects", // 엔드포인트 수정
      { user_id, subject_name: newSubject },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTodos([...todos, response.data.subject]); // 새로운 과목 추가
    setMessage("과목이 성공적으로 추가되었습니다.");
    setNewSubject(""); // 입력 필드 초기화
    setIsModalOpen(false); // 모달 닫기
  } catch (error) {
    console.error("Failed to add subject:", error.response?.data);
    setMessage("과목을 추가할 수 없습니다.");
  }
};

// 과목 삭제 처리
const handleDeleteSubject = async (subject_id) => {
  const token = localStorage.getItem("token");

  if (!subject_id) {
    setMessage("삭제할 과목의 ID를 찾을 수 없습니다.");
    return;
  }

  try {
    await api.delete(`/subjects/${subject_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const updatedTodos = todos.filter((todo) => todo.subject_id !== subject_id);
    setTodos(updatedTodos); // 상태 업데이트로 화면에 반영
    setMessage("과목이 성공적으로 삭제되었습니다.");

  } catch (error) {
    console.error("Failed to delete subject:", error.response?.data);
    setMessage("과목을 삭제할 수 없습니다.");
  }
};


  // 과목 클릭 시 상세 페이지 이동
  const handleSubjectClick = (subject_id, subject_name) => {
    navigate(`/studyroom/${subject_id}?subject_name=${encodeURIComponent(subject_name)}`);
  };

  return (
    <Container>
      <DateSection>
        {date}
        <Divider />
      </DateSection>
      <TotalStudyTime>총 학습시간: 1:40:34</TotalStudyTime>
      <Header>
        <span>과목</span>
        <span>집중력 점수</span>
      </Header>
      {todos.map((todo) => (
        <TodoItem key={todo.subject_id}>
        <TodoLeft>
          {isDeleteMode ? (
            <DeleteButton onClick={() => handleDeleteSubject(todo.subject_id)}>×</DeleteButton>
          ) : (
            <Checkbox
              type="checkbox"
              hidden={isDeleteMode}
              onClick={() => handleSubjectClick(todo.subject_id, todo.subject_name)}
            />
          )}
          <TodoText>{todo.subject_name}</TodoText>
        </TodoLeft>
        <TodoScore>{todo.focus_score && todo.focus_score.score ? `${todo.focus_score.score}점` : "점수 없음"}</TodoScore>
      </TodoItem>
      ))}
      <ButtonGroup>
        <AddButton onClick={() => setIsModalOpen(true)}>과목 추가</AddButton>
        <DeleteModeButton onClick={() => setIsDeleteMode(!isDeleteMode)}>
          {isDeleteMode ? "삭제 취소" : "과목 삭제"}
        </DeleteModeButton>
      </ButtonGroup>

      {isModalOpen && (
        <ModalOverlay>
          <Modal>
            <h2>과목 추가</h2>
            <Input
              type="text"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              placeholder="과목명을 입력하세요"
            />
            <div>
              <ModalButton onClick={handleAddSubject}>추가</ModalButton>
              <ModalButton onClick={() => setIsModalOpen(false)}>취소</ModalButton>
            </div>
          </Modal>
        </ModalOverlay>
      )}
      {message && <Message>{message}</Message>}
    </Container>
  );
};

export default Scheduler;
