import React, { useEffect, useState, useId } from "react";
import Question from "./Question"

function Game(){
    const [questions, setQuestions] = useState([])
    const [isFinished, setIsFinished] = useState(false)
    const [score, setScore] = useState(null)
    
    useEffect(()=>{      
        function sortAnswers(arr){
            return arr.sort(() => Math.random() - 0.5)
            }
        
        async function getData(){
            if(isFinished) return; 
            const res = await fetch("https://opentdb.com/api.php?amount=5")
            const data = await res.json()
            const normalizedData = await data.results.map(piece => {
                const sortedAns = sortAnswers([...piece.incorrect_answers, piece.correct_answer])
                const correctPos = sortedAns.indexOf(piece.correct_answer)
                return (
                    {
                        question: piece.question,
                        answers: sortedAns,
                        correct: piece.correct_answer,
                        correctPos: correctPos,
                        id: crypto.randomUUID(),
                        selected: null,
                    }
                )
            })
            setQuestions(normalizedData)
        }
        getData();
    },[isFinished])

    function handleAnswer(questionID, selected){
        setQuestions(prev => prev.map(
            question => question.id === questionID ? 
            {...question, selected: selected} :
            question
        ))
    }

    function handleFinish(){
        let handleScore = 0
        questions.forEach(question =>{
            if(question.correctPos === question.selected){
                handleScore++
            }
        })
        setScore(handleScore)
        setIsFinished(true)
    }

    const myRender = questions.map(data => {
        const correct = isFinished ? data.correctPos : null;
        return(
            <Question question={data.question} 
            options={data.answers} 
            key={data.id} 
            handleAnswer={handleAnswer} 
            id={data.id} 
            correctId={correct}
            selected={data.selected}/>
        )
    })

    function resetGame(){
        setIsFinished(false)
    }

    return(
        <div className="game">
            {myRender}
            {isFinished ?
            <div className="game--score">
                <span className="game--score--text">You scored {score}/5 correct answers.</span>
                <button onClick={resetGame} className="primary-btn game--score--button">Play again</button>
            </div>
            : <button className="primary-btn game--check-answers" onClick={handleFinish}>Check answers</button>}
        </div>
    )
}

export default Game