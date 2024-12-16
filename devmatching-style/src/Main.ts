import { State, Todo } from "./types"

type MainContext = { 
    $target: HTMLElement
    initialState: State
    onDelete: (text: string) => void
    onCheck: (text: string) => void
    onToggleAll: () => void
    onEdit: (prevText: string, nextText: string) => void
}

export default class Main {
    private state: State
    private $element: HTMLElement
    constructor({ $target, initialState, onDelete, onCheck, onToggleAll, onEdit }: MainContext) {
        this.$element = document.createElement('section')
        this.$element.className = 'main'
        this.state = initialState
        $target.appendChild(this.$element)
        this.render()
    };

    setState(nextState: State) {
        this.state = {
            ...this.state,
            ...nextState
        }
        this.render()
    };
    
    render() {
        this.$element.innerHTML = `
            <input id="toggle-all" class="toggle-all" type="checkbox" ${this.state.toggleAll ? 'checked' : ''}>
            <label for="toggle-all">
                Mark all as complete
            </label>
            <ul class="todo-list">
                ${this.state.todoList.filter((todo: Todo) => {
                    return this.state.filter === 'Active'
                            ?  todo.completed === false 
                            : this.state.filter === 'Completed'
                            ? todo.completed === true 
                            : todo
                }).map((todo: Todo, i: number) => {
                    return `
                        <li data-id=${i} class="${todo.completed ? 'completed': ''}">
                            <div class="view">
                                <input class="toggle" type="checkbox" ${todo.completed ? 'checked' : ''}>
                                <label>${todo.text}</label>
                                <button class="destroy"></button>
                            </div>
                        </li>
                    `
                }).join('')}
            </ul>
        `
    };
};