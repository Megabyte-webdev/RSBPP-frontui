import {Link} from 'react-router-dom'
import img from '../../assets/online-programmes/online-programmes-img.jpg'
const Hero = () => {
    return (
    <div className='relative h-[200px] md:h-[350px]'>
      <img className='object-cover absolute top-0 right-0 bottom-0 left-0 m-auto w-full h-full z-0' src={img} alt="" />
       <div className='z-1 bg-[#8B0002] opacity-[0.61] absolute top-0 right-0 bottom-0 left-0 m-auto' ></div> 
        <div className='absolute z-10 h-full text-white flex flex-col justify-center px-[5%]'> 
        <h1 className='text-4xl md:text-5xl py-4'>Online Programmes</h1>
        <Link to='https://rsbpp.nl/' className='no-underline text-inherit py-1 px-2 w-max border border-gray-300 font-bold'>Home <span className='px-2'>&gt;</span> </Link>
        </div>
    </div>
  )
}

export default Hero