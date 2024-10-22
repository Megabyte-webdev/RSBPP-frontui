import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; // New way to import Autoplay
import 'swiper/css';
import 'swiper/css/autoplay';
import partner1 from '../../assets/online-programmes/TDFGG.png';
import partner2 from '../../assets/online-programmes/Lodz.png';
import partner3 from '../../assets/online-programmes/ABR.png';
import partner4 from '../../assets/online-programmes/Docenti-removebg-preview.png';

const Partners = () => {
  return (
    <div className='h-max md:h-16 md:px-[2%] px-[4%] flex flex-col md:flex-row md:items-center md:justify-between'>
      <h3 className='h-max text-xl md:text-2xl font-bold text-black md:border-0 border-b border-b-gray-300 py-3'>Our Partners</h3>
      <div className='w-full md:w-[70%] flex md:items-center pt-3 md:mx-6'>
        <Swiper
          modules={[Autoplay]}
          slidesPerView={4}
          spaceBetween={25}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="mySwiper"
        >
          <SwiperSlide className='flex items-center justify-center'>
            <img className='w-32 md:w-36' src={partner1} alt="Partner 1" />
          </SwiperSlide>
          <SwiperSlide className='flex items-center justify-center'>
            <img className='w-32 md:w-36' src={partner2} alt="Partner 2" />
          </SwiperSlide>
          <SwiperSlide className='flex items-center justify-center'>
            <img className='w-32 md:w-36' src={partner3} alt="Partner 3" />
          </SwiperSlide>
          <SwiperSlide className='flex items-center justify-center'>
            <img className='w-32 md:w-36' src={partner4} alt="Partner 4" />
          </SwiperSlide>
          <SwiperSlide className='flex items-center justify-center'>
            <img className='w-32 md:w-36' src={partner3} alt="Partner 1" />
          </SwiperSlide>

        </Swiper>
      </div>
    </div>
  );
};

export default Partners;
