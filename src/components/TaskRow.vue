<template>
  <li class="task-list__item task" :class="{task_completed: task.state === 'completed'}">
    <button class="task__controller" @click="$emit('change-task-state', task.id)"></button>

    <span class="task__text">{{task.text}}</span>

    <button class="task__remove-button" @click="$emit('remove-task', task.id)"></button>
  </li>
</template>

<script>
export default {
  props: {
    task: {
      taskInfo: Object,
      require: true
    }
  }
};
</script>

<style scoped>
.task {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 0.5em 0;
  font-size: 1.25em;
}

.task__controller,
.task__remove-button {
  font-size: 1.15em;
}

.task__text {
  padding: 0 1em;

  flex-grow: 1;
}

.task__controller::after {
  content: "\f0c8";
}

.task_completed .task__controller::after {
  color: #333;
  content: "\f14a";
}

.task_completed .task__text {
  text-decoration: line-through;
}

.task__remove-button::after {
  font-weight: 900;
  content: "\f00d";
}
</style>
