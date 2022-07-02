// 获取表格数据
import { getInfo } from '@/api/api'
export function getData(root) {
	   getInfo().then((res) => {
        console.log(res)
        if (res.data.status === 200) {
          root.tableData = res.data.data
          root.total = res.data.total
          root.tableData.forEach(item => {
            //尽量不用修改原数据
            item.sex === 1 ? item.sex_text = '女' : item.sex_text = '男'
          })
        }
      })
}
//新增和修改方法的封装
import qs from 'qs'
export function changeInfo(root,method,URL,form,callback){
	let data = qs.stringify(form)
	root.service[method](URL,data)
		.then(res => {
		if (res.data.status === 200) {
			callback(this)
			root.dialogFormVisible = false
			root.$message({ type: 'success', message: res.data.message })
		}
	})
}
// 作业列表获取表格数据方法封装
export function getTableData(root, url, params, arr) {
    root.service.get(url, { params: params || {} })
    .then(res => {
        if(res.data.status === 200) {
            root.tableData = res.data.data
            root.total = res.data.total
            root.tableData.map(item => {
                arr.map(aItem => [
                    item[aItem] ? item[aItem + '_text'] = '是' : item[aItem + '_text'] = '否'
                ])
            })
            root.loading = false
        }
    })
    .catch(err => {
        throw err
    })
}