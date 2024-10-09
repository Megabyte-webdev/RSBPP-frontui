import './program.css'

const ProgramPreview =({details})=>{

return(
<div className='flex flex-col md:flex-row md: justify-between gap-4 p-[4%] my-5'>
{/* Left side*/}
<div className='flex-1 w-full md:w-3/4'>

<p className='text-xs md:text-sm text-gray-500 mb-3 font-medium'>{details.description}</p>

<div className='course-objective' dangerouslySetInnerHTML={{__html: details.objective}}></div>


<div className='course-outline' dangerouslySetInnerHTML={{__html: details.outlines}}></div>
</div>
{/* Right side*/}
<div className='w-full md:w-1/3 flex flex-col items-end' >
<p className='w-full md:w-[90%] text-sm text-black border border-gray-700 px-3 py-4 underline'> Add To Cart
</p>
<p className='w-full md:w-[90%] text-sm text-black border border-gray-700 px-3 py-4'>${details.price && details.price}
</p>
</div>

</div>

)
}

export default ProgramPreview;