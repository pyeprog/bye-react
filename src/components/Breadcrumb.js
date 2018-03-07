import React from 'react';
import {Link} from 'react-router-dom';

const Breadcrumb = (props) => (
  <div className="row mt-3">
    <nav>
      <ol className="breadcrumb bg-white mb-0">
        <li className="breadcrumb-item"><i className="fas fa-angle-right"></i></li>
        {
          props.crumbs.map((crumbObj) => (
            <li key={crumbObj.text} className="breadcrumb-item"><Link className="text-muted" to={crumbObj.href}>{crumbObj.text}</Link></li>
          ))
        }
      </ol>
    </nav>
  </div>
);

export default Breadcrumb;
