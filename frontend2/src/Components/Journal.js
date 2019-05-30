import React from 'react'

class Journal extends React.Component {

    constructor(props) {
        super(props)
    }

    async componentDidMount() {}

    render() {
        return <div><table>
            <thead>
                <tr>
                    <th>№</th>
                    <th>Предмет</th>
                    <th>Учитель</th>
                    <th>Ученик</th>
                    <th>Год</th>
                    <th>Четверть</th>
                    <th>Оценка</th>
                </tr>
            </thead>
            <tbody>
                {this.props.marks.map((v, i) => {
                    return <tr key={i}>
                        <td>{i+1}</td>
                        <td>{v.lesson.name}</td>
                        <td>{v.teacher.first_name + ' ' + v.teacher.last_name + ' ' + v.teacher.middle_name}</td>
                        <td>{v.student.first_name + ' ' + v.student.last_name + ' ' + v.student.middle_name}</td>
                        <td>{v.year}</td>
                        <td>{v.quarter}</td>
                        <td>{v.mark}</td>
                    </tr>
                })}
            </tbody>
        </table>
        <hr></hr>
        </div>
    }
}

export default Journal;