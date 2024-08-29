export default function Main({ $target, initialState, onAdd }) {
    this.$element = document.createElement("section")
    this.$element.className = "main"
    this.state = initialState

    this.setState = (nextState) => {

    }

    $target.appendChild(this.$element)

    this.render = () => {
        this.$element.innerHTML = `
            <input id="toggle-all" class="toggle-all" type="checkbox">
            <label for="toggle-all">
                Mark all as complete
            </label>
        `
    }

    this.render()

    window.addEventListener('keyup', (e) => {
        if(e.key === 'Enter') {
            console.log('Enter')
            const todolist = this.state.todolist
            this.setState({
                ...this.state,
                todolist: todolist.concat[document.querySelector('.new-todo').value]
            })
            onAdd({
                name: document.querySelector('.new-todo').value,
                completed: false
            })
        }
    })
}