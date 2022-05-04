import StartPage from "./components/StartPage"
import QuizPage from "./components/QuizPage"
import { useState, useEffect } from "react"
import { nanoid } from "nanoid"

function App() {
    const [options, setOptions] = useState({
        category: "8",
        difficulty: "any",
    })

    const [data, setData] = useState("")

    const [isLoaded, setIsLoaded] = useState(false)

    const [items, setItems] = useState()

    function handleChange(event) {
        const { name, value } = event.target
        console.log(event)
        setOptions((prevOptData) => {
            return {
                ...prevOptData,
                [name]: value,
            }
        })
    }
    console.log(options)

    function startGame() {
        setIsLoaded((prevState) => !prevState)
        setItems(questionObject())
    }

    useEffect(() => {
        let url = "https://opentdb.com/api.php?amount=10"

        if (options.category !== "8" && options.difficulty !== "any") {
            url += `&category=${options.category}&difficulty=${options.difficulty}&type=multiple`
        } else if (options.category !== "8" && options.difficulty === "any") {
            url += `&category=${options.category}&type=multiple`
        } else if (options.category === "8" && options.difficulty !== "any") {
            url += `&difficulty=${options.difficulty}&type=multiple`
        } else {
            url += `&type=multiple`
        }
        console.log(url)
        fetch(url)
            .then((res) => res.json())
            .then((result) => {
                setData(result.results)
            })
    }, [options])

    // async function fetchData() {
    //     let url = "https://opentdb.com/api.php?amount=10&type=multiple"

    //     if (options.category !== "8" && options.difficulty !== "any") {
    //         url += `&category=${options.category}&difficulty=${options.difficulty}&type=multiple`
    //     } else if (options.category !== "8" && options.difficulty === "any") {
    //         url += `&category=${options.category}&type=multiple`
    //     } else if (options.category === "8" && options.difficulty !== "any") {
    //         url += `&difficulty=${options.difficulty}&type=multiple`
    //     }

    //     const res = await fetch(url)
    //     const data = await res.json()
    //     setData(data.results)
    // }

    const shuffleChoices = () => {
        let randIndexList = [0, 1, 2, 3]
        return (randIndexList = randIndexList.sort(() => Math.random() - 0.5))
    }

    const createItemSet = (dataRes) => {
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

    const questionObject = () => {
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

    console.log(items)

    return (
        <div>
            {isLoaded ? (
                <QuizPage items={items} />
            ) : (
                <StartPage
                    opt={options}
                    handleChange={(e) => handleChange(e)}
                    startGame={() => startGame()}
                />
            )}

            {/* <QuizPage data={data} /> */}
        </div>
    )
}

export default App
