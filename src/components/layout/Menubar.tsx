import React from 'react';
import { HiBars3, HiOutlineMagnifyingGlass, HiCog6Tooth, HiBell, HiInboxArrowDown } from "react-icons/hi2";
import {TiDeviceDesktop} from "react-icons/ti";


type Props = {
  toggleSidebar: Function
}

const Menubar = ({toggleSidebar}: Props) => {

  return (
    <div className='header'>
      <div className="header-container">
        <div className="header-start">
          <div className='menu-icon' onClick={()=>toggleSidebar()}>
            <HiBars3 size={28} fill='#fff' />
          </div>
          <div className='search-container'>
            <HiOutlineMagnifyingGlass className='search-icon' size={20} color="#fff"/>
            <input type="text" className='search-bar' placeholder='search...'  />
          </div>
        </div>
        <div className="header-end">
          <div className="nav-icons">
              <div className="nav-icon">
                <TiDeviceDesktop size={20} fill='#fff'/>
              </div>
              <div className="nav-icon">
                <HiBell size={20} fill='#fff'/>
              </div>
              <div className="nav-icon">
                <HiCog6Tooth size={20} fill='#fff'/>
              </div>
              <div className="nav-icon">
                <HiInboxArrowDown size={20} fill='#fff'/>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menubar