<template>
	<li 
    	class="task-list__item task"
    	:class="{task_completed: task.state === 'completed'}"
	>
		<button 
      		class="task__controller"
      		@click = "$emit('change-task-state', task.id)"
      	></button>

      	<span class="task__text">{{task.text}}</span>
      
      	<button 
      		class="task__remove-button"
      		@click = "$emit('remove-task', task.id)"
      	></button>
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
}
</script>
