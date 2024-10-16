import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';

import partner1 from '../../assets/online-programmes/TDFGG.png';
import partner2 from '../../assets/online-programmes/Lodz.png';
import partner3 from '../../assets/online-programmes/ABR.png';
import partner4 from '../../assets/online-programmes/Docenti-removebg-preview.png';

const Partners = () => {
  return (
    <div className='md:px-[2%] px-[4%] flex flex-col my-3'>
      <h3 className='h-max text-2xl md:text-3xl text-black border-b border-b-gray-500 py-3'>Our Partners</h3>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={30}
        slidesPerView={2}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
        }}
        className='pt-3 md:mx-6'
      >
        <SwiperSlide>
          <img className='w-28 object-contain' src={partner1} alt="Partner 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img className='w-28 object-contain' src={partner2} alt="Partner 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img className='w-28 object-contain' src={partner3} alt="Partner 3" />
        </SwiperSlide>
        <SwiperSlide>
          <img className='w-28 object-contain' src={partner4} alt="Partner 4" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Partners;
