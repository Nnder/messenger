import MainProvider from '../1_app/MainProvider'
import Navbar from '../3_widget/Navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function MainPage() {
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}