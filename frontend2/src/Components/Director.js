import React from 'react'
import {loadMarks} from '../server'
import Journal from './Journal'

class Director extends React.Component {

    constructor(props){
        super(props)
        this.yearRef = React.createRef()
        this.quarterRef = React.createRef()
        this.report = this.report.bind(this)
        this.state = {
            isLoading: true,
            stat1: {}
        }
    }

    async componentDidMount() {
        const marks = await loadMarks()
        console.log(marks)
        this.setState({
            isLoading: false,
            marks: marks
        })
    }

    async report() {
        const year = this.yearRef.current.value
        const quarter = this.quarterRef.current.value
        console.log('year:', year)
        console.log('quarter:', quarter)
        const filteredMarks = this.state.marks.filter((v, i) => v.year == year && v.quarter == quarter)
        var lessons = {}
        filteredMarks.forEach(element => {
            if (lessons[element.lesson.name] == undefined) {
                lessons[element.lesson.name] = {}
            }
            if (lessons[element.lesson.name][element.mark] == undefined) {
                lessons[element.lesson.name][element.mark] = 0
            }
            lessons[element.lesson.name][element.mark]++
        });
        console.log(lessons)
        this.setState({
            stat1: lessons
        })
    }
    
    render() {
        if (this.state.isLoading) return 'Loading...'
        return <div>
            <Journal marks={this.state.marks}/>
            Год:
            <input type="number" ref={this.yearRef}></input>
            Четверть:
            <input type="number" ref={this.quarterRef}></input>
            <button onClick={this.report}>Составить отчет</button>
            {
                Object.keys(this.state.stat1).map((v,i)=>{
                    return <div key={i}><b>{v}</b><br/> {Object.keys(this.state.stat1[v]).map((v1,i)=>v1 + ' '+ this.state.stat1[v][v1])}</div>
                })
            }
        </div>
    }
}

export default Director;