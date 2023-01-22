import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import App from './components/App.vue'
import StudentInfo from './components/StudentInfo.vue'
import Students from './components/students.vue'


const routes = [
	{ path: "/", component: Students },
	{ path: "/student-info/:id", component: StudentInfo, props: true },
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

createApp(App).use(router).mount('#app');