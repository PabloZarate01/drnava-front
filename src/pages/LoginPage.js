import React, { Component } from 'react';
import { cmsAPI } from '../utils/http-client';
import { Redirect } from 'react-router-dom';
class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            userName:"",
            password:"",
            user:null,
            userJWT:"",
            userNameStatus:"",
            passwordStatus:"",
            isLoading:false,
            disableButton:false,
            message:"",
            errMessage:false,
            success:"",
            RedirectToReferrer:false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }   
    componentWillMount(){
        const logged = localStorage.getItem("logged");
        if(logged){
            this.setState({
                RedirectToReferrer:true
            })
        }
    }
    formDataHandler = (e) =>{
        e.preventDefault();
        console.log(e.target.name);
        console.log(e.target.value);
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    handleSubmit(e){
        e.preventDefault()
        const {userName,password} = this.state;
        this.setState({
            errMessage:"",
            message:"",
            isLoading : true,
            disableButton : true
        });
        const data = JSON.stringify({
            userName,
            password
        })
        cmsAPI.post('/api/user/login', data, {headers : {"Content-Type": "application/json"}})
        .then(res=>{
            console.log("Response:",res)
            if(res.status!==200){
                this.setState({
                    message:res.data.message,
                    isLoading : false,
                    disableButton : false
                });
            }else if(res.status === 200 && res.data.message==="Login Success!!!")
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("userJWT", res.data.token);
            localStorage.setItem("logged", true);
            cmsAPI.addJwt(res.data.token);
            this.setState({
                success:res.data.message,
                isLoading : false,
                disableButton : false,
                RedirectToReferrer:true
            });
        })
        .catch(err=>{
            console.error("ErrorLogin:",err)
            this.setState({
                errMessage:true,
                isLoading : false,
                disableButton : false
            });
        })
    }
    render() {
        const { errMessage, message, success,RedirectToReferrer} = this.state;
        const { from } = this.props.location.state || { from: { pathname:'/'}}
        if(RedirectToReferrer===true){
            return(<Redirect to={from}/>)
        }
        return (
            <div className="container">
                {/* <!-- Outer Row --> */}
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                {/* <!-- Nested Row within Card Body --> */}
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                            </div>
                                            <form onSubmit={this.handleSubmit} className="user">
                                                <div className="form-group">
                                                    <input
                                                    required
                                                    onChange={this.formDataHandler}
                                                    value={this.state.userName}
                                                    type="text"
                                                    name="userName"
                                                    id="exampleUsername"
                                                    placeholder="Usuario"
                                                    className="form-control form-control-user"
                                                    aria-describedby="userHelp" 
                                                    placeholder="Ingrese nombre de usuario..." 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        required
                                                        onChange={this.formDataHandler}
                                                        value={this.state.password}
                                                        type="password"
                                                        name="password"
                                                        id="examplePassword"
                                                        placeholder="********"
                                                        className="form-control form-control-user"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox small">
                                                        <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                        <label className="custom-control-label" htmlFor="customCheck">Remember Me</label>
                                                    </div>
                                                </div>
                                                <button 
                                                type="submit"
                                                color="dark"
                                                className="btn btn-primary btn-user btn-block"
                                                disabled={this.state.disableButton}>
                                                    {this.state.isLoading ? 
                                                    <div className="d-flex justify-content-center">
                                                    <div className="spinner-border text-dark" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                    </div>
                                                    : "Login"}
                                                </button>
                                            </form>
                                            <hr />
                                            <div className="text-center">
                                                <a className="small" href="forgot-password.html">Forgot Password?</a>
                                            </div>
                                            <div className="text-center">
                                                <a className="small" href="register.html">Create an Account!</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            // <div>
            //     <h2>Inicia sesión</h2>
            //     {errMessage ? <div className="alert alert-danger" role="alert">Ha ocurrido un error, intente más tarde</div>:<></>}
            //     {message ? <div className="alert alert-warning" role="alert">{message}</div>:<></>}
            //     {success ? <div className="alert alert-success" role="alert">{success}</div>:<></>}
            //     <Form  onSubmit={this.handleSubmit} className="form">
            //         <Col>
            //             <FormGroup>
            //                 <Label>Usuario</Label>
            //                 <Input
            //                     required
            //                     onChange={this.formDataHandler}
            //                     value={this.state.userName}
            //                     type="text"
            //                     name="userName"
            //                     id="exampleUsername"
            //                     placeholder="Usuario"
            //                 />
            //             </FormGroup>
            //         </Col>
            //         <Col>
            //             <FormGroup>
            //                 <Label for="examplePassword">Contraseña</Label>
            //                 <Input
            //                     required
            //                     onChange={this.formDataHandler}
            //                     value={this.state.password}
            //                     type="password"
            //                     name="password"
            //                     id="examplePassword"
            //                     placeholder="********"
            //                 />
            //             </FormGroup>
            //         </Col>
            //         <Button type="submit" color="dark" className="btn-block mb-4" disabled={this.state.disableButton}>
            //             {this.state.isLoading ? <Spinner color="light"/> : "Login"}
            //         </Button>
            //     </Form>
            // </div>
        );
    }
}

export default LoginPage;
