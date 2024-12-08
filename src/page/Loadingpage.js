import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoadingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: black;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  text-align: center;
`;

const ProgressText = styled.div`
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

const Button = styled.button`
  width: 45%;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: white;
  color: black;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  background-color: black;
  font-family: Arial, sans-serif;
`;

const GameBox = styled.div`
  width: 300px;
  height: 300px;
  background-color: ${(props) => props.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #333;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  font-weight: bold;
`;

const Message = styled.p`
  font-size: 1.2em;
  margin-top: 20px;
  color: white;
`;

const Loadingpage = () => {
  const [isRunning, setIsRunning] = useState(false); // 검사 시작/중지 상태
  const [progress, setProgress] = useState(0); // 진행률 (0 ~ 100)
  const navigate = useNavigate(); // 경로 이동을 위한 훅
  const [color, setColor] = useState('red');
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState([]);
  const [message, setMessage] = useState('검사 시작 버튼을 누르세요!');
  const [round, setRound] = useState(0);
  const [countdown, setCountdown] = useState(null); // 카운트다운 상태

  useEffect(() => {
    let interval;
    if (isRunning && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 1, 100)); // 1씩 증가
      }, 100); // 0.1초마다 1% 증가
    } else if (!isRunning) {
      clearInterval(interval); // 검사 중지 시 진행 중지
    }

    if (progress === 100) {
      setTimeout(() => navigate('/main'), 500); // 0.5초 후 이동
    }

    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 인터벌 클리어
  }, [isRunning, progress, navigate]);

  const Start = () => {
    setIsRunning(true);
    setProgress(0); // 검사 시작 시 0부터 시작
    startCountdown(); // 카운트다운 시작
  };

  const startCountdown = () => {
    let counter = 3; // 카운트다운 시작 숫자
    setCountdown(counter);
    const countdownInterval = setInterval(() => {
      counter -= 1;
      if (counter > 0) {
        setCountdown(counter); // 카운트다운 업데이트
      } else {
        clearInterval(countdownInterval);
        setCountdown(null); // 카운트다운 종료
        handleStart(); // 카운트다운 후 게임 시작
      }
    }, 1000); // 1초마다 카운트 감소
  };

  const handleStart = () => {
    if (round >= 3) {
      setMessage('게임이 종료되었습니다. 다시 시작하려면 새로고침하세요.');
      return;
    }

    setMessage('초록색이 될 때까지 기다리세요...');
    setColor('red');

    const randomDelay = Math.random() * 2000 + 1000;
    setTimeout(() => {
      setColor('green');
      setStartTime(Date.now());
      setMessage('지금 클릭하세요!');
    }, randomDelay);
  };

  const handleClick = () => {
    if (!isRunning || countdown !== null) return; // 검사 시작 전 또는 카운트다운 중 클릭 무시

    if (color === 'green' && startTime) {
      // 초록색일 때 클릭한 경우
      const time = Date.now() - startTime;
      setReactionTime([...reactionTime, time]);
      setRound((prev) => prev + 1);
      setMessage(`${time}ms`);
      setColor('red');
      setStartTime(null);

      // 다음 라운드로 이동
      if (round < 2) startCountdown(); // 카운트다운 시작
    } else if (color === 'red') {
      // 초록색이 되기 전에 클릭한 경우
      setMessage('너무 빨리 눌렀습니다!');
    }
  };

  return (
    <LoadingPageContainer>
      <Container>
        {countdown !== null ? (
          <GameBox bgColor="black">
            <p style={{ fontSize: '2rem', color: 'white' }}>{countdown}</p>
          </GameBox>
        ) : (
          <GameBox bgColor={color} onClick={handleClick}>
            {color === 'red' ? '기다리세요' : '클릭하세요!'}
          </GameBox>
        )}
        <Message>{message}</Message>
      </Container>
      {isRunning ? (
        <ProgressText>{progress}%</ProgressText>
      ) : (
        <Button onClick={Start} disabled={isRunning}>
          검사 시작
        </Button>
      )}
    </LoadingPageContainer>
  );
};

export default Loadingpage;
