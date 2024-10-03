import img from '../../assets/online-programmes/online-programmes-img.jpg'
import { Link } from 'react-router-dom'

const Programmes = () => {
  return (
    <div className="flex flex-col gap-y-4 sm:flex-row md:items-stretch mx-2">
        {/* Left side */}
        <div className="relative w-full min-h-[400px] sm:min-h-full md:w-1/4 text-white py-2 px-6">
        <img className='object-cover absolute top-0 right-0 bottom-0 left-0 m-auto w-full h-full z-0' src={img} alt="" />
        <div className='z-1 bg-[#8B0002] opacity-[0.61] absolute top-0 right-0 bottom-0 left-0 m-auto' ></div> 
            <div className='z-2 w-full h-full p-2 absolute top-0 right-0 bottom-0 left-0 m-auto'>
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
        <div className="px-4 md:px-10 flex-1 w-full min-h-full md:w-3/4 text-[#8B0002]">
            <section className='py-2'>
            <h2 className='font-semibold text-3xl my-3'>Online Management & Communication Programmes</h2>
            <ul className='flex flex-wrap gap-y-3 justify-between px-0 font-bold'>
              <Link className='flex-initial basis-full md:basis-[48%] text-sm md:text-xl underline text-inherit'>understanding Digital Customer Effectiveness Landscape</Link>
              <Link className='flex-initial basis-full md:basis-[48%] text-sm md:text-xl underline text-inherit'>Big Data and Business Decisions</Link>
              <Link className='flex-initial basis-full md:basis-[48%] text-sm md:text-xl underline text-inherit'>Dealing with Difficult Personalities and Difficult Situations</Link>
              <Link className='flex-initial basis-full md:basis-[48%] text-sm md:text-xl underline text-inherit'>Building Personal Credibility: Understanding Different Communication Styles</Link>
            </ul>
            </section>
            <section className='py-2'>
            <h2 className='font-semibold text-3xl my-3'>Online Finance Programmes</h2>
            <ul className='flex flex-wrap gap-y-3 justify-between px-0 font-bold'>
              <Link className='flex-initial basis-full md:basis-[48%] text-sm md:text-xl underline text-inherit'>understanding Digital Customer Effectiveness Landscape</Link>
              <Link className='flex-initial basis-full md:basis-[48%] text-sm md:text-xl underline text-inherit'>Big Data and Business Decisions</Link>
              <Link className='flex-initial basis-full md:basis-[48%] text-sm md:text-xl underline text-inherit'>Dealing with Difficult Personalities and Difficult Situations</Link>
              <Link className='flex-initial basis-full md:basis-[48%] text-sm md:text-xl underline text-inherit'>Building Personal Credibility: Understanding Different Communication Styles</Link>
            </ul>
            </section>
        </div>
    </div>
  )
}

export default Programmes