import axios from 'axios';


const addCarousel = ({
  title = '',
  description = '',
  href = '',
  imgSrc = '',
  groupTitle = ''
} = {}) => ({
  type: 'ADD_CAROUSEL',
  data: {
    title,
    description,
    href,
    imgSrc,
    groupTitle
  }
});


const fetchCarousels = () => {
  return (dispatch) => {
    return axios.get('/data/carousel')
      .then((res) => {
        res.data.map((item) => {
          dispatch(addCarousel(item));
        });
      });
  }
};





export {addCarousel, fetchCarousels};
