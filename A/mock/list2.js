let demoList = {
    status: 200,
    message: 'success',
    data:[
        {
            id: '1',
            path: '/students',
            title: '学生管理',
            name: '学生管理'
        },
        {
            id: '2',
            path: '/teacher',
            title: '教师管理',
            name: '教师管理'
        },
        {
            id: '3',
            path: '/assistant',
            title: '助教管理',
            name: '助教管理'
        }
    ]
}

export default {
    'get|/parameter/list2': (option) => {
        return {
            status: 200,
            message: 'success',
            data: demoList
        }
    }
}