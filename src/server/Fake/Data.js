import articleList from '../../store/FakeArticleData';
import gameList from '../../store/FakeGameData';
import videoList from '../../store/FakeVideoData';
import imageList from '../../store/FakeImageData';
import {mongoose} from '../mongodb/mongoose';
import {Article, Game, Video, Image} from '../model/GeneralGroupItem';

articleList.map((articleObj, index) => {
  articleObj.itemList = articleObj.itemList.map((item, idx) => {
    item.index = idx;
    item.groupIndex = index;
    return item;
  });
  const arti = new Article({...articleObj, groupIndex: index});
  arti.save().then(() => {
    console.log(`aritlce${index+1} saved`);
  }).catch((e) => {console.log(e)});
});

gameList.map((gameObj, index) => {
  gameObj.itemList = gameObj.itemList.map((item, idx) => {
    item.index = idx;
    item.groupIndex = index;
    return item;
  })
  const game = new Game({...gameObj, groupIndex: index});
  game.save().then(() => {
    console.log(`game${index+1} saved`);
  }).catch((e) => {console.log(e)});
});

imageList.map((imageObj, index) => {
  imageObj.itemList = imageObj.itemList.map((item, idx) => {
    item.index = idx;
    item.groupIndex = index;
    return item;
  })
  const image = new Image({...imageObj, groupIndex: index});
  image.save().then(() => {
    console.log(`image${index+1} saved`);
  }).catch((e) => {console.log(e)});
});

videoList.map((videoObj, index) => {
  videoObj.itemList = videoObj.itemList.map((item, idx) => {
    item.index = idx;
    item.groupIndex = index;
    return item;
  })
  const video = new Video({...videoObj, groupIndex: index});
  video.save().then(() => {
    console.log(`video${index+1} saved`);
  }).catch((e) => {console.log(e)});
});
