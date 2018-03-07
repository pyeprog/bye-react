import React from 'react';

const Footer = (props) => (
  <footer className="bg-dark footer">
    <div className="container">
      <div className="row mt-2 py-3 col-3 mx-auto justify-content-center">
        <a className="text-light px-1" href="#"><i className="fab fa-github"></i></a>
        <a className="text-light px-1" href="#"><i className="fab fa-weixin"></i></a>
        <a className="text-light px-1" href="#"><i className="fas fa-male"></i></a>
      </div>

      <div className="row">
        <p className="mb-0 text-light col-12 text-center"><small>Designed and built with all the love in the world by PD</small></p>
        <p className="text-light col-12 text-center"><small><a className="text-light" href="http://gdcainfo.miitbeian.gov.cn">粤ICP备1715427 </a></small></p>
      </div>
    </div>
  </footer>
);

export default Footer;
