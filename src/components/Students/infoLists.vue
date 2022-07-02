<template>
	<div class="infoList">
		<el-form :inline="true" class="demo-form-inline" :model="formInline" size="small">
			<el-form-item label="姓名">
				<el-input placeholder="请输入姓名查询" v-model="formInline.name"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="query">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="Reset">重置</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="addStudent">新增</el-button>
			</el-form-item>
		</el-form>

		<el-table :data="compData" border style="width: 100%">
			<el-table-column prop="name" label="姓名" align="center">
			</el-table-column>
			<el-table-column prop="sex_text" label="性别" align="center">
			</el-table-column>
			<el-table-column prop="age" label="年龄" align="center">
			</el-table-column>
			<el-table-column prop="father" label="父亲" align="center">
			</el-table-column>
			<el-table-column prop="mather" label="母亲" align="center">
			</el-table-column>
			<el-table-column prop="address" label="家庭住址" align="center">
			</el-table-column>
			<el-table-column prop="time" label="入校时间" align="center">
			</el-table-column>
			<el-table-column prop="phone" label="联系方式" align="center">
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-button id="button1" type="danger" size="mini" icon="el-icon-edit" @click="edit(scope.row)">
					</el-button>
		  			<el-button id="button2" type="danger" size="mini" icon="el-icon-delete" @click= "del(scope. row)">
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
			:page-sizes="[5, 10, 20, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
			:total="total">
		</el-pagination>
		<el-dialog :title="state ? '添加学生信息' : '修改学生信息'" :visible.sync="dialogFormVisible" width="500px">
			<el-form :model="form" :rules="rules" ref="form">
				<el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
					<el-radio v-model="form.sex" label="1">男</el-radio>
					<el-radio v-model="form.sex" label="2">女</el-radio>
				</el-form-item>
				<el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
					<el-input v-model="form.age" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="父亲姓名" :label-width="formLabelWidth" prop="father">
					<el-input v-model="form.father" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="母亲姓名" :label-width="formLabelWidth" prop="mather">
					<el-input v-model="form.mather" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="家庭住址" :label-width="formLabelWidth" prop="address">
					<el-input v-model="form.address" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="入校时间" :label-width="formLabelWidth" prop="time">
					<el-date-picker v-model="form.time" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date"
						placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
					<el-input v-model="form.phone" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="closeInfo('form')">取 消</el-button>
				<el-button type="primary" @click="sure('form')">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import { getInfo, info, infoDel } from '@/api/api'

export default {
	data() {
		return {
			currentPage: 1, //当前页数
			pageSize: 10, //每页显示条数
			total: 0,//总条数
			tableData: [],
			dialogFormVisible: false,
			form: {
				name: "",
				sex: "1",
				age: "",
				father: "",
				mather: "",
				address: "",
				time: "",
				phone: "",
			},
			formLabelWidth: "80px",
			rules: {
				name: [{ required: true, message: '请输入姓名' }],
				sex: [{ required: true }],
				age: [{ required: true, message: '请输入年龄' }],
				address: [{ required: true, message: '请输入地址' }],
				time: [{ required: true, message: '请输入入学时间' }],
				phone: [{ required: true, message: '请输入联系方式' }]
			},
			state: true,
			formInline: {
				name: ''
			},
		
		};
	},
	computed: {
		compData() {
			return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
		}
	},
	created() {
		this.getData()
	},
	methods: {
		query() {
			this.tableData = this.tableData.filter(td => {
				console.log(this.formInline.name);
				return (td.name === this.formInline.name);
			});
		},
		Reset() {
			console.log(this.formInline)
			this.formInline = {}
			this.getData(this.formInline)
		},
		handleSizeChange(val) {
			this.pageSize = val
			this.currentPage = 1
		},
		handleCurrentChange(val) {
			this.currentPage = val
		},
		edit(row) {
			console.log(row)
			this.form = { ...row }
			this.state = false
			this.dialogFormVisible = true
		},
		closeInfo(form) {
			console.log(form)
			this.$refs[form].resetFields()
			this.dialogFormVisible = false
		},
		del(row) {
			infoDel(row.id).then(res => {
			if (res.data.status === 200) {
					this.getData()
					this.$message({ message: res.data.message, type: 'success' })
				}
			})
			
		},
		addStudent() {
			this.form = {
				name: "",
				sex: "1",
				age: "",
				father: "",
				mather: "",
				address: "",
				time: "",
				phone: "",
			}
			this.state = true
			this.dialogFormVisible = true
		},
		getData() {
			getInfo().then(res => {
				if (res.data.status === 200) {
					this.tableData = res.data.data
					this.total = res.data.total
					this.tableData.forEach(item => {
						//尽量不用修改原数据
						item.sex === 1 ? item.sex_text = '女' : item.sex_text = '男'
					})
				}
			})
		},
		sure(form) {
			this.$refs[form].validate(valid => {
				if (valid) {
					console.log(form, this.form)
					if (this.state) {
						info('post', this.form).then(res => {
							if (res.data.status === 200) {
								this.getData()
								this.dialogFormVisible = false
								this.$message({ type: 'success', message: res.data.message })
							}
						})
					} else {
						info('put', this.form).then(res => {
							if (res.data.status === 200) {
								this.getData()
								this.dialogFormVisible = false
								this.$message({ type: 'success', message: res.data.message })
							}
						})
					}
				}
			})
		}
		
	},
};
</script>
<style lang="scss">
.infoList {

	.demo-form-inline,
	.el-form-item {
		text-align: left;
	}
}
//修改
#button1{
	margin-left:-45px;
	top: 13px;
	position: relative;	
}
//删除
#button2 {
		margin-left: 41px;
		top: -15px;
		position: relative;
		}

</style>
