import { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const ReactCalendar = () => {
  const [value, onChange] = useState(new Date());
console.log(value)
  return (
    <div>
      <div>
        <Calendar
        // selectRange={true}
         className="p-2 rounded border-0 shadow"
        onChange={onChange} value={value} />
      </div>
    </div>
  )
}

export default ReactCalendar