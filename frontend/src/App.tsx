import { useContext } from "react"
import CouponButton from "./components/CouponButton"
import Nav from "./components/Nav"
import Toast from "./components/Toast"
import { ToastContext } from "./context/toastContext"

function App() {

  const { open } = useContext(ToastContext);

  return (
    <>
      <div className='flex flex-col justify-center items-center h-[100vh] w-full'>
        {open && <Toast/>}
        <Nav />
        <CouponButton />
      </div>
    </>
  )
}

export default App
