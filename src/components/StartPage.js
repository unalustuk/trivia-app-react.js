import options from "../options"
export default function StartPage(props) {
    const optionsData = options.data.options

    const optionElements = optionsData.map((option) => (
        <option value={option.id} key={option.id}>
            {option.name}
        </option>
    ))
    let brokenCategory
    if (
        props.opt.category === "13" ||
        props.opt.category === "19" ||
        props.opt.category === "24" ||
        props.opt.category === "25" ||
        props.opt.category === "26" ||
        props.opt.category === "30"
    ) {
        brokenCategory = true
    }
    return (
        <div className="wrapper-start">
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

            {brokenCategory ? (
                <select
                    className="selection"
                    name="difficulty"
                    id="difficulty"
                    value={props.opt.difficulty}
                    onChange={props.handleChange}
                >
                    <option value="any">Any Difficulty</option>
                </select>
            ) : (
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
            )}
            <button
                className="btn"
                onClick={props.startGame}
                {...(!props.isFetch && { disabled: true })}
            >
                START
            </button>
            {/* <FontAwesomeIcon icon="fa-brands fa-github" />
            <FontAwesomeIcon icon="fa-brands fa-linkedin" /> */}

            <div className="icons">
                <a
                    href="https://www.linkedin.com/in/ünal-uştuk-312652197/"
                    className="right"
                    target="_blank"
                >
                    <i class="fa-brands fa-linkedin fa-3x "></i>
                </a>
                <a
                    href="https://github.com/unalustuk/trivia-app-react.js"
                    target="_blank"
                >
                    <i class="fa-brands fa-github fa-3x"></i>
                </a>
            </div>
        </div>
    )
}
