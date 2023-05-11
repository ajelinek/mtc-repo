import client from '../../api/trpc'
import { createSignal } from 'solid-js'
import { startTimer, timerSignal } from '../../store'
import TimeDisplay from '../../components/Time'

const [meetingId, setMeetingId] = createSignal<string | null>(null)

async function handler(e: MouseEvent) {
  try {
    const id = await client.meetings.createNewMeeting.query()
    console.log(id)
    setMeetingId(id)
  } catch (e) {
    console.error(e)
  }
}

// const handler = async (e: MouseEvent) => {
//   try {
//     const id = await client.newMeeting.query()
//     console.log(id)
//     setMeetingId(id)
//   } catch (e) {
//     console.error(e)
//   }
// }


const Home = () => {
  return (
    <>
      <h3>Home</h3>
      <p>Timer: <TimeDisplay seconds={timerSignal.value} /></p>
      <button onClick={() => startTimer()}>Start</button>
      <button onClick={(e) => handler(e)}>Test</button>
      Meeting Id: {meetingId()}
    </>
  )
}

export default Home
