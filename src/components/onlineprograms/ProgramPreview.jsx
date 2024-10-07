

const ProgramPreview =()=>{

return(
<div className='flex flex-col md:flex-row md: justify-between gap-4 p-[5%] md:p-[3%] my-5'>
{/* Left side*/}
<div className='flex-1 w-full md:w-3/4'>

<p className='text-xs md:text-sm text-gray-500 mb-3 font-medium'>This course explores the dynamic landscape of digital marketing and its pivotal role in modern business strategies.</p>
<p className='text-xs md:text-sm text-gray-500 my-2 font-medium'>In today’s digital world, it is imperative for businesses to connect with a global audience, target specific demographics, measure campaign performance with precision, and deliver personalized marketing messages.</p>

<p className='text-sm font-medium text-black py-3'> Target Participants
</p>
<p className='text-sm text-red-600 font-medium'>For those in Digital Marketing
</p>
<p className='text-xl font-medium text-black py-3'> Course Objectives
</p>
<p className='text-sm font-medium text-black'> At the end of the course, participants should be able to:
</p>
<ul className='gap-y-2 ml-2 my-2'>
<li className='text-sm text-gray-500 font-medium list-disc my-2'>Define fundamental digital marketing concepts such as customerpersona, segmentation, funnels, and value propositions</li>
<li className='text-sm text-gray-500 font-medium list-disc my-2'>Define fundamental digital marketing concepts such as customerpersona, segmentation, funnels, and value propositions</li>
<li className='list-disc text-sm text-gray-500 font-medium my-2'>Define fundamental digital marketing concepts such as customerpersona, segmentation, funnels, and value propositions</li>
</ul>

<p className='text-xl font-medium text-black py-3'> Outline
</p>

<ul className='gap-y-2 ml-2 my-2'>
<li className='text-sm text-gray-500 font-medium list-disc my-2'>Introduction to Digital Marketing</li>
<li className='text-sm text-gray-500 font-medium list-disc my-2'>Fundamentals of Digital Marketing</li>
<li className='list-disc text-sm text-gray-500 font-medium my-2'>SOSTAC Marketing Planning Framework</li>
<li className='list-disc text-sm text-gray-500 font-medium my-2'>Customer Experience Insights</li>
<li className='list-disc text-sm text-gray-500 font-medium my-2'>Customer Segmentation</li>
<li className='list-disc text-sm text-gray-500 font-medium my-2'>Customer Experience and Content Marketing</li>
</ul>
</div>
{/* Right side*/}
<div className='w-full md:w-1/3 flex flex-col items-center' >
<p className='w-full md:w-[90%] text-sm text-black border border-gray-700 px-3 py-4'> Add To Cart
</p>
<p className='w-full md:w-[90%] text-sm text-black border border-gray-700 px-3 py-4'>$300
</p>
</div>

</div>

)
}

export default ProgramPreview;