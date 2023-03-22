import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import {SERVER_URL} from '../constants.js'

class AddAssignment extends React.Component{

    constructor(props) {
        super(props)
        this.state={nameAssignment: '', dueDate: '', course: ''};
    }
    // this is called when the user pushes the button to add an assignment
    handleAssignment = () => {
        // this is the REST API that adds an assignment
        fetch(`${SERVER_URL}/addAssignment`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({
                // these are the variables that are needed to add an assignment
                assignmentName: this.state.nameAssignment,
                dueDate: this.state.dueDate,
                courseId: this.state.course
            })
        })
        .then(response => {
            if(response.ok){
                toast.success("Assignment added", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
            }
            else{
                toast.error("Error adding an assignment", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
            }
        })
        .catch(err => console.log(err))
    }
    // this method is called so that while the user is typing in the TextFields, the TextFields are displaying what the user is typing
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    // this is used to display the 3 TextFields that allows the user to enter the name of an assignment, the due date, and the courseId 
    // also a button is displayed to add the assignment by calling the REST API that adds assignment
    render(){
        const {nameAssignment, dueDate, course} = this.state;
        return (
        <div align = "center">
            <br/>
            <TextField autoFocus style = {{width:200}} label="Name of Assignment"  
            name = "nameAssignment" value = {nameAssignment} onChange={this.handleChange} />
            <br/><br/>
            <TextField autoFocus style = {{width:200}} label="Due Date (YYYY-MM-DD)" 
            name = "dueDate" value={dueDate} onChange={this.handleChange} />
            <br/><br/>
            <TextField autoFocus style = {{width:200}} label="Course ID" 
            name = "course" value = {course} onChange={this.handleChange} />
            <br/><br/>
            <Button variant="outlined" color="primary" style={{margin: 10}}
             onClick={this.handleAssignment} component={Link} to={{pathname:'/'}}>
                Add Assignment
            </Button>
        </div>
    )
    }
}

export default AddAssignment;