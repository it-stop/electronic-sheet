import React from 'react'
import { loadStudents, loadLessons, addMark, loadTeacherMarks, loadTeacherLessons } from '../server'
import Journal from './Journal'

class Teacher extends React.Component {

    constructor(props) {
        super(props)
        this.addMark = this.addMark.bind(this)
        this.state = {
            isLoading: true
        }
        this.studentRef = React.createRef()
        this.lessonRef = React.createRef()
        this.yearRef = React.createRef()
        this.quarterRef = React.createRef()
        this.markRef = React.createRef()
    }

    async componentDidMount() {
        const students = await loadStudents()
        const lessons = await loadTeacherLessons(this.props.user.uid)
        const marks = await loadTeacherMarks(this.props.user.uid)
        console.log(students)
        console.log(lessons)
        console.log(marks)
        this.setState({
            isLoading: false,
            lessons: lessons,
            students: students,
            marks: marks
        })
    }

    async addMark() {
        const teacherId = this.props.user.uid
        const studentId = this.studentRef.current.value
        const lessonId = this.lessonRef.current.value
        const year = this.yearRef.current.value
        const quarter = this.quarterRef.current.value
        const mark = this.markRef.current.value
        console.log('teacherId:', teacherId)
        console.log('studentId:', studentId)
        console.log('lessonId:', lessonId)
        console.log('year:', year)
        console.log('quarter:', quarter)
        console.log('mark:', mark)
        const ans = await addMark(teacherId, studentId, lessonId, year, quarter, mark)
        console.log(ans)
        if (ans == 'ok') {
            alert('Оценка поставлена')
        }
    }

    render() {
        if (this.state.isLoading) {
            return 'Loading...'
        }
        return <div>
            <Journal marks={this.state.marks}/>
            <div>
                <select ref={this.studentRef}>
                    {
                        this.state.students.map((v, i) => {
                            return <option value={v.uid} key={i}>{v.first_name + ' ' + v.last_name}</option>
                        })
                    }
                </select>
                <select ref={this.lessonRef}>
                    {
                        this.state.lessons.map((v, i) => {
                            return <option value={v.uid} key={i}>{v.name}</option>
                        })
                    }
                </select>
                Год:
                <select ref={this.yearRef}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                    <option value={11}>11</option>
                </select>
                Четверть:
                <select ref={this.quarterRef}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                </select>
                Оценка:
                <select ref={this.markRef}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={4}>5</option>
                </select>
                <button onClick={this.addMark}>Поставить оценку</button>
            </div>
        </div>
    }
}

export default Teacher;