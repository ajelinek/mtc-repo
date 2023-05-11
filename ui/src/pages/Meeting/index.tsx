import { useParams } from '@solidjs/router'
import TimerDisplay from '../../components/TimerDisplay/TimerDisplay'
import { startTimer, timerSignal } from '../../store'
import style from './index.module.css'
import { createSignal } from 'solid-js'
import AgendaItem from '../../components/AgendaItem/AgendaItem'

export default function Meeting() {
  const [agendaItems, setAgendaItems] = createSignal<string[]>([])
  const [currentAgendaItemText, setCurrentAgendaItemText] = createSignal<string>('')
  const { id } = useParams<{ id: string }>()

  const addAgendaItem = () => {
    setAgendaItems([...agendaItems(), currentAgendaItemText()])
    setCurrentAgendaItemText('')
  }

  return (
    <>
      <div class={style.meetingHeader}>
        <h2>Meeting {id}</h2>
        <button onClick={() => startTimer()}>Start</button>
      </div>
      <div>
        <TimerDisplay seconds={timerSignal.value} />
      </div>
      <div class={style.content}>
        <div class={style.agendaItemInput}>
          <input
            type="text"
            placeholder="Enter agenda item"
            onInput={(e) => setCurrentAgendaItemText(e.target.value)}
          />
          <button class="small-button" onClick={() => addAgendaItem()}>
            Add
          </button>
        </div>

        <div class={style.agendaItems}>
          {agendaItems().map((item) => {
            return <AgendaItem item={item} />
          })}
        </div>
      </div>
    </>
  )
}
