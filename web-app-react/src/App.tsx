import { useEffect, useState } from 'react'
import Amster from './icons/Amster'

const tg = window.Telegram.WebApp


function App() {



  return (
    <>
       <div className="flex items-center space-x-2 pt-4">
            <div className="p-1 rounded-lg bg-[#1d2025]">
              <Amster size={24} className="text-[#d4d4d4]" />
            </div>
            <div>
              <p className="text-sm">Nikandr (CEO)</p>
            </div>
          </div>
    </>
  )
}

export default App
