import api from "../../../http/api";
Component({
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

            let a = e.currentTarget.dataset.keyword
            this.triggerEvent('search', a)
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