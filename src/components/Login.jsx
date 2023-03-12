import React from "react";
import { useNavigate } from "react-router-dom";



function Login ({ onCurrentUserChange }) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isLoginFailed, setIsLoginFailed] = React.useState(false);
    const [registrationFailed, setRegistrationFailed] = React.useState(false);


    const navigate = useNavigate();
    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    const handleSignUpClick = () => {
        if (localStorage.getItem(username)) {
            setRegistrationFailed(true);
        } else {
            localStorage.setItem(username, password);
            onCurrentUserChange(username);
            navigate('/');
        }
        
    }
    const handleSignInClick = () => {
        if (password === localStorage.getItem(username)) {            
            onCurrentUserChange(username);
            navigate('/')
        } else {
            setIsLoginFailed(true);
        }
    }

    
    const exitLogin = () => {
        navigate('/')
    }
    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className="d-flex justify-between mb-30">
                    Регистрация  <img onClick={exitLogin} className="cu-p" src="/img/btn-remove.svg" alt="Remove"/>
                </h2>
                <div className="SignUpForm" >
                <form>
                        <div className="inputs">
                            <label for="email-input">Email</label>
                            <input
                                id="email-input"
                                type="email"
                                required
                                placeholder="введите email"
                                onChange={handleUsernameChange}
                            />
                        </div>
                        {registrationFailed && (
                            <div className="SignUpError">пользователь уже существует</div>
                        )}
                        <div className="inputs">
                            <label for="password-input">Пароль</label>                   
                            <input
                                id="password-input"
                                type="password"
                                placeholder="введите пароль"
                                onChange={handlePasswordChange}
                            />                            
                        </div>
                        {isLoginFailed && (
                             <div className="PasswordError">неправильный пароль</div>
                        )}
                        <button type="submit" onClick={handleSignInClick}>Войти</button>                   
                        <button type="submit" onClick={handleSignUpClick}>Зарегистрироваться</button>
                </form>
                </div>
            </div>
        </div>
    )
}
export default Login