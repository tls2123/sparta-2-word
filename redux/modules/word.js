//파이어베이스에 저장한 db 가지고 오기
import {db} from "../../firebase";
//데이터를 가지고 오는 파이어베이스의 내장 함수
import {collection, getDoc, getDocs, addDoc,updateDoc, doc, deleteDoc} from "firebase/firestore";
import { async } from "@firebase/util";

const LOAD = "word/LOAD";
const CREATE = 'word/CREATE';
const MODIFY = 'word/MODIFY';
const UPDATE = 'word/UPDATE';
const DELETE = "word/DELETE";

const initialState = {
  list: [
    { word: "하나", pron: "하나", ex: "하나", completed: false},
    { word: "둘", pron: "둘", ex: "둘", completed: false},
    { word: "셋", pron: "셋", ex: "셋", completed: false},
  ]
}

export function loadWord(word_list){
  return {type:LOAD, word_list};
}

export function createWord(list) {
  return { type: CREATE, list };
}

export function modifyWord(list_index) {
  console.log("수정합니다")
  console.log(list_index)
  return {type: MODIFY, list_index};
}

export function updateWord(word_index) {
  return { type: UPDATE, word_index };
}

export function deleteWord(word_index){
  return {type: DELETE, word_index};
}

//미들웨어 LOAD
export const loadWordFB = () => {
  return async function (dispatch){
    const word_data = await getDocs(collection(db, "word"));

    let word_list = [];

    word_data.forEach((doc) => {
      word_list.push({id:doc.id, ...doc.data()})
    });
    dispatch(loadWord(word_list))
  }
}
//미들웨어 ADD
export const addWordFB = (word) => {
  return async function (dispatch){
    const docRef = await addDoc(collection(db, "word"), word);
    const _word = await getDoc(docRef);
    const word_data = {id: _word.id, ..._word.data()};

    dispatch(createWord(word_data));
  }
}
//미들웨어 completed 업데이트
export const updateWordFB = (word_id) => {
  return async function (dispatch, getState){
    const docRef = doc(db, "word", word_id);
    await updateDoc(docRef, {completed: true});

    const _word_list = getState().word.list;
    const word_index = _word_list.findIndex((b) => {
      return b.id === word_id;
    })
    dispatch(updateWord(word_index));
  }
}
//미들웨어 modify
export const modiftWordFB = (word, word_id) => {
  return async function (dispatch, getState){
    //바꿔줄 것 가지고 오기
    const docRef = doc(db, "word", word_id);
    await updateDoc(docRef, word);

    //업데이트가 끝이나고 리덕스 데이터 수정
    const _word_list = getState().word.list;
    const word_index = _word_list.findIndex((b) => {
      return b.id === word_id;
    })
    const new_word = {...word, word_index};
    console.log(new_word)
    dispatch(modifyWord(new_word));
  }
}
//미들웨어 delete
export const deleteWordFB = (word_id) => {
  return async function (dispatch, getState) {
    if(!word_id){
      window.alert("아이디가 없네요");
      return;
    }
    const docRef = doc(db, "word", word_id);
    await deleteDoc(docRef);

    const _word_list = getState().word.list;
    const word_index = _word_list.findIndex((b) => {
      return b.id === word_id;
    });
    dispatch(deleteWord(word_index));
  }
}


export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "word/LOAD": {
      return {list: action.word_list};
     }
    case "word/CREATE":
      const new_word_list = [...state.list, action.list];
      return { list: new_word_list };


    case "word/UPDATE": {
      const new_word_list = state.list.map((l, idx) => {
        if (parseInt(action.word_index) === idx) {
          return { ...l, completed: true };
        } else {
          return l;
        }
      });
      return { list: new_word_list };
    }
    case "word/MODIFY": {
      console.log("완료");
      console.log(state, action.list_index);
      //console.log(word)
      
      const new_word_list = state.list.map((word, idx) =>{
        if(parseInt(action.list_index.word_index) === idx){
          return action.list_index;
        }else{
          return word
        }
      })
      return { list: new_word_list };
    }
    case "word/DELETE": {
      const new_word_list = state.list.filter((l, idx) => {
          return parseInt(action.word_index) !== idx;
      });
      return {list: new_word_list};
  }
    default:
      return state;
  }
}