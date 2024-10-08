import {Link} from 'react-router-dom'
import img from '../../assets/online-programmes/online-programmes-img.jpg'
const Hero = ({programme =false, title="Online Programmes" }) => {
    return (
    <div className='relative min-h-[230px] md:min-h-[350px] flex justify-center align-center'>
      <img className='object-cover absolute top-0 right-0 bottom-0 left-0 m-auto w-full h-full z-0' src={img} alt="" />
       <div className='z-1 bg-[#8B0002] opacity-[0.61] absolute top-0 right-0 bottom-0 left-0 m-auto' ></div> 
     {
programme ?       <div className='relative z-10 min-h-[400px] w-full text-white flex flex-col justify-center p-[4%] gap-y-2'> 
<p className='bg-[#8B0002] w-max px-2 h-max'>Online Programmes</p>

        <h1 className='font-medium text-3xl md:text-5xl my-2 pt-4'>{title}</h1>
        <p>Start Date: 21st October 2024</p>
<p>Start Duration : 10 Hours </p>

        </div>
:<div className='relative z-10 w-full min-h-full text-white flex flex-col justify-end p-[4%] mb-4'> 
        <h1 className='font-medium text-3xl md:text-5xl my-3'>{title}</h1>
        <Link to='https://rsbpp.nl/' className='no-underline text-inherit px-2 w-max border border-gray-700 font-bold'>Home <span className='px-2'>&gt;</span> </Link>
        </div>
}
    </div>
  )
}

export default Hero