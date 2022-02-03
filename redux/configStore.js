import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import word from "./modules/word";
import thunk from "redux-thunk";

const middlewares = [thunk];
// root 리듀서를 만들어줍니다.
// 나중에 리듀서를 여러개 만들게 되면 여기에 하나씩 추가해주는 거예요!
const rootReducer = combineReducers({ word });
//리듀서가 아닌 옵셔널한 애들을 추가해주는 모음
const enhancer = applyMiddleware(...middlewares);

// 스토어를 만듭니다.
const store = createStore(rootReducer, enhancer);

export default store;