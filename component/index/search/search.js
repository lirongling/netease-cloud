import api from "../../../http/api";
import create from '../../../utils/store/create'
import store from '../../../store/index'
create.Component(store, {
    /**
     * 组件的属性列表
     */
    use: ['searchText'],
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {

        keyword: {},
        searchSuggest: [],
        isSuggest: false,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        back() {
            this.triggerEvent('show', false)
        },
        blur() {
            this.setData({
                isSuggest: !this.data.isSuggest
            })
        },
        // 获取默认关键字提醒
        searchDefault() {
            wx.showLoading({
                title: '加载中',
                mask: true,

            });
            api.searchDefault().then(res => {
                wx.hideLoading();
                if (res.code === 200) {
                    this.setData({
                        keyword: res.data
                    })
                }
            }).catch(err => {
                wx.hideLoading();
                console.log(err);
            })

        },
        // 输入框改变
        change(e) {
            let a = e.detail
            this.store.data.searchText = a
            this.setData({
                searchSuggest: []
            })
            if (a.trim().length > 0) {
                this.setData({
                    isSuggest: true
                })
                wx.showLoading({
                    title: '加载中',
                    mask: true,

                });
                api.searchSuggest(a).then(res => {
                    wx.hideLoading();
                    if (res.code === 200) {
                        console.log(res);
                        if (res.result.allMatch) {
                            this.setData({
                                searchSuggest: res.result.allMatch
                            })
                        } else {
                            wx.showToast({
                                title: res.msg,
                                icon: 'none',

                            });
                            this.setData({
                                searchSuggest: []
                            })
                        }
                    }
                }).catch(err => {
                    wx.hideLoading();
                    console.log(err);
                })
            }
        },
        search() {
            let a = store.data.searchText
            if (a.trim().length === 0) {
                a = this.data.keyword.realkeyword

            } else {
                a = store.data.searchText
            }
            this.triggerEvent('search', a)
        },
        searchs(e) {
            let a = e.currentTarget.dataset.keyword
            this.triggerEvent('search', a)
        }
    },
    created: function() {

    },
    attached: function() {
        this.searchDefault()

    },
    ready: function() {

    },
    moved: function() {

    },
    detached: function() {

    },
});