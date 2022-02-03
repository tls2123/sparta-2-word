import React from 'react';
import {Route, Routes} from 'react-router-dom';
import styled from 'styled-components';
import Add from './Add';
import Word from './Word';
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import {loadWordFB} from "./redux/modules/word"
import {db} from "./firebase";



function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(loadWordFB());
  }, []);


  return (
    <div className="App">
      <div>
        <Title onClick={() => { navigate("/")}}>단어장</Title>
        <hr/>
        <Routes>
          <Route path="/" element={<Word/>}/>
          <Route path="/add" element={<Add/>}/>
          <Route path="/:id/edit" element={<Add/>}/>
        </Routes>
      </div>
    </div>
  );
}


const Title = styled.h1`
text-align: center;
padding-top: 10px;
`;

export default App;
