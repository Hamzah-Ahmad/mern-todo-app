import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import fire from '../config/Fire';
import {Container, Form, FormGroup, Button, Label, Input} from 'reactstrap';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setError] = useState('');
    // const onSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(`The email is ${email} and the password is ${password}`);
    // }

    const login =(e) => {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(email, password).then((u)=>{
            //console.log(u);
        }).catch((error) => {
            //console.log(error);
            setError('Invalid Credentials');
          });

    }
    return (
        <div>
            <Container>
                <Form onSubmit = {login} className = 'auth-form' >
                    <div className = 'auth-header'>Login:</div>
                    <p className = 'alert-text'>{loginError}</p>
                    <FormGroup>
                    <Label for = 'email'>Email:</Label>
                    <Input type = 'text'  name = 'email' id = 'email' value = {email} onChange = {(e) => setEmail(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                    <Label for = 'password'>Password:</Label>
                    <Input type = 'password'  name = 'password' id = 'password' value = {password} onChange = {(e) => setPassword(e.target.value)}/>
                    </FormGroup>
                    <Button className = 'form-btn' color="primary">Submit</Button>
                    <div className = 'form-bottom-text'>Don't have an ID? <Link to='/signup'>Sign Up</Link></div>
                </Form>
            </Container>
        </div>


    )
}

export default Login
