import client from '../../api/trpc'
import { useNavigate } from '@solidjs/router'
import './style.scss'

const Home = () => {
  const navigate = useNavigate()

  const createMeeting = async (e: MouseEvent) => {
    try {
      const id = await client.meetings.createNewMeeting.query()

      navigate(`/meeting/${id}`)
    } catch (e) {
      console.error(e)
    }
  }

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
        <button class="button1" onClick={(e) => createMeeting(e)}>
          Create Meeting
        </button>
      </div>
    </>
  )
}

export default Home
