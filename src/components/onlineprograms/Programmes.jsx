import img from '../../assets/online-programmes/online-programmes-img.jpg'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import programList from './programList'
const Programmes = () => {
  return (
    <div className="h-max flex flex-col gap-y-4 md:flex-row md:items-stretch px-[5%] bg-gray-100 my-5">
      {/* Left side */}
      <div className="relative w-full min-h-[500px] md:min-h-full md:w-[350px] text-white py-2">
        <img className='object-cover absolute top-0 right-0 bottom-0 left-0 m-auto w-full h-full z-0' src={img} alt="" />
        <div className='z-1 bg-[#8B0002] opacity-[0.8] absolute top-0 right-0 bottom-0 left-0 m-auto' ></div>
        <div className='relative z-2 w-full h-full p-4'>
          <h2 className="py-3 text-2xl border-b-4 border-b-white font-semibold">Our Programmes</h2>
          <div className="py-3 border-b border-b-gray-400">
            <h4>Executive Education</h4>
            <p>Our programmes are structured to accommodate the busy schedule of working professionals, allowing participants to work while.</p>
          </div>
          <div className="py-3 border-b border-b-gray-400">
            <h4>DigiKnowH</h4>
            <p>The Digital Learning  programme is specifically designed  for curious people who are open  to learning about digital technologies, tools, and practices.</p>
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className="bg-gray-100 px-4 mt-2 md:px-10 flex-1 w-full min-h-full md:w-3/4 text-[#8B0002]">
        
          {
        programList.map((program)=>(
          <section className='py-2' key={program.id}>
            <h2 className='font-semibold text-3xl my-3'>{program.heading}</h2>
          <ul className='flex flex-wrap gap-y-3 justify-between px-0 font-medium'>
              
              {
                program.items.map((item, index)=>(
                <Link to={item.href} key={index} className='flex-initial basis-full md:basis-[48%] text-sm md:text-[17px] underline text-inherit flex items-center'><p><FaCheck className='text-xl mr-2' /></p> {item.title}</Link>
                ))
              }
          </ul>
          </section>
        ))
          }
      </div>
    </div>
  )
}

export default Programmes