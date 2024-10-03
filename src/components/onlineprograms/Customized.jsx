import customizedImg from '../../assets/online-programmes/customised-online-img.jpg'
const Customized = () => {
  return (
    <div className='flex flex-col md:flex-row px-4 justify-between'>
        {/* Left side */}
        <div className='flex-1 w-full md:w-1/2'>
            <div className='flex flex-wrap my-2 gap-3 justify-between'>
                <p className='text-xl md:text-5xl p-3 text-black bg-white border border-gray-900'>C</p>
                <h3 className='text-2xl md:text-4xl font-medium'>Customised Online Programmes
                </h3>
            </div>
            <p className='text-sm font-medium m-2'>Is your topic or subject of interest not captured on the web? Never mind! We can design and tailor solutions that can be delivered wherever and whenever for individuals  wishing to learn or improve on their skills or organizations willing to upskill their employees. We will work closely with you to tailor contents/curriculum design.</p>
        </div>
        {/* Right side */}
        <div className='w-full md:w-[400px]'>
            <img src={customizedImg} alt="" />
        </div>
    </div>
  )
}

export default Customized