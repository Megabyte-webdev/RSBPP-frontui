
import { useNavigate } from 'react-router-dom'
const Banner =()=>{

    const navigate = useNavigate()

    return (
        <div className="flex bg-primary rounded-lg px-4 md:px-10">
            {/* --------Left Side------ */}
            <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white">
                    <p className="mt-4">Nothing Beats the right skills for personal and organisational growth</p>
<p> No matter the expertise level you intend to pursue, we always have the right programme for you</p>
                </div>
                <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className="bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all">Register now</button>
            </div>
            {/* --------Right Side------ */}
            <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
            </div>
        </div>
    )
}

export default Banner
