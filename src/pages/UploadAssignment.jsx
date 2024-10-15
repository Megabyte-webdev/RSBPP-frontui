import { FaFileUpload } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import ResourceContext from '../context/ResourceContext'
const UploadAssignment = () => {

    const {
        setGetAllFaculty
    } = useContext(ResourceContext);

useEffect(()=>{

},[])

    return (
        <div className='flex flex-col p-3 p-md-5 min-vh-100 poppins' style={{ backgroundColor: "hsla(219, 50%, 95%, .3)" }}>
            <p className='sticky top-18 bg-transparent ml-auto my-2 flex items-center gap-2 font-medium'>Upload Assignment</p>
            <div>
                {/* Dropdown */}
                <div className='font-medium my-2'>
                    {/* dropdown label */}
                    <p className='text-sm md:text-xl my-2'>Choose RSBPP Faculty</p>
                    {/* dropcontainer  */}
                    <section className='flex justify-between items-center gap-2 border-[1px] border-red-500 rounded-md p-3'>
                        {/* drop selection view */}
                        <div className='flex flex-col gap-y-2'>
                            <p className='text-xs md:text-[16px] capitalize'>Faculty of business communication and finance</p>
                            <p className='text-xs md:text-sm text-gray-600 capitalize'>Select course</p>
                        </div>
                        <p className='border-l border-gray-500 pl-4 text-red-500'><IoIosArrowDown size='20' /></p>
                        {/* drop selection view end*/}
                    </section>
                    {/* dropcontainer end */}
                </div>
            </div>

            <div className='font-medium my-2'>
                    {/* dropcontainer  */}
                    <section className='flex justify-between items-center gap-2 border-[1px] border-red-500 rounded-md p-3'>
                        {/* drop selection view */}
                        <div className='flex flex-col gap-y-2'>
                            <p className='text-xs md:text-[16px] capitalize'>Faculty of business communication and finance</p>
                            <p className='text-xs md:text-sm text-gray-600 capitalize'>Select Faculty</p>
                        </div>
                        <small className='font-bold text-[10px] md:text-xs text-red-500 ml-auto'>Prof Samuel Attong</small>
                        <p className='pl-2 md:pl-4 text-red-500'><IoIosArrowDown size='20' /></p>
                        {/* drop selection view end*/}
                    </section>
                    {/* dropcontainer end */}
                </div>

                <div className='font-medium my-2'>
                    {/* dropcontainer  */}
                    <section className='flex justify-between items-center gap-2 border-[1px] border-red-500 rounded-md p-3'>
                        {/* drop selection view */}
                        <div className='flex-1 flex flex-col gap-y-2'>
                            <p className='text-sm md:text-[16px] capitalize'>Submission</p>
                            <textarea cols='30' className="p-2 h-28  w-full bg-transparent placeholder:text-gray-500 placeholder:text-sm" placeholder='Add Description'></textarea>
                        </div>
                        {/* drop selection view end*/}
                    </section>
                    {/* dropcontainer end */}
                </div>
                <div className='font-medium my-2 flex flex-col justify-center items-center h-max gap-2 border-[1px] border-red-500 rounded-md p-3'>
                    <FaFileUpload size="24" />
                    <p>Choose a file or drag & drop it here</p>
                    <button className="border-[1px] border-gray-600 my-2 mx-auto w-48 px-8 py-2 text-gray-700 bg-transparent rounded-2xl font-medium relative cursor-pointer"><input type='file' className='cursor-pointer absolute top-0 bottom-0 right-0 left-0 w-full h-full opacity-0 m-auto' />Browse File</button>
                </div>
                <button className="my-2 mx-auto w-48 px-8 py-2 text-white bg-[navy] rounded-md font-medium"> Submit</button>
        </div>
    )

}

export default UploadAssignment;