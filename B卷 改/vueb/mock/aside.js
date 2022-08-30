let demoList = {
    status: 200,
    message: 'success',
    asideList: [
        {
            id: 1,
            name: '图书管理',
            title: '图书管理',
            path: '/books',
            icon:'el-icon-c-scale-to-original'
        },
        {
            id: 2,
            name: '后台管理',
            title: '后台管理',
            path: '/backstage',
            icon: 'el-icon-edit-outline'
        },
        {
            id: 3,
            name: '国际化',
            title: '国际化',
            path: '/international',
            icon: 'el-icon-s-flag'
        },
        {
            id: 4,
            name: '基础表格',
            title: '基础表格',
            path: '/table',
            icon: 'el-icon-s-grid'
        },
        {
            id: 5,
            name: 'tab选项卡',
            title: 'tab选项卡',
            path: '/tab',
            icon: 'el-icon-s-promotion'
        },
        {
            id: 6,
            name: "测试页面",
            title: "测试页面",
            path: "/t",
            icon:"el-icon-s-grid"
            
        },
        {
            id: 7,
            name: "tabs",
            title: "tabs",
            path: "/tabs",
            icon: "el-icon-s-grid"
        }
    ]
}
export default {
    'get|/parameter/asideList': (option) => {
        return {
            status: 200,
            message: 'success',
            data: demoList
        }
    }
}