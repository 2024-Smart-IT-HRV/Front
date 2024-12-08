import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "../api";
import { useNavigate } from "react-router-dom";

// Styled Components
const Container = styled.div`
  height: 100vh; /* 화면 전체 높이 */
  margin: 0 auto;
  padding: 2rem 2rem; /* 상단 패딩을 늘려 전체 여유 공간 추가 */
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* 상단 정렬로 변경 */
  gap: 1.5rem; /* 요소 간의 간격 추가 */
  background: linear-gradient(to bottom, #000000, #333333);
  overflow-y: auto; /* 세로 스크롤 활성화 */
  padding-bottom: 14vh; /* Navbar 높이만큼 여유 공간 추가 */
  box-sizing: border-box; /* 패딩 포함한 높이 계산 */
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center; /* 버튼을 가운데 정렬 */
  align-items: center; /* 세로 정렬 */
  gap: 1rem; /* 버튼 간격 */
  width: 100%; /* 부모 컨테이너 너비 */
  margin-bottom: 1.5rem; /* 아래 요소와 간격 추가 */
`;

const DateSection = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem; /* 날짜 아래의 간격 */
  position: relative;
  top: 1rem; /* 원하는 위치로 이동 */
  left: 50%; /* 화면의 중앙으로 정렬 */
  transform: translateX(-50%); /* 가로 방향 정확한 중앙 정렬 */
  text-align: center;
  width: 100%; /* 날짜와 Divider가 같은 너비를 공유 */
  color:white;
`;

const Divider = styled.div`
  height: 2px; /* 구분선 두께 */
  background-color: #ccc; /* 구분선 색상 */
  margin-top: 0.5rem; /* 날짜와 구분선 사이 간격 */
  position: absolute;
  left: 0;
  right: 0;
  width: 100%; /* 부모 컨테이너의 너비에 따라 확장 */
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
  color:white;
`;

const TodoItem = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
  border-radius:5px;
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

const Checkbox = styled.input`
  margin-right: 1rem;
  visibility: ${props => (props.hidden ? "hidden" : "visible")}; /* 숨김 처리 */
  width: 20px;
`;

const TodoText = styled.p`
  margin: 0;
  font-size: 1rem;
  // position: absolute;
  // left:6rem;
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
  font-weight:bold;
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

const TotalStudyTime = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin-top: 1rem; /* 날짜 아래 간격 */
  color: white;
  text-align: center;
  width: 100%;
`;

const Message = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: ${props => (props.error ? "#dc3545" : "#28a745")};
`;

const DeleteModeButton = styled.button`
  padding: 0.75rem;
  background-color: ${props => (props.isDeleteMode ? "white" : "white")};
  color: black;
  border: none;
  border-radius: 5px;
  font-weight:bold;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${props => (props.isDeleteMode ? "white" : "white")};
  }
`;

const Scheduler = () => {
  const [formData, setFormData] = useState({
    // user_id: '',
    subject_name: '',
    subject_id: '',
    completed: '',
    duration: '',
  })

  const navigate = useNavigate();

  const [message, setMessage] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/study/subjects", formData);
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error);
      } else {
        setMessage("과목을 추가할 수가 없습니다.");
      }
    }
  }

  //   const [totalStudyTime, setTotalStudyTime] = useState("0시간 0분"); // 초기 값 설정

  // useEffect(() => {
  //   // 예시: 서버에서 총 학습시간 데이터를 받아오는 로직
  //   const fetchTotalStudyTime = async () => {
  //     try {
  //       const response = await axios.get("/total-study-time"); // API 엔드포인트 호출
  //       setTotalStudyTime(response.data.totalTime); // 예: "5시간 30분"
  //     } catch (error) {
  //       console.error("학습 시간을 가져오는 데 실패했습니다:", error);
  //     }
  //   };

  //   fetchTotalStudyTime();
  // }, []);


  const [todos, setTodos] = useState([]);
  const [date, setDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [isDeleteMode, setIsDeleteMode] = useState(false); // 삭제 모드 여부
  const [checkedItems, setCheckedItems] = useState({}); // 과목별 체크 상태

  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id], // 토글 체크 상태
    }));
  };

  // 오늘 날짜 설정
  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    setDate(formattedDate);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewSubject("");
  };

  const handleAddSubject = () => {
    if (newSubject.trim() !== "") {
      const newTodo = { id: Date.now(), text: newSubject, score: 0 };
      setTodos([...todos, newTodo]);
      closeModal();
    }
  };

  const handleSubjectClick = (id) => {
    navigate(`/studyroom/:subject_${id}`);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <Container>
      <DateSection>
        {date}
        <Divider /> {/* 구분선 추가 */}
      </DateSection>
      <TotalStudyTime>
        총 학습시간: 1:40:34
      </TotalStudyTime>
      <Header>
        <span>과목</span>
        <span>집중력 점수</span>
      </Header>
      {todos.map((todo) => (
        <TodoItem key={todo.id}>
          <TodoLeft>
            {isDeleteMode ? (
              <DeleteButton type=""  onClick={() => handleDelete(todo.id)}>×</DeleteButton>
            ) : (
              <Checkbox
                type="checkbox"
                checked={!!checkedItems[todo.id]} // 체크 상태 유지
                onChange={() => handleCheckboxChange(todo.id)}
                hidden={isDeleteMode} // 삭제 모드일 때 숨김 처리
                
              />
            )}
            <TodoText onClick={() => handleSubjectClick(todo.id)}>{todo.text}</TodoText>
          </TodoLeft>
          <TodoScore>{todo.score}점</TodoScore>
        </TodoItem>
      ))}
      <ButtonGroup>
        <AddButton onClick={openModal}>과목 추가</AddButton>
        <DeleteModeButton
          isDeleteMode={isDeleteMode}
          onClick={() => setIsDeleteMode(!isDeleteMode)}
        >
          {isDeleteMode ? "삭제 취소" : "과목 삭제"}
        </DeleteModeButton>
      </ButtonGroup>

      {isModalOpen && (
        <ModalOverlay>
          <Modal>
            <h2>과목 추가</h2>
            <Input
              type="text"
              name="subject_name"
              placeholder="과목명을 입력하세요"
              value={newSubject} //api없이 newSubject formData.subject_name
              onChange={(e) => setNewSubject(e.target.value)} //api없이 (e) => setNewSubject(e.target.value) handleInputChange
              required
            />
            <div>
              <ModalButton onClick={handleAddSubject}>추가</ModalButton> {/* api 없이 handleAddSubject  handleSubmit*/}
              <ModalButton onClick={closeModal}>취소</ModalButton>
            </div>
          </Modal>
        </ModalOverlay>
      )}
      {message && <Message error={message.includes("오류")}>{message}</Message>}
    </Container>
  );
};

export default Scheduler;