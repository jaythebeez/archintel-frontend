import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService, { UserRegisterFormData } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";


const Register = () => {

    const navigate = useNavigate();

    const { user } = useAppSelector(state=>state)


    const [formData, setFormData] = useState<UserRegisterFormData>({
      email: "",
      firstName: "",
      lastName: "",
      type: "Writer",
      status:"Active",
      password: "",
    })
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, key: string) => {
      setFormData(formData=>{
        return {
          ...formData,
          [key]: event.target.value
        }
      })
    };
  
  
    const handleSubmit = async (event: React.SyntheticEvent) => {
      event.preventDefault();
      // perform registration logic

      try{
        event.preventDefault();
        // perform login logic
        const authService = new AuthService();
        const user = await authService.registerUser({...formData})
        if(user) navigate("/login");
      } catch(e){
        console.log(e)
      }
    };

    useEffect(() => {
      if(user.isAuthenticated) navigate("/app");
    }, [user])
  
    return (
      <div className="auth-container">
        <div className="auth-content">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div className="form-field">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={formData.email} onChange={(e)=>handleInputChange(e, "email")} />
          </div>
          <div className="form-field">
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" value={formData.firstName} onChange={(e)=>handleInputChange(e, "firstName")} />
          </div>
          <div className="form-field">
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" value={formData.lastName} onChange={(e)=>handleInputChange(e, "lastName")} />
          </div>
          <div className="form-field">
            <label htmlFor="type">Type:</label>
            <select name="type" id="type" onChange={(e)=>handleInputChange(e, "type")}>
              <option value="Writer">Writer</option>
              <option value="Editor">Editor</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="status">Status:</label>
            <select name="status" id="status" onChange={(e)=>handleInputChange(e, "status")}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={formData.password} onChange={(e)=>handleInputChange(e, "password")} />
          </div>
          <div className="btn-container">
            <button type="submit" className="material-button-blue">Register</button>

          </div>
        </form>
        <p>
          Already have an account? <Link to="/login">Login now</Link>
        </p>
      </div>
      </div>
    );
};

export default Register