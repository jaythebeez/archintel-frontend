import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addUserToState } from "../../store/reducers/userReducer";
import AuthService from "../../services/AuthService";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state=>state)
  
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    };
  
    const handleSubmit = async (event: React.SyntheticEvent) => {
      try{
        event.preventDefault();
        // perform login logic
        const authService = new AuthService();
        const user = await authService.loginUser({email, password})

        // add user data to state
        dispatch(addUserToState(user));

        navigate("/");
      } catch(e){
        console.log(e)
      }
    };

    useEffect(() => {
      if(user.isAuthenticated)navigate("/app")
    }, [user])
    
  
    return (
      <div className="auth-container">
        <div className="auth-content">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={handleEmailChange} />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={handlePasswordChange} />
          </div>
          <div className="btn-container">
            <button type="submit" className="material-button-blue">Login</button>
          </div>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register now</Link>
        </p>
      </div>
      </div>
    );
};
  
export default Login;