import { Component } from 'react';
import '../css/projecthomePage.css';
import {  callApi, setSession } from '../api';


export class Projecthomepage extends Component {
  constructor() {
    super();
    this.userRegistration = this.userRegistration.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.forgotPasswordResponse = this.forgotPasswordResponse.bind(this);
    this.signin = this.signin.bind(this);
    this.signinResponse = this.signinResponse.bind(this);
  }

  showsSigin() {
    let popup = document.getElementById('popup');
    let username = document.getElementById('username');
    let password = document.getElementById('password');
    let signin = document.getElementById('signin');
    let signup = document.getElementById('signup');
    let popupHeader = document.getElementById('popupHeader');
    popupHeader.innerHTML = 'Login';
    popup.style.display = 'block';
    signin.style.display = 'block';
    signup.style.display = 'none';
    username.value = "";
    password.value = "";
  }

  closeSignin(event) {
    if (event.target.id === "popup") {
      let popup = document.getElementById("popup");
      popup.style.display = "none";
    }
  }

  userRegistration() {
    let fullname = document.getElementById("fullname");
    let email = document.getElementById("email");
    let role = document.getElementById("role");
    let signuppassword = document.getElementById("signuppassword");
    let confirmpassword = document.getElementById("confirmPassword");

    fullname.style.border = "";
    email.style.border = "";
    role.style.border = "";
    signuppassword.style.border = "";
    confirmpassword.style.border = "";
    if (fullname.value == "") {
      fullname.style.border = "1px solid red";
      fullname.focus();
      return;
    }
    if (email.value == "") {
      email.style.border = "1px solid red";
      email.focus();
      return;
    }
    if (role.value == "") {
      role.style.border = "1px solid red";
      role.focus();
      return;
    }
    if (signuppassword.value == "") {
      signuppassword.style.border = "1px solid red";
      signuppassword.focus();
      return;
    }
    if (confirmpassword.value == "") {
      confirmpassword.style.border = "1px solid red";
      confirmpassword.focus();
      return;
    }
    if (signuppassword.value !== confirmpassword.value) {
      signuppassword.style.border = "1px solid red";
      signuppassword.focus();
      return;
    }

    var data = JSON.stringify({
      fullname: fullname.value,
      email: email.value,
      role: role.value,
      password: signuppassword.value
    })
    callApi("POST", "http://localhost:8080/users/signup", data, this.getResponse)
  }

  getResponse(res) {
    let resp = res.split('::');
    alert(resp[1]);
    if (resp[0] === "200") {
      let signin = document.getElementById("signin");
      let signup = document.getElementById("signup");
      signin.style.display = "block";
      signup.style.display = "none";
    }
  }

  showSignup() {
    let popup = document.getElementById('popup');
    let signin = document.getElementById('signin');
    let signup = document.getElementById('signup');
    let popupHeader = document.getElementById('popupHeader');
    popupHeader.innerHTML = 'Sign Up';
    signin.style.display = 'none';
    signup.style.display = 'block';
    popup.style.display = 'block';

    let fullname = document.getElementById("fullname");
    let email = document.getElementById("email");
    let role = document.getElementById("role");
    let signuppassword = document.getElementById("signuppassword");
    let confirmpassword = document.getElementById("confirmPassword");
    fullname.value = "";
    email.value = "";
    role.value = "";
    signuppassword.value = "";
    confirmpassword.value = "";

  }

  forgotPassword() {
    let username = document.getElementById('username');
    username.style.border = "";
    if (username.value === "") {
      username.style.border = "1px solid red";
      username.focus();
      return;
    }

    let url = "http://localhost:8080/users/forgotpassword/" + username.value;
    callApi("GET", url, null, this.forgotPasswordResponse);
  }

  forgotPasswordResponse(res) {
    let data = res.split('::');
    let responseDiv = document.getElementById('responseDiv');
    if (data[0] === "200")
      responseDiv.innerHTML = `<label style='color:green'>${data[1]}</label>`;
    else
      responseDiv.innerHTML = `<label style='color:red'>${data[1]}</label>`;
  }

