import './App.css'
import { AppHeader } from './components/app-header'
import { AppSidebar } from './components/app-sidebar'
import { Users } from './components/users-management'

function App() {
  return (
    <>
      <AppSidebar />
      <div className='flex-auto flex flex-col'>
        <AppHeader />
        <Users />
      </div>
    </>
  )
}

export default App
