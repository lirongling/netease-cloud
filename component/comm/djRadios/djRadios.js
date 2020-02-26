// component/comm/djRadios/djRadios.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        djRadios: {
            type: Array,
            value: []
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
goDetails(e){
 let a = e.currentTarget.dataset.id
  wx.navigateTo({
                      url: `/pages/djDetails/djDetails?id=${a}&number=${1}`,
                });
}
    }
})