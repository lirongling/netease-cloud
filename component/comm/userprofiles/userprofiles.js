// component/comm/userprofiles/userprofiles.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        userprofiles: {
            type: Array,
            value: ''
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        goDetails(e) {
            let id = e.currentTarget.dataset.id
            wx.navigateTo({
                url: `/pages/userDetails/userDetails?id=${id}`,

            });
        }
    }
})