import deepcopy from 'deepcopy';

const defaultCarouselState = [];

const carouselReducer = (state = defaultCarouselState, action) => {
  switch(action.type) {
    case 'ADD_CAROUSEL':
      const newState = deepcopy(state);
      return newState.concat( {...action.data, index: state.length} );

    default:
      return state;
  }
};

export default carouselReducer;
