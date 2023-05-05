import Modal from '../layout/Modal';
import {  toast  } from "react-toastify";
import CompanyService from '../../services/CompanyService';

type Props = {
    closeFunction: Function,
    companyId?: string,
    refresh: Function
}

const DeleteCompanyDialog = ({closeFunction, companyId, refresh}: Props) => {
    const handleDelete = async() =>{
        try{
            const companyService = new CompanyService()
            
            if(companyId)await companyService.deleteCompany(companyId);

            toast("Company Deleted Succesfully");

            await refresh();
            closeFunction()

        } catch(e){
            toast.error("Unable to delete article")
            closeFunction()
        }
    }

    return (
        <Modal closeFunction={closeFunction}  title='Delete Company'>
            <div className="modal-body">
                <p>Are you sure you want to Delete this Company</p>
            </div>
            <div className="modal-buttons">
                <button className='material-button-green' onClick={()=>handleDelete()}>Yes</button>
                <button className='material-button-red'onClick={()=>closeFunction()} >No</button>
            </div>
        </Modal>
    )
}

export default DeleteCompanyDialog