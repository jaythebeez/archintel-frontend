import React, {useEffect, useState} from 'react'
import Modal from '../layout/Modal'
import CompanyService from '../../services/CompanyService';
import { toast } from 'react-toastify';

type Props = {
    type?: "edit" | "create";
    closeFunction: Function;
    company?: CompanyData;
    refresh: Function
}

const CompanyModal = ({closeFunction, type="create", company, refresh}: Props) => {

    const [formData, setFormData] = useState<CompanyData>({
        name: "",
        logo: "",
        status: "Active"
    })

    useEffect(() => {
        if(type === "edit" && company){
            setFormData({...company})
        }
    }, [company, type]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, key: string) => {
        setFormData(formData=>{
            return {
                ...formData,
                [key]: e.target.value
            }
        })
    }

    const handleEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try{
            e.preventDefault()
            const companyService = new CompanyService();
            if(company?.id) await companyService.editCompany(formData, company.id)
            else throw new Error("Unable to find Company Id")
            toast.success("Company updated successful")
            refresh()
        } catch(e){
            console.log(e)
            toast.error("Unable to add Company")
        }
        finally{
            closeFunction()
        }
    }

    const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try{
            e.preventDefault();
            const companyService = new CompanyService();
            await companyService.addCompany(formData)
            toast.success("Company added successfully");
            refresh()
            
        } catch(e){
            toast.error("Unable to add Company")
        }
        finally{
            closeFunction()
        }
    }

    return (
        <Modal closeFunction={closeFunction} title={type === "create" ? 'Add Company' : "Edit Company"}>
            <form onSubmit={(e)=>e.preventDefault()}>
                <div className="modal-body">
                    <div className="form-control">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <input type="text" className="form-input" id='name' required onChange={(e)=>handleChange(e, "name")} value={formData.name}/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="logo" className="form-label">Logo:</label>
                        <input type="text" className="form-input" id='logo' required onChange={(e)=>handleChange(e, "logo")} value={formData.logo}/>
                    </div>                    
                    <div className="form-control">
                        <label htmlFor="name" className="form-label">Status:</label>
                        <select name="status" id="" onChange={(e)=>handleChange(e, "status")} className='form-input'>
                            <option value="Active">Active</option>
                            <option value="Inactive">InActive</option>
                        </select>
                    </div>
                </div>
                <div className="modal-buttons">
                    {type === "edit" ? (
                        <button className='material-button-blue' onClick={handleEdit}>Edit</button>
                    ) : (
                        <button className='material-button-blue' onClick={handleSave}>Save</button>
                    )}
                </div>
            </form>
        </Modal>
    )
}

export default CompanyModal