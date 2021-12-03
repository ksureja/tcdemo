import { useState} from 'react';
import _ from 'lodash';

const UserAddForm: React.FC = ()=>{
    const [user, setUser] = useState({username : '', email : ''});
    const [errors , serErrors] = useState<any>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value } = e.target;
        setUser({...user, [name] : value});
    }
    const validate = () =>{
        let error : any = {};
        
        if(_.isEmpty(user.username)){
            error.username = 'Please enter username';
        }
        if(_.isEmpty(user.email)){
            error.email = 'Please enter email';
        }else if(!validateEmail(user.email)){
            error.email = 'Please enter a valid email';
        }
     
        serErrors({...error});
        return _.isEmpty(error) ? true : false ;
        
    }
    const validateEmail = (email : String) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
    const onSubmit = ()=>{
        if(validate()){
            // API Call
        }
    }
    return (
    <div className="container-fluid">
        <h2 data-testid="user-reg-form">User Registration</h2>
       <form>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input onChange = {(e :React.ChangeEvent<HTMLInputElement>) => handleChange(e)} value={user.username} data-testid="username" name="username" type="text" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter Username" />
                {errors?.username && <small role="error-alert" data-testid="username-error-msg" className="form-text text-muted">{errors?.username}</small> }
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input onChange = {(e :React.ChangeEvent<HTMLInputElement>) => handleChange(e)} value={user.email} data-testid="email" type="email" className="form-control" name="email" id="email" placeholder="Email" />
                {errors?.email && <span role="error-alert" className="form-text text-muted" data-testid="email-error-msg">{errors?.email}</span> }
            </div>
            
            <button type="button" data-testid="submitReg" name="submitReg" onClick={onSubmit} className="btn btn-primary">Submit</button>
        </form>
    </div>)
}

export default UserAddForm;