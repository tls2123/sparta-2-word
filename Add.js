import React from "react";
import styled from "styled-components";
import { Form , Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {createWord, addWordFB, modiftWordFB} from "./redux/modules/word";


const Add = (props) => {
  
  const wordRef = React.useRef(null);
  const pronRef = React.useRef(null);
  const exRef = React.useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const word_id = params.id;
  const word_list = useSelector((state) => state.word.list);
  
  const addWordList = () => {
    const word = wordRef.current.value;
    const pron = pronRef.current.value;
    const ex = exRef.current.value;

    dispatch(addWordFB({word:word, pron:pron, ex:ex, completed: false}))
    //dispatch(createWord({word:word, pron:pron, ex:ex, completed: false}))
    navigate('/');
  }
  const modifyWordList = () => {
    const word = wordRef.current.value;
    const pron = pronRef.current.value;
    const ex = exRef.current.value;

    dispatch(modiftWordFB({word:word, pron:pron, ex:ex}, word_list[word_id].id))
    navigate('/');
  }

  return (
    <Container>
      <Title>{word_id ? "단어 수정하기" : "단어 추가하기"}</Title>
      <Inputs>
        <Form.Label>단어</Form.Label>
        <Form.Control type="text" ref={wordRef} currentvalue={word_id && word_id.word}/>
        <Form.Label>발음</Form.Label>
        <Form.Control type="text" ref={pronRef} currentvalue={word_id && word_id.pron}/>
        <Form.Label>예문</Form.Label>
        <Form.Control type="text" ref={exRef} currentvalue={word_id && word_id.ex}/>
      </Inputs>
      <Button variant="outline-success" onClick={word_id ? modifyWordList : addWordList}>{word_id ? "수정하기" : "저장하기"}</Button>
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
