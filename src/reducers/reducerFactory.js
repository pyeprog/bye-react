import deepcopy from 'deepcopy';

const generalGroupState = [];

const defaultItem = {
  groupIndex: -1,
  groupTitle: '',
  id: undefined,
  date: 0,
  title: '',
  description: '',
  imgSrc: '',
  textSrc: '',
  videoSrc: '',
  appSrc: '',
  href: '',
  index: -1,
  commnetId: undefined,
  author: '',
  nView: 0,
  nComment: 0
};

const groupReducerFactory = (appName = '') => {
  appName = appName.toUpperCase();
  const appNameLc = appName.toLowerCase();

  return (state = generalGroupState, action) => {
    switch (action.type) {
      case `${appName}_ADD_GROUP_TO_APP`:
        if (state.findIndex((group) => group.groupTitle === action.groupTitle) === -1) {
        return [
          ...state,
          {
            groupIndex: action.groupIndex,
            groupTitle: action.groupTitle,
            description: action.description,
            icon: action.icon,
            nShow: action.nShow,
            date: action.date,
            id: action.id,
            itemList: action.itemList
          }
        ];
      } else {
        return state;
      }

      case `${appName}_ADD_ITEM_TO_GROUP`:
        return state.map((group) => {
          if (group.groupTitle === action.groupTitle) {
            const nextIndex = group.itemList.length;
            const defaultHref = `/${appNameLc}/detail/groupindex/${group.groupIndex}/${appNameLc}index/${nextIndex}`;

            group.itemList = [
              ...group.itemList,
              {
                ...defaultItem,
                groupIndex: group.groupIndex,
                groupTitle: group.groupTitle,
                id: action.id,
                date: action.date,
                title: action.title,
                description: action.description,
                imgSrc: action.imgSrc,
                textSrc: action.textSrc,
                videoSrc: action.videoSrc,
                appSrc: action.appSrc,
                href: action.href || defaultHref,
                index: nextIndex,
                commnetId: action.commentId,
                author: action.author,
                nView: action.nView,
                nComment: action.nCommnet
              }
            ];
          }
          return group;
        });

      case `${appName}_SET_N_SHOW`:
        const newState = deepcopy(state);
        newState[action.groupIndex].nShow = action.nShow;
        return newState;

      default:
        return state;
    }
  };
};

export default groupReducerFactory;
