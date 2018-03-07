import React from 'react';
import moment from 'moment';
import store from '../store/store';
import {connect} from 'react-redux';
import Titlebar from './Titlebar';
import {fetchAppData, setNShow} from '../actions/actionFactory';
import {Link, withRouter} from 'react-router-dom';

const ArticleListItem = (props) => (
  <div className="col-12 col-xl-6 px-2">
    <div className="card flex-md-row mb-4 box-shadow h-md-250">
      <div className="card-body d-flex flex-column align-items-start">
        <strong className="d-inline-block mb-2 text-primary">{props.groupTitle}</strong>
        <h3 className="mb-0">
          <Link className="text-dark" to={props.href}>{props.title}</Link>
        </h3>
        <div className="mb-1 text-muted">{moment(props.date).format('D MMM Y')}</div>
        <p className="card-text mb-auto">
          {props.description}
        </p>
        <Link to={props.href}>Continue reading</Link>
      </div>

      <img className="card-img-right flex-auto d-none d-md-block" src={props.imgSrc}/>
    </div>
  </div>
);

const ArticleListBoard = (props) => (
  <div className="row mt-3 justify-content-left">
    {props.articleObjs.slice(0, !!props.nShow ? props.nShow : props.articleObjs.length).map((articleObj) => (
      <ArticleListItem key={articleObj.groupTitle+articleObj.index} {...articleObj}/>
    ))}
  </div>
);

const mapStateToProps = (state) => {
  return {groups: state.article.groups};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNShow: (groupIndex, nShow) => {
      dispatch(setNShow('article')({groupIndex, nShow}));
    },

    fetchData: () => {
      dispatch(fetchAppData('article'));
    }
  };
}

class ArticleList extends React.Component {
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
                <Titlebar app='article' groupIndex={group.groupIndex} collapse={this.groupIndex !== -1}/>
                <ArticleListBoard articleObjs={group.itemList} nShow={this.groupIndex === -1 ? group.nShow : undefined}/>
              </div>
            );
          }
        })
      }
      </main>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleList));
