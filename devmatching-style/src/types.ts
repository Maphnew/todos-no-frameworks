type State = {
    todoList: Todo[]
    toggleAll: boolean
    filter: 'All' | 'Active' | 'Completed'
}

type Todo = {
    completed: boolean
    text: string
}

export type {State, Todo}