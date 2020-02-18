// component/index/indexTop/indexTop.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        value: '',
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onFocus() {
            this.triggerEvent('onfocus', true)
        }
    }
})