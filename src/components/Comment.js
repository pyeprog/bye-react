import React from 'react';
import {connect} from 'react-redux';
import {addComment, fetchComment} from '../actions/commentAction';
import {Link, withRouter} from 'react-router-dom';

/* Comment dataObj
 * {
 *    commentId: {
 *      appType: '',
 *      nComment: 0,
 *      updateDate: 0,
 *      commentId: '',
 *      selfIcon: '',
 *      itemList: [
 *        {
 *          name: '',
 *          commentId: '',
 *          icon: '',
 *          text: '',
 *          date: 0,
 *          index: -1
 *        }
 *      ]
 *    }
 * }
 */

const mapStateToProps = (state, ownProps) => {
  return {
    commentObj: state.comment[ownProps.commentId]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (commentId) => {dispatch(fetchComment(commentId))},
    addComment: (commentId, icon, name, text, date) => {dispatch(addComment({
      commentId, icon, name, text, date
    }))}
  };
};

class Comment extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if(!this.props.commentObj) {
      this.props.fetchData(this.props.commentId);
    }
  }

  submitComment = (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const commentText = document.getElementById('comment').value;
    const now = Date.now();
    this.props.addComment(this.props.commentId, '/img/logo.png', name, commentText, now);
    document.getElementById('name').value = '';
    document.getElementById('comment').value = '';
  }

  render() {
    return (
      <div className="bg-light container">
        <div className="row">

          <div className="mx-auto my-3 p-3 bg-white col-11">
            <h6 className="border-bottom border-gray pb-2 mb-0">Recent updates</h6>

            {
              !!this.props.commentObj && 
              this.props.commentObj.itemList.map((obj, index) => (
              <div key={index} className="media text-muted pt-3">
                <img className="mr-2 rounded" width="32px" height="32px" src={obj.icon}/>
                <p className="media-body ph-3 mb-0 small lh-125 border-bottom border-gray">
                <strong className="d-block text-gray-dark">@{obj.name}</strong>
                  {obj.text}
                </p>
              </div>
            ))}

            {
              !!this.props.commentObj &&
              (
                <div className="form-group row pt-3 mx-auto">
                  <img className="rounded" width="32px" height="32px" src={this.props.commentObj.selfIcon}/>

                  <div className="col-2">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">@</span>
                      </div>
                      <input type="text" className="form-control" id="name" placeholder="Username"></input>
                    </div>
                  </div>

                  <div className="col-8">
                    <div className="input-group mb-2">
                      <input type="text" className="form-control" id="comment" placeholder="comment"></input>
                    </div>
                  </div>

                  <div className="col-1">
                    <button onClick={this.submitComment} type="submit" className="btn btn-primary">Submit</button>
                  </div>
                </div>
              )
            }

          </div>

        </div>

    </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
