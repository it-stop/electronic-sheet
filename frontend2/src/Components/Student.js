import React from 'react'
import {loadStudentMarks} from '../server'
import Journal from './Journal'

class Student extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            marks: null
        }
    }

    async componentDidMount() {
        const marks = await loadStudentMarks(this.props.user.uid)
        console.log(marks)
        this.setState({
            marks: marks
        })
    }

    render() {
        if (this.state.marks === null) {
            return 'Loading...'
        }
        return <Journal marks={this.state.marks}/>
    }
}

export default Student;