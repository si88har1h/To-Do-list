"use strict";

class App {
  //public fields
  task = document.querySelector(".to-do__input--box");
  listContainer = document.querySelector(".to-do__list");
  taskCounter = document.querySelector(".task__counter");
  constructor() {
    this.task.addEventListener("change", this._renderTask.bind(this));
    this.listContainer.addEventListener("click", this._taskDelete.bind(this));
    this.listContainer.addEventListener("click", this._taskComplete.bind(this));
  }

  _renderTask() {
    const html = `
    <div class="list__item">
          <label class="checkbox__container">
            <input type="checkbox" class="checkbox" />
            <span class="checkmark"></span>
          </label>
          <p class="task">${this.task.value}</p>
          <svg
            class="icon hidden icon--close"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
          >
            <path
              fill="#494C6B"
              fill-rule="evenodd"
              d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
            />
          </svg>
        </div> 
    `;
    this.listContainer.insertAdjacentHTML("afterbegin", html);
    this._renderTaskCount();
    this.task.value = "";
  }

  _renderTaskCount() {
    let count = this.listContainer.children.length;
    this.taskCounter.textContent = `${count} ${
      count === 1 ? "item" : "items"
    } left`;
  }

  _taskDelete(e) {
    if (!e.target.classList.contains("icon--close")) return;
    e.target.closest(".list__item").remove();
    this._renderTaskCount();
  }

  _taskComplete(e) {
    let renderedTask = document.querySelector(".task");
    if (!e.target.classList.contains("checkbox")) return;
    e.target.checked
      ? renderedTask.classList.add("completed")
      : renderedTask.classList.remove("completed");
  }
}

const app = new App();
