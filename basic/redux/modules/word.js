//파이어베이스에 저장한 db 가지고 오기
import {db} from "../../firebase";
//데이터를 가지고 오는 파이어베이스의 내장 함수
import {collection, getDoc, getDocs, addDoc,updateDoc, doc, deleteDoc} from "firebase/firestore";
import { async } from "@firebase/util";

const LOAD = "word/LOAD";
const CREATE = 'word/CREATE';
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

export function updateWord(word_index) {
  return { type: UPDATE, word_index };
}

export function deleteWord(word_index){
  console.log("지울 인덱스:", word_index)
  return {type: DELETE, word_index};
}

//미들웨어 LOAD
export const loadWordFB = () => {
  return async function (dispatch){
    const word_data = await getDocs(collection(db, "word"));
    console.log(word_data);

    let word_list = [];

    word_data.forEach((doc) => {
      console.log(doc.data());
      word_list.push({id:doc.id, ...doc.data()})
    });
    console.log(word_list);
    dispatch(loadWord(word_list))
  }
}
//미들웨어 ADD
export const addWordFB = (word) => {
  return async function (dispatch){
    const docRef = await addDoc(collection(db, "word"), word);
    const _word = await getDoc(docRef);
    const word_data = {id: _word.id, ..._word.data()};

    console.log((await getDoc(docRef)).data());
    console.log(word_data);
    dispatch(createWord(word_data));
  }
}
//미들웨어 completed 업데이트
export const updateWordFB = (word_id) => {
  return async function (dispatch, getState){
    const docRef = doc(db, "word", word_id);
    await updateDoc(docRef, {completed: true});

    console.log(getState().word);
    const _word_list = getState().word.list;
    const word_index = _word_list.findIndex((b) => {
      return b.id === word_id;
    })
    dispatch(updateWord(word_index));
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