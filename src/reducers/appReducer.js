import {combineReducers} from 'redux';
import groupReducerFactory from './reducerFactory';
import carouselReducer from './carouselReducer';
import commentReducer from './commentReducer';

const appReducer = combineReducers({
  article: combineReducers({groups: groupReducerFactory('article')}),
  image: combineReducers({groups: groupReducerFactory('image')}),
  video: combineReducers({groups: groupReducerFactory('video')}),
  game: combineReducers({groups: groupReducerFactory('game')}),
  carousel: carouselReducer,
  comment: commentReducer
});

export default appReducer;
