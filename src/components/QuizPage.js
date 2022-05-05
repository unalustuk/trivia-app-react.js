import { nanoid } from "nanoid"

export default function QuizPage(props) {
    function createQuiz() {
        return props.items.map((quizItem) => (
            <div className="question-box" key={generateId()}>
                <p className="question" key={quizItem.id}>
                    {quizItem.question}
                </p>
                {quizItem.answerOptions.map((item) => {
                    let style
                    if (props.isFinish) {
                        if (
                            (quizItem.correct_answer === item.value &&
                                item.isChosen) ||
                            quizItem.correct_answer === item.value
                        ) {
                            style = "answer-btn correct"
                        } else if (
                            quizItem.correct_answer !== item.value &&
                            item.isChosen
                        ) {
                            style = "answer-btn wrong"
                        } else {
                            style = "answer-btn"
                        }
                    } else {
                        if (item.isChosen) {
                            style = "answer-btn chosen"
                        } else {
                            style = "answer-btn"
                        }
                    }

                    return (
                        <button
                            className={style}
                            key={item.id}
                            onClick={() =>
                                props.handleButtonChange(item.id, quizItem.id)
                            }
                            {...(props.isFinish && { disabled: true })}
                        >
                            {item.value}
                        </button>
                    )
                })}
            </div>
        ))
    }

    function generateId() {
        return nanoid()
    }

    const quizItems = createQuiz()

    return (
        <div className="wrapper">
            {quizItems}
            {props.isFinish ? (
                <div className="wrap">
                    <p className="end-text">You scored {props.score}/10 </p>

                    <button
                        className="playagain-btn"
                        onClick={() => props.playAgain()}
                    >
                        PLAY AGAIN
                    </button>
                </div>
            ) : (
                <div className="wrap">
                    <button
                        className="end-btn"
                        onClick={() => props.checkScore()}
                    >
                        CHECK ANSWERS
                    </button>
                </div>
            )}
        </div>
    )
}
