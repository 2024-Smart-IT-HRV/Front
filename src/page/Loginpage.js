import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "../api";

// Styled Components
const Container = styled.div`
  background: linear-gradient(to bottom, #333333, #000000);
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

const Logo = styled.img`
  display: block;
  margin: 0 auto 1.5rem;
  width: 62px;
  height: 58px;
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });

      // 로그인 성공 메시지
      setMessage(response.data.message || "로그인 성공!");

      // JWT 저장
      localStorage.setItem("token", response.data.token);

      // HRV 데이터 여부 확인
      const hasHRVData = response.data.hrvData; // 서버 응답에서 HRV 데이터 확인

      // 페이지 이동
      if (hasHRVData) {
        navigate("/main"); // HRV 데이터가 있을 경우 메인 페이지로 이동
      } else {
        navigate("/loading"); // HRV 데이터가 없을 경우 로딩 페이지로 이동
      }
    } catch (error) {
      // 로그인 실패 메시지
      setMessage(error.response?.data?.error || "로그인 실패");
    }
  };

  return (
    <Container>
      <Card>
        <Logo src="/logo.png" alt="Logo" />
        <Form onSubmit={handleSubmit}>
          <Label>이메일</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
            required
          />
          <Label>비밀번호</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            required
          />
          <Button type="submit">로그인</Button>
        </Form>
        <Footer>
          계정이 없으신가요? <a href="/signup">회원가입</a>
        </Footer>
        {message && <p>{message}</p>}
      </Card>
    </Container>
  );
};

export default Login;
