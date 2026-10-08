import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

export default function CalendarPopover({ now }: { now: Date }) {
  return (
    <div className="popover calendar-popover glass" role="dialog" aria-label="Calendar">
      <div className="calendar-popover-header">
        <span className="muted small">{now.toLocaleDateString('en-US', { weekday: 'long' })}</span>
        <span className="calendar-popover-date">
          {now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </span>
      </div>
      <Calendar calendarType="US" />
    </div>
  )
}
