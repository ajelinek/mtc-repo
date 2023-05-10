import { useParams } from '@solidjs/router'

export default function Meeting() {
  const { id } = useParams<{ id: string }>()

  return <h2>Meeting {id}</h2>
}
