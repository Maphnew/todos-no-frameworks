export default function Header({ $target }) {
    this.$element = document.createElement('header')
    this.$element.className = 'header'

    $target.appendChild(this.$element)

    this.render = () => {
        this.$element.innerHTML = `
            <h1>todos</h1>
            <input class="new-todo" placeholder="What needs to be done?" autofocus>
        `
    }

    this.render()
}