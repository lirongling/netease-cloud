import api from "../../../http/api";
import create from '../../../utils/store/create'
import store from '../../../store/index'
create.Component(store, {
    use: ['searchHistory'],
    properties: {
        myProperty: {
            type: String,
            value: '',
            observer: function() {}
        },

    },
    data: {
        hotDetails: []
    },
    methods: {
        hotSearch() {
            wx.showLoading({
                title: '加载中',
                mask: true,

            });
            api.hotSearch().then(res => {
                wx.hideLoading();
                if (res.code === 200) {
                    this.setData({
                        hotDetails: res.data
                    })
                }
            }).catch(err => {
                wx.hideLoading();
                console.log(err);
            })
        },
        search(e) {
            let a = ""
            if (e.currentTarget.dataset.keyword) {
                a = e.currentTarget.dataset.keyword
            } else {
                a = e.detail
            }

            this.triggerEvent('search', a)
        },
        del() {
            wx.showModal({
                title: '是否确认删除所以搜索历史？',
                content: '',
                showCancel: true,
                cancelText: '取消',
                cancelColor: '#000000',
                confirmText: '确定',
                confirmColor: '#3CC51F',
                success: (result) => {
                    if (result.confirm) {
                        this.store.data.searchHistory = []
                        wx.removeStorageSync('searchHistory');
                    }
                },
                fail: () => {},
                complete: () => {}
            });
        }
    },
    created: function() {

    },
    attached: function() {

    },
    ready: function() {
        this.hotSearch()
    },
    moved: function() {

    },
    detached: function() {

    },
});