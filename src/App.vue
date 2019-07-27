<template>
 <div id="app">
		<header class="header">
			<h1 class="header__headline">vue todo</h1>

			<div class="add-row">
				<input 
					v-model="newTask"
					@keyup.enter = "addTask" 
					class="add-row__input" 
					type="text" 
					maxlength="80" 
					required>
				<button @click = "addTask" class="add-row__button"></button>
			</div>

			<nav class="header__tab-list tab-list" v-show='allTasks.length'>
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
			v-show='allTasks.length' 
			:current-category="currentTab + 'Tasks'" 
			:allTasks="allTasks" 
			@remove-current-category="allTasks = $event"
		/>
	</div>
</template>

<script>
import TaskList from './components/TaskList'

export default {
	components: {
		TaskList
	},
	data: function () {
    return {
      lastId: null,
      allTasks: null,
      tabs: [
        ['all', 'Все'],
        ['active', 'Активные'],
        ['completed', 'Завершенные']
      ],
      currentTab: 'all',
      newTask: ''
    }
  },

	methods: {
		updateStorage () {
			try {
				localStorage.setItem('tasks', JSON.stringify(this.allTasks));
				localStorage.setItem('lastId', this.lastId);
			} catch (error) {

			}
		},

		validateNewTaskField () {
			return !!this.newTask.trim();
		},

		addTask () {
			if (!this.validateNewTaskField()) return;

			this.allTasks.push({
				id: ++this.lastId,
				text: this.newTask,
				state: 'active'
			});

			this.newTask = '';
		}
	},

	watch: {
		allTasks: {
			handler () {
				this.updateStorage();
			},
			deep: true
		}
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
}
</script>
