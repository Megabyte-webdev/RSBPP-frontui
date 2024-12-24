import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useCallback, useState, useMemo, useEffect } from 'react';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { VIEW_OPTIONS } from '../constants/reactCalendarConstants';

const localizer = momentLocalizer(moment);

const ReactBigCalendar = ({ timeTables, startDate }) => {
    const today = new Date();
    const [dateView, setDateView] = useState(Views.MONTH);
    const [date, setDate] = useState(moment(today).toDate());
console.log(timeTables, startDate)
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
    );

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
        if (dateView === Views.DAY) return moment(date).format("MMMM DD");
        if (dateView === Views.WEEK) {
            const from = moment(date)?.startOf("week");
            const to = moment(date)?.endOf("week");
            return `${from.format("DD")} to ${to.format("DD")}`;
        }
        if (dateView === Views.MONTH) {
            return moment(date).format("MMMM YYYY");
        }
    }, [dateView, date]);

    const onView = useCallback((newView) => setDateView(newView), []);
    const onNavigate = useCallback((newDate) => setDate(newDate), []);

    // Handle event click to navigate to its start time
    const handleSelectEvent = (event) => {
        setDate(moment(event.start).toDate());
        setDateView(Views.DAY); // Switch to day view
    };
    useEffect(()=>{
        if(startDate){
            setDate(moment(startDate)?.toDate());
            setDateView(Views.DAY); // Switch to day view
        }

    },[startDate])

    return (
        <div className="p-3 p-md-5" style={{ backgroundColor: "hsla(0, 0%, 85%, .3)" }}>
            <div className='bg-white p-3 rounded-3'>
                <div className="flex flex-wrap justify-around items-center gap-2 my-2">
                    <div className='d-flex align-items-center'>
                        <button onClick={() => setDate(moment().toDate())} className='btn border rounded-pill text-xs md:text-sm'>Today</button>
                        <div className='ms-2 md:ms-3 d-none d-md-block'>
                            <input
                                id='date_picker'
                                className='border py-2 px-3 rounded-pill'
                                onChange={(e) => setDate(e.target.value)}
                                value={moment(date).format("YYYY-MM-DD")}
                                type="date"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center">
                            <button onClick={() => handlePrevDate()} className='btn rounded-circle text-secondary border mx-2'> <GoChevronLeft size={"20"} /> </button>
                            <p className=''>{dateText}</p>
                            <button onClick={() => handleNextDate()} className='btn rounded-circle text-secondary border mx-2'> <GoChevronRight size={"20"} /> </button>
                        </div>
                    </div>
                    <div>
                        <div className="btn-md-group rounded-pill" role="group" aria-label="Basic mixed styles example">
                            {VIEW_OPTIONS.map(({ id, label }) => (
                                <button
                                    key={id}
                                    onClick={() => setDateView(id)}
                                    style={{ fontWeight: id === dateView ? "600" : "normal" }}
                                    className="btn btn-sm w_md_unset rounded-0 border"
                                >
                                    {label}
                                </button>
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
                    onSelectEvent={handleSelectEvent} // Handle event click
                />
            </div>
        </div>
    );
};

export default ReactBigCalendar;
