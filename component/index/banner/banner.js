import api from "../../../http/api";


//Component Object
Component({
    properties: {
        myProperty: {
            type: String,
            value: '',
            observer: function() {}
        },

    },
    data: {
        banners: [],

    },
    methods: {
        getBanners() {
            wx.showLoading({
                title: '加载中',
            });
            api.getBanners().then(res => {
                wx.hideLoading();
                if (res.code === 200) {
                    this.setData({
                        banners: res.banners
                    })
                }
            }).catch(err => {
                wx.hideLoading();
                console.log(err);
            })
        }
    },
    created: function() {

    },
    attached: function() {

    },
    ready: function() {
        this.getBanners()
    },
    moved: function() {

    },
    detached: function() {

    },
});