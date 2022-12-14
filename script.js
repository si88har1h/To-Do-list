"use strict";

class App {
  //public fields
  task = document.querySelector(".to-do__input--box");
  listContainer = document.querySelector(".to-do__list");
  taskCounter = document.querySelector(".task__counter");
  activeSort = document.querySelector(".sort-active");
  allSort = document.querySelector(".sort-all");
  sortCompleted = document.querySelector(".sort-completed");
  clearCompleted = document.querySelector(".clear__tasks");
  iconMode = document.querySelector(".icon-mode");
  headerImg = document.querySelector(".header__img");
  //private fields
  #tasks = [];

  ////////////////////METHODS/////////////////////////
  constructor() {
    this.task.addEventListener("change", this._renderTask.bind(this));
    this.listContainer.addEventListener("click", this._taskDelete.bind(this));
    this.listContainer.addEventListener("click", this._taskComplete.bind(this));
    this.clearCompleted.addEventListener(
      "click",
      this._clearCompleted.bind(this)
    );
    this.activeSort.addEventListener("click", this._activeSort.bind(this));
    this.allSort.addEventListener("click", this._allSort.bind(this));
    this.sortCompleted.addEventListener(
      "click",
      this._sortCompleted.bind(this)
    );
    this.iconMode.addEventListener("click", this._changeMode.bind(this));
  }

  _changeMode(e) {
    if (!e.target.classList.contains("icon")) return;
    if (e.target.dataset.mode === "sun") {
      e.target.src = e.target.dataset.modeSrc;
      e.target.dataset.mode = "moon";
      this.headerImg.src = this.headerImg.dataset.altSrc;
      document.querySelector("body").classList.add("light__mode");
    } else if (e.target.dataset.mode === "moon") {
      e.target.src = `/images/icon-sun.svg`;
      e.target.dataset.mode = "sun";
      this.headerImg.src = `/images/bg-desktop-dark.jpg`;
      document.querySelector("body").classList.remove("light__mode");
    }
  }

  _sortCompleted() {
    this._emptyList();
    this.#tasks
      .filter((x) => x.type === "completed")
      .map((x) => this._updateUI(x));
    this._removeActiveState();
    this.sortCompleted.classList.add("active");
  }

  _emptyList() {
    Array.from(this.listContainer.children).forEach((x) => x.remove());
  }

  _activeSort() {
    this._emptyList();
    this.#tasks
      .filter((x) => x.type === "functional")
      .map((x) => this._updateUI(x));
    this._removeActiveState();
    this.activeSort.classList.add("active");
  }

  _allSort() {
    this._emptyList();
    this.#tasks
      .filter((x) => x.type === "functional" || x.type === "completed")
      .map((x) => {
        if (x.type === "completed") {
        }
        this._updateUI(x);
      });
    this._removeActiveState();
    this.allSort.classList.add("active");
  }

  _removeActiveState() {
    document
      .querySelectorAll(".sort-field")
      .forEach((x) => x.classList.remove("active"));
  }

  _clearCompleted() {
    this.#tasks
      .filter((x) => x.type === "completed")
      .map((x) => {
        document.querySelector(`.list__item[data-id = '${x.Uid}']`)?.remove();
        x.type = "";
      });
  }

  _updateUI(x) {
    let check;
    let other = `<span class="checkmark"></span>
    </label>
    <p class="task">${x.taskName}</p>
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
    </div> `;
    if (x.type === "completed") {
      check = `<input type="checkbox" class="checkbox" checked = 'checked' />`;
    } else {
      check = `
      <input type="checkbox" class="checkbox" />
      `;
    }
    const html = `
      <div class="list__item ${x.type}" data-id=${x.Uid}>
        <label class="checkbox__container">
          `;
    this.listContainer.insertAdjacentHTML("afterbegin", html + check + other);
  }

  _renderTask() {
    let task = this.task.value;
    let id = new Date().toISOString().slice(-9);
    let x = {
      taskName: task,
      type: "functional",
      Uid: id,
    };
    this.#tasks.push(x);
    this._updateUI(x);
    this._allSort();
    this._renderTaskCount();
    this.task.value = "";
  }

  _renderTaskCount() {
    let count = Array.from(this.listContainer.children).filter((x) =>
      x.classList.contains("functional")
    ).length;
    this.taskCounter.textContent = `${count} ${
      count === 1 ? "item" : "items"
    } left`;
  }

  _taskDelete(e) {
    if (!e.target.classList.contains("icon--close")) return;
    this._verifyTask(e, "");
    e.target.closest(".list__item").remove();
    this._renderTaskCount();
  }

  _taskComplete(e) {
    let closest = e.target.closest(".list__item");
    if (!e.target.classList.contains("checkbox")) return; //guard clause
    if (e.target.checked) {
      closest.classList.add("completed");
      closest.classList.remove("functional");
      this._verifyTask(e, "completed");
      e.target.checked = true;
    } else {
      closest.classList.remove("completed");
      closest.classList.add("functional");
      this._verifyTask(e, "functional");
    }
    this._renderTaskCount();
  }

  _verifyTask(e, typeName) {
    let closest = e.target.closest(".list__item");
    this.#tasks.find((i) => i.Uid === closest.dataset.id).type = typeName;
  }
}

const app = new App();
