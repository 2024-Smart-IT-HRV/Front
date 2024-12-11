import React, { useState } from "react";
import styled from "styled-components";
import axios from "../api";

// Styled Components
const Container = styled.div`
  background: linear-gradient(to bottom, #000000, #4338ca);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h3`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #495057;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 1rem;

  &:focus {
    border-color: #000000;
    outline: none;
    box-shadow: 0 0 3px rgba(0, 123, 255, 0.5);
  }
`;

const Button = styled.button`
  background-color: #000000;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 1rem;

  &:hover {
    background-color: #000000;
  }
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 1rem;
  text-decoration: underline;
`;

const Message = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: ${props => (props.error ? "#dc3545" : "#28a745")};
`;

const Logo = styled.img`
  display: block; /* 가운데 정렬 */
  margin: 0 auto 1.5rem; /* 위, 아래 간격 설정 (중앙 정렬 포함) */
  width: 62x; /* 너비 */
  height: 58px; /* 높이 */
`;


const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/signup", formData); //백엔드에서 정보 요청
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error);
      } else {
        setMessage("회원가입 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <Container>
      <Card>
      <Logo src="/logo.png" alt="Logo" />
        <Form onSubmit={handleSubmit}>
          <Label>사용자 이름</Label>
          <Input
            type="text"
            name="username"
            placeholder="사용자 이름"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          <Label>이메일</Label>
          <Input
            type="email"
            name="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <Label>비밀번호</Label>
          <Input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <Button type="submit">회원가입</Button>
        </Form>
        {message && <Message error={message.includes("오류")}>{message}</Message>}
        <Footer>
          이미 계정이 있으신가요? <a href="/login">로그인</a>
        </Footer>
      </Card>
    </Container>
  );
};

export default Signup;

// 옛날 코드
// import React, { useState } from "react";
// import axios from "../api";

// function Signup() {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const [message, setMessage] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("/auth/signup", formData);
//       setMessage(response.data.message);
//     } catch (error) {
//       if (error.response) {
//         setMessage(error.response.data.error);
//       } else {
//         setMessage("회원가입 중 오류가 발생했습니다.");
//       }
//     }
//   };

//   return (
//     <div>
//       <h1>회원가입</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="username"
//           placeholder="사용자 이름"
//           value={formData.username}
//           onChange={handleInputChange}
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="이메일"
//           value={formData.email}
//           onChange={handleInputChange}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="비밀번호"
//           value={formData.password}
//           onChange={handleInputChange}
//         />
//         <button type="submit">회원가입</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }

// export default Signup;