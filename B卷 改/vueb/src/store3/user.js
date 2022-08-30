
import axios from 'axios'
import { del } from 'vue';
//抛出拆分模块对象
export default {
    namespaced: true,//设置模块的命名空间
    //拆分的数据值
    state: {
        selectList: [], //下拉菜单数据
        userList: [],//页面数据
        input: "",//搜索框双向数据绑定
        model: "", //select双向绑定
        dialogFormVisible:false,//模态框显示隐藏
        editForm:{},//定义编辑
        
        
    },
    mutations: {
        //添加mock数据
        add(state, data) { //data是参数，通过actions异步传过来的
            state.userList = data; //把数据赋值给state中的userList
            
        },
        //删除
        del(state, data) { //data是参数，页面中传递过来的index下标
            console.log(data)
            state.userList.splice(data, 1)
        },
        //搜索
        search(state) {
            console.log('测试') 
            //判断搜索框空格和搜索框不为空的情况下
            if (state.input.trim().length && state.model != '') {
                // var a = state.userCopy.filter(item => item.addres.includes(state.model));//这行代码写了会报错，无法解决
                //把state中的数据通过遍历筛选里面的名字是否包含在搜索框中
                state.userList = state.userList.filter(item => item.name.includes(state.input))
            }
        },
        //编辑
        edit(state, data) {
            state.dialogFormVisible = false;
            state.editForm={}
        },
        //回填
        editTwo(state, data) {
            console.log(111)
            state.dialogFormVisible = true;
            state.editForm=data
        },
        //关闭模态框
        off(state) {
            state.dialogFormVisible = false;
        },
        //单选
        dx(state) {
            console.log('凌晨几点了')
        },
        //全选or全不选
        checkAll(state,checked) {
            console.log('选中状态是:', checked);
            //修改选中状态即可
            state.userList.map(item => {
                item.checked = checked;
            })
        },
        //删除选中
        delMore(state) {
            console.log('删除选中');
            //通过遍历userList 返回每一个状态都为没选中，筛选出来赋值给arr
            let arr = state.userList.filter(item => {
                return item.checked == false;
            })
            state.userList=arr //把所有没选中的 重新赋值给数据，页面中就只显示没选中的，替换法
        }

    },
    actions: {
        //通过 axios 异步请求数据
        getUser(context) { //context是参数 用来给mutations中的data进行传参
            console.log('请求数据')
            axios.get('/parameter/query').then(res => {
                console.log(res, '请求到的页面数据')
                context.commit('add', res.data.data.list)//固定语法

            })
        }
    }
}