import { useState } from 'react'

type TestState = "ready" | "start" | "rest" | "end"

function App() {
  const [state, setState] = useState<TestState>("ready");

  return <div>App</div>
}

export default App
