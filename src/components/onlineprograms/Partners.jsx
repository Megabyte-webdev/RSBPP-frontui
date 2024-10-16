import partner1 from '../../assets/online-programmes/TDFGG.png';
import partner2 from '../../assets/online-programmes/Lodz.png';
import partner3 from '../../assets/online-programmes/ABR.png';
import partner4 from '../../assets/online-programmes/Docenti-removebg-preview.png';

const Partners = () => {
  return (
    <div className='md:px-[2%] px-[4%] flex flex-col md:flex-row md:items-center my-3'>
        <h3 className='h-max text-2xl md:text-3xl text-black border-b border-b-gray-500 py-3'>Our Partners</h3>
        <div className='md:flex-1 w-full overflow-x-auto flex md:justify-center gap-3 pt-3 md:mx-6'>
            <img className='w-28 object-contain' src={partner1} alt="" />
            <img className='w-28 object-contain' src={partner2} alt="" />
            <img className='w-28 object-contain' src={partner3} alt="" />
            <img className='w-28 object-contain' src={partner4} alt="" />
        </div>
    </div>
  );
}

export default Partners;
