import deepcopy from 'deepcopy';
import defaultComment from '../default/defaultComment';

const commentReducer = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_COMMENT_GROUP':
      if(!state[action.commentId]) {
        const newState = deepcopy(state);
        newState[action.commentId] = {...action, type: undefined};
        return newState;
      }

    case 'ADD_COMMENT':
      if(state[action.commentId]) {
        console.log('in');
        const newState = deepcopy(state);
        newState[action.commentId].itemList.push({
          ...action,
          index: state[action.commentId].itemList.length,
          type: undefined
        });
        newState[action.commentId].nComment = newState[action.commentId].itemList.length;
        return newState;
      }

    default:
      return state;
  }
};

export default commentReducer;
