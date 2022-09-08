import React from "react"
import _ from 'underscore'
import {decode} from 'html-entities';

function Question(props){    
    const allOptions = props.options.map((option, index) => {
        let answerStyle;
        if(props.correctId !== null){   
            if(props.correctId === index){
                answerStyle = "question--option--correct"
            } else if(props.selected === index){
                answerStyle = "question--option--selected-wrong"
            } else {
                answerStyle = "question--option--transparent"
            }
        } else if (props.selected === index){
             answerStyle = "question--option--selected"
        }

        return(
            <button 
                key={option} 
                className={`question--option ${answerStyle}`}
                onClick={() => props.handleAnswer(props.id, index)}>
                {decode(option)}
            </button>
        )
    })

    console.log(decode("Don&‌#039;t forget that &‌pi; = 3.14 &‌amp; doesn&‌#039;t equal 3."))
    return(
            <div className="question">
                <h2 className="question--title">{decode(props.question)}</h2>
                <div className="question--all-options">{allOptions}</div>
            </div>
        )
}

export default Question