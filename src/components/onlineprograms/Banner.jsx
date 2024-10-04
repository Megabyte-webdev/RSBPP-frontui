
import { useNavigate } from 'react-router-dom'
import img from '../../assets/online-programmes/online-programmes-img.jpg'
const Banner =()=>{

    const navigate = useNavigate()

    return (
        <div className="relative flex bg-primary rounded-lg px-4 md:px-10">
      <img className='object-cover absolute top-0 right-0 bottom-0 left-0 m-auto w-full h-full z-0' src={img} alt="" />
       <div className='z-1 bg-[#8B0002] opacity-[0.61] absolute top-0 right-0 bottom-0 left-0 m-auto' ></div> 
            {/* --------Left Side------ */}
            <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5 z-2 absolute top-0 right-0 bottom-0 left-0 m-auto">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white">
                    <p className="mt-4">Nothing Beats the right skills for personal and organisational growth</p>
<p> No matter the expertise level you intend to pursue, we always have the right programme for you</p>
                </div>
                <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className="bg-[#8B0002] text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all">Register now</button>
            </div>
            {/* --------Right Side------ */}
            <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
            </div>
        </div>
    )
}

export default Banner
