import React from "react";
import { Link } from "react-router-dom";
import md5 from 'md5';
import firebase from "../../firebase";

class Register extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    error: false,
    message:"",
    userRef:firebase.database().ref('users')
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(createdUser => {
        console.log(this.state);
        console.log(createdUser);
        //setting the name and avatar in database
        createdUser.user.updateProfile({
          displayName:this.state.username,
          photoURL:`https://www.gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
        }).then(()=>{

          //sending user data to save to database
          this.saveUser(createdUser).then(()=>{
            console.log('user saved');
          })

          this.setState({
            username: "",
            email: "",
            password: ""
          });
        })

      })
      .catch(err => {
        console.log(err);
        //show error
        this.setState({
          error:true,
          message:err.message,
          username:"",
          email:"",
          password:""
        });
      });
    
  };

  saveUser = createdUser=>{
    //return lets to use then above or else you can't use then

    return this.state.userRef.child(createdUser.user.uid).set({
      name:createdUser.user.displayName,
      avatar:createdUser.user.photoURL,
    })
  }

  render() {
    const { username, email, password } = this.state;

    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
          className="alert  alert-light  border-primary "
          style={{ maxWidth: 450, margin: "10% auto  auto" }}
        >
          <h1
            className="text-primary text-center"
            style={{ fontSize: "100px", marginTop: "-50px" }}
            >
            <span role="img" aria-label="">👨‍💻</span>
          </h1>
          
          <h1 className="text-primary text-center">Register</h1>
          <div className="form-group ">
            <input
              type="text"
              name="username"
              value={username}
              required
              className="form-control "
              id="userName"
              placeholder="&#128113; john"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={email}
              required
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="&#128231; john@gmail"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={password}
              minLength="6"
              required
              className="form-control"
              id="exampleInputPassword1"
              placeholder="&#128274; *******"
              onChange={this.handleChange}
            />
          </div>
          {/* <div className="form-group">
            <input
              type="password"
              name="confirmpassword"
              value={confirmpassword}
              required
              className="form-control"
              id="confirmPassword"
              placeholder="&#128274; *******"
              onChange={this.handleChange}
            />
          </div> */}

          

          <button type="submit" className="btn btn-primary btn-block mb-4">
            Submit
          </button>
        </form>
        <div style={{ maxWidth: 450, margin: "auto" }}>
          {(this.state.error)?<div className="alert alert-dismissible alert-danger m-3">
            {this.state.message}
          </div>:''}
          <h4 className="text-muted text-center m-3">
            already had an account?
          </h4>
          <Link to="/login" className="btn btn-primary btn-block">
            {" "}
            Login
          </Link>
        </div>
      </div>
    );
  }
}

export default Register;
