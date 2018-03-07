import axios from 'axios';
import defaultGroupInfo from '../default/defaultGroupInfo';
import defaultItem from  '../default/defaultItem';

const addGroupToApp = (appName = '') => {
  appName = appName.toUpperCase();

  return ({groupIndex, groupTitle, description, icon, nShow, date, id, itemList} = {}) => ({
    type: `${appName}_ADD_GROUP_TO_APP`,
    groupIndex: groupIndex,
    groupTitle: groupTitle || defaultGroupInfo.groupTitle,
    description: description || defaultGroupInfo.description,
    icon: icon || defaultGroupInfo.icon,
    nShow: nShow || defaultGroupInfo.nShow,
    date: date || defaultGroupInfo.date,
    id: id || defaultGroupInfo.id,
    itemList: itemList || defaultGroupInfo.itemList
  });
}

const addItemToGroup = (appName = '') => {
  appName = appName.toUpperCase();

  return ({groupIndex, groupTitle, id, date, title, description, imgSrc, textSrc, videoSrc, appSrc, href, index, commentId, author, nView, nComment} = {}) => ({
    type: `${appName}_ADD_ITEM_TO_GROUP`,
    groupIndex: groupIndex,
    groupTitle: groupTitle || defaultItem.groupTitle,
    id: id || defaultItem.id,
    date: date || defaultItem.date,
    title: title || defaultItem.title,
    description: description || defaultItem.description,
    imgSrc: imgSrc || defaultItem.imgSrc,
    textSrc: textSrc || defaultItem.textSrc,
    videoSrc: videoSrc || defaultItem.videoSrc,
    appSrc: appSrc || defaultItem.appSrc,
    href: href || defaultItem.href,
    index: index || defaultItem.index,
    commentId: commentId || defaultItem.commentId,
    author: author || defaultItem.author,
    nView: nView || defaultItem.nView,
    nComment: nComment || defaultItem.nComment,
  });
}

const setNShow = (appName = '') => {
  appName = appName.toUpperCase();

  return ({ groupIndex, nShow }) => ({
    type: `${appName}_SET_N_SHOW`,
    groupIndex,
    nShow
  });
};

const fetchAppData = (appName = '') => {
  appName = appName.toLowerCase();

  return (dispatch, getState) => {
    return axios.get(`/data/${appName}`)
      .then((res) => {
        res.data.map((group) => {
          const itemList = group.itemList.map((item, index) => {
            const curGroupIndex = group.groupIndex || getState()[`${appName}`].groups.length;
            return {
              ...defaultItem,
              ...item,
              groupIndex: curGroupIndex,
              groupTitle: group.groupTitle,
              index,
              href: `/${appName}/detail/groupindex/${curGroupIndex}/${appName}index/${index}`
            }
          });
          dispatch(addGroupToApp(appName)({
            groupIndex: group.groupIndex || getState()[`${appName}`].groups.length,
            groupTitle: group.groupTitle,
            description: group.description,
            icon: group.icon,
            nShow: group.nShow,
            date: group.date,
            id: group.id,
            itemList: itemList
          }))
        })
      }); 
  };
}

export {addGroupToApp, addItemToGroup, setNShow, fetchAppData};
