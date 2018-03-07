import store from './store'; 
import {addGroupToApp, addItemToGroup} from '../actions/actionFactory'; 

store.subscribe(() => {
  console.log(store.getState());
});

const srcObjs = [{
  src: "http://p3ijxxb1r.bkt.clouddn.com/Photo%20by%20Dardan%20Mu%20%28YP6lDrlxWYQ%29.jpg",
  date: 0,
  title: "This is a image",
  description: 'This is the description of one'
}, {
  src: "http://p3ijxxb1r.bkt.clouddn.com/test-167794.jpg",
  date: 1,
  title: "Haha",
  description: 'This is the description of two'
}, {
  src: "http://p3ijxxb1r.bkt.clouddn.com/Photo%20by%20Paul%20Gilmore%20%28OZdKEwDXXJU%29.jpg",
  date: -1,
  title: "I wanna",
  description: 'This is the description of three'
}, {
  src: "http://p3ijxxb1r.bkt.clouddn.com/Photo%20by%20Dardan%20Mu%20%28YP6lDrlxWYQ%29.jpg",
  date: 10,
  title: "This is not a image",
  description: 'This is the description of four'
}, {
  src: "http://p3ijxxb1r.bkt.clouddn.com/test-167795.jpg",
  date: 1,
  title: "This is also a image",
  description: 'This is the description of five'
}, {
  src: "http://p3ijxxb1r.bkt.clouddn.com/Photo%20by%20davide%20ragusa%20%28eCeDkpX7bqc%29.jpg",
  date: 0,
  title: "I dont wanna do",
  description: 'This is the description of six'
}, {
  src: "http://p3ijxxb1r.bkt.clouddn.com/test-167790.jpg",
  date: 8,
  title: "This is still a image",
  description: 'This is the description of seven'
}];

store.dispatch(addGroupToApp('image')({
  groupTitle: 'today',
  description: 'today is a fine day',
  icon: '/img/logo.png',
  nShow: 6,
  groupIndex: 0
}));

store.dispatch(addGroupToApp('image')({
  groupTitle: 'tomorrow',
  description: 'tomorrow is a fine day too',
  icon: '/img/logo.png',
  nShow: 6,
  groupIndex: 1
}));

srcObjs.map((srcObj) => {
  const targetGroup = store.getState().image.groups.find((group) => group.groupTitle === 'today');
  const currentIndex = targetGroup.itemList.length;
  store.dispatch(addItemToGroup('image')({
    groupTitle: 'today',
    groupIndex: targetGroup.index,
    title: srcObj.title,
    date: srcObj.date,
    description: srcObj.description,
    index: currentIndex,
    commentId: 123123,
    imgSrc: srcObj.src,
    href: srcObj.href,
    author: 'pd',
    nView: 10,
    nComment: 11
  }));
});

srcObjs.map((srcObj) => {
  const targetGroup = store.getState().image.groups.find((group) => group.groupTitle === 'tomorrow');
  const currentIndex = targetGroup.itemList.length;
  store.dispatch(addItemToGroup('image')({
    groupTitle: 'tomorrow',
    groupIndex: targetGroup.index,
    title: srcObj.title,
    date: srcObj.date,
    description: srcObj.description,
    index: currentIndex,
    commentId: 123123,
    imgSrc: srcObj.src,
    href: srcObj.href,
    author: 'dpd',
    nView: 10,
    nComment: 11
 }));
});

