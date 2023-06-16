import React, { useEffect, useRef } from 'react';
import './Signup.css';
import Test from './Test.jsx';
import logo from '../components/img/Logo.png';

function Signup() {
  const overlayBtnRef = useRef(null);

  useEffect(() => {
    const container = document.getElementById('container');
    const overlayCon = document.getElementById('overlayCon');
    const overlayBtn = overlayBtnRef.current;

    const handleOverlayButtonClick = () => {
      container.classList.toggle('right-panel-active');

      overlayBtn.classList.remove('btnScaled');
      window.requestAnimationFrame(() => {
        overlayBtn.classList.add('btnScaled');
      });
    };

    if (overlayBtn) {
      overlayBtn.addEventListener('click', handleOverlayButtonClick);
      return () => {
        overlayBtn.removeEventListener('click', handleOverlayButtonClick);
      };
    }
  }, []);



  return (
    <>
    <div className='test-container'>
        <Test opacity={0.5} zIndex={-5} />
     </div>

    <body className='signup'>
    <div className="container" id="container">
      <div className="form-container sign-up-container">
        <form action="#">
          <h1>Create Account</h1>
          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google"></i></a>
            <a href="#" className="social"><i className="fab fa-github"></i></a>
          </div>
          <span>or use your email for registration</span>
          <div className="infield">
            <input type="text" placeholder="Username" name="name" />
            <label></label>
            </div>
          <div className="infield">
            <input type="email" placeholder="Email" name="email" />
            <label></label>
          </div>
          <div className="infield">
            <input type="password" placeholder="Password" />
            <label></label>
          </div>
          <button className='signup_button'>
            <p>Sign Up</p>
            <i class="fa-solid fa-right-to-bracket"></i>
            </button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form action="#">
          <h1>Sign in</h1>
          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google"></i></a>
            <a href="#" className="social"><i className="fab fa-github"></i></a>
          </div>
          <span>or use your account</span>
          <div className="infield">
            <input type="email" placeholder="Email" name="email" />
            <label></label>
          </div>
          <div className="infield">
            <input type="password" placeholder="Password" />
            <label></label>
          </div>
          <a href="#" className="forgot">Forgot your password?</a>
          <button className='signin_button'>
            <p>login</p>
            <i class="fa-solid fa-right-to-bracket"></i>
            </button>
        </form>
      </div>
      <div className="overlay-container" id="overlayCon">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal information.</p>
            <button style={{ marginTop: '-12px' }}>Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello!</h1>
            <p>Enter your personal details and have fun with ScriptScribe!</p>
            <button>Sign Up</button>
          </div>
        </div>
        <button ref={overlayBtnRef} id="overlayBtn"></button>
      </div>

    
    </div>
    </body>
    </>
  );
}

export default Signup;
