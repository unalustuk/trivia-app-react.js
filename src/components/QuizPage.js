import { nanoid } from "nanoid"

export default function QuizPage(props) {
    function createQuiz() {
        return props.items.map((quizItem) => (
            <div className="question-box" key={generateId()}>
                <p className="quieston" key={quizItem.id}>
                    {quizItem.question}
                </p>
                {quizItem.answerOptions.map((item) => {
                    return <button key={generateId()}>{item.value}</button>
                })}
            </div>
        ))
    }

    function generateId() {
        return nanoid()
    }

    const quizItems = createQuiz()

    return <div className="wrapper">{quizItems}</div>
}
