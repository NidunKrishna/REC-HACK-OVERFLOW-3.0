import React, { useState } from 'react';
import icon from '../../Assets/logo.png';
import AboutAuth from './AboutAuth';
import './Auth.css';

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = () => {
    setIsSignup(!isSignup);
  };

  return (
    <>
      <h2>Authentication</h2>
      <section className="auth-section">
        {isSignup && <AboutAuth />}
        <div className="auth-container">
          
          <form>
            {isSignup && (
              <label htmlFor="name">
                <h4>Display Name</h4>
                <input type="text" id="name" name="name" />
              </label>
            )}

            <label htmlFor="email">
              <h4>E-mail</h4>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address"
              />
            </label>
            <label htmlFor="password">
              <div>
                <h4>Password</h4>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                />
                {isSignup && (
                  <p style={{ color: "grey", fontSize: "13px" }}>
                    Password should contain at least 8 characters
                  </p>
                )}
              </div>
            </label>
            {isSignup && (
              <label htmlFor="check">
                <input type="checkbox" />
                <p style={{ color: "grey", fontSize: "13px" }}>
                  Receive updates
                </p>
              </label>
            )}

            <button type="submit" className="auth-button">
              {isSignup ? 'Sign Up' : 'Login'}
            </button>
            {!isSignup && <p className='h'>Forgot Password?</p>}
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
            <p>
            <button
              type="button"
              className="handle-switch-btn"
              onClick={handleSubmit}
            >
              {isSignup ? "Login" : "Sign Up"}
             
            </button>
          </p>
          </form>
          
        </div>
      </section>
    </>
  );
};

export default Auth;
