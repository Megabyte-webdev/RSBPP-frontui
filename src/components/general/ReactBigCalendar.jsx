import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useCallback } from "react"
const localizer = momentLocalizer(moment)
import { LuChevronLeftCircle, LuChevronRightCircle } from "react-icons/lu";
import { FaChevronLeft } from 'react-icons/fa'
import { GoChevronLeft, GoChevronRight } from 'react-icons/go'
import { useState } from 'react'
import { VIEW_OPTIONS } from '../constants/reactCalendarConstants'
import { useMemo } from 'react'

const today = new Date();
const currentMonth = today.getMonth(); // 0 (January) to 11 (December)

const testData = [];

// Loop 15 times to create objects
for (let i = 0; i < 5; i++) {
    // Create random date within current month
    const randomDate = new Date(today.getFullYear(), currentMonth, Math.floor(Math.random() * 31) + 1);

    // Create a random duration (1 to 7 days)
    const randomDuration = Math.floor(Math.random() * 7) + 1;

    testData.push({
        id: i + 1, // IDs from 1 to 15
        title: `live class day ${randomDate.getDate()}`,
        start: randomDate,
        end: new Date(randomDate.setDate(randomDate.getDate() + randomDuration)),
    });
}

const ReactBigCalendar = ({ timeTables }) => {

    const [dateView, setDateView] = useState(Views.MONTH)
    const [date, setDate] = useState(moment(today).toDate())

    const eventPropGetter = useCallback(
        (event, start, end, isSelected) => ({
            ...(isSelected && {
                style: {
                    backgroundColor: '#460f10',
                },
            }),
            ...(moment(start).hour() < 12 && {
                className: 'powderBlue',
            }),
            ...(event.title.includes('Meeting') && {
                className: 'powderBlue',
            }),
        }),
        []
    )

    const handleNextDate = useCallback(() => {
        if (dateView === Views.DAY) {
          setDate(moment(date).add(1, "d").toDate());
        } else if (dateView === Views.WEEK) {
          setDate(moment(date).add(1, "w").toDate());
        } else {
          setDate(moment(date).add(1, "M").toDate());
        }
      }, [dateView, date]);

    const handlePrevDate = useCallback(() => {
        if (dateView === Views.DAY) {
          setDate(moment(date).subtract(1, "d").toDate());
        } else if (dateView === Views.WEEK) {
          setDate(moment(date).subtract(1, "w").toDate());
        } else {
          setDate(moment(date).subtract(1, "M").toDate());
        }
      }, [dateView, date]);

      const dateText = useMemo(() => {
        if (dateView === Views.DAY) return moment(date).format(" MMMM DD");
        if (dateView === Views.WEEK) {
          const from = moment(date)?.startOf("week");
          const to = moment(date)?.endOf("week");
          return `${from.format(" DD")} to ${to.format(" DD")}`;
        }
        if (dateView === Views.MONTH) {
          return moment(date).format("MMMM YYYY");
        }
      }, [dateView, date]);

  const onView = useCallback((newView) => setDateView(newView), [setDateView])
  const onNavigate = useCallback((newDate) => setDate(newDate), [setDate])

    return (
        <div
            className="p-3 p-md-5"
            style={{ backgroundColor: "hsla(0, 0%, 85%, .3)" }}
        >
            <div className='bg-white p-3 rounded-3'>
                <div className="d-flex justify-content-between my-2">
                    <div className='d-flex align-items-center'>
                        <button onClick={()=> setDate(moment().toDate())} className='btn border rounded-pill text-xs md:text-sm'>Today</button>
                        <div className='ms-2 md:ms-3 d-none d-md-block'>
                            <input id='date_picker' className='border py-2 px-3 rounded-pill' onChange={(e)=> setDate(e.target.value)} value={date} type="date"/>
                        </div>
                    </div>
                    <div>
                        <div className="d-flex align-items-center">
                            <button onClick={()=> handlePrevDate()} className='btn rounded-circle text-secondary border mx-2'> <GoChevronLeft size={"20"} /> </button>
                            <p className='col col-md-7'>{dateText}</p>
                            <button onClick={() => handleNextDate()} className='btn rounded-circle text-secondary border mx-2'> <GoChevronRight size={"20"} /> </button>
                        </div>
                    </div>
                    <div>
                        <div className="btn-md-group rounded-pill" role="group" aria-label="Basic mixed styles example">
                            {VIEW_OPTIONS.map(({ id, label }) => (
                                <button key={id} onClick={() => setDateView(id)} style={{ fontWeight: id === dateView ? "600" : "normal" }} className="btn btn-sm w-100 w_md_unset rounded-0 border">{label}</button>
                            ))}
                        </div>
                    </div>
                </div>
                <Calendar
                    toolbar={false}
                    localizer={localizer}
                    events={timeTables}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView={Views.MONTH}
                    style={{ height: 500 }}
                    eventPropGetter={eventPropGetter}
                    onView={onView}
                    view={dateView}
                    onNavigate={onNavigate}
                    date={date}
                />
            </div>
        </div>
    )
}
export default ReactBigCalendar