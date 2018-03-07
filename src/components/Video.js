import React from 'react';
import Breadcrumb from './Breadcrumb';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {fetchAppData} from '../actions/actionFactory';

const VideoTitle = (props) => (
  <div className="row pl-3 pb-2">
    <h4>{props.children}</h4>
  </div>
);

const VideoPlayer = (props) => (
  <div className="row">
    <div className="embed-responsive embed-responsive-16by9">
      <iframe className="col-12 mb-5" src={props.videoSrc} allowFullScreen></iframe>
    </div>
  </div>
);

const VideoDescription = (props) => (
  <div className="row">
    <div className="col-12 mt-4 mb-2">
      <h6 className="border-bottom pb-2">Description</h6>
      <small className="text-muted">
        {props.children}
      </small>
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    groups: state.video.groups
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => {dispatch(fetchAppData('video'))}
  };
}

class Video extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    (this.props.groups.length === 0) && this.props.fetchData();
  }

  fetchGroupInfo = () => {
    this.groupIndex = parseInt(this.props.match.params.groupIndex);
    this.videoIndex = parseInt(this.props.match.params.videoIndex);

    if (this.props.groups.length > 0) {
      this.curGroup = this.props.groups[this.groupIndex];
      this.videoList = this.curGroup.itemList;
      this.curVideo = this.videoList[this.videoIndex];
    } else {
      this.videoList = [];
      this.curVideo = {title: '', videoSrc: '', description: ''};
    }
  }

  getBreadcrumbObjs = () => {
    const defaultBreadcrumbObj = [
      {text: 'HOME', href: '/'},
      {text: 'video', href: '/video/list'},
    ];
    !!this.curGroup && defaultBreadcrumbObj.push({
      text: this.curGroup.groupTitle,
      href: `/video/list/groupindex/${this.groupIndex}`
    });
    return defaultBreadcrumbObj;
  }

  render() {
    this.fetchGroupInfo();

    return (
      <div className="bg-white">
        <main className="container pb-4">
          <Breadcrumb crumbs={this.getBreadcrumbObjs()}/>
          <VideoTitle>{this.curVideo.title}</VideoTitle>
          <VideoPlayer videoSrc={this.curVideo.videoSrc}/>
          <VideoDescription>{this.curVideo.description}</VideoDescription>
        </main>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Video));
