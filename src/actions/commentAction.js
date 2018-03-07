import axios from 'axios';
import uuidv1 from 'uuid/v1';

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

const addCommentGroup = ({
  appType = '',
  nComment = 0,
  updateData = 0,
  commentId = uuidv1(),
  selfIcon = '',
  itemList = []
} = {}) => ({
  type: 'ADD_COMMENT_GROUP',
  appType,
  nComment,
  updateData,
  commentId,
  selfIcon,
  itemList
});

const addComment = ({
  commentId,
  name,
  icon,
  text = '',
  date = Date.now()
} = {}) => ({
  type: 'ADD_COMMENT',
  commentId,
  name,
  icon,
  text,
  date
});

const fetchComment = (commentId = '') => {
  return (dispatch) => {
    return axios.get(`/data/comment/${commentId}`)
    .then((res) => {
      dispatch(addCommentGroup({...res.data}));
    });
  };
};

export {addComment, addCommentGroup, fetchComment};
