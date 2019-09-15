<template>
  <div>
    <ul class="task-list">
      <TaskRow
        v-for="task in this[currentCategory]"
        :task="task"
        :key="task.id"
        @change-task-state="changeTaskState"
        @remove-task="removeTask"
      />
    </ul>

    <template v-if="this[currentCategory].length">
      <footer class="footer">
        <div>
          <button
            v-show="activeTasks.length && currentCategory != 'completedTasks'"
            class="footer__button"
            @click="checkAllTasks"
          >Выполнить все</button>
        </div>

        <button class="footer__button" @click="removeCurrentCategory">Удалить все</button>
      </footer>
    </template>

    <p v-else class="absence-message">Задачи данной категории отсутствуют.</p>
  </div>
</template>

<script>
import TaskRow from "./TaskRow";

export default {
  components: {
    TaskRow
  },

  props: {
    currentCategory: {
      type: String,
      require: true
    },
    allTasks: {
      type: Array,
      require: true
    }
  },

  computed: {
    activeTasks() {
      return this.allTasks.filter((task, i) =>
        task.state == "active" ? true : false
      );
    },

    completedTasks() {
      return this.allTasks.filter((task, i) =>
        task.state == "completed" ? true : false
      );
    }
  },

  methods: {
    getTaskIndex(objId) {
      return this.allTasks.findIndex(task => task.id == objId);
    },

    changeTaskState(taskId) {
      const taskIndex = this.getTaskIndex(taskId);
      const taskObj = this.allTasks[taskIndex];

      taskObj.state = taskObj.state == "active" ? "completed" : "active";
    },

    removeTask(taskId) {
      const taskIndex = this.getTaskIndex(taskId);

      this.allTasks.splice(taskIndex, 1);
    },

    removeCurrentCategory() {
      let newAllTaskArray = [];

      if (this.currentCategory == "completedTasks") {
        newAllTaskArray = this.activeTasks;
      } else if (this.currentCategory == "activeTasks") {
        newAllTaskArray = this.completedTasks;
      }

      this.$emit("remove-current-category", newAllTaskArray);
    },

    checkAllTasks() {
      this.allTasks.forEach(item => (item.state = "completed"));
    }
  }
};
</script>

<style scoped>
.task-list {
  margin: 0;
  padding: 0.6em 0;
}

.task-list__item {
  border-bottom: 1px solid #f3f3f3;
}

.task-list__item:last-child {
  border: none;
}

.absence-message {
  text-align: center;
  font-family: "PT Sans";
  font-size: 1.25em;
  color: #999;
}

.footer {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding-top: 0.8em;
  border-top: 1px solid #d0d0d0;

  justify-content: space-between;
}

.footer__button {
  font-size: 1em;
  font-weight: bold;
}
</style>
