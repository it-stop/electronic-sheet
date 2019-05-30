import { async } from "q";

const server = 'http://localhost:5000'

async function loadUser(id) {
    console.log('loadUser:', id)
    const res = await fetch(server + '/get_user/' + id)
    console.log(res)
    if (res.ok) {
        const ans = await res.json()
        return Promise.resolve(ans)
    }
    else {
        alert('Ошибка при загрузке пользователя!')
    }
}

async function loadUsers() {
    console.log('loadUsers')
    const res = await fetch(server + '/get_users')
    console.log(res)
    if (res.ok) {
        const ans = await res.json()
        return Promise.resolve(ans)
    }
    else {
        alert('Ошибка при загрузке пользователя!')
    }
}

async function loadStudents() {
    console.log('loadUsers')
    const users = await loadUsers()
    return Promise.resolve(users.filter((v, i) => v.role === 1))
}

async function loadTeachers() {
    console.log('loadUsers')
    const users = await loadUsers()
    return Promise.resolve(users.filter((v, i) => v.role === 2))
}

async function loadDirectors() {
    console.log('loadUsers')
    const users = await loadUsers()
    return Promise.resolve(users.filter((v, i) => v.role === 3))
}

async function loadLessons() {
    console.log('loadLessons')
    const res = await fetch(server + '/get_lessons')
    console.log(res)
    if (res.ok) {
        const ans = await res.json()
        return Promise.resolve(ans)
    }
    else {
        alert('Ошибка при загрузке уроков!')
    }
}

async function loadTeacherLessons(uid) {
    const lessons = await loadLessons()
    return Promise.resolve(lessons.filter((v, i) => {
        return v.teacher.uid == uid
    }))
}

async function loadMarks() {
    console.log('loadMarks')
    const res = await fetch(server + '/get_marks')
    console.log(res)
    if (res.ok) {
        const ans = await res.json()
        console.log(ans)
        return Promise.resolve(ans)
    }
    else {
        alert('Ошибка при загрузке оценок!')
    }
}

async function loadStudentMarks(id) {
    console.log('loadStudentMarks:', id)
    const allMarks = await loadMarks()
    const userMarks = allMarks.filter((v, i) => {
        return v.student.uid == id
    })
    return Promise.resolve(userMarks)
}

async function loadTeacherMarks(id) {
    console.log('loadTeacherMarks:', id)
    const allMarks = await loadMarks()
    const userMarks = allMarks.filter((v, i) => {
        return v.teacher.uid == id
    })
    return Promise.resolve(userMarks)
}

async function login(login, password) {
    console.log('this', this)
    console.log('login', login, password)
    const res = await fetch(server + '/login?email=' + login + '&password=' + password)
    console.log(res)
    if (res.ok) {
        const ans = await res.text()
        const id = ans.split(':')[0]
        const user = await loadUser(id)
        return Promise.resolve(user)
    }
    else {
        alert('Неправильный логин или пароль!')
    }
}

async function addMark(teacherId, studentId, lessonId, year, quarter, mark) {
    const res = await fetch(server + '/add_mark?teacher_id=' + teacherId + '&student_id=' + studentId + '&lesson_id=' + lessonId + '&year=' + year + '&quarter=' + quarter + '&mark=' + mark)
    console.log(res)
    if (res.ok) {
        const ans = await res.text()
        return Promise.resolve(ans)
    }
    else {
        alert('Ошибка при добавлении оценки!')
    }
}

async function addUser(email, firstName, middleName, lastName, password, birthDate, entryDate, role) {
    const res = await fetch(server + '/add_user?email=' + email + '&first_name=' + firstName + '&middle_name=' + middleName + '&last_name=' + lastName + '&password=' + password + '&birth_date=' + birthDate+ '&entry_date=' + entryDate+ '&role=' + role)
    console.log(res)
    if (res.ok) {
        const ans = await res.text()
        return Promise.resolve(ans)
    }
    else {
        alert('Ошибка при добавлении пользователя!')
    }
}

async function addLesson(teacherId, name) {
    const res = await fetch(server + '/add_lesson?teacher_id=' + teacherId + '&name=' + name)
    console.log(res)
    if (res.ok) {
        const ans = await res.text()
        return Promise.resolve(ans)
    }
    else {
        alert('Ошибка при добавлении предмета!')
    }
}

export {
    loadUser,
    loadMarks,
    loadStudentMarks,
    login,
    loadStudents,
    loadLessons,
    addMark,
    loadTeacherMarks,
    loadTeacherLessons,
    loadUsers,
    loadTeachers,
    loadDirectors,
    addUser,
    addLesson
}