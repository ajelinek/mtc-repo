import { useParams } from '@solidjs/router'
import TimeDisplay from '../../components/Time'
import { startTimer, timerSignal } from '../../store'
import './style.scss'

export default function Meeting() {
  const { id } = useParams<{ id: string }>()

  return (
    <div class="content">
      <h2>Meeting {id}</h2>
      <button class="button1" onClick={() => startTimer()}>
        Start
      </button>
      <div class="debug">
        <p>
          Timer: <TimeDisplay seconds={timerSignal.value} />
        </p>
      </div>
    </div>
  )
}
