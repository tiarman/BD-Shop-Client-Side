import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { createUserWithEmailAndPassword, handleFbSingIn, handleGoogleSignIn, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye, faTimes } from '@fortawesome/free-solid-svg-icons';
import facebook from '../../Images/facebook.png';
import google from '../../Images/google.png';
import swal from 'sweetalert';
import { UserContext } from '../../App';
import firebase from "firebase/app";
import "firebase/auth";
import './LoginModal.css';
import NavBar from '../Headers/NavBar/NavBar';

const LoginModal = () => {

    const [fromValidationError, setFromValidationError] = useState(null);
    const setLoggedInUser = useContext(UserContext)[1];

    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    });


    initializeLoginFramework()

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };


    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true)
            })
    }

    const fbSingIn = () => {
        handleFbSingIn()
            .then(res => {
                handleResponse(res, true)
            })
    }

    const handleResponse = (res, redirect) => {

        if (res.success && redirect) {
            setUser(res);
            setLoggedInUser(res)
            localStorage.setItem('loggedInUser', JSON.stringify(res))
            storeAuthToken();
            history.replace(from);
        } else {
            swal('Error', res.error, 'error');
        }
    }

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleChange = (event) => {
        let isFiledValid = true;

        if (event.target.name === 'email') {
            isFiledValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === 'password' && newUser) {
            isFiledValid = /\d{1}/.test(event.target.value) && event.target.value.length >= 8;
            setPassword(event.target.value)
            if (!isFiledValid) {
                setFromValidationError("password should must be a combination of letter and number and it's length greater than 8")
            }
            if (isFiledValid) {
                setFromValidationError(null)
            }

        }
        if (event.target.name === 'Confirm-password') {
            setConfirmPassword(event.target.value);
            isFiledValid = password === confirmPassword;
        }
        if (isFiledValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo)
        }
    }

    const handleSubmit = (e) => {

        if (newUser && user.email && user.password) {

            if (password !== confirmPassword) {
                swal('Error', "Password and  confirm password doesn't  match", 'error');
            } else {
                createUserWithEmailAndPassword(user.name, user.email, user.password)
                    .then(res => {
                        handleResponse(res, true);
                        setFromValidationError(null);
                    })
            }
        }

        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }

        e.preventDefault()
    }


    const [togglePasswordIcon, setTogglePassword] = useState(faEyeSlash)

    const showPassword = () => {

        if (newUser) {

            const newUserPassword = document.getElementById('new-user-password').getAttribute('type');
            if (newUserPassword === 'password') {
                document.getElementById('new-user-password').setAttribute('type', 'text')
            }
            if (newUserPassword === 'text') {
                document.getElementById('new-user-password').setAttribute('type', 'password')
            }

            const confirmPasswordAttribute = document.getElementById('confirm-password').getAttribute('type');
            if (confirmPasswordAttribute === 'password') {
                document.getElementById('confirm-password').setAttribute('type', 'text')
            }
            if (confirmPasswordAttribute === 'text') {
                document.getElementById('confirm-password').setAttribute('type', 'password')
            }

        } else {

            const passwordAttribute = document.getElementById('password').getAttribute('type');
            if (passwordAttribute === 'password') {
                document.getElementById('password').setAttribute('type', 'text')
            }
            if (passwordAttribute === 'text') {
                document.getElementById('password').setAttribute('type', 'password')
            }
        }


        if (togglePasswordIcon === faEyeSlash) {
            setTogglePassword(faEye)
        } else {
            setTogglePassword(faEyeSlash)
        }


    }


    const handleRegister = () => {
        document.getElementById("login").style.left = "-100%";
        document.getElementById("register").style.left = "0";
        document.getElementById("btn").style.left = "50%";
        setNewUser(true)
    }

    const handleLogin = () => {
        document.getElementById("login").style.left = "0";
        document.getElementById("register").style.left = "100%";
        document.getElementById("btn").style.left = "0";
        setNewUser(false)
    }


    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
          sessionStorage.setItem('token', idToken);
        }).catch(function(error) {
          // Handle error
        });
      }
    return (
        <div>
            <NavBar></NavBar>
        
        <div className="container">
            

        <div className="login-place">
            <div className="btnbox">

                <div id="btn"></div>

                <button className="toggle-btn" onClick={handleLogin}>Log In</button>

                <button className="toggle-btn" onClick={handleRegister}>Register</button>
            </div>
            <div className="social-icons">

                <img onClick={fbSingIn} src={facebook} alt="" />
                <img onClick={googleSignIn} src={google} alt="" />

            </div>


            <form onSubmit={handleSubmit} id="login" className="input-box">
                <input type="email" className="input-field" onBlur={handleChange} name="email" placeholder="Email" required />
                <div style={{ position: 'relative', width: '100%' }}>
                    <input className="input-field" type="password" onFocus={() => setFromValidationError('')} onBlur={handleChange} name="password" placeholder="Password" id="password" required />
                    <span onClick={showPassword} className="show-password"><FontAwesomeIcon id='show-password-icon' icon={togglePasswordIcon} /></span>
                </div>

                <div className="d-flex align-items-center justify-content-between my-3">
                    <label htmlFor="remember"><input type="checkbox" id="remember" /> Remember Me </label>
                    <p className="forget-password">Forget Password</p>
                </div>

                <input type="submit" className="submit-btn" value="Log In" />
            </form>


            <form onSubmit={handleSubmit} id="register" className="input-box">
                <input type="text" className="input-field" onBlur={handleChange} name="name" placeholder="Full Name" required />
                <input type="email" className="input-field" onBlur={handleChange} name="email" placeholder="Email" required />
                <div style={{ position: 'relative', width: '100%' }}>
                    <input className="input-field" type="password" onFocus={() => setFromValidationError('')} onBlur={handleChange} name="password" placeholder="Password" id="new-user-password" required />
                    <span onClick={showPassword} className="show-password"><FontAwesomeIcon id='show-password-icon' icon={togglePasswordIcon} /></span>
                </div>
                <div style={{ position: 'relative', width: '100%' }}>
                    <input className="input-field" type="password" onBlur={handleChange} name="Confirm-password" placeholder="Confirm Password" id="confirm-password" required />
                    <span onClick={showPassword} className="show-password"><FontAwesomeIcon id='show-confirm-password-icon' icon={togglePasswordIcon} /></span>
                </div>
                <label htmlFor="agree" className="d-flex align-items-center">
                    <input type="checkbox" className="checkbox" id="agree" />I agree to the terms and conditions
                </label>
                <button type="submit" className="submit-btn">Register</button>
            </form>
            <div onClick={() => history.push('/')} className="back-to-home">
                <span><FontAwesomeIcon id='show-confirm-password-icon' icon={faTimes} /></span>
            </div>

            <div className="error-box text-center bg-white position-relative">
                {
                    newUser && fromValidationError &&
                    <p id="fromValidationError">{fromValidationError}</p>
                }
            </div>
        </div>

    </div>
    </div>
    );
};

export default LoginModal;