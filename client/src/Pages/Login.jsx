import '@fortawesome/fontawesome-free/css/all.css';
import React from 'react'
import './Login.css'
import Test from './Test.jsx'
import logo from '../components/img/Logo.png'

function Login() {
    return (
        <div className='Login'>

        <div className='test-container'>
            <Test opacity={0.5} zIndex={-5} />
        </div>

        <div className='login_wrapper'> 
            <div className='outermost_wrapper'>
               
                <section className='form-section'>

                <i id='user_icon' className='fas fa-user'></i>
                    <div className='form-box'>
                        <div className='form-value'>
                        <div className='logo'>
                            <img src={logo} style={{ width: 300, height: 150 }}/>
                        </div>

                            <form className=" all_input">
                                <div className='inputbox'>
                                    <span className='inputicon'><i className='fa fa-envelope'></i></span>
                                    <input type='email' required />
                                    <label for='email'>Email</label>
                                </div>
                                <div className='inputbox'>
                                    <span className='inputicon'><i className='fa fa-lock'></i></span>
                                    <input type='password' required />
                                    <label for='password'>Password</label>
                                </div>

                                <div className='forget'>
                                    <label htmlFor=""><input type="checkbox" />
                                        Remember me
                                    </label>
                                    <a href='#'>Forget password?</a>
                                </div>

                                <button className='login_button'>
                                    <p>Login</p>
                                    <i class="fa-solid fa-right-to-bracket"></i>
                                </button>

                            </form>
                            
                        </div>
                    </div>
                    <p className='signup'>Don't have an account yet? Sign up <a className='here' href='#'>here</a></p>
                </section>

            </div> {/*  closing div for outermost class */}

            
        
        </div> {/*  closing tag for wrapper */}
        </div>
        
    );

  
}

export default Login
