import client from '../../api/trpc'
import { createSignal } from 'solid-js'

const [meetingId, setMeetingId] = createSignal<string | null>(null)

async function handler(e: MouseEvent) {
  try {
    const id = await client.newMeeting.query({})
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
      <button onClick={(e) => handler(e)}>Test</button>
      Meeting Id: {meetingId()}
    </>
  )
}

export default Home
