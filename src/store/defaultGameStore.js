import store from './store'; 
import {addGroupToApp, addItemToGroup} from '../actions/actionFactory'; 

const srcObjs = [{
  appSrc: "http://hexgl.bkcore.com/play/",
  imgSrc: "http://p3ijxxb1r.bkt.clouddn.com/Photo%20by%20Dardan%20Mu%20%28YP6lDrlxWYQ%29.jpg",
  date: 0,
  title: "This is a game demo",
  description: "This is a description of game"
}, {
  appSrc: "https://missile-game.bwhmather.com/",
  imgSrc: "http://p3ijxxb1r.bkt.clouddn.com/Photo%20by%20Dardan%20Mu%20%28YP6lDrlxWYQ%29.jpg",
  date: 1,
  title: "This is the second game demo",
  description: "This is the description of the second game"
}, {
  appSrc: "http://www.deconstructeam.com/games/gods-will-be-watching/",
  imgSrc: "http://p3ijxxb1r.bkt.clouddn.com/Photo%20by%20Dardan%20Mu%20%28YP6lDrlxWYQ%29.jpg",
  date: 0,
  title: "This is a game demo",
  description: "This is a description of game"
}, {
  appSrc: "http://www.sinuousgame.com/",
  imgSrc: "http://p3ijxxb1r.bkt.clouddn.com/Photo%20by%20Paul%20Gilmore%20%28OZdKEwDXXJU%29.jpg",
  date: 1,
  title: "This is the second game demo",
  description: "This is the description of the second game"
},{
  appSrc: "https://playcanv.as/p/JtL2iqIH/",
  imgSrc: "http://p3ijxxb1r.bkt.clouddn.com/Photo%20by%20Paul%20Gilmore%20%28OZdKEwDXXJU%29.jpg",
  date: 0,
  title: "This is a game demo",
  description: "This is a description of game"
}, {
  appSrc: "http://entanglement.gopherwoodstudios.com/zh-CN-index.html",
  imgSrc: "http://p3ijxxb1r.bkt.clouddn.com/Photo%20by%20Paul%20Gilmore%20%28OZdKEwDXXJU%29.jpg",
  date: 1,
  title: "This is the second game demo",
  description: "This is the description of the second game"
}];

store.dispatch(addGroupToApp('game')({
  groupTitle: 'html5 game',
  description: 'Makes my machine hot',
  icon: '/img/logo.png',
  nShow: 6,
  groupIndex: 0
}));

store.dispatch(addGroupToApp('game')({
  groupTitle: 'not fun',
  description: 'games that cannot load correctly',
  icon: '/img/logo.png',
  nShow: 6,
  groupIndex: 1
}));

srcObjs.map((srcObj) => {
  const targetGroup = store.getState().image.groups.find((group) => group.groupTitle === 'today');
  const currentIndex = targetGroup.itemList.length;
  store.dispatch(addItemToGroup('game')({
    groupTitle: 'html5 game',
    groupIndex: targetGroup.index,
    title: srcObj.title,
    date: srcObj.date,
    description: srcObj.description,
    index: currentIndex,
    commentId: 123123,
    appSrc: srcObj.appSrc,
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
  store.dispatch(addItemToGroup('game')({
    groupTitle: 'not fun',
    groupIndex: targetGroup.index,
    title: srcObj.title,
    date: srcObj.date,
    description: srcObj.description,
    index: currentIndex,
    commentId: 123123,
    appSrc: srcObj.appSrc,
    imgSrc: srcObj.imgSrc,
    href: srcObj.href,
    author: 'pd',
    nView: 14,
    nComment: 11
  }));
});
