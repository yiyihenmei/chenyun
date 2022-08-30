let demoList = {
    status: 200,
    message: 'success',
    list: [
        {
            "checked":false,
            "id": 1,
            "name": "张三",
            "money": 123,
            "address": "广东省东莞市长安镇",
            "state": "成功",
            "date": "2019-11-1",
            "thumb": "https://lin-xin.gitee.io/images/post/wms.png"
        },
        {
            "checked":false,
            "id": 2,
            "name": "李四",
            "money": 456,
            "address": "广东省广州市白云区",
            "state": "成功",
            "date": "2019-10-11",
            "thumb": "https://lin-xin.gitee.io/images/post/node3.png"
        },
        {
            "checked":false,
            "id": 3,
            "name": "王五",
            "money": 789,
            "address": "湖南省长沙市",
            "state": "失败",
            "date": "2019-11-11",
            "thumb": "https://lin-xin.gitee.io/images/post/parcel.png"
        },
        {
            "checked":false,
            "id": 4,
            "name": "赵六",
            "money": 1011,
            "address": "福建省厦门市鼓浪屿",
            "state": "成功",
            "date": "2019-10-20",
            "thumb": "https://lin-xin.gitee.io/images/post/notice.png"
        },
        {
            "checked":false,
            "id": 5,
            "name": "孙悟空",
            "money": 1022,
            "address": "广东省东莞市松山湖",
            "state": "成功",
            "date": "2020-10-1",
            "thumb": "https://lin-xin.gitee.io/images/post/wms.png"
        },
        {
            "checked":false,
            "id": 6,
            "name": "猪八戒",
            "money": 1033,
            "address": "广东省广州市荔枝区",
            "state": "成功",
            "date": "2020-02-22",
            "thumb": "https://lin-xin.gitee.io/images/post/node3.png"
        }

    ]
}
export default{
    'get|/parameter/query':(option)=>{
        return{
            status:200,
            message:'success',
            data:demoList
        }
    }
}