import getTodos from './getTodos.js'

const state = {
    todos: getTodos(),
    currentFilter: 'All', // 'All', 'Active', 'Completed'
}

const main = document.querySelector('.todoapp')

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

const getTodoCount = (todos) => {
    const notCompleted = todos.filter(todo => !todo.completed)

    const {length} = notCompleted
    return length === 1 ? `1 Item left` : `${length} Items left`
}

const view = (targetElement, state) => {
    const {
        todos,
        currentFilter,
    } = state

    const element = targetElement.cloneNode(true)
    // Node: cloneNode(deep)
    // cloneNode: 노드 복제, 인라인 이벤트 복제, addEventListener 또는 onclick으로 추가된 이벤트 핸들러는 복제 안됨
    // depp: true일 경우 subtree 모두 복제, false는 해당 노드만 복제
    const list = element.querySelector('.todo-list')
    const count = element.querySelector('.todo-count')
    const filters = element.querySelector('.filters')

    list.innerHTML = todos.map(getTodoElement).join('')
    count.textContent = getTodoCount(todos)
    Array.from(filters.querySelectorAll('li a'))
    .forEach(a => {
        if(a.textContent === currentFilter) {
            a.classList.add('selected')
        }else{
            a.classList.remove('selected')
        }
    })

    return element
}

window.requestAnimationFrame(() => {
    const newMain = view(main, state)
    main.replaceWith(newMain)
})