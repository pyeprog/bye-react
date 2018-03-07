import React from 'react';
import path from 'path';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router';
import uuidv1 from 'uuid/v1';
import express from 'express';
import bodyParser from 'body-parser';
import {mongoose} from './mongodb/mongoose';
import {Carousel} from './model/Carousel';
import {Article, Image, Video, Game} from './model/GeneralGroupItem';
import App from '../components/App';
//import {commentId1, commentId2, fakeCommentData} from '../store/FakeCommentData';
//import './Fake/Data';

const app = express();

app.use(express.static(path.join(__dirname, '..', '..', 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))

app.get('/data/:appName', (req, res) => {
  console.log(`new request ${req.params.appName}`);
  switch(req.params.appName) {
    case 'article':
      Article.find()
        .then((articleObjs) => {
          console.log(articleObjs);
          res.status(200).send(articleObjs);
        })
        .catch((e) => {
          console.log(e);
        });
      break;
    case 'image':
      Image.find()
        .then((imageObjs) => {
          res.status(200).send(imageObjs);
        })
        .catch((e) => {
          console.log(e);
        });
      break;
    case 'video':
      Video.find()
        .then((videoObjs) => {
          res.status(200).send(videoObjs);
        })
        .catch((e) => {
          console.log(e);
        });
      break;
    case 'game':
      Game.find()
        .then((gameObjs) => {
          res.status(200).send(gameObjs);
        })
        .catch((e) => {
          console.log(e);
        });
      break;

    case 'carousel':
      Carousel.find()
        .then((carouselObjs) => {
          res.status(200).send(carouselObjs);
        })
        .catch((e) => {
          console.log(e);
        });
        break;
    default:
      res.send();
  }
});

app.get('/data/comment/:id', (req, res) => {
  !!fakeCommentData[req.params.id] ? res.status(200).send(fakeCommentData[req.params.id]) : res.status(404).send('Not Found');
});

app.get('*', (req, res) => {
  const markup = renderToString(
    <StaticRouter
      location={req.url}
      context={{}}
    >
      <App/>
    </StaticRouter>
  );

  res.render('index.pug', {html: markup});
});

app.post('/data/rite/:type', (req, res) => {
  const data = req.body;
  let CurModel;
  switch(data.appType) {
    case 'article':
      CurModel = Article;
      break;
    case 'image':
      CurModel = Image;
      break;
    case 'video':
      CurModel = Video;
      break;
    case 'game':
      CurModel = Game;
      break;
    case 'carousel':
      CurModel = Carousel;
      break;
  }

  if (!!CurModel) {
    switch(req.params.type) {
      case 'group':
        CurModel.find({groupTitle:data.groupTitle}).then((docs) => {
          if(docs.length) {
            Promise.reject('group already exists');
          } else {
            return CurModel.count({}, (err, count) => {
              const groupData = {
                ...data,
                groupIndex: count,
                id: uuidv1(),
                date: Date.now(),
                itemList: []
              };
              const model = new CurModel(groupData);
              return model.save();
            });
          }
        }).then((doc) => {
          console.log(doc, 'saved');
          res.status(200).send('OK');
        }).catch((e) => {
          res.status(500).send();
        });
        break;

      case 'item':
        CurModel.findOne({groupIndex: data.groupIndex}, (err, group) => {
          const gTitle = group.groupTitle;
          const itemData = {
            ...data,
            nView: 0,
            nComment: 0,
            commentId: '',
            groupTitle: gTitle,
            index: group.itemList.length,
            date: Date.now(),
            href: `/${data.appType}/detail/groupindex/${data.groupIndex}/${data.appType}index/${group.itemList.length}`
          };
          group.itemList.push(itemData);
          return group.save();
        }).then((doc) => {
          console.log(doc, 'saved');
          res.status(200).send('OK');
        }).catch((e) => {
          res.status(500).send();
        })
        break;

      case 'carousel':
        CurModel.count({}, (err, count) => {
          const carouselData = {...data, index: count, id: uuidv1()};
          const model = new Carousel(carouselData);
          model.save().then((doc) => {
            console.log(doc, 'saved');
            res.status(200).send('OK');
          }).catch((e) => {
            res.status(500).send();
          });
        });
        break;
    }

  } else {
    res.status(500).send();
  }
});

app.listen(80, () => {
  console.log('The server is running on port 80');
});
