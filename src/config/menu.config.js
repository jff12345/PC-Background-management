
export default
    [
        {
            label: "题库管理",
            name: "topicbank",
            children: [

                {
                    label: "JS题库",
                    name: "jsbank",
                    index: "/jsbank"
                },

            ],
            meta: {
                icon: "el-icon-setting",
            },
        },

        {
            label: "账号设置",
            name: "accountsetting",
            children: [
                {
                    label: "个人资料",
                    name: "information",
                    index: "/information",
                },
                {
                    label: "用户列表",
                    name: "usersList",
                    index: "/usersList",
                },
            ],
            meta: {
                icon: "el-icon-setting",
            },
        },
        {
            label: "角色管理",
            name: "roleview",
            children: [
                {
                    label: "角色管理",
                    name: "roleview",
                    index: "/roleview",
                },

                {
                    label: "权限配置",
                    name: "permissions",
                    index: "/permissions",
                },
            ],
            meta: {
                icon: "el-icon-setting",
            },
        },
        {
            label: "任务中心",
            name: "tasksystem",
            children: [
                {
                    label: "我的任务",
                    name: "task",
                    index: "/task",
                },
                {
                    label: "创建任务",
                    name: "createtask",
                    index: "/createtask",
                },
                {
                    label: "任务列表",
                    name: "listView",
                    index: "/listView",
                },
            ],
            meta: {
                icon: "el-icon-setting",
            },
        },
        {
            label: '其他',
            name: 'other',
            children: [
                {
                    label: "关于我们",
                    name: "aboutus",
                    index: "/about",
                },
            ],
            meta: {
                icon: "el-icon-eleme",
            },
        },

    ];