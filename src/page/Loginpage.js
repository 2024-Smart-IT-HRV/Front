// Front/scr/page/Login.js

import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "../api";

// Styled Components
const Container = styled.div`
  background: linear-gradient(to bottom,  #000000, #e11d48);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
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
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 표시 상태
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      const { user_id, token, message, hrvData: hasHRVData } = response.data;

      if (!response.data || !user_id || !token) {
        setMessage("로그인에 실패했습니다.");
        return;
      }

      setMessage(message || "로그인 성공!");
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("token", token);

      if (process.env.NODE_ENV === "development") {
        console.log("Token:", token);
        console.log("User ID:", user_id);
      }

      setEmail(""); // 입력 필드 초기화
      setPassword(""); // 입력 필드 초기화

      if (hasHRVData) {
        navigate("/main");
      } else {
        navigate("/loading");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "로그인 요청 중 문제가 발생했습니다.";
      console.error("Login failed:", errorMessage);
      setMessage(errorMessage);
    }
  };

  return (
    <Container>
    <Logo src="/logo.png" alt="Logo" />
      <Card>
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
          <div style={{ position: "relative" }}>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {showPassword ? "숨기기" : "표시"}
            </button>
          </div>
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