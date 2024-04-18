import './App.css'

import Background from './components/background/Background'
import Landing from './components/landing/Landing'
import Table from './components/table/Table'
import useStore from './hooks/useStore'


function App() {
  const {page} = useStore(st=>st)



  const navigation = [
    <Landing />,
    <Table />
  ]
  
  return (
    <>
      <Background />
      {navigation[page]}
    </>
  )
}

export default App
