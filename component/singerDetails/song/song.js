import api from "../../../http/api";
Component({
    properties: {
        hotSongs: {
            type: Array,
            value: [],

        },

    },
    data: {

    },
    methods: {
        playMusic(e) {
            let a = e.currentTarget.dataset.id
            this.getIsPlay(a)
        },
        getIsPlay(id) {
            wx.showLoading({
                title: '加载中',
            });
            api.getIsPlay(id).then(res => {
                wx.hideLoading();
                if (res.success) {
                    wx.showToast({
                        title: res.message,
                        icon: 'none',
                    });
                } else {
                    wx.showToast({
                        title: res.message,
                        icon: 'none',
                    });
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

    },
    moved: function() {

    },
    detached: function() {

    },
});