import customizedImg from '../../assets/online-programmes/customised-online-img.jpg'
import '../../fonts/fonts.css'
const Customized = () => {
  return (
    <div className='flex flex-col md:flex-row p-[4%] align-stretch justify-between my-10'>
        {/* Left side */}
        <div className='flex-1 w-full md:w-[43%] md:pr-5 font-[Ripple-Bold] font-extrabold'>
            <div className='w-full flex flex-wrap md:flex-nowrap my-2 gap-3 justify-between'>
                <p className='flex items-center justify-center text-sm h-max md:text-8xl font-semibold md:p-3 px-2 w-max md:min-h-max text-black bg-white border border-[#727272] md:mr-6'>C</p>
                <h3 className='flex-1 text-2xl md:text-4xl mx-3 p-3'>Customised Online Programmes
                </h3>
            </div>
            <p className='text-[18px] font-medium my-7'>Is your topic or subject of interest not captured on the web? Never mind! We can design and tailor solutions that can be delivered wherever and whenever for individuals  wishing to learn or improve on their skills or organizations willing to upskill their employees. We will work closely with you to tailor contents/curriculum design.</p>
        </div>
        {/* Right side */}
        <div className='w-full h-[300px] md:min-h-[500px] md:ml-3 md:w-[40%]'>
            <img style={{boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)"}} className='w-full h-full object-cover' src={customizedImg} alt="" />
        </div>
    </div>
  )
}

export default Customized