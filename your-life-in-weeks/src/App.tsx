import { CSSProperties, useState } from 'react'
import './App.css'
import { addWeeks, addYears, differenceInYears, getWeek, isPast } from 'date-fns'

function Week({ week, filled, date }: { week: number, filled: boolean, date: Date }) {
  const styles: CSSProperties = {
    width: 10,
    height: 10,
    backgroundColor: '',
    border: '1px solid grey',
  }

  if (filled) {
    styles.backgroundColor = 'red'
  }

  return (
    <div style={styles} data-week={week} data-date={date}></div>
  )
}

function WeeksInYear({ year: yearOfAge, dob }: {year: number, dob: Date}) {
  const styles: CSSProperties = {
    display: 'flex',
    gap: '0.5rem',
    width: '100%',
    alignItems: 'center'
  }

  let filled = false
  const weeks = []
  const startDate = addYears(dob, yearOfAge)
  const endOfYear = addYears(startDate, 1)
  // const startDate = addDays(dob, 1) // first day after your birthday
  let weekIndex = 0
  let currentDate: Date | undefined = undefined
  let end = false

  do {
    currentDate = addWeeks(startDate, weekIndex)

    if (currentDate >= endOfYear) {
      // some years have an extra day, if that happens make it the last day of the year
      currentDate = endOfYear
      end = true
    }

    filled = isPast(currentDate)
    weeks.push((
      <Week key={weekIndex} week={getWeek(currentDate)} filled={filled} date={currentDate}></Week>
    ))

    weekIndex++
  } while(currentDate <= endOfYear && !end)

  return (
    <div style={styles}>
      <span style={{width: '2ch'}}>{yearOfAge}</span>
      { ...weeks }
    </div>
  )
}

function App() {
  const YEARS_OF_LIFE = 100
  const styles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  }

  const [dob, setDob] = useState('1991-07-16')

  return (
    <>
      <h1>Your life in weeks</h1>
      <p>You are {differenceInYears(new Date(), dob)} years old!</p>
      <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem'}}>DOB: <input type="date" value={dob} onChange={(ev) => setDob(ev.target.value)}/></span>
      <p>Assumes you will live until {YEARS_OF_LIFE} years old</p>
      <div style={styles}>
        {Array.from(Array(YEARS_OF_LIFE).keys()).map((yearIndex) =>
          <WeeksInYear key={yearIndex} year={yearIndex} dob={new Date(dob)}></WeeksInYear>
        )}
      </div>
    </>
  )
}

export default App
