import client from '../../api/trpc'
import { createSignal } from 'solid-js'
import './style.scss'
import { timerSignal, meeting } from '../../store'
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

const Home = () => {
  return (
    <>
      <div class="app-header">
        <div class="left-half">
          <div class="coffee-mug">
            <div class="coffee-container">
              <div class="coffee"></div>
            </div>
          </div>
        </div>
        <div class="right-half">
          <h1>Lean Coffee</h1>
        </div>
      </div>
      <div class="content">
        <button class="button1" onClick={(e) => handler(e)}>
          Create Meeting
        </button>
        <button class="button1" onClick={() => meeting.joinMeeting(meetingId)}>
          Start
        </button>
      </div>
      <div class="debug">
        <p>
          Timer: <TimeDisplay seconds={timerSignal.value} />
        </p>

        <h3>Meeting Id: {meetingId()}</h3>
      </div>
    </>
  )
}

export default Home
