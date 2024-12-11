import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "../api";

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
  bbackground: linear-gradient(to bottom,  #000000, #e11d48);
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
  margin-right: 0.8rem;
  width: 24px;
  height: 24px;

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

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  appearance: none; /* 기본 체크박스 스타일 제거 */
  width: 24px;
  height: 24px;
  border: 2px solid #ccc;
  border-radius: 50%; /* 원형 모양 */
  outline: none;
  cursor: pointer;
  position: relative;
  margin-right: 0.8rem;

  &:checked {
    background-color: #ffcc00; /* 노란 배경색 */
    border-color: #ffcc00;

    &::before {
      content: "✓"; /* 체크 표시 추가 */
      color: white;
      font-size: 16px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
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
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [checkedItems, setCheckedItems] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    setDate(formattedDate);
  }, []);

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
          params: { user_id },
        });
        setTodos(response.data);
      } catch (error) {
        console.error("Failed to fetch subjects:", error.response?.data);
        setMessage("과목 데이터를 가져오는 데 실패했습니다.");
      }
    };
    fetchSubjects();
  }, [navigate]);

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
        "/subjects",
        { user_id, subject_name: newSubject },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTodos([...todos, response.data.subject]);
      setMessage("과목이 성공적으로 추가되었습니다.");
      setNewSubject("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add subject:", error.response?.data);
      setMessage("과목을 추가할 수 없습니다.");
    }
  };

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
      setTodos(updatedTodos);
      setMessage("과목이 성공적으로 삭제되었습니다.");
    } catch (error) {
      console.error("Failed to delete subject:", error.response?.data);
      setMessage("과목을 삭제할 수 없습니다.");
    }
  };

  const handleSubjectClick = (subject_id) => {
    navigate(`/studyroom/${subject_id}`);
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
                checked={!!checkedItems[todo.subject_id]}
                onChange={() => setCheckedItems((prev) => ({
                  ...prev,
                  [todo.subject_id]: !prev[todo.subject_id],
                }))}
              />
            )}
            <TodoText onClick={() => handleSubjectClick(todo.subject_id)}>{todo.subject_name}</TodoText>
          </TodoLeft>
          <TodoScore>{todo.duration || 0}점</TodoScore>
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
