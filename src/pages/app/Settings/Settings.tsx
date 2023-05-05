import React, {useState} from 'react'
import {toast} from "react-toastify"
import AuthService from '../../../services/AuthService'
import { removeUserFromState } from '../../../store/reducers/userReducer'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { useNavigate } from 'react-router-dom'
import CompanyModal from '../../../components/modals/CompanyModal';
import CompanyRow from '../../../components/CompanyRow'

type Props = {refresh: Function}

const Settings = ({refresh}: Props) => {

  const [companyModal, setCompanyModal] = useState(false)
  const {user, companies} = useAppSelector(state=>state)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async() => {
    try{
      const authService = new AuthService();
      await authService.logoutUser();
      dispatch(removeUserFromState())
      toast("Logged out Successfully");
      await refresh();
      navigate("/login");
    } catch(e){
      console.log(e)
      toast.error("Unable to logout")
    }
  }

  return (
    <>
    <div className='settings-container'>
        <div className="content">
            <div className="content-header">
              <p className="headline">Walbro - Account Settings</p>
              <p className='tagline'>Manage Account Settings for Walbro</p>
              <button className='material-button-red' onClick={()=>handleLogout()}>LOGOUT</button>
            </div>
            {user.data?.type === "Editor" && (
              <div className="content-body">
                <h3>Editor Settings</h3>
                <button className='material-button-green' onClick={()=>setCompanyModal(true)}>ADD COMPANY</button>
                <h3>Companies Table</h3>
                <div className="table-wrapper">
                  <table className='table'>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Logo</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {companies.map(company=>(
                        <CompanyRow company={company} refresh={refresh} key={company.id}/>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
        </div>
    </div>
    {companyModal && <CompanyModal closeFunction={()=>setCompanyModal(false)} type='create' refresh={refresh}/>}
    </>
  )
}

export default Settings;