import api from "../../http/api";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cat: 5001,
        initial: 'b',
        offset: 0,
        limit: 30,
        indexItems: 0,
        typeList: [{
                id: '5001',
                name: '入驻歌手',
                initial: []
            },
            {
                id: '1001',
                name: '华语男歌手',
                initial: ["热", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
            },
            {
                id: '1002',
                name: '华语女歌手',
                initial: ["热", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
            },
            {
                id: '1003',
                name: '华语组合/乐队',
                initial: ["热", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
            },
            {
                id: '2001',
                name: '欧美男歌手',
                initial: ["热", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
            },
            {
                id: '2002',
                name: '欧美女歌手',
                initial: ["热", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
            },
            {
                id: '2003',
                name: '欧美组合/乐队',
                initial: ["热", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
            },
            {
                id: '6001',
                name: '日本男歌手',
                initial: ["热", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
            },
            {
                id: '6002',
                name: '日本女歌手',
                initial: ["热", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
            },
            {
                id: '6003',
                name: '日本组合/乐队',
                initial: ["热", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
            },
            {
                id: '7001',
                name: '韩国男歌手',
                initial: ["热", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
            },
            {
                id: '7002',
                name: '韩国女歌手',
                initial: ["热", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
            },
            {
                id: '7003',
                name: '韩国组合/乐队',
                initial: ["热", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
            },
            {
                id: '4001',
                name: '其他男歌手',
                initial: ["热", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
            },
            {
                id: '4002',
                name: '其他女歌手',
                initial: ["热", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
            },
            {
                id: '4003',
                name: '其他组合/乐队',
                initial: ["热", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
            },
        ],
        artistsList: []
    },
    // getArtistList(cat, initial, offset, limit)
    getArtistList() {
        wx.showLoading({
            title: '加载中',
        });
        api.getArtistList(this.data.cat, this.data.initial, this.data.offset, this.data.limit).then(res => {
            wx.hideLoading();
            if (res.code === 200) {
                this.data.offset += 30
                this.data.artistsList = this.data.artistsList.concat(res.artists)
                this.setData({
                    artistsList: this.data.artistsList,
                    offset: this.data.offset
                })
            }
        }).catch(err => {
            wx.hideLoading();
            console.log(err);
        })
    },
    onClick(event) {
        let a = event.detail.index
        let b = this.data.typeList[a].id
        if (this.data.cat !== b) {
            this.setData({
                cat: b,
                initial: '',
                offset: 0,
                artistsList: []
            })
            this.getArtistList()
        }

    },
    goDetails(e) {
        let id = e.currentTarget.dataset.id
        let name = e.currentTarget.dataset.name
        wx.navigateTo({
            url: `/pages/singerDetails/singerDetails?id=${id}&name=${name}`,

        });
    },
    // 切换字母
    changeInitial(e) {
        let a = e.currentTarget.dataset.index
        if (this.data.indexItems !== a) {
            let b = this.data.typeList[1].initial[a]
            if (a === 0) {
                b = ''
            }
            this.setData({
                indexItems: a,
                initial: b,
                artistsList: []
            })
        }
        this.getArtistList()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.setNavigationBarTitle({
            title: '歌手',
        })
        this.getArtistList()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        wx.showLoading({
            title: '加载更多',

        });
        this.getArtistList()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})