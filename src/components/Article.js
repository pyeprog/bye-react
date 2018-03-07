import React from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {fetchAppData} from '../actions/actionFactory';

const SidebarLeft = (props) => (
  <div className="bg-light d-none d-md-block col-md-3 border-right">
    <div className="container pt-4 pl-3">
    {
      props.articleObjs.map((group) => (

        <div key={group.groupIndex}>
          <h6>{group.groupTitle}</h6>
          <ul className="list-unstyled">
            {group.itemList.map((articleObj) => (
              <li key={articleObj.groupTitle+articleObj.index} className="py-1">
                <NavLink to={articleObj.href} activeClassName="text-success" className="text-secondary">{articleObj.title}</NavLink>
              </li>
            ))}
          </ul>
        </div>

      ))
    }

    </div>
  </div>
)

const ArticleMain = (props) => (
  <div className="bg-white col-12 col-md-8 col-xl-7">
    <div className="bg-white rounded my-3 py-2 px-5">
      <h1>{props.title}</h1>
      <ReactMarkdown source={props.textSrc}/>
    </div>

  </div>
);



/* Directory prop.directoryObjs
 * [
 *    {
 *      text: '...',
 *      href: '...',
 *      subs: [
 *        {
 *          text: '...',
 *          href: '...'
 *        }
 *      ]
 *    }
 * ]
 */

const Directory = (props) => (
  <div className="d-none d-xl-block bd-sidebar pl-0 py-4 col-xl-2 col-12">
    <ul className="pl-1 list-unstyled border-left">
      {props.directoryObjs.map((dObj) => (

        <div key={dObj.text+dObj.href}>
          <li><a href={dObj.href}>{dObj.text}</a></li>
          <ul>
            {dObj.subs.map((sub) => (
              <li key={sub.text+sub.href}><a href={sub.href}>{sub.text}</a></li>
            ))}
          </ul>
        </div>
      ))}

    </ul>
  </div>
);

const mapStateToProps = (state) => {
  return {
    groups: state.article.groups
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => {dispatch(fetchAppData('article'))}
  };
}

class Article extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    (this.props.groups.length === 0) && this.props.fetchData();
  }

  fetchGroupInfo = () => {
    this.groupIndex = parseInt(this.props.match.params.groupIndex);
    this.articleIndex = parseInt(this.props.match.params.articleIndex);
    
    if (this.props.groups.length > 0) {
      this.curGroup = this.props.groups[this.groupIndex];
      this.articleList = this.curGroup.itemList;
      this.curArticle = this.articleList[this.articleIndex];
    } else {
      this.articleList = [];
      this.curArticle = {title: '', textSrc: ''};
    }
  }

  getDirectoryObjs = () => {
    //fake Objs for testing
    return [{
      text: 'The main title',
      href: '#',
      subs: [{
        text: 'the subtitle of first topic',
        href: '#'
      }]
    }, {
      text: 'The second main title',
      href: '#',
      subs: [{
        text: 'a subtitle of 2',
        href: '#'
      }, {
        text: 'the second subtitle of 2',
        href: '#'
      }]
    }];
  }

  render() {
    this.fetchGroupInfo();

    return (
      <div className="articleApp row">
        <SidebarLeft articleObjs={this.props.groups}/>
        <ArticleMain title={this.curArticle.title} textSrc={this.curArticle.textSrc}/>
      </div>
    );
        /*<Directory directoryObjs={this.getDirectoryObjs() || []}/>*/
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Article));
