import React, {useState} from "react"
import _ from 'underscore'

function Question(props){    
    const allOptions = props.options.map((option, index) => {
        let myStyle;
        if(props.selected === index){
            myStyle = {backgroundColor: "yellow"}
        } else if (props.correctId === index){
            myStyle = {backgroundColor: "green"}
        }
        
        
        return(
            <button key={option} 
                style={myStyle}
                onClick={() => props.handleAnswer(props.id, index)}>
                {_.unescape(option)}
            </button>
        )
    })

    return(
            <>
                <h2>{_.unescape(props.question)}</h2>
                {allOptions}
            </>
        )
}

export default Question