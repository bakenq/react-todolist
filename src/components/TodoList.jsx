import React from 'react'
import TodoCard from './TodoCard'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'

export default function TodoList(props) {
    const { todos, handleEditTodos, handleDeleteTodos } = props;

    return (
        <ul className='main'>
            <AnimatePresence initial={false}>
                {todos.map((todo) => {
                    return (
                        <motion.li
                            key={todo.id}
                            layout
                            initial={{ opacity: 0, y: -20, scale: 0.9 }} // Starting state (invisible, up, small)
                            animate={{ opacity: 1, y: 0, scale: 1 }}    // Animate to (visible, normal position/size)
                            exit={{ opacity: 0, x: -100, height: 0, scale: 0.8 }} // Exit state (fade out, slide left, shrink)
                            transition={{ duration: 0.3, ease: "easeOut" }} // Control animation speed/style
                        >
                            <TodoCard
                                handleEditTodos={handleEditTodos}
                                handleDeleteTodos={handleDeleteTodos}
                                id={todo.id}
                            >
                                <p>{todo.text}</p>
                            </TodoCard>
                        </motion.li>
                    );
                })}
            </AnimatePresence>
        </ul>
    )
}
