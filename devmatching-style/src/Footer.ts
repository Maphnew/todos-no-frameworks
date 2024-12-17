import { State, Todo } from "./types"

type FooterContext = {
    $target: HTMLElement
    initialState: Todo[]
    onClear: () => void 
    onFilter: (filter: State['filter']) => void
}

export default class Footer {
    private state: Todo[]
    private $element: HTMLElement
    constructor({ $target, initialState, onClear, onFilter }: FooterContext) {
        this.$element = document.createElement("footer")
        this.$element.className = "footer"
        this.state = initialState

        $target.appendChild(this.$element)

        this.$element.addEventListener('click', ((e: MouseEvent) => {
            if(e.target instanceof HTMLElement) {
                const $button = e.target.closest('button')
                if($button && $button.className === 'clear-completed') {
                    onClear()
                }
                const $a: HTMLAnchorElement | null = e.target.closest('a')! as HTMLAnchorElement
                
                if( $a.className === 'selected' ) {
                    $a.classList.remove("selected")
                }else{
                    ($a.closest('ul') as HTMLUListElement).querySelectorAll('a').forEach(a => a.classList.remove('selected'))
                    $a.classList.add("selected")
                }
                if(['All', 'Active', 'Completed'].includes($a.textContent as string)) {
                    onFilter($a.textContent as State['filter'])
                }
            }
        }) as EventListener)

        this.render()
    }

    setState(nextState: Todo[]) {
        this.state = nextState
        this.render()
    }

    getTodoCount(todoList: Todo[]) {
        const notCompleted = todoList.filter((todo: Todo) => !todo.completed)
        const {length} = notCompleted
        if(length === 1){
            return '1 Item left'
        }
        return `${length} Items left`
    }

    render() {
        this.$element.innerHTML = `
            <span class="todo-count">
                ${this.getTodoCount(this.state)}
            </span>
            <ul class="filters">
                <li>
                    <a href="#/">All</a>
                </li>
                <li>
                    <a href="#/active">Active</a>
                </li>
                <li>
                    <a href="#/completed">Completed</a>
                </li>
            </ul>
            <button class="clear-completed">
                Clear completed
            </button>
        `
    }
}