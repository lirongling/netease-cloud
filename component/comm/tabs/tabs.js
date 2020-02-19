import create from '../../../utils/store/create'
import store from '../../../store/index'
create.Component(store, {
    use: ['navHeight', 'navTop', 'navRight'],
    properties: {
        arr: {
            type: Array,
            value: [],
        },
        color: {
            type: String,
            value: ''
        },


    },
    data: {
        indexItem: 0,
    },
    methods: {
        clickItem(e) {
            var me = this;
            let a = 0
            var c = 0
            var h = store.data.navHeight + store.data.navTop
            var query = wx.createSelectorQuery().in(me);
            query.selectViewport().scrollOffset()

            wx.createSelectorQuery().selectViewport().scrollOffset(function(res) {
                // res.id // 节点的ID
                // res.dataset // 节点的dataset
                // res.scrollLeft // 节点的水平滚动位置
                // res.scrollTop // 节点的竖直滚动位置
                c = res.scrollTop

            }).exec()
            query.select('#box-tabs').boundingClientRect(function(res) {
                a = res.top
            }).exec()
            if (c <= a) {
                a = 0
            } else {
                a = c - a - h
                query.exec(function(res) {

                    wx.pageScrollTo({
                        scrollTop: a,
                        duration: 300
                    });

                });
            }

            // let query = wx.createSelectorQuery()
            // console.log(query.select('#index-nav').scrollTop);
            // console.log(wx.pageScrollTo);
            this.setData({
                indexItem: e.currentTarget.dataset.index
            })
            this.triggerEvent('send', e.currentTarget.dataset.index)

        },
    },
    onPageScroll(e) {
        console.log(e);
    },
    created: function() {

    },
    attached: function() {

    },
    ready: function() {

    },
    moved: function() {

    },
    detached: function() {

    },
});