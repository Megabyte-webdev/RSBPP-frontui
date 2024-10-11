import img from "../../assets/online-programmes/online-programmes-img.jpg";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import programList from "./programList";
import { useEffect, useState } from "react";
import { BASE_URL, TOKEN } from "../utils/base";
import axios from "axios";
import '../../fonts/fonts.css'
const Programmes = () => {
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}course/getAllCourses`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
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
    <div className="h-max flex flex-col gap-y-4 md:flex-row md:items-stretch md:px-[2%] px-[4%] bg-gray-100 my-5 font-[Ripple-Bold] font-extrabold">
      {/* Left side */}
      <div className="relative md:top-[-25px] w-full min-h-full md:w-[300px] text-white py-2">
        <img
          className="object-cover absolute top-0 right-0 bottom-0 left-0 m-auto w-full h-full z-0"
          src={img}
          alt=""
        />
        <div className="z-1 bg-[#8B0002] opacity-[0.9] absolute top-0 right-0 bottom-0 left-0 m-auto"></div>
        <div className="relative z-2 w-full h-full p-4">
          <h2 className="py-3 text-2xl border-b-4 border-b-white">
            Our Programmes
          </h2>
          <div className="py-3 border-b border-b-gray-400">
            <h4>Executive Education</h4>
            <p>
              Our programmes are structured to accommodate the busy schedule of
              working professionals, allowing participants to work while.
            </p>
          </div>
          <div className="py-3 border-b border-b-gray-400">
            <h4>DigiKnowH</h4>
            <p>
              The Digital Learning programme is specifically designed for
              curious people who are open to learning about digital
              technologies, tools, and practices.
            </p>
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className="bg-gray-100 px-4 mt-2 md:px-10 flex-1 w-full min-h-full md:w-3/4 text-[#8B0002]">
        {programList.map((program) => (
          <section className="py-2" key={program.id}>
            <h2 className= "text-3xl my-3">{program.heading}</h2>
            <ul className="flex flex-wrap gap-y-3 justify-between px-0 font-medium">
              {filteredData.length !== 0 &&
                filteredData.map((item) => (
                  <Link
                    to={`/online-programmes/${item.title.replace(/[:\s]+/g, "-").toLowerCase()}`}
                    key={item.id}
                    state={{ courseId: item.id }}
                    className="flex-initial basis-full md:basis-[48%] text-sm md:text-[17px] underline text-inherit flex items-center"
                  >
                    <p>
                      <FaCheck className="text-xl mr-2" />
                    </p>{" "}
                    {item.title}
                  </Link>
                ))}
              {loading && <div>Loading...</div>}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Programmes;
