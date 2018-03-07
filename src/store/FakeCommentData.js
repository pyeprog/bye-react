const commentId1 = '37604ea0-1ec1-11e8-ae55-8dd6797d3240';
const commentId2 = '37604ea1-1ec1-11e8-ae55-8dd6797d3240';
const fakeCommentData = {};
fakeCommentData[commentId1] = {
  appType: 'uniform',
  nComment: 5,
  updateDate: 121234,
  commentId: commentId1,
  selfIcon: '/img/logo.png',
  itemList: [
    {
      name: 'pd',
      commentId: commentId1,
      icon: '/img/logo.png',
      text: 'help me!!Please help me!',
      date: 122341,
      index: 0
    }, 
    {
      name: 'pd',
      commentId: commentId1,
      icon: '/img/logo.png',
      text: 'No need, fix the problem',
      date: 122341,
      index: 1
    },
    {
      name: 'pd',
      commentId: commentId1,
      icon: '/img/logo.png',
      text: 'Somebody help me again!',
      date: 122341,
      index: 2
    }
  ]
};

fakeCommentData[commentId2] = {
  appType: 'uniform',
  nComment: 5,
  updateDate: 121234,
  commentId: commentId2,
  selfIcon: '/img/logo.png',
  itemList: [
    {
      name: 'pd',
      commentId: commentId2,
      icon: '/img/logo.png',
      text: 'help me!!Please help me!',
      date: 122341,
      index: 0
    }, 
    {
      name: 'pd',
      commentId: commentId2,
      icon: '/img/logo.png',
      text: 'No need, fix the problem',
      date: 122341,
      index: 1
    },
    {
      name: 'pd',
      commentId: commentId2,
      icon: '/img/logo.png',
      text: 'Somebody help me again!',
      date: 122341,
      index: 2
    }
  ]
};

export {commentId1, commentId2, fakeCommentData};
