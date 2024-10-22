import DigiImg from '../../assets/online-programmes/digiknow.jpg'
import { Link } from 'react-router-dom'
import {FaCheck} from 'react-icons/fa'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/base';

const ExploreDigiKnowH =()=>{
   const [loading, setLoading] = useState(false);
   const [groupedData, setGroupedData] = useState({});
 
   useEffect(() => {
     setLoading(true);
     axios
       .get(`${BASE_URL}guest/getAllCourses`)
       .then((response) => {
         const { allCourses } = response.data;
 
         // Filter online programs and group by faculty label
         const digiknowhPrograms = allCourses.filter(
           (program) => program.course_type === "digiknowh"
         );
 
         setGroupedData(groupedByFaculty);
         setLoading(false);
       })
       .catch((err) => {
         console.error("Error fetching courses:", err);
         setLoading(false);
       });
   }, []);
 

return(
<div className='flex flex-col md:flex-row md: justify-between items-center gap-4 md:px-[2%] px-[4%] my-5 font-[Ripple-Bold]'>
{/* Left side*/}
<div className='flex-1 w-full md:w-3/4'>
<div>
<p className='text-xl md:text-2xl font-medium'>“ Specially designed for those who are willing to undertake a journey into the digital space.”</p>
<p className='text-sm md:text-xl text-gray-700 my-2' >This programme is tailored for people who are curious and open to learning about digital technologies, tools, and practices.</p>
<p className='text-sm md:text-xl text-gray-700 my-2'>It welcomes beginners, enthusiasts, and anyone eager to enhance their digital literacy.</p>
<p className='text-sm md:text-xl text-gray-700 my-2'>This journey involves discovering various aspects of the digital world, such as online platforms, software, and digital communication.</p>
</div>
<div className='my-4 p-4 bg-gray-100 text-gray-500 border-2 border-gray-300 border-dashed'>
<p className='text-xl md:text-2xl font-medium text-black'> Exploration and Learning:
</p>
<p className='text-sm py-3'>Participants will explore topics like coding, data analytics, digital marketing, cyber security, and more.<br />

They’ll gain practical skills and theoretical knowledge to navigate the digital landscape effectively, and prepares them for the future in-demand skills relevant as technology evolves.
<br />
Participants in any of our digital learning courses can expect to develop competencies related to digital literacy, problem solving, adaptability, and collaboration.
<br />
These skills are essential for success in various industries, from business to creative fields.
<br />
Overall, the DigiKnowH programme promises an engaging and enriching experience for those eager to embrace the digital age.</p>
</div>
</div>
{/* Right side*/}
<div className='w-full md:w-1/2' >
<img className='w-full h-[300px] md:h-[600px] object-cover' src={DigiImg} alt=""/>
<h3 className='my-3 text-2xl font-medium'>Digital Skills Programme ( DigiknowH)</h3>
<ul className='flex flex-wrap gap-y-3 justify-between px-0 font-medium'>

        {loading ? (
          <div>Loading...</div>
        ) :(
          digiknowhPrograms.length !== 0 ?digiknowhPrograms?.map(([faculty, programs]) => (
           <Link to={`/digiknowh/${program.title
                        .replace(/[:\s]+/g, "-")
                        .toLowerCase()}`}
                      state={{ courseId: program.id }} className='flex-initial basis-full text-sm md:text-[17px] underline text-inherit flex items-center'><p><FaCheck className='text-xl mr-2 text-red-700' /></p> {program?.title}</Link>
                
                )):(<li>No Courses Available For Now</li>))}
</ul>
</div>

</div>

)
}

export default ExploreDigiKnowH;