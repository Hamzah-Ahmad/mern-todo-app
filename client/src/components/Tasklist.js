import React, {useState, useEffect} from 'react';
import axios from 'axios';
import fire from '../config/Fire';
import { Button, Container, ListGroup, ListGroupItem, Form, FormGroup, Input, InputGroup, InputGroupText, InputGroupAddon, Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import {Helmet} from 'react-helmet';

const Tasklist = (props) => {

    const [items, setItems] = useState(
        []  
      );
    
    const [newTask, setNewTask] = useState();

    const  onChange = (e) => {
        setNewTask(e.target.value);
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: '/api/items',
            data: {
              id: props.userId,  
              name: newTask
            }
          })
          .then(res => setItems([...items, res.data]));
          setNewTask('');
          document.querySelector('#task-input-box').value = '';
       
    }
    
    const logout = () => {
        fire.auth().signOut();
    }


    useEffect(() => {
        axios.get('/api/items').then(res => {
            const tasks = res.data.filter(item => item.id === props.userId);
            setItems(tasks);
        });
    }, []);
        
    return (
        <div>
            <Helmet>
                <style>{'body {background: -webkit-linear-gradient(to right, #2980b9, #6dd5fa, #ffffff) !important; background: linear-gradient(to right, #2980b9, #6dd5fa, #ffffff) !important; }'}</style>
            </Helmet>
            <Navbar className = 'navbar navbar-transparent'>
                <Container>
                    <Nav className="ml-auto" navbar>
                        <NavItem>  
                            <Form onSubmit = {logout}>
                                <div id = 'user-email'>{props.userEmail}</div>
                                <Button color="info">Sign Out</Button>
                            </Form>
                        </NavItem>  
                    </Nav>
                </Container>
            </Navbar>
            <div id = 'text-input-field'>
                <Form onSubmit = {onSubmit}>
                    <InputGroup>
                        <Input onChange = {onChange}  bsSize="lg" placeholder = 'Add task' id = 'task-input-box' required/>
                        <InputGroupAddon addonType="append">
                        {/* <Input type = 'submit' class="btn btn-lg" value = 'Add'/> */}
                        <Button color="primary">Add</Button>
                        </InputGroupAddon>
                    </InputGroup>
    
                </Form>
                <ListGroup>
                    {items.map(item => {
                        return(
                                <ListGroupItem className = "list-group-item d-flex justify-content-between align-items-center">
                                <InputGroupAddon addonType="prepend">
                                    <Input addon type="checkbox" aria-label="Checkbox for following text input" style ={{margin: '50px !important'}}/>
                                    
                                </InputGroupAddon>
                                
                                {item.name}
                                 

                                <Button onClick = {(e) => {
                                    axios.delete(`/api/items/${item._id}`).then(
                                        setItems(items.filter(currItem => currItem._id !== item._id))
                                    );

                                }} color="danger">X</Button>
                            </ListGroupItem>
                            

                        )
                    })}
                </ListGroup>
            </div>
        </div>
    )
}

export default Tasklist

