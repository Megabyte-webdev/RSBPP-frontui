/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import './program.css'

const ProgramPreview = ({ details }) => {
    const navigate = useNavigate();
    const fromLocal = (localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts"))[0] : null);

    function HandleAddToCart(){
        scrollTo(0, 0); navigate('/carts'); if (fromLocal === null || (fromLocal && !fromLocal.data.find((item) => item.title === details.title))) {
            localStorage.setItem("carts", JSON.stringify(fromLocal ? [{ user: "guest", data: [...fromLocal.data, details] }] : [{ user: "guest", data: [details] }]))
        } localStorage.setItem("comingFrom", JSON.stringify({ user: "guest" }))
    
    }
    return (
        <div className='font-[Ripple-Bold] font-bold flex flex-col md:flex-row md: justify-between gap-4 p-[4%] my-5'>
            {/* Left side*/}
            <div className='flex-1 w-full md:w-3/4'>

                <p className='text-sm text-[#888] mb-3 font-medium'>{details?.description}</p>

                <div className='course-objective' dangerouslySetInnerHTML={{ __html: details?.objective }}></div>

                <div className='course-outline' dangerouslySetInnerHTML={{ __html: details?.outlines }}></div>
            </div>
            {/* Right side*/}
            <div className='w-full md:w-1/3 flex flex-col items-end' >
                <p className='w-full md:w-[90%] text-sm text-black border border-gray-700 px-3 py-4 underline cursor-pointer' onClick={() => HandleAddToCart}> Add To Cart
                </p>
                <p className='w-full md:w-[90%] text-sm text-black border border-gray-700 px-3 py-4'>${details?.price && details?.price}
                </p>
            </div>

        </div>

    )
}

export default ProgramPreview;