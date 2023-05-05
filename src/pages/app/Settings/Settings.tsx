import React from 'react'
import {toast} from "react-toastify"
import AuthService from '../../../services/AuthService'
import { removeUserFromState } from '../../../store/reducers/userReducer'
import { useAppDispatch } from '../../../store/hooks'
import { useNavigate } from 'react-router-dom'

type Props = {refresh: Function}

const Settings = ({refresh}: Props) => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async() => {
    try{
      const authService = new AuthService();
      const logout = await authService.logoutUser();
      dispatch(removeUserFromState())
      toast("Logged out Successfully");
      await refresh()
      navigate("/login");
    } catch(e){
      console.log(e)
      toast.error("Unable to logout")
    }
  }

  return (
    <div className='settings-container'>
        <div className="content">
            <div className="content-header">
              <p className="headline">Walbro - Account Settings</p>
              <p className='tagline'>Manage Account Settings for Walbro</p>
              <button className='material-button-red' onClick={()=>handleLogout()}>LOGOUT</button>
            </div>
        </div>
    </div>
  )
}

export default Settings