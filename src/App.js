import StartPage from "./components/StartPage"
import QuizPage from "./components/QuizPage"
import { useState, useEffect } from "react"
import { nanoid } from "nanoid"

function App() {
    const [options, setOptions] = useState({
        category: "8",
        difficulty: "any",
    })

    const [data, setData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const [score, setScore] = useState(0)
    const [isFinish, setIsFinish] = useState(false)
    const [isFetch, setIsFetch] = useState(false)

    function handleChange(event) {
        const { name, value } = event.target
        setOptions((prevOptData) => {
            return {
                ...prevOptData,
                [name]: value,
            }
        })
    }

    useEffect(() => {
        setIsFetch(false)
        let url = "https://opentdb.com/api.php?amount=10"
        if (
            options.category === "13" ||
            options.category === "19" ||
            options.category === "24" ||
            options.category === "25" ||
            options.category === "26" ||
            options.category === "30"
        ) {
            url += `&category=${options.category}&type=multiple`
        } else {
            if (options.category !== "8" && options.difficulty !== "any") {
                url += `&category=${options.category}&difficulty=${options.difficulty}&type=multiple`
            } else if (
                options.category !== "8" &&
                options.difficulty === "any"
            ) {
                url += `&category=${options.category}&type=multiple`
            } else if (
                options.category === "8" &&
                options.difficulty !== "any"
            ) {
                url += `&difficulty=${options.difficulty}&type=multiple`
            } else {
                url += `&type=multiple`
            }
        }

        fetch(url)
            .then((res) => res.json())
            .then((result) => {
                setData(result.results)
                setIsFetch(true)
            })
    }, [options])
    function startGame() {
        setIsLoaded((prevState) => !prevState)
        setItems(questionObject())
    }

    function shuffleChoices() {
        let randIndexList = [0, 1, 2, 3]
        return (randIndexList = randIndexList.sort(() => Math.random() - 0.5))
    }

    function createItemSet(dataRes) {
        return dataRes.map((item) => {
            return [
                item.incorrect_answers[0],
                item.incorrect_answers[1],
                item.incorrect_answers[2],
                item.correct_answer,
                item.question,
            ]
        })
    }

    function questionObject() {
        const questionsAnswersArray = createItemSet(data)
        const array = questionsAnswersArray.map((item) => {
            let newRand = shuffleChoices()
            return {
                id: nanoid(),
                correct_answer: item[3],
                question: item[4],
                answerOptions: [
                    { value: item[newRand[0]], isChosen: false, id: nanoid() },
                    { value: item[newRand[1]], isChosen: false, id: nanoid() },
                    { value: item[newRand[2]], isChosen: false, id: nanoid() },
                    { value: item[newRand[3]], isChosen: false, id: nanoid() },
                ],
            }
        })
        return array
    }

    function handleButtonChange(buttonID, questionID) {
        setItems((prevItems) => {
            const array = []

            for (let i = 0; i < prevItems.length; i++) {
                const newAnswerOption = []
                const currentQuestion = prevItems[i]

                if (questionID === currentQuestion.id) {
                    for (
                        let j = 0;
                        j < prevItems[i].answerOptions.length;
                        j++
                    ) {
                        const currentAnswerOption =
                            prevItems[i].answerOptions[j]

                        if (currentAnswerOption.id === buttonID) {
                            const updatedAnswerOption = {
                                ...currentAnswerOption,
                                isChosen: !currentAnswerOption.isChosen,
                            }
                            newAnswerOption.push(updatedAnswerOption)
                        } else if (
                            currentAnswerOption.id !== buttonID &&
                            currentAnswerOption.isChosen
                        ) {
                            const updatedAnswerOption = {
                                ...currentAnswerOption,
                                isChosen: !currentAnswerOption.isChosen,
                            }
                            newAnswerOption.push(updatedAnswerOption)
                        } else {
                            newAnswerOption.push(currentAnswerOption)
                        }
                    }
                    const updatedQuestion = {
                        ...currentQuestion,
                        answerOptions: newAnswerOption,
                    }
                    array.push(updatedQuestion)
                } else {
                    array.push(currentQuestion)
                }
            }
            return array
        })
    }

    function checkScore() {
        for (let i = 0; i < items.length; i++) {
            for (let j = 0; j < items[i].answerOptions.length; j++) {
                if (
                    items[i].correct_answer ===
                        items[i].answerOptions[j].value &&
                    items[i].answerOptions[j].isChosen
                ) {
                    setScore((prevState) => prevState + 1)
                }
            }
        }
        setIsFinish((prevState) => !prevState)
    }

    function playAgain() {
        setData([])
        setItems([])
        setIsFinish(false)
        setIsLoaded(false)
        setOptions({
            category: "8",
            difficulty: "any",
        })
        setScore(0)
    }

    return (
        <div>
            {isLoaded ? (
                <QuizPage
                    items={items}
                    handleButtonChange={handleButtonChange}
                    checkScore={checkScore}
                    score={score}
                    isFinish={isFinish}
                    playAgain={playAgain}
                />
            ) : (
                <StartPage
                    opt={options}
                    handleChange={(e) => handleChange(e)}
                    startGame={() => startGame()}
                    isFetch={isFetch}
                />
            )}
        </div>
    )
}

export default App
