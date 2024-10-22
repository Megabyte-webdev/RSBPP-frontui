import img from "../../assets/online-programmes/online-programmes-img.jpg";
import img2 from "../../assets/online-programmes/students-in-the-library.jpg";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import programList from "./programList";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/base";
import axios from "axios";
import '../../fonts/fonts.css'
const Programmes = () => {
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}guest/getAllCourses`)
      .then((response) => {
        console.log(response.data);
        const { allCourses } = response.data;
        setFilteredData(
          allCourses.filter((program) => program.course_type === "online")
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading("");
      });
  }, []);

  return (
    <div className="h-max flex flex-col gap-4 min-[800px]:flex-row md:items-stretch md:px-[2%] px-[4%] lg:px-[5%] bg-gray-100 my-5 font-[Ripple-Bold] font-extrabold">
      {/* Left side */}
      <div className="relative md:top-[-40px] w-full min-h-full min-[800px]:w-[380px] text-white py-2">
        <img
          className="object-cover absolute top-0 right-0 bottom-0 left-0 m-auto w-full h-full z-0"
          src={img2}
          alt=""
        />
        <div className="z-1 bg-[#8B0002] opacity-[0.9] absolute top-0 right-0 bottom-0 left-0 m-auto"></div>
        <div className="relative z-2 w-full h-full p-4">
          <h2 className="py-3 text-2xl border-b-4 border-b-white">
            Our Programmes
          </h2>
          <div className="py-3 border-b border-b-gray-400">
            <h4 className='text-[18px]'>Executive Education</h4>
            <p className='text-[16px] font-roboto'> 
              Our programmes are structured to accommodate the busy schedule of
              working professionals, allowing participants to work while.
            </p>
          </div>
          <div className="py-3 border-b border-b-gray-400">
            <h4 className='text-[18px]'>DigiKnowH</h4>
            <p className='text-[16px] font-roboto'>
              The Digital Learning programme is specifically designed for
              curious people who are open to learning about digital
              technologies, tools, and practices.
            </p>
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className="bg-gray-100 px-4 md:px-1 mt-2 flex-1 w-full min-h-full text-[#8B0002]">
        {programList.map((program) => (
          <section className="py-2" key={program.id}>
            <h2 className= "text-3xl my-3">{program.heading}</h2>
            <ul className="flex flex-wrap gap-y-3 justify-between px-0 font-medium">
              {filteredData.length !== 0 &&
                filteredData.map((item) => (
                  <li key={item.id}
                   className="flex-initial w-full min-[900px]:w-[48%] text-sm md:text-[15px] lg:text-[17px] flex items-center"
                   ><Link className="underline text-inherit flex"
                    to={`/online-programmes/${item.title.replace(/[:\s]+/g, "-").toLowerCase()}`}
                    state={{ courseId: item.id }}
                   >
                    <p>
                      <FaCheck className="text-xl mr-2" />
                    </p>{" "}
                    {item.title}
                  </Link>
                  </li>
                ))}
              {(!filteredData && loading )&& <div>Loading...</div>}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Programmes;
