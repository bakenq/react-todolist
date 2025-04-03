export default function TodoInput(props) {
    const { handleAddTodos, todoValue, setTodoValue } = props

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddTodos(todoValue);
        setTodoValue("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <header>
                <input
                    value={todoValue}
                    onChange={(e) => {
                        setTodoValue(e.target.value)
                    }} placeholder="What needs to be done?" type="text" />
                <button type="submit">Add</button>
            </header>
        </form>
    )
}