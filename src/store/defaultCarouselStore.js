import store from './store';
import {addCarousel} from '../actions/carouselAction';


const carouselList = [
  {
    title: 'Isnt it awesome?',
    description: 'This is the first carousel of my site',
    href: '/image/list',
    imgSrc: 'http://p3ijxxb1r.bkt.clouddn.com/test-carousel1.png?imageView2/1/w/1440/h/512/format/png/interlace/1/q/75|imageslim',
    groupTitle: 'test1',
  },
  {
    title: 'How nice!!',
    description: 'See I can type so fast!',
    href: '/video/list',
    imgSrc: 'http://p3ijxxb1r.bkt.clouddn.com/test-carousel2.png?imageView2/1/w/1440/h/512/format/png/interlace/1/q/75|imageslim',
    groupTitle: 'test2',
  }
];

carouselList.map((carousel) => {
  store.dispatch(addCarousel(carousel));
});

export default carouselList;
