// component/comm/simquerys/simquerys.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        simquerys: {
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
        clickItem(e) {
            let a = e.currentTarget.dataset.keyword
            this.triggerEvent('keyword', a)
        }
    }
})