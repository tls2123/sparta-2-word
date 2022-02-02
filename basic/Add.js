import React from "react";
import styled from "styled-components";
import { Form , Button} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {createWord, addWordFB} from "./redux/modules/word";


const Add = (props) => {
  
  const wordRef = React.useRef(null);
  const pronRef = React.useRef(null);
  const exRef = React.useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addWordList = () => {
    const word = wordRef.current.value;
    const pron = pronRef.current.value;
    const ex = exRef.current.value;

    dispatch(addWordFB({word:word, pron:pron, ex:ex, completed: false}))
    //dispatch(createWord({word:word, pron:pron, ex:ex, completed: false}))
    navigate('/');
  }

  return (
    <Container>
      <Title>단어 추가하기</Title>
      <Inputs>
        <Form.Label>단어</Form.Label>
        <Form.Control type="text" ref={wordRef}/>
        <Form.Label>발음</Form.Label>
        <Form.Control type="text" ref={pronRef}/>
        <Form.Label>예문</Form.Label>
        <Form.Control type="text" ref={exRef}/>
      </Inputs>
      <Button variant="outline-success" onClick={addWordList}>저장하기</Button>
    </Container>
  );
};

const Container = styled.div`
  max-width: 350px;
  min-height: 70vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`;
const Title = styled.h5`
  text-align: center;
  padding: 0 0 50px 0;
`;

const Inputs = styled.div`
  margin: 20px auto;
`;


export default Add;
