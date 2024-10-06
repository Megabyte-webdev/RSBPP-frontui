

const ProgramPreview =()=>{

return(
<div className='flex flex-col md:flex-row md: justify-between gap-4 p-[5%] md:p-[3%] my-5'>
{/* Left side*/}
<div className='flex-1 w-full md:w-3/4'>

<p className='text-xs md:text-sm text-gray-700 mb-3'>This course explores the dynamic landscape of digital marketing and its pivotal role in modern business strategies.</p>
<p className='text-xs md:text-sm text-gray-700 my-2'>In today’s digital world, it is imperative for businesses to connect with a global audience, target specific demographics, measure campaign performance with precision, and deliver personalized marketing messages.</p>

<p className='text-sm font-medium text-black py-3'> Target Participants
</p>
<p className='text-sm text-red-600 font-medium'>For those in Digital Marketing
</p>
</div>
{/* Right side*/}
<div className='w-full md:w-1/3 flex flex-col items-center' >
<p className='w-full md:w-[90%] text-sm font-medium text-black border border-gray-700 px-5 py-3'> Add To Cart
</p>
<p className='w-full md:w-[90%] text-sm font-medium text-black border border-gray-700 px-5 py-3'>$300
</p>
</div>

</div>

)
}

export default ProgramPreview;