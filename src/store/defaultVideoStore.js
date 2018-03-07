import store from './store'; 
import {addGroupToApp, addItemToGroup} from '../actions/actionFactory'; 

const srcObjs = [{
  videoSrc: "https://v.qq.com/iframe/player.html?vid=n0529ge9dc9&tiny=0&auto=0",
  imgSrc: "http://p3ijxxb1r.bkt.clouddn.com/Photo%20by%20Dardan%20Mu%20%28YP6lDrlxWYQ%29.jpg",
  date: 0,
  title: "This is a video demo",
  description: "This is a description of video"
}, {
  videoSrc: "https://v.qq.com/iframe/player.html?vid=l0513yrp44c&tiny=0&auto=0",
  imgSrc: "http://p3ijxxb1r.bkt.clouddn.com/Photo%20by%20Dardan%20Mu%20%28YP6lDrlxWYQ%29.jpg",
  date: 1,
  title: "This is the second video demo",
  description: "This is the description of the second video"
}, {
  videoSrc: "https://v.qq.com/iframe/player.html?vid=n0529ge9dc9&tiny=0&auto=0",
  imgSrc: "http://p3ijxxb1r.bkt.clouddn.com/Photo%20by%20Dardan%20Mu%20%28YP6lDrlxWYQ%29.jpg",
  date: 0,
  title: "This is a video demo",
  description: "This is a description of video"
}, {
  videoSrc: "https://v.qq.com/iframe/player.html?vid=l0513yrp44c&tiny=0&auto=0",
  imgSrc: "http://p3ijxxb1r.bkt.clouddn.com/Photo%20by%20Paul%20Gilmore%20%28OZdKEwDXXJU%29.jpg",
  date: 1,
  title: "This is the second video demo",
  description: "This is the description of the second video"
},{
  videoSrc: "https://v.qq.com/iframe/player.html?vid=n0529ge9dc9&tiny=0&auto=0",
  imgSrc: "http://p3ijxxb1r.bkt.clouddn.com/Photo%20by%20Paul%20Gilmore%20%28OZdKEwDXXJU%29.jpg",
  date: 0,
  title: "This is a video demo",
  description: "This is a description of video"
}, {
  videoSrc: "https://v.qq.com/iframe/player.html?vid=l0513yrp44c&tiny=0&auto=0",
  imgSrc: "http://p3ijxxb1r.bkt.clouddn.com/Photo%20by%20Paul%20Gilmore%20%28OZdKEwDXXJU%29.jpg",
  date: 1,
  title: "This is the second video demo",
  description: "This is the description of the second video"
}];

store.dispatch(addGroupToApp('video')({
  groupTitle: 'math',
  description: 'Math is great',
  icon: '/img/logo.png',
  nShow: 6,
  groupIndex: 0
}));

store.dispatch(addGroupToApp('video')({
  groupTitle: 'fun',
  description: 'Fun is math',
  icon: '/img/logo.png',
  nShow: 6,
  groupIndex: 1
}));

srcObjs.map((srcObj) => {
  const targetGroup = store.getState().image.groups.find((group) => group.groupTitle === 'today');
  const currentIndex = targetGroup.itemList.length;
  store.dispatch(addItemToGroup('video')({
    groupTitle: 'math',
    groupIndex: targetGroup.index,
    title: srcObj.title,
    date: srcObj.date,
    description: srcObj.description,
    index: currentIndex,
    commentId: 123123,
    videoSrc: srcObj.videoSrc,
    imgSrc: srcObj.imgSrc,
    href: srcObj.href,
    author: 'pd',
    nView: 10,
    nComment: 11
  }));
});

srcObjs.map((srcObj) => {
  const targetGroup = store.getState().image.groups.find((group) => group.groupTitle === 'today');
  const currentIndex = targetGroup.itemList.length;
  store.dispatch(addItemToGroup('video')({
    groupTitle: 'fun',
    groupIndex: targetGroup.index,
    title: srcObj.title,
    date: srcObj.date,
    description: srcObj.description,
    index: currentIndex,
    commentId: 123123,
    videoSrc: srcObj.videoSrc,
    imgSrc: srcObj.imgSrc,
    href: srcObj.href,
    author: 'pd',
    nView: 14,
    nComment: 11
  }));
});
