import React from 'react'
import { HiChevronDown } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

type Props = {
    show: boolean
}

const Sidebar = ({show}: Props) => {

  const { user } = useAppSelector(state=>state)

  return (
    <div className={show ? 'sidebar show' : "sidebar"}>
        <div className="sidebar-container">
            <div className="sidebar-top">
              
            </div>
            <div className="profile">
              <div className="profile-icon">
                <CgProfile size={40}/>
              </div>
              <div className="profile-details">
                <h3>{user.data?.firstname} {user.data?.lastname}</h3>
                <p>{user.data?.type}</p>
              </div>
              <div className='profile-arrow'>
                <HiChevronDown fill='#fff' />
              </div>
            </div>

            <div className="company-name">
              <h3>Walbro</h3>
            </div>

            <div className="nav-links">
              <NavLink to={"/app/"} className="nav-link">
                <span>Dashboard</span>
              </NavLink>
              <NavLink to={"/app/media"} className="nav-link">
                <span>All Media</span>
              </NavLink>
              <NavLink to={"/app/settings"} className="nav-link">
                <span>Account Settings</span>
              </NavLink>
            </div>

            <div className="sidebar-bottom">
              <p>Salesforce Home</p>
              <p>v1.1.0 | @ 2021 ArchIntel Corp</p>
            </div>
        </div>
    </div>
  )
}

export default Sidebar