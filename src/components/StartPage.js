import options from "../options"
export default function StartPage(props) {
    const optionsData = options.data.options

    const optionElements = optionsData.map((option) => (
        <option value={option.id} key={option.id}>
            {option.name}
        </option>
    ))
    return (
        <div className="wrapper">
            <h2 className="title">Trivia App</h2>
            {/* <p className="text">Welcome to Trivia App</p> */}
            <span className="text">Select Category:</span>
            <select
                className="selection"
                name="category"
                id="category"
                value={props.opt.category}
                onChange={props.handleChange}
            >
                <option value="8">Any Category</option>
                {optionElements}
            </select>
            <span className="text">Select Difficulty:</span>

            <select
                className="selection"
                name="difficulty"
                id="difficulty"
                value={props.opt.difficulty}
                onChange={props.handleChange}
            >
                <option value="any">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
            <button className="btn" onClick={props.startGame}>
                Start
            </button>
        </div>
    )
}
