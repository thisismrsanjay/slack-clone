import React from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    error: false,
    message:"",
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
      .then(signedInUser=>{
        console.log(signedInUser);
      })
      .catch(err=>{
        console.log(err);
        this.setState({
          error:true,
          message:err.message
        })
      })
  };

  

  render() {
    const {  email, password } = this.state;

    return (
      <div className="">
        <form
          onSubmit={this.handleSubmit}
          className="alert  alert-dark  border-secondary "
          style={{ maxWidth: 450, margin: "10% auto  auto" }}
        >
          <h1
            className="text-secondary text-center"
            style={{ fontSize: "100px", marginTop: "-50px" }}
            >
            <span role="img" aria-label="">🔮</span>
          </h1>
         
          <h1 className="text-secondary text-center">Login</h1>
          
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

          

          <button type="submit" className="btn btn-secondary btn-dark btn-block mb-4">
            Submit
          </button>
        </form>
        <div style={{ maxWidth: 450, margin: "auto" }}>
          {(this.state.error)?<div className="alert alert-dismissible alert-danger m-3">
            {this.state.message}
          </div>:''}
          <h4 className="text-muted text-center m-3">
            New Here?
          </h4>
          <Link to="/register" className="btn btn-secondary btn-dark btn-block">
            {" "}
            Register
          </Link>
        </div>
      </div>
    );
  }
}

export default Login;
