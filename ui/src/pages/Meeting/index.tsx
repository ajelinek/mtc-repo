import { useParams } from '@solidjs/router'

export default function App() {
  const { id } = useParams<{ id: string }>()

  if (!id || id === '') {
    return <h2>No meeting id provided</h2>
  }

  return (
    <>
      <h2>Meeting {id}</h2>
    </>
  )
}
