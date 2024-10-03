import customizedImg from '../../assets/online-programmes/customised-online-img.jpg'
const Customized = () => {
  return (
    <div className='flex flex-col md:flex-row px-4 align-stretch justify-between my-10'>
        {/* Left side */}
        <div className='flex-1 w-full md:w-1/2 md:pr-4'>
            <div className='flex flex-wrap md:flex-nowrap my-2 gap-3 justify-between'>
                <p className='flex items-center justify-center text-xl md:text-5xl px-2 w-max h-max text-black bg-white border border-gray-900'>C</p>
                <h3 className='flex-1 text-center text-2xl md:text-4xl font-medium mx-3 md:p-3'>Customised Online Programmes
                </h3>
            </div>
            <p className='text-sm md:text-xl font-medium my-7'>Is your topic or subject of interest not captured on the web? Never mind! We can design and tailor solutions that can be delivered wherever and whenever for individuals  wishing to learn or improve on their skills or organizations willing to upskill their employees. We will work closely with you to tailor contents/curriculum design.</p>
        </div>
        {/* Right side */}
        <div className='w-full md:min-h-[400px] lg:ml-3 md:w-[40%]'>
            <img className='w-full h-full object-cover' src={customizedImg} alt="" />
        </div>
    </div>
  )
}

export default Customized