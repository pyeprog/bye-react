import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const mapStateToProps = (state, ownProps) => ({
  group: state[ownProps.app].groups[ownProps.groupIndex]
});

const Titlebar = (props) => {
  const showHref = `/${props.app}/list/groupindex/${props.groupIndex}`;
  const collapseHref = `/${props.app}/list`;

  return (
    <div className="row">
      <div className="col-12 bg-white d-flex align-items-center p-3 my-3 text-muted rounded box-shadow">
        <img className="mr-3" alt={props.group.groupTitle} src={props.group.icon} width="48" height="48"/>
        <div className="lh-100">
          <h6 className="mb-0 lh-100 text-dark">{props.group.groupTitle}</h6>
          <small>{props.group.description}</small>
          <small className="text-right mt-3 pl-2">
            {!!props.collapse ? (
              <Link to={collapseHref}>Back</Link>
            ) : (
              <Link to={showHref}>All update</Link>
            )}
          </small>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Titlebar);
