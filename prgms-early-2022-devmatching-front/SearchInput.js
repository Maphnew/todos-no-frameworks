export default function SearchInput({ $target, initialState, onchange }) {
  this.$element = document.createElement("form");
  this.$element.className = "SearchInput";
  this.state = initialState;

  $target.appendChild(this.$element);

  this.render = () => {
    this.$element.innerHTML = `
            <input class="SearchInput__input" type=text placeholder="프로그램 언어를 입력하세요" value="${this.state}"> 
        `;
  };

  this.render();

  this.$element.addEventListener("keyup", (e) => {
    const actionIgnoreKeys = ["Enter", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    if (!actionIgnoreKeys.includes(e.key)) {
      onchange(e.target.value);
    }
  });

  this.$element.addEventListener("submit", (e) => {
    e.preventDefault();
  });
}
