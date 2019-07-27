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
						v-show="activeTasks.length"
						class="footer__button"
						@click='checkAllTasks'
					>
					Выполнить все</button>
				</div>

				<button 
					class="footer__button"
					@click='removeCurrentCategory'
				>Удалить все</button>
			</footer>
		</template>
	</div>
</template>

<script>
import TaskRow from './TaskRow'

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
    	activeTasks () {
			return this.allTasks.filter((task, i) => task.state == 'active' ? true : false);
		},

		completedTasks () {
			return this.allTasks.filter((task, i) => task.state == 'completed' ? true : false);
		},
	},
	methods: {
        getTaskIndex (objId) {
			return this.allTasks.findIndex(task => task.id == objId);
        },
        
		changeTaskState (taskId) {
			const taskIndex = this.getTaskIndex(taskId);
			const taskObj = this.allTasks[taskIndex];

			taskObj.state = taskObj.state == 'active' ? 'completed' : 'active';
        },

		removeTask (taskId) {
			const taskIndex = this.getTaskIndex(taskId);

			this.allTasks.splice(taskIndex, 1);
        },

        removeCurrentCategory () {
            let newAllTaskArray = [];

            if (this.currentCategory == 'completed') {
                newAllTaskArray = this.activeTasks;
            } else if (this.currentCategory == 'active') {
                newAllTaskArray = this.completedTasks;
            }
            
            this.$emit('remove-current-category', newAllTaskArray);
		},

		checkAllTasks () {
			this.allTasks.forEach(item => item.state = 'completed');
		}
	}
}
</script>

