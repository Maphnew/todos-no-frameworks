const getTodoElement = (todos) => {
    const {
        text,
        completed,
    } = todos

    return `
        <li ${completed ? 'class="completed"' : ''}>
            <div class="view">
                <input class="toggle" type="checkbox" ${completed ? 'checked' : ''}>
                <label>${text}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="${text}">
        </li>
    `
}

export default (targetElement, {todos}) => {
    const newTodos = targetElement.cloneNode(true)
    newTodos.innerHTML = todos.map(getTodoElement).join('')
    return newTodos
}