  signin() {
    let username = document.getElementById('username');
    let password = document.getElementById('password');
    let responseDiv = document.getElementById('responseDiv');
    username.style.border = "";
    password.style.border = "";
    responseDiv.innerHTML = "";
    if (username.value === "") {
      username.style.border = "1px solid red";
      username.focus();
      return;
    }
    if (password.value === "") {
      password.style.border = "1px solid red";
      password.focus();
      return;
    }
    let data = JSON.stringify({
      email: username.value,
      password: password.value
    });

    callApi("POST", "http://localhost:8080/users/Login", data, this.signinResponse);
  }

  signinResponse(res) {
    try {
      let responseDiv = document.getElementById('responseDiv');
      if (!res || res.trim() === '') {
        responseDiv.innerHTML = `<label style='color:red'>Server error. Please try again later.</label>`;
        return;
      }

      let data = res.split('::')
      if (data[0] === "200" && data[1] && data[1].trim() !== '') {
        const token = data[1];
        localStorage.setItem('jwtToken', token);
        setSession("csrid", token, 1);
        window.location.replace("/dashboard");
      } else {
        const errorMessage = data[1] || 'Invalid credentials. Please check your email and password.';
        responseDiv.innerHTML = `<label style='color:red'>${errorMessage}</label>`;
      }
    } catch (error) {
      let responseDiv = document.getElementById('responseDiv');
      responseDiv.innerHTML = `<label style='color:red'>An error occurred. Please try again later.</label>`;
      console.error('Login error:', error);
    }
  }

  render() {
    return (
      <div className='base'>
        <div id='popup' onClick={this.closeSignin}>
          <div className='popupWindow'>
            <div id='popupHeader'>Login</div>
            <div id='signin'>
              <label className='usernameLabel'>USERNAME</label>
              <input type='text' id='username' />
              <label className='passwordLabel'>PASSWORD</label>
              <input type='password' id='password' />
              <div className='forgotPassword'> <label onClick={this.forgotPassword}>Forgot Password?</label></div>
              <button className='signinButton' onClick={this.signin}>SIGN IN</button>

              <div className='div1' id='responseDiv'> </div>
              <div className='div2'>
                DONT HAVE AN ACCOUNT??
                <label onClick={this.showSignup}>SIGN UP</label>
              </div>
            </div>
            <div id='signup'>
              <label> Full Name: </label>
              <input type='text' id='fullname' />
              <label> Email: </label>
              <input type='email' id='email' />
              <label> Select Role: </label>
              <select id='role'>
                <option value='admin'>Notselected</option>
                <option value='1'>Admin</option>
                <option value='2'>Employer</option>
                <option value='3'>Job Seeker</option>
              </select>
              <div></div>
              <label> Password: </label>
              <input type='password' id='signuppassword' />
              <label> Confirm Password: </label>
              <input type='password' id='confirmPassword' />
              <button onClick={this.userRegistration}>REGISTER NOW </button>
              <div>Already have an account? <span onClick={this.showsSigin}>SignIn</span></div>
            </div>
          </div>
        </div>

        <div className='header'>
          <img className='logo' src='/images/logo1.png' alt='no' />
          <img className='signIcon' src='/images/user.png' alt='sign' />
          <label className='signinText' onClick={this.showsSigin}>Sign In</label>
        </div>

        <div className='content'>
          <div className='text1'>INDIAs #1 JOB PORTAL</div>
          <div className='text2'>Find your dream job</div>
          <div className='text3'>Discover career opportunities</div>
          <div className='searchBar'>
            <input type='text' className='searchText' placeholder='Search by Skill' />
            <input type='text' className='searchLocation' placeholder='job Location' />
            <button className='searchButton'>Search Job</button>
          </div>
        </div>

        <div className='footer'>
          <label className='copyrightTest centered'>CopyRight @ Muaaz-kluniversity </label>
          <img className='socialmediaIcon' src='/images/facebook.png' />
          <img className='socialmediaIcon' src='/images/linkedin.png' />
          <img className='socialmediaIcon' src='/images/twitter.png' />
        </div>
      </div>
    );
  }
}

export default Projecthomepage;