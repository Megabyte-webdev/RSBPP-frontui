import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useCallback } from "react"
const localizer = momentLocalizer(moment)

const ReactBigCalendar = (props) => {


    const today = new Date();
    const currentMonth = today.getMonth(); // 0 (January) to 11 (December)

    const testData = [];

    // Loop 15 times to create objects
    for (let i = 0; i < 25; i++) {
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

    console.log(testData);

    const eventPropGetter = useCallback(
        (event, start, end, isSelected) => ({
            ...(isSelected && {
                style: {
                    backgroundColor: '#4a1516',
                },
            }),
            ...(moment(start).hour() < 12 && {
                className: 'powderBlue',
            }),
            ...(event.title.includes('Meeting') && {
                className: 'darkGreen',
            }),
        }),
        []
    )

    return (
        <div
            className="p-3 p-md-5"
            style={{ backgroundColor: "hsla(0, 0%, 85%, .3)" }}
        >
            <div className='bg-white p-3 rounded-3'>
                <Calendar
                    localizer={localizer}
                    events={testData}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    eventPropGetter={eventPropGetter}
                />
            </div>
        </div>
    )
}
export default ReactBigCalendar