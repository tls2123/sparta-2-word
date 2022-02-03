import React from "react";
import styled from "styled-components";
import { BsCheck, BsPencil, BsXLg} from "react-icons/bs";
import { IoAddCircle } from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { deleteWord, updateWord, updateWordFB, deleteWordFB } from "./redux/modules/word";

const Word = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const my_lists = useSelector((state) => state.word.list);
 
  //체크 
  //dispatch(updateWordFB(my_lists[word_index].id));
  //삭제하기
  //dispatch(deleteWordFB(my_lists[word_index].id));
  return (
    <>
    {my_lists.map((list, word_index) => {
      return(
         <Card completed={list.completed}>
           <Click><BsCheck size="35" 
           onClick={() => {dispatch(updateWordFB(my_lists[word_index].id));}}/><BsPencil size="20"
           onClick={() => { navigate(`/${word_index}/edit`)}}/> <BsXLg size="20"
           onClick={() => {dispatch(deleteWordFB(my_lists[word_index].id));}}/></Click>
           <Title>
            <p>{list.word}</p>
            <p>[{list.pron}]</p>
            <p style={{ color: 'blue'}}>{list.ex}</p>
            </Title>
         </Card>
      );
    })}        
    <div>
    <IoAddCircle size="100" color="green" onClick={() => { navigate("/add")}}>글쓰기</IoAddCircle>
    </div>
    </>
  );
};

const Card = styled.div`
width: 300px;
height: 200px;
border: 3px solid green;
margin: 50px;
float: left;
background-color: ${(props) => props.completed? "green" : "white"};
`;

const Click = styled.div`
display: block;
padding: 0 0 0 190px;
`;

const Title = styled.div`
padding: 30px
`;

export default Word;
