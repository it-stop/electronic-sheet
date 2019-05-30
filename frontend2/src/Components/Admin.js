import React from 'react'
import {loadTeachers, addLesson, addUser} from '../server'

class Admin extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            isLoading: true
        }
        this.addUser = this.addUser.bind(this)
        this.addLesson = this.addLesson.bind(this)

        this.emailRef = React.createRef()
        this.firstNameRef = React.createRef()
        this.middleNameRef = React.createRef()
        this.lastNameRef = React.createRef()
        this.passwordRef = React.createRef()
        this.birthDateRef = React.createRef()
        this.roleRef = React.createRef()
        this.entryDateRef = React.createRef()

        this.lessonTeacherRef = React.createRef()
        this.lessonNameRef = React.createRef()
    }

    async componentDidMount() {
        const teachers = await loadTeachers()
        console.log('teachers:', teachers)
        this.setState({
            isLoading: false,
            teachers: teachers
        })
    }

    async addUser() {
        const email = this.emailRef.current.value
        const firstName = this.firstNameRef.current.value
        const middleName = this.middleNameRef.current.value
        const lastName = this.lastNameRef.current.value
        const password = this.passwordRef.current.value
        const birthDate = this.birthDateRef.current.value
        const entryDate = this.entryDateRef.current.value
        const role = this.roleRef.current.value
        console.log('email:', email)
        console.log('first_name:', firstName)
        console.log('middle_name:', middleName)
        console.log('last_name:', lastName)
        console.log('password:', password)
        console.log('birth_date:', birthDate)
        console.log('entry_date', entryDate)
        console.log('role:', role)
        const res = await addUser(email, firstName, middleName, lastName, password, birthDate, entryDate, role)
        if (res == 'ok') {
            alert('Пользователь успешно добавлен')
        }
    }

    async addLesson() {
        const teacherId = this.lessonTeacherRef.current.value
        const lessonName = this.lessonNameRef.current.value
        const res = await addLesson(teacherId, lessonName)
        if (res == 'ok') {
            alert('Предмет успешно добавлен')
        }
    }
    
    render() {
        if (this.state.isLoading) { 
            return 'Loading...'
        }
        return <div>
            <div>
                <div>
                    email:
                    <input type="email" ref={this.emailRef}></input> 
                    <br/>
                    имя:
                    <input type="text" ref={this.firstNameRef}></input> 
                    <br/>
                    фамилия:
                    <input type="text" ref={this.lastNameRef}></input> 
                    <br/>
                    отчество:
                    <input type="text" ref={this.middleNameRef}></input> 
                    <br/>
                    пароль:
                    <input type="password" ref={this.passwordRef}></input> 
                    <br/>
                    дата рождения:
                    <input type="date" ref={this.birthDateRef}></input> 
                    <br/>
                    дата поступления:
                    <input type="date" ref={this.entryDateRef}></input> 
                    <br/>
                    роль:
                    <select ref={this.roleRef}>
                        <option value={1}>Ученик</option>
                        <option value={2}>Учитель</option>
                        <option value={3}>Завуч/Директор</option>
                    </select>
                    <br/>
                    <button onClick={this.addUser}>Добавить пользователя</button>
                </div>
                <hr/>
                <div>
                    <select ref={this.lessonTeacherRef}>
                        {this.state.teachers.map((v, i)=>{
                            return <option value={v.uid} key={i}>{v.first_name + ' '+ v.last_name}</option>
                        })}
                    </select>
                    <br/>
                    Название предмета:
                    <input type="text" ref={this.lessonNameRef}></input>
                    <button onClick={this.addLesson}>Добавит предмет</button>
                </div>
            </div>
        </div>
    }
}

export default Admin;