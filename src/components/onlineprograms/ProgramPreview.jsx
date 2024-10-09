import './program.css'

const ProgramPreview =({details})=>{

return(
<div className='flex flex-col md:flex-row md: justify-between gap-4 p-[4%] my-5'>
{/* Left side*/}
<div className='flex-1 w-full md:w-3/4'>

<p className='text-xs md:text-sm text-gray-500 mb-3 font-medium'>{details.description}</p>

<p className='text-sm font-medium text-black py-3'> Target Participants
</p>
<p className='text-sm text-red-600 font-medium'>For those in Digital Marketing
</p>
<p className='text-xl font-medium text-black py-3 mt-2'> Course Objectives
</p>
<p className='text-sm font-medium text-black'> At the end of the course, participants should be able to:
</p>
<ul className='gap-y-2 ml-2 my-2'>
<li className='text-sm text-gray-500 font-medium list-disc my-2'>Define fundamental digital marketing concepts such as customerpersona, segmentation, funnels, and value propositions</li>
<li className='text-sm text-gray-500 font-medium list-disc my-2'>Define fundamental digital marketing concepts such as customerpersona, segmentation, funnels, and value propositions</li>
<li className='list-disc text-sm text-gray-500 font-medium my-2'>Define fundamental digital marketing concepts such as customerpersona, segmentation, funnels, and value propositions</li>
</ul>

<div className='course-outline'>
{
details.outline
}
</div>
</div>
{/* Right side*/}
<div className='w-full md:w-1/3 flex flex-col items-end' >
<p className='w-full md:w-[90%] text-sm text-black border border-gray-700 px-3 py-4 underline'> Add To Cart
</p>
<p className='w-full md:w-[90%] text-sm text-black border border-gray-700 px-3 py-4'>${details.price}
</p>
</div>

</div>

)
}

export default ProgramPreview;