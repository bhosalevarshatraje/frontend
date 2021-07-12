import React, { Component } from 'react';
import axios from 'axios';


class CustomerSignUpComponent extends Component { 
  constructor() {
    super();
    this.state = {
       id: this.customerTicketId,
      // customerTicketId: "",
      customerUserName: "",
      customerEmailId: "",
     customerPassword : "",
      gender:"",
      userNameError: "",
      passwordError : "",
       mobileNumber: "",

      isFormSubmitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.validateCustomerPassword = this.validateCustomerPassword.bind(this);

    this.validateField = this.validateField.bind(this);
  }

  handleChange = (e) => {
    let nam = e.target.name;
    let val = e.target.value;
    this.setState({ [nam]: val });


  }
  handleBlur(event) {
    const { name } = event.target;


    this.validateField(name);
    return;
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state)
    console.log(this.state)
    axios.post('http://localhost:6060/api/signup/customers', this.state)
      .then(response => {
        console.log(response)
        alert("Sign In Successfully")
        this.setState({
          reset: true
        });
      })
      .catch(error => {
        console.log(error)
        alert("Please Enter UserName/Password")
      })
  }

  validateField(name) {
    let isValid = false;

    if (name === "customerUserName") isValid = this.validateCustomerUserName();

    else if (name === "customerPassword") isValid = this.validateCustomerPassword();

    return isValid;
  }



  validateCustomerUserName() {
    let userNameError = "";
    const value = this.state.customerUserName;
    if (value.trim() === "") userNameError = "User Name is required";

    this.setState({
      userNameError
    });
    return userNameError === "";
  }

  validateCustomerPassword() {
    let passwordError = "";
    const value = this.state.customerPassword;
    if (value.trim === "") passwordError = "Password is required";
    // else if (!passwordValidator.test(value))
    //   passwordError =
    //     "Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase!";

    this.setState({
      passwordError
    });
    return passwordError === "";
  }



  render() {


   // if (this.state.reset) {
     // return <Redirect to={'/Login/adminUserName/adminPassword'} />
   // }

    return (


      <div className="page w-100 h-100 mt-5" style={{

        
        backgroundColor: "#dfcfcb",
        backgroundSize: "100% 100%",
        backgroundPosition: "top center"
        
    }}>
        <div className="row">
          <div className="col-sm-8 text-center admin" >
          </div>

          <div className="col-sm-4 signin text-center ">

            <h4 className="text-center mt-2">Just few steps away</h4>
            <h2 className="text-center mt-2">Register Here!</h2>

            <form onSubmit={this.handleSubmit}>

            {/* <div class="form-inline">
                <label > Ticket ID &nbsp;</label>
                <input
                  style={{ borderRadius: "40px" }}

                  type="number"
                  placeholder="ticketid"
                  name="customerTicketId"
                  value={this.state.customerTicketId}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  autoComplete="off"


                  className="form-control mt-3"

                />
              </div>
               */}
              <div className="form-inline">
                <label > Email ID &nbsp;</label>
                <input
                  style={{ borderRadius: "40px" }}

                  type="email"
                  placeholder="emailid"
                  name="customerEmailId"
                  value={this.state.customerEmailId}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  autoComplete="off"


                  className="form-control mt-3"

                />
              </div>

              <div className="form-inline">
                <label > Password &nbsp;</label>
                <input
                  style={{ borderRadius: "40px" }}

                  type="password"
                  placeholder="Password"
                  name="customerPassword"
                  value={this.state.customerPassword}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  autoComplete="off"


                  className="form-control mt-3"

                />
              </div>

              

              


              <div className="form-inline">
                <label > User Name &nbsp;</label><input
                  style={{ borderRadius: "40px" }}


                  type="text"
                  placeholder="User Name"
                  name="customerUserName" 
                  value={this.state.customerUserName}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  autoComplete="off"


                  className="form-control"


                />
              </div>
              {/* <div className="text-danger">{this.state.errors.uemailid}</div> */}
              
              


              
              <div className="form-inline">
                <label > Gender &nbsp;</label>
                <input
                  style={{ borderRadius: "40px" }}

                  type="text"
                  placeholder="gender"
                  name="gender"
                  value={this.state.gender}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  autoComplete="off"


                  className="form-control mt-3"

                />
              </div>

              <div className="form-inline">
                <label > Mobile Number&nbsp;</label>
                <input
                  style={{ borderRadius: "40px" }}

                  type="number"
                  placeholder="mobile number"
                  name="mobileNumber"
                  value={this.state.mobileNumber}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  autoComplete="off"


                  className="form-control mt-3"

                />
              </div>


              {/* <div className="text-danger">{this.state.errors.confirmpassword}</div> */}
              <br></br>
              <button type="submit" className="btn btn-dark mr-5">Sign In</button>
              {/* <button className="btn btn-dark mr-5" onClick={this.submitHandler}>Submit</button> */}
              <br></br>

              {/* <a href="/customerBug" className="text-left text-dark mr-5">Customer List</a> */}
            </form>
          </div>
        </div>
      </div>



    );
  }
}

export default CustomerSignUpComponent;