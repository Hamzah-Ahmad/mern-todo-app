import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import fire from '../config/Fire';
import {Container, Form, FormGroup, Button, Label, Input} from 'reactstrap';
const SignUp = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signUpError, setError] = useState('');

    useEffect(() => {
        fire.auth().signOut();
    }, [])
    // const onSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(`The email is ${email} and the password is ${password}`);
    // }

    const signup =(e) => {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(email, password).then((u)=>{
            props.history.push('/');
        }).catch((error) => {
            if(error.code === 'auth/invalid-email'){
                setError('Please enter a valid email')
            }
            else if(error.code === 'auth/weak-password'){
                setError('The password must be 6 characters long or more.')
            }
            else if (error.code === 'auth/email-already-in-use'){
                setError('This email is already in use')
            }
            else{
                console.log(error);
                setError('Please enter a valid username and password')
            }
          });

    }
    return (
        <div>
            <Container>
                <Form onSubmit = {signup} className = 'auth-form'>
                    <div className = 'auth-header'>Sign Up:</div>
                    <p className = 'alert-text'>{signUpError}</p>
                    <FormGroup>
                    <Label for = 'email'>Email:</Label>
                    <Input type = 'text' name = 'email' id = 'email' value = {email} onChange = {(e) => setEmail(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                    <Label for = 'password'>Password:</Label>
                    <Input type = 'password' name = 'password' id = 'password' value = {password} onChange = {(e) => setPassword(e.target.value)}/>
                    </FormGroup>
                    <Button className = 'form-btn' color = 'primary'>Submit</Button>
                    <div className = 'form-bottom-text'>Already a member? <Link to='/'>Sign In</Link></div>
                </Form>
            </Container>
        </div>
    )
}

export default SignUp
