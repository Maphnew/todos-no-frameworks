const getTodoCount = (todos) => {
    const notCompleted = todos.filter(todo => !todo.completed)

    const {length} = notCompleted
    return length === 1 ? `1 Item left` : `${length} Items left`
}

export default (targetElement, {todos}) => {
    const newCount = targetElement.cloneNode(true)
    newCount.textContent = getTodoCount(todos)
    return newCount
}