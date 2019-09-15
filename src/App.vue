<template>
  <div id="app">
    <header class="header">
      <h1 class="header__headline">vue todo</h1>

      <div class="add-row">
        <input
          v-model="newTask"
          @keyup.enter="addTask"
          class="add-row__input"
          type="text"
          maxlength="80"
          required
        />
        <button @click="addTask" class="add-row__button"></button>
      </div>

      <nav class="header__tab-list tab-list" v-show="allTasks.length">
        <button
          v-for="(tab) in tabs"
          :key="tab[0]"
          class="tab-list__item"
          :class="{ 'tab-list__item_current': currentTab === tab[0] }"
          v-on:click="currentTab = tab[0]"
        >{{tab[1]}}</button>
      </nav>
    </header>

    <TaskList
      v-show="allTasks.length"
      :current-category="currentTab + 'Tasks'"
      :allTasks="allTasks"
      @remove-current-category="allTasks = $event"
    />
  </div>
</template>

<script>
import TaskList from "./components/TaskList";

export default {
  components: {
    TaskList
  },
  data: function() {
    return {
      lastId: null,
      allTasks: null,
      tabs: [
        ["all", "Все"],
        ["active", "Активные"],
        ["completed", "Завершенные"]
      ],
      currentTab: "all",
      newTask: ""
    };
  },

  methods: {
    updateStorage() {
      try {
        localStorage.setItem("tasks", JSON.stringify(this.allTasks));
        localStorage.setItem("lastId", this.lastId);
      } catch (error) {}
    },

    validateNewTaskField() {
      return !!this.newTask.trim();
    },

    addTask() {
      if (!this.validateNewTaskField()) return;

      this.allTasks.push({
        id: ++this.lastId,
        text: this.newTask,
        state: "active"
      });

      this.newTask = "";
    }
  },

  watch: {
    allTasks: {
      handler() {
        this.updateStorage();
      },
      deep: true
    }
  },

  created: function() {
    let storageTasks = null;

    try {
      storageTasks = JSON.parse(localStorage.getItem("tasks"));
    } catch (error) {
      localStorage.clear();
    }

    const storageLastId = localStorage.getItem("lastId");

    this.allTasks = storageTasks || [];
    this.lastId = storageLastId || 0;
  }
};
</script>

<style scoped>
#app {
  position: relative;
  box-sizing: border-box;
  max-width: 500px;
  min-width: 300px;
  margin: 60px auto;
  padding: 1em 2em;
  border: 1px solid #c6c7cc;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}

.header__headline {
  margin: 0;
  padding-top: 0.25em;
  padding-bottom: 0.25em;
  font-size: 4em;
  text-align: center;
  text-transform: uppercase;
}

.add-row {
  display: flex;
  padding-bottom: 2em;

  flex-wrap: nowrap;
}

.add-row__input,
.add-row__button {
  border-radius: 5px;
}

.add-row__input {
  min-width: 150px;
  padding: 0.4em 0.4em;
  border: 1px solid #d2d6d7;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  font-size: 1.35em;

  flex-grow: 1;
  flex-shrink: 1;
}

.add-row__button {
  color: #fff;
  border: 1px solid #999;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  background: #999;

  flex-basis: 4em;
  flex-shrink: 0;
}

.add-row__button::after {
  font-size: 2em;
  font-weight: 900;
  content: "\f054";
}

.add-row__button:hover {
  background: #333;
  color: #fff;
}

.header__tab-list {
  border-bottom: 2px solid #cf2323;
}

.tab-list__item {
  position: relative;
  top: 2px;
  margin-right: 0.2em;
  padding: 0.2em 0.8em 0.3em;
  color: #fff;
  border: 2px solid #cf2323;
  border-bottom: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: #cf2323;
  font-size: 1em;
}

.tab-list__item:hover,
.tab-list__item_current {
  color: #333;
  background: #fff;
  font-weight: bold;
}

.tab-list__item:last-child {
  margin-right: 0;
}

@media screen and (max-width: 600px) {
  #app {
    width: 95%;
    margin-top: 1em;
    margin-bottom: 1em;
    padding: 1em;
  }
}

@media screen and (max-width: 400px) {
  .tab-list {
    display: flex;

    justify-content: space-between;
  }

  .tab-list__item {
    flex-grow: 1;
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
