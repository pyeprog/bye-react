import React from 'react';
import moment from 'moment';
import store from '../store/store';
import {connect} from 'react-redux';
import Titlebar from './Titlebar';
import {fetchAppData, setNShow} from '../actions/actionFactory';
import {Link, withRouter} from 'react-router-dom';

const ImageListItem = (props) => (
  <figure className="figure col-12 col-sm-12 col-md-6 col-lg-4">
    <Link to={props.href}>
      <img src={props.imgSrc} className="figure-img img-fluid rounded"/>
    </Link>
    <div className="justify-content-between d-flex">
      <figcaption className="figure-caption">{props.title}</figcaption>
      <figcaption className="figure-caption text-right">{moment(props.date).format('l')}</figcaption>
    </div>
  </figure>
);

const ImageListBoard = (props) => (
  <div className="row mt-3 justify-content-left">
    {props.imgObjs.slice(0, !!props.nShow ? props.nShow : props.imgObjs.length).map((imgObj) => (
      <ImageListItem key={imgObj.groupTitle+imgObj.index} {...imgObj}/>
    ))}
  </div>
);

const mapStateToProps = (state) => {
  return {groups: state.image.groups};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNShow: (groupIndex, nShow) => {
      dispatch(setNShow('image')({groupIndex, nShow}));
    },
    fetchData: () => {
      dispatch(fetchAppData('image'));
    }
  };
}

class ImageList extends React.Component {
  constructor(props) {
    super(props);

    this.fetchGroupInfo();
  }

  componentWillMount() {
    this.getTargetGroups();
  }

  componentDidMount() {
    (this.props.groups.length === 0) && this.props.fetchData();
  }

  fetchGroupInfo = () => {
    const groupIndexStr = this.props.match.params.groupIndex || "-1";
    this.groupIndex = parseInt(groupIndexStr);
    this.groupTitle = this.props.match.params.groupName || '';

    if (this.groupIndex === -1 && !!this.groupTitle) {
      this.groupIndex = this.props.groups.findIndex((group) => group.groupTitle === this.groupTitle);
      if (this.groupIndex === -1) {
        this.groupTitle = '';
      }
    } else if (this.groupIndex !== -1) {
      if (this.groupIndex < 0 || this.groupIndex >= this.props.groups.length) {
        this.groupIndex = -1;
        this.groupTitle = '';
      } else {
        this.groupTitle = this.props.groups[this.groupIndex].groupTitle;
      }
    }
  }

  getTargetGroups = () => {
    this.fetchGroupInfo();

    if (this.groupIndex === -1) {
      this.targetGroups = this.props.groups;
    } else {
      this.targetGroups = [this.props.groups[this.groupIndex]];
    }
  }

  render() {
    this.getTargetGroups();

    return (
      <main className="container">
      {
        this.targetGroups.map((group) => {
          if (!!group.nShow) {
            return (
              <div key={group.groupTitle+group.groupIndex}>
                <Titlebar app='image' groupIndex={group.groupIndex} collapse={this.groupIndex !== -1}/>
                <ImageListBoard imgObjs={group.itemList} nShow={this.groupIndex === -1 ? group.nShow : undefined}/>
              </div>
            );
          }
        })
      }
      </main>
    )
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImageList));
