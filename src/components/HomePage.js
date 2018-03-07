import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {fetchCarousels} from '../actions/carouselAction';
import {fetchAppData} from '../actions/actionFactory';

/* Carousel props.carObjs:
 * [
 *  {
 *    index,
 *    title: '...',
 *    description: '...',
 *    href: '...',
 *    imgSrc: '...'
 *  }
 * ]
 */

const Carousel = (props) => (
  <section className="bg-white">
    <div id="carouselIndicators" className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        {props.carObjs.map((_, index) => (
          <li key={index} data-target="#carouselIndicators" data-slide-to={String(index)}></li>
        ))}
      </ol>

      <div className="carousel-inner">
        {props.carObjs.map((carObj, index) => (

          <div key={carObj.groupTitle+carObj.index} className={`carousel-item ${index===0 && 'active'}`}>
            <img className="d-block w-100" src={carObj.imgSrc}/>
            <div className="carousel-caption d-none d-md-block">
              <h3>{carObj.title}</h3>
              <p>{carObj.description}</p>
              <p><Link className="btn btn-md btn-primary" to={carObj.href}>More</Link></p>
            </div>
          </div>

        ))}
      </div>

      <a className="carousel-control-prev" href="#carouselIndicators" data-slide="prev">
        <span className="carousel-control-prev-icon"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselIndicators" data-slide="next">
        <span className="carousel-control-next-icon"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>

  </section>
);

const ArticleFeatured = (props) => (
  <section className="bg-light container pb-5">
    <div className="d-flex border-bottom  pb-2 mb-3 mt-5 align-items-end">
      <h2 className="mb-0">Blog</h2>
      <p className="ml-auto mb-0"><Link to="/article/list">More></Link></p>
    </div>
    <div className="row mt-3 justify-content-left">

    {props.articleObjs.map((articleObj) => (
      <div key={articleObj.groupTitle+articleObj.index} className="col-12 col-lg-6 px-2">
        <div className="card flex-md-row mb-4 box-shadow h-md-250">
          <div className="card-body d-flex flex-column align-items-start">
            <strong className="d-inline-block mb-2 text-primary">{articleObj.groupTitle}</strong>
            <h3 className="mb-0">
              <Link className="text-dark" to={articleObj.href}>{articleObj.title}</Link>
            </h3>
            <div className="mb-1 text-muted">{moment(articleObj.date).format('D MMM Y')}</div>
            <p className="card-text mb-auto">
            {articleObj.description}
            </p>
            <Link to={articleObj.href}>Continue reading</Link>
          </div>
          <img className="card-img-right flex-auto d-none d-md-block" src={articleObj.imgSrc}/>
        </div>
      </div>
    ))}

    </div>
  </section>
);

// Extra attrs needed: iconClass, reverse
const FeaturedItem = (props) => (
  <div>
    <div className="py-5 row">
      {!props.featuredObj.reverse && (
        <div className="col-md-7">
          <h2> 
            <i className={props.featuredObj.iconClass}></i>
            <Link className="text-dark" to={props.featuredObj.href}>{props.featuredObj.title}</Link>
          </h2>
          <p className="lead text-muted">
            {props.featuredObj.description}
            
            <Link to={props.featuredObj.href}>  More..</Link>
          </p>
        </div>
      )}

      <div className="col-md-5">
        <Link to={props.featuredObj.href}>
          <img className="img-fluid mx-auto" src={props.featuredObj.imgSrc} width="500px" height="500px"/>
        </Link>
      </div>

      {props.featuredObj.reverse && (
        <div className="col-md-7">
          <h2> 
            <i className={props.featuredObj.iconClass}></i>
            <Link className="text-dark" to={props.featuredObj.href}>{props.featuredObj.title}</Link>
          </h2>
          <p className="lead text-muted">
            {props.featuredObj.description}
            <Link to={props.featuredObj.href}>  More..</Link>
          </p>
        </div>
      )}

    </div>

    <hr className="my-3"/>
  </div>
);

const FeaturedList = (props) => (
  <section className="bg-white">
    <div className="container">
      {props.featuredObjs.map((obj) => (
        <FeaturedItem key={obj.groupTitle+obj.index} featuredObj={obj}/>
      ))}
    </div>
  </section>
);

const mapStateToProps = (state) => {
  return { state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCarousels: () => {dispatch(fetchCarousels())},
    fetchArticles: () => {dispatch(fetchAppData('article'))},
    fetchImages: () => {dispatch(fetchAppData('image'))},
    fetchVideos: () => {dispatch(fetchAppData('video'))},
    fetchGames: () => {dispatch(fetchAppData('game'))}
  };
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    (!this.props.state.carousel || this.props.state.carousel.length === 0) && this.props.fetchCarousels();
    (!this.props.state.article || this.props.state.article.groups.length === 0) && this.props.fetchArticles();
    (!this.props.state.image || this.props.state.image.groups.length === 0) && this.props.fetchImages();
    (!this.props.state.video || this.props.state.video.groups.length === 0) && this.props.fetchVideos();
    (!this.props.state.game || this.props.state.game.groups.length === 0) && this.props.fetchGames();
  }

  getFeaturedArticleObjs = () => {
    //First two articles
    if (!!this.props.state.article.groups[0]) {
      return this.props.state.article.groups[0].itemList.slice(0, 2);
    } else {
      return [];
    }
  }

  getFeaturedObjs = (reverse = false) => {
    //First obj of each type
    const featuredObjs = [];
    const iconClasses = ['fas fa-camera-retro', 'fab fa-youtube', 'fas fa-chess'];
    let toggle = false;

    ['image', 'video', 'game'].forEach((appName, index) => {
      if (!!this.props.state[appName].groups[0]) {
        featuredObjs.push({
          ...this.props.state[appName].groups[0].itemList[0],
          iconClass: iconClasses[index],
          reverse: toggle,
          appName
        });
        toggle = !toggle;
      }
    })

    return featuredObjs;
  }

  render() {
    return (
      <div>
        <Carousel carObjs={this.props.state.carousel}/>
        <ArticleFeatured articleObjs={this.getFeaturedArticleObjs()}/>
        <FeaturedList featuredObjs={this.getFeaturedObjs()}/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
