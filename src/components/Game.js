import React from 'react';
import Breadcrumb from './Breadcrumb';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {fetchAppData} from '../actions/actionFactory';

const GameTitle = (props) => (
  <div className="row pl-3 pb-2">
    <h4>{props.children}</h4>
  </div>
);

const GamePlayer = (props) => (
  <div className="row">
    <div className="embed-responsive embed-responsive-16by9">
      <iframe className="col-12 mb-5 bord-1" scrolling="no" src={props.gameSrc} allowFullScreen></iframe>
    </div>
  </div>
);

const GameDescription = (props) => (
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
    groups: state.game.groups
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => {dispatch(fetchAppData('game'))}
  };
}

class Game extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    (this.props.groups.length === 0) && this.props.fetchData();
  }

  fetchGroupInfo = () => {
    this.groupIndex = parseInt(this.props.match.params.groupIndex);
    this.gameIndex = parseInt(this.props.match.params.gameIndex);

    if (this.props.groups.length > 0) {
      this.curGroup = this.props.groups[this.groupIndex];
      this.gameList = this.curGroup.itemList;
      this.curGame = this.gameList[this.gameIndex];
    } else {
      this.gameList = [];
      this.curGame = {title: '', appSrc: '', description: ''};
    }
  }

  getBreadcrumbObjs = () => {
    const defaultBreadcrumbObj = [
      {text: 'HOME', href: '/'},
      {text: 'Game', href: '/game/list'},
    ];
    !!this.curGroup && defaultBreadcrumbObj.push({
      text: this.curGroup.groupTitle, 
      href: `/game/list/groupindex/${this.groupIndex}`
    });
    return defaultBreadcrumbObj;
  }

  render() {
    this.fetchGroupInfo();

    return (
      <div className="bg-white">
        <main className="container pb-4">
          <Breadcrumb crumbs={this.getBreadcrumbObjs()}/>
          <GameTitle>{this.curGame.title}</GameTitle>
          <GamePlayer gameSrc={this.curGame.appSrc}/>
          <GameDescription>{this.curGame.description}</GameDescription>
        </main>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));
