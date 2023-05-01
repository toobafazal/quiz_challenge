import React from 'react'
import { useEffect, useState } from 'react';
import { Rating } from '@mui/material';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import Grid from '@mui/material/Grid';
import img2 from '../images/2.jpg'
import img3 from '../images/3.jpg'
import img4 from '../images/4.jpg'
import img5 from '../images/5.jpg'
import Timer from '../components/Timer';
import QuestionsData from '../QuestionsData';
import StatusBar from '../components/StatusBar';

export default function MainScreen() {
  let [indexNumber, setIndexNumber] = useState(0)
  let [progress, setProgress] = useState(40)
  let [currentQuestion, setCurrentQuestion] = useState()
  let [mistake, setMistake] = useState(false)
  let [correct, setCorrect] = useState(false)
  let [allOptions, setAllOptions] = useState([])
  let [showResultButton, setShowResultButton] = useState(false)
  let [score, setScore] = useState(0)
  let [correctOption, setCorrectOption] = useState("")
  let [maxPer, setMaxPer] = useState(100)
  let [minPer, setMinPer] = useState(0)
  let [attemptedQuestions, setAttemptedQuestions] = useState(0)
  let [attemptedPer, setAttemptedPer] = useState(0)
  let [totalQuestions, setTotalQuestions] = useState()
  let [currentPer, setCurrentPer] = useState(0)
  let [selectedOption, setSelectedOption] = useState("")
  let [isAttempt, setIsAttempt] = useState(false)
  let [showResult, setShowResult] = useState(false)
  let [startQuiz, setStartQuiz] = useState(true)
  let [showQuiz, setShowQuiz] = useState(false)
  let [stopTimer, setStopTimer] = useState(false)
  let [Questions, setQuestions] = useState([])
  // let[isChecked , setIsChecked] = useState(false)
  let [value, setValue] = useState(0)

  const data = [
    {
      val: 100,
      color: 'green',

    },
    {
      val: currentPer,
      color: 'yellow',

    },
    {
      val: maxPer,
      color: "orange",

    },
    {
      val: minPer,
      color: 'red'
    }
  ]

  let nextQuestion = () => {
    if (indexNumber + 1 == Questions.length) {
      setCorrect(false)
      setMistake(false)
    } else {
      setIndexNumber(indexNumber + 1)
      setCorrect(false)
      setMistake(false)
    }
    setMinPer(score * 100 / totalQuestions)
    setCurrentPer(score * 100 / attemptedQuestions)
    setMaxPer((score + (totalQuestions - attemptedQuestions)) * 100 / totalQuestions)
    setAttemptedPer(attemptedQuestions * 100 / totalQuestions)
    setIsAttempt(false)
    setStopTimer(false)
  }
  let checkAnswer = (selectedOption) => {
    setStopTimer(true)
    setSelectedOption(selectedOption)
    setIsAttempt(true)
    setAttemptedQuestions(attemptedQuestions + 1)
    if (selectedOption == correctOption) {
      setScore(score + 1);
      setCorrect(true)
    } else {
      setMistake(true)
    }
    if (indexNumber + 1 == Questions.length) {
      setShowResultButton(true)
    }
  }
  let check = (x) => {
    if (isAttempt && Questions[indexNumber].correct_answer == x) {
      return " greenButton"
    } else if (isAttempt && selectedOption == x && Questions[indexNumber].correct_answer != selectedOption) {
      return " redButton"
    } else if (isAttempt) {
      return " diabledButton"
    }
  }

  let showQuizResult = () => {
    setMinPer(score * 100 / totalQuestions)
    setCurrentPer(score * 100 / attemptedQuestions)
    setMaxPer((score + (totalQuestions - attemptedQuestions)) * 100 / totalQuestions)
    setAttemptedPer(attemptedQuestions * 100 / totalQuestions)
    setShowResult(true)
    setShowQuiz(false)
  }

  let start = () => {
    setStartQuiz(false)
    setShowQuiz(true)
  }
  let reArrangeOptions = () => {
    setAllOptions([...Questions[indexNumber].incorrect_answers, Questions[indexNumber].correct_answer].sort())
    setCorrectOption(Questions[indexNumber].correct_answer)
    setCurrentQuestion(indexNumber + 1)
    setTotalQuestions(Questions.length)
    setProgress(indexNumber * 100 / Questions.length)

  }
  let difficulty = () => {
    if (Questions[indexNumber].difficulty == "hard") {
      setValue(3)
    } else if (Questions[indexNumber].difficulty == "medium") {
      setValue(2)
    } else if (Questions[indexNumber].difficulty == "easy") {
      setValue(1)
    }
  }
  let questionsHandling = () => {
    QuestionsData.forEach((obj) => {
      for (let x in obj) {
        if (typeof obj[x] != "object") {
          obj[x] = obj[x].replace(/%20/g, " ").replace(/%3A/g, ":").replace(/%3F/g, "?").replace(/%2C/g, ",").replace(/%22/g, '"').replace(/%26/g, "&").replace(/%27/g, "'").replace(/%24/g, "$");
        } else {
          let data = obj[x].map((e) => {
            return e.replace(/%20/g, " ").replace(/%3A/g, ":").replace(/%3F/g, "?").replace(/%2C/g, ",").replace(/%22/g, '"').replace(/%26/g, "&").replace(/%27/g, "'").replace(/%24/g, "$")
          })
          obj[x] = data;
        }
      }
    })
    setQuestions(QuestionsData);
  }

  useEffect(() => {
    questionsHandling()
  }, [])
  useEffect(() => {
    if (Questions.length > 0) {
      difficulty()
      reArrangeOptions()
    }
  }, [Questions, indexNumber])

  return (
    <div className='parent'>


      {startQuiz ? <div className='main' style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img onClick={start} src={img5}></img>
      </div> : null}



      {showQuiz ? <div className='main'>
        <div style={{ maxHeight: "85vh", overflowY: "scroll", marginBottom: "30px" }}>
          <div className='progressBar' style={{ width: `${progress}%` }}></div>

          <div style={{ fontSize: "14px", marginTop: "40px", marginLeft: "25px", color: "grey" }}>Entertainment Board Games</div>

          <div style={{ position: "relative" }}>
            <span style={{ fontSize: "25px", fontWeight: "bold", marginLeft: "25px" }}>Question {currentQuestion} of {Questions.length}</span>
            <span style={{ position: "absolute", right: "20px", top: "10px", display: "flex" }}>
              <AccessAlarmsIcon size={10} />
              <Timer stopTimer={stopTimer} func={checkAnswer} />
            </span>
          </div>

          <Rating
            style={{ marginLeft: "25px" }}
            readOnly={true}
            max={3}
            value={value}
          />
          <div style={{ marginBottom: "10px", marginTop: "25px", marginLeft: "25px", fontSize: "25px" }}>{Questions[indexNumber].question}</div>

          <Grid sx={{ padding: "30px" }} container spacing={2}>
            {allOptions.map((e, i) => {
              return <Grid item xs={12} sm={6} md={6} lg={6} xl={6}><div className={'option ' + check(e)} onClick={() => checkAnswer(e)} key={i}>{e}</div></Grid>
            })}
          </Grid>
          {mistake ? <div className='false'>Sorry!</div> : null}
          {correct ? <div className='true'>Correct!</div> : null}
          {isAttempt && indexNumber + 1 != Questions.length ? <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className='btn' onClick={nextQuestion}>Next Question</div>
          </div> : null}
          {showResultButton ? <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className='btn' onClick={showQuizResult} >Show Result</div>
          </div> : null}
        </div>
        <div style={{ position: "absolute", bottom: "5px", left: "5px", width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "row", marginBottom: "5px", marginLeft: "25px", marginRight: "50px", justifyContent: "space-between" }}>
            <span>Score : {Math.round(currentPer)}%</span>
            <span>Max Score : {Math.round(maxPer)}%</span>
          </div>
          <StatusBar data={data.sort((x, y) => y.val - x.val)} />
        </div>

      </div> : null}
      {showResult ? <div className='main'>
        {maxPer >= 80 ? <div className='position'>
          <img src={img2} />
          <h1>Congratulations!</h1>
          <p>You have attemped {attemptedQuestions} questions<br />Your Score is {score}<br />Your percentege is {maxPer}</p>
        </div>
          : maxPer <= 80 && maxPer >= 40
            ?
            <div className='position'> <img src={img4} />
              <h1>Passed!</h1>
              <p>You have attemped {attemptedQuestions} questions<br />Your Score is {score}<br />Your percentege is {maxPer}</p>
            </div>
            : maxPer <= 40
              ?
              <div className='passed'> <img src={img3} />
                <h1>Failed!</h1>
                <p>You have attemped {attemptedQuestions} questions<br />Your Score is {score}<br />Your percentege is {maxPer}%</p> </div> : null}
      </div> : null}
    </div>
  )
}
