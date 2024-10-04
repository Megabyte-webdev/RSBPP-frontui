import partner1 from '../../assets/online-programmes/TDFGG.png'
import partner2 from '../../assets/online-programmes/Lodz.png'
import partner3 from '../../assets/online-programmes/ABR.png'
import partner4 from '../../assets/online-programmes/Docenti-removebg-preview.png'


const Partners = () => {
  return (
    <div className='px-4'>
        <h3 className='text-2xl md:text-3xl text-black border-b border-b-gray-500 py-2'>Our Partners</h3>
        <div className='w-full overflow-scroll flex sm:justify-center gap-3 pt-3'>
            <img className='w-16 sm:w-24' src={partner1} alt="" />
            <img className='w-16 sm:w-24' src={partner2} alt="" />
            <img className='w-16 sm:w-24' src={partner3} alt="" />
            <img className='w-16 sm:w-24' src={partner4} alt="" />
        </div>
    </div>
  )
}

export default Partners