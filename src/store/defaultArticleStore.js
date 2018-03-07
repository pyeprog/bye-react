import store from './store'; 
import {addGroupToApp, addItemToGroup} from '../actions/actionFactory'; 

const srcObjs = [{
  imgSrc: "http://p3ijxxb1r.bkt.clouddn.com/test-167795.jpg?imageView2/1/w/200/h/250/format/png/q/75|imageslim",
  textSrc: 'This is the text source',
  date: 0,
  title: "A demo article",
  description: "The description of a demo article"
}, {
  imgSrc: "http://p3ijxxb1r.bkt.clouddn.com/test-167795.jpg?imageView2/1/w/200/h/250/format/png/q/75|imageslim",
  textSrc: 'This is another text source',
  date: 1,
  title: "Another demo article",
  description: "The description of the second demo article"
}, {
  imgSrc: "http://p3ijxxb1r.bkt.clouddn.com/test-167795.jpg?imageView2/1/w/200/h/250/format/png/q/75|imageslim",
  textSrc: 'This is the text source',
  date: 0,
  title: "A demo article",
  description: "The description of a demo article"
}, {
  imgSrc: "http://p3ijxxb1r.bkt.clouddn.com/test-167795.jpg?imageView2/1/w/200/h/250/format/png/q/75|imageslim",
  textSrc: 'This is another text source',
  date: 1,
  title: "Another demo article",
  description: "The description of the second demo article"
}, {
  imgSrc: "http://p3ijxxb1r.bkt.clouddn.com/test-167795.jpg?imageView2/1/w/200/h/250/format/png/q/75|imageslim",
  textSrc: 'This is the text source',
  date: 0,
  title: "A demo article",
  description: "The description of a demo article"
}, {
  imgSrc: "http://p3ijxxb1r.bkt.clouddn.com/test-167795.jpg?imageView2/1/w/200/h/250/format/png/q/75|imageslim",
  textSrc: 'This is another text source',
  date: 1,
  title: "Another demo article",
  description: "The description of the second demo article"
}, {
  imgSrc: "http://p3ijxxb1r.bkt.clouddn.com/test-167795.jpg?imageView2/1/w/200/h/250/format/png/q/75|imageslim",
  textSrc: 'This is the text source',
  date: 0,
  title: "A demo article",
  description: "The description of a demo article"
}, {
  imgSrc: "http://p3ijxxb1r.bkt.clouddn.com/test-167795.jpg?imageView2/1/w/200/h/250/format/png/q/75|imageslim",
  textSrc: 'This is another text source',
  date: 1,
  title: "Another demo article",
  description: "The description of the second demo article"
}, ];

store.dispatch(addGroupToApp('article')({
  groupTitle: 'About ME',
  description: 'All about me',
  icon: '/img/logo.png',
  nShow: 6,
  groupIndex: 0
}));

store.dispatch(addGroupToApp('article')({
  groupTitle: 'About tensorflow',
  description: 'Knowledge about tensorflow',
  icon: '/img/logo.png',
  nShow: 6,
  groupIndex: 1
}));

srcObjs.map((srcObj) => {
  const targetGroup = store.getState().image.groups.find((group) => group.groupTitle === 'today');
  const currentIndex = targetGroup.itemList.length;
  store.dispatch(addItemToGroup('article')({
    groupTitle: 'About ME',
    groupIndex: targetGroup.index,
    title: srcObj.title,
    date: srcObj.date,
    description: srcObj.description,
    index: currentIndex,
    commentId: 123123,
    textSrc: srcObj.textSrc,
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
  store.dispatch(addItemToGroup('article')({
    groupTitle: 'About tensorflow',
    groupIndex: targetGroup.index,
    title: srcObj.title,
    date: srcObj.date,
    description: srcObj.description,
    index: currentIndex,
    commentId: 123123,
    textSrc: srcObj.textSrc,
    imgSrc: srcObj.imgSrc,
    href: srcObj.href,
    author: 'pd',
    nView: 14,
    nComment: 11
  }));
});
