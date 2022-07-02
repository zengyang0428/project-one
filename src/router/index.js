import Vue from "vue";
import Router from "vue-router";
// import Home from '../components/Home.vue'

Vue.use(Router)
export default new Router({
	routes:[
		{
			path: '/',
			name: '首页',
			redirect: '/login',
			hidden: true,
			component: ()=>import('@/components/Login') //路由懒加载
		},
		{
			path : '/login',
			name: 'Login',
			hidden: true,
			component: ()=>import('@/components/Login') //路由懒加载
		},
		{
			path: '/Home',
			name: '学生管理',
			iconClass: 'fa fa-users',
			redirect:'/home/Student',
			component: () => import('@/components/Home'), 
			children: [
				{
					path: '/home/Student',
					name: '学生列表',
					iconClass: 'fa fa-list',
					component:()=>import('@/components/Students/StudentsList')
				},
				{
					path: '/home/work',
					name: '作业列表',
					iconClass: 'fa fa-list-ul',
					component:()=>import('@/components/Students/WorkList')
				},
				{
					path: '/home/infos',
					name: '信息管理',
					iconClass: 'fa fa-list-alt',
					component:()=>import('@/components/Students/infoLists')
				}
			]
		},
		{
			path: '/Home',
			name: '数据分析',
			iconClass: 'fa fa-bar-chart',
			component: () => import('@/components/Home'), 
			children: [
				{
					path: '/home/DataView',
					name: '数据概览',
					iconClass: 'fa fa-line-chart',
					component:()=>import('@/components/dataAnalysis/DataView')
				},
				{
					path: '/home/MapView',
					name: '地图预览',
					iconClass: 'fa fa-line-chart',
					component:()=>import('@/components/dataAnalysis/MapView')
				},
				{
					path: '/home/ScoreMap',
					name: '分数地图',
					iconClass: 'fa fa-line-chart',
					component:()=>import('@/components/dataAnalysis/ScoreMap')
				},
				{
					path: '/home/TravelMap',
					name: '旅游地图',
					iconClass: 'fa fa-line-chart',
					component: () => import('@/components/dataAnalysis/TravelMap')
				}
			]
		},
		{
			path: '/users',
			name: '用户中心',
			iconClass: 'fa fa-user',
			component: () => import('@/components/Home'), 
			children: [
				{
					path: '/users/user',
					name: '权限管理',
					iconClass: 'fa fa-user',
					component: () => import('@/components/users/User')
				}
			]
		},
		{
			path : '*',
			name: 'NotFound',
			hidden: true,
			component: ()=>import('@/components/NotFound') //
			
		}
	],
	mode:'history'
})



