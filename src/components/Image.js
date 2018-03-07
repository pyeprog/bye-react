import React from 'react';
import store from '../store/store';
import {connect} from 'react-redux';
import Breadcrumb from './Breadcrumb';
import Comment from './Comment';
import {Link, withRouter} from 'react-router-dom';
import {fetchAppData} from '../actions/actionFactory';
import {commentId1, commentId2} from '../store/FakeCommentData';

const mapStateToProps = (state) => {
  return {
    groups: state.image.groups,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => {dispatch(fetchAppData('image'))}
  };
}
 
class Image extends React.Component {
  constructor(props) {
    super(props);

    this.fetchGroupInfo();
  }

  fetchGroupInfo = () => {
    this.groupIndex = parseInt(this.props.match.params.groupIndex);
    this.imageIndex = parseInt(this.props.match.params.imageIndex);

    if (this.props.groups.length > 0) {
      this.curGroup = this.props.groups[this.groupIndex];
      this.imageList = this.curGroup.itemList;
    } else {
      this.imageList = [];
    }
  }

  getBreadcrumbObjs = () => {
    const defaultBreadcrumbObj = [
      {text: 'HOME', href: '/'},
      {text: 'Image', href: '/image/list'},
    ];
    !!this.curGroup && defaultBreadcrumbObj.push({
      text: this.curGroup.groupTitle,
      href: `/image/list/groupindex/${this.groupIndex}`
    });
    return defaultBreadcrumbObj;
  }

  getThumbnailImageObjs = (curIndex, nShow = 5) => {
    //pick a subarray of itemList, curIndex is the middle index of the subarray.
    //Special cases is handled when curIndex is near the head and tail of the array.
    let head = curIndex - Math.floor(nShow / 2);
    let tail = head + nShow;
    if (head < 0) {
      head = 0;
      tail = head + nShow < this.imageList.length ? head + nShow : this.imageList.length;
    } else if (tail > this.imageList.length) {
      tail = this.imageList.length;
      head = tail - nShow < 0 ? 0 : tail - nShow;
    }

    return this.imageList.slice(head, tail);
  }

  getCurImageObj = () => {
    if (this.imageList.length > 0) {
      return this.props.groups[this.groupIndex].itemList[this.imageIndex];
    } else {
      return {imgSrc: ''};
    }
  }

  getNextImageObj = () => {
    if (this.imageIndex + 1 < this.imageList.length) {
      return this.imageList[this.imageIndex + 1];
    } else {
      return {};
    }
  }

  getNextImageObjHref = () => {
    const nextImageObj = this.getNextImageObj();
    if (!nextImageObj.index) {
      return '/image/list';
    } else {
      return nextImageObj.href;
    }
  }

  componentWillMount() { }

  componentDidMount() {
    (this.props.groups.length === 0) && this.props.fetchData();
  }

  render() {
    this.fetchGroupInfo();

    return (
      <div>
        <div className="bg-white">
          <main className="bg-white container pb-4">
            <Breadcrumb crumbs={this.getBreadcrumbObjs()}/>
            <div className="row">
              <LargeImage imgSrc={this.getCurImageObj().imgSrc} nextHref={this.getNextImageObjHref()}/>
              <Thumbnail imgObjs={this.getThumbnailImageObjs(this.imageIndex, 5)}/>
            </div>
            <ImageDescription>{this.getCurImageObj().description}</ImageDescription>
          </main>
        </div>
        <div className="bg-light">
        </div>
      </div>
    );
  }
}

const LargeImage = (props) => (
  <div className="col-12 col-lg-10">
    <figure className="figure">
      <a>
        <img className="figure-img img-fluid rounded" src={props.imgSrc}/>
      </a>
      {!!props.nextHref && <figcaption className="d-lg-none figure-caption text-right"><Link to={props.nextHref}>Next></Link></figcaption>}
    </figure>
  </div>
);

const Thumbnail = (props) => (
  <div className="d-none d-md-none d-lg-block col-lg-2">
    <h6 className="p-1 pb-2 text-muted border-bottom">Next</h6>
    <ul className="list-unstyled d-flex flex-column">
    {props.imgObjs.map((imgObj) => (
      <li key={imgObj.groupTitle+imgObj.index}><Link to={imgObj.href}><img className="img-thumbnail rounded d-block" src={imgObj.imgSrc}/></Link></li>
    ))}
    </ul>
  </div>
);

const ImageDescription = (props) => (
  <div className="row">
    <div className="col-12 mt-0 mb-2">
      <h6 className="border-bottom pb-2">Story</h6>
      <small className="text-muted">
        {props.children}
      </small>
    </div>
  </div>
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Image));
