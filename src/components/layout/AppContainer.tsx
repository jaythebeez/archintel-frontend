import React, { ReactNode, useState, useRef } from 'react'
import Menubar from './Menubar'
import Sidebar from './Sidebar'

type Props = {
    children: ReactNode
}

const AppContainer = ({children}: Props) => {

  const [show, setShow] =  useState(false);
  const pageContainerRef = useRef<HTMLDivElement>(null)

  const toggleSidebar = () => {
    if(show){
      setShow(false)
      if(pageContainerRef.current) pageContainerRef.current.classList.remove("show")
    }
    if(!show){
      setShow(true)
      if(pageContainerRef.current) pageContainerRef.current.classList.add("show")
    }
  }

  const handleClick = (e:React.MouseEvent<HTMLDivElement>) => {
    if(show){
      e.stopPropagation()
      toggleSidebar()
    }
  }


  return (
    <>
    <Sidebar show={show} />
    <div className='page-container' ref={pageContainerRef} onClick={handleClick} >
        <Menubar toggleSidebar={toggleSidebar} />
        <div className="page-content">
            {children}
        </div>
    </div>
    </>
  )
}

export default AppContainer