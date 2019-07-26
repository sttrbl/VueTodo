//localStorage.clear();

const taskRow = {
	props: ['task'],
	template: `<li 
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
				</li>`
};


const vm = new Vue({
	el: '.app',
	components: {
		taskRow
	},
	data: {
		lastId: null,
		allTasks: null,
		tabs: [
			['all', 'Все'],
			['active', 'Активные'],
			['completed', 'Завершенные']
		],
		currentTab: 'all',
		newTask: ''
	},

	methods: {
		updateStorage: function () {
			try {
				localStorage.setItem('tasks', JSON.stringify(this.allTasks));
				localStorage.setItem('lastId', this.lastId);
			} catch (error) {

			}
		},

		getTaskObjIndex: function (objId) {
			return this.allTasks.findIndex(task => task.id == objId);
		},

		validateNewTaskField: function () {
			return !!this.newTask.trim();
		},

		addTask: function () {
			if (!this.validateNewTaskField()) return;

			this.allTasks.push({
				id: ++this.lastId,
				text: this.newTask,
				state: 'active'
			});

			this.newTask = '';
		},

		removeTask: function (taskId) {
			const taskObjIndex = this.getTaskObjIndex(taskId);

			this.allTasks.splice(taskObjIndex, 1);
		},

		changeTaskState: function (taskId) {
			const taskObjIndex = this.getTaskObjIndex(taskId);
			const taskObj = this.allTasks[taskObjIndex];

			taskObj.state = taskObj.state == 'active' ? 'completed' : 'active';
		},

		removeCurrentTaskCategory: function () {
			const category = this.currentTab;

			if (category == 'all') {
				this.allTasks = [];
				return;
			}

			this.allTasks = category == 'active' ? this.completedTasks : this.activeTasks;
		},

		checkAllTasks: function () {
			this.activeTasks.forEach(item => {
				item.state = 'completed';
			});
		}
	},

	watch: {
		allTasks: {
			handler: function () {
				this.updateStorage();
			},
			deep: true
		}
	},

	computed: {
		currentTaskObjName: function () {
			return this.currentTab + 'Tasks';
		},

		activeTasks: function () {
			return this.allTasks.filter((task, i) => task.state == 'active' ? true : false);
		},

		completedTasks: function () {
			return this.allTasks.filter((task, i) => task.state == 'completed' ? true : false);
		},
	},

	created: function () {
		let storageTasks = null;

		try {
			storageTasks = JSON.parse(localStorage.getItem('tasks'));
		} catch (error) {
			localStorage.clear();
		}

		const storageLastId = localStorage.getItem('lastId');

		this.allTasks = storageTasks || [];
		this.lastId = storageLastId || 0;
	}

});