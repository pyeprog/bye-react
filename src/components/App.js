import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Article from './Article';
import ArticleList from './ArticleList';
import Image from './Image';
import ImageList from './ImageList';
import Video from './Video';
import VideoList from './VideoList';
import Game from './Game';
import GameList from './GameList';
import HomePage from './HomePage';
import Navbar from './Navbar';
import Footer from './Footer';
import {Provider} from 'react-redux';
import store from '../store/store';
    

const App = (props) => (
  <Provider store={store}>
  <div>
  <Route path="/" component={Navbar}/>
  <main className="main-body">
  <Switch>
    <Route exact path='/' component={HomePage}/>
    <Route exact path='/article/list' component={ArticleList}/>
    <Route path='/article/list/groupname/:groupName' component={ArticleList}/>
    <Route path='/article/list/groupindex/:groupIndex' component={ArticleList}/>
    <Route path='/article/detail/groupindex/:groupIndex/articleindex/:articleIndex' component={Article}/>

    <Route exact path='/image/list' component={ImageList}/>
    <Route path='/image/list/groupname/:groupName' component={ImageList}/>
    <Route path='/image/list/groupindex/:groupIndex' component={ImageList}/>
    <Route path='/image/detail/groupindex/:groupIndex/imageindex/:imageIndex' component={Image}/>

    <Route exact path='/video/list' component={VideoList}/>
    <Route path='/video/list/groupname/:groupName' component={VideoList}/>
    <Route path='/video/list/groupindex/:groupIndex' component={VideoList}/>
    <Route path='/video/detail/groupindex/:groupIndex/videoindex/:videoIndex' component={Video}/>

    <Route exact path='/game/list' component={GameList}/>
    <Route path='/game/list/groupname/:groupName' component={GameList}/>
    <Route path='/game/list/groupindex/:groupIndex' component={GameList}/>
    <Route path='/game/detail/groupindex/:groupIndex/gameindex/:gameIndex' component={Game}/>

  </Switch>
  </main>
  <Route path="/" component={Footer}/>
  </div>
  </Provider>

);

export default App;
