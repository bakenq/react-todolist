import { useState, useEffect } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {
  const [todos, setTodos] = useState([])
  const [todoValue, setTodoValue] = useState("")

  function persistData (newList) {
    localStorage.setItem("todos", JSON.stringify({ todos: newList }))
  }

  function handleAddTodos(newTodoText) {
    if (!newTodoText.trim()) {
      return
    }

    const newTodo = {
      id: Date.now(),
      text: newTodoText,
    }

    const newTodoList = [...todos, newTodo]
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleDeleteTodos(idToDelete) {
    const newTodoList = todos.filter((todo) => todo.id !== idToDelete)
    persistData(newTodoList)
    setTodos(newTodoList)  
  }

  function handleEditTodos(idToEdit) {
    const todoToEdit = todos.find((todo) => todo.id === idToEdit)
    if (!todoToEdit) return

    setTodoValue(todoToEdit.text)
    handleDeleteTodos(idToEdit)
  }

  useEffect(() => {
    if (!localStorage) {
      return
    }

    let localTodos = localStorage.getItem("todos")
    if (!localTodos) {
      return
    }

    try {
      const parsedData = JSON.parse(localTodos);
      // Check format and ensure items are objects with IDs
      if (parsedData && Array.isArray(parsedData.todos)) {
        // Ensure loaded todos have IDs, migrate if loading old string data
         const todosWithIds = parsedData.todos.map((item, index) => {
            if (typeof item === 'string') {
               // Convert old string data
               return { id: Date.now() + index, text: item };
            }
            // Ensure existing objects have an ID
            return { ...item, id: item.id || Date.now() + index };
         });
        setTodos(todosWithIds);
      } else {
        console.error("Invalid data in localStorage");
        setTodos([]);
        localStorage.removeItem("todos"); // Clear bad data
      }
    } catch (error) {
      console.error("Failed to parse localStorage todos", error);
      setTodos([]);
       localStorage.removeItem("todos"); // Clear bad data
    }
  }, [])

  return (
    <>
      <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos} />
      <TodoList handleEditTodos={handleEditTodos} handleDeleteTodos={handleDeleteTodos} todos={todos} />
    </>
  )
}

export default App
