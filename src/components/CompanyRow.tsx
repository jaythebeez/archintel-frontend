import React, {useState} from 'react';
import CompanyModal from './modals/CompanyModal';
import DeleteCompanyDialog from './modals/DeleteCompanyDialog';

type Props = {
    company: CompanyData
    refresh: Function
}

const CompanyRow = ({company, refresh}: Props) => {

  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <>
    <tr>
        <th>{company.name}</th>
        <th>{company.logo}</th>
        <th>{company.status}</th>
        <th><button className='material-button-blue' onClick={()=>setEditModal(true)}>Edit</button></th>
        <th><button className='material-button-red' onClick={()=>setDeleteModal(true)}>Delete</button></th>
    </tr>
    {deleteModal && <DeleteCompanyDialog closeFunction={()=>setDeleteModal(false)} companyId={company.id} refresh={refresh} />}
    {editModal && <CompanyModal closeFunction={()=>setEditModal(false)} type='edit' company={company} refresh={refresh} />}
    </>
  )
}

export default CompanyRow