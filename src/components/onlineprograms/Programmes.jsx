import img from "../../assets/online-programmes/online-programmes-img.jpg";
import img2 from "../../assets/online-programmes/students-in-the-library.jpg";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import programList from "./programList";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/base";
import axios from "axios";
import '../../fonts/fonts.css';
import { Spinner } from "react-bootstrap";

const Programmes = () => {
  const [loading, setLoading] = useState(false);
  const [groupedData, setGroupedData] = useState({});

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}guest/getAllCourses`)
      .then((response) => {
        const { allCourses } = response.data;
        //console.log(allCourses)
        // Filter online programs and group by faculty label
        const onlinePrograms = allCourses.filter(
          (program) => program?.course_type === "online" && program?.category_label !== "offline"
        );

        const groupedByFaculty = onlinePrograms.reduce((acc, program) => {
          const faculty = program.faculty_label || "Others";
          if (!acc[faculty]) acc[faculty] = [];
          acc[faculty].push(program);
          return acc;
        }, {});

        setGroupedData(groupedByFaculty);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
        setLoading(false);
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
            <h4 className="text-[18px]">Executive Education</h4>
            <p className="text-[16px] font-roboto">
              Our programmes are structured to accommodate the busy schedule of
              working professionals, allowing participants to work while.
            </p>
          </div>
          <div className="py-3 border-b border-b-gray-400">
            <h4 className="text-[18px]">DigiKnowH</h4>
            <p className="text-[16px] font-roboto">
              The Digital Learning programme is specifically designed for
              curious people who are open to learning about digital
              technologies, tools, and practices.
            </p>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="bg-gray-100 px-4 md:px-1 mt-2 flex-1 w-full min-h-full text-[#8B0002]">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center"><Spinner /></div>
        ) : (
          Object.entries(groupedData).length === 0 ?
          <h4 className="text-xl">No Courses Available For Now</h4>
          :
          Object.entries(groupedData).sort(([a], [b]) => (a === "Others" ? 1 : b === "Others" ? -1 : a.localeCompare(b))).map(([faculty, programs]) => (
            <section className="py-2" key={faculty}>
              <h2 className="text-3xl my-3">{faculty}</h2>
              <ul className="flex flex-wrap gap-y-3 justify-between px-0 font-medium">
                {programs.map((program) => (
                  <li
                    key={program.id}
                    className="flex-initial w-full min-[900px]:w-[48%] text-sm md:text-[15px] lg:text-[17px] flex items-center"
                  >
                    <Link
                      className="underline text-inherit flex"
                      to={`/online-programmes/${program.title
                        .replace(/[:\s]+/g, "-")
                        .toLowerCase()}`}
                      state={{ courseId: program.id }}
                    >
                      <FaCheck className="flex-shrink-0 text-xl mr-2" />
                      {program.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </div>
    </div>
  );
};

export default Programmes;
