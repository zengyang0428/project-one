<template>
	<div>
		<el-tree :data="menus" show-checkbox node-key="name"
		ref="tree" :props="defaultProps">
		</el-tree>
		<el-butotn @click="Getselectednodes">通过node获取</el-butotn>
	</div>

</template>

<script>
export default {
	data() {
		return{
			menus: [],
			defaultProps: {
				label: 'name',
				children: 'children'
			}		
		}
	},
	created() {
		this.menus = [...this.$router.options.routes]
		// console.log(this.$router.options.routes);
		//权限管理和动态路由的思路
		//根据不同的用户登陆上来，返回对应的路由权限菜单
		//一般可以通过树形控件达到权限的精准控制，根据不同角色,勾选不同的菜单权限，将菜单数据提交到后端进行保存
		//后端保存之后，在用户进行登陆的时候会进行校验
		//动态添加路由使用 router.addRoute  addRoute(route: RouteConfig): () => void
		

	},
	methods: {
		Getselectednodes() {
			let arr = this.$refs.tree.Getselectednodes()
			console.log(arr);
		}
	}
}
</script>
<style>

</style>