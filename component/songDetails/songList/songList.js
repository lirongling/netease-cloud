import create from '../../../utils/store/create'
import store from '../../../store/index'
import song from '../../../utils/song'
const backSong = wx.getBackgroundAudioManager();
create.Component(store, {
    use: ['songsList', 'songDetails'],
    properties: {
        myProperty: {
            type: String,
            value: '',
            observer: function() {}
        },

    },
    data: {
        nowIdx: -1
    },
    methods: {
        delAll() {
            wx.showModal({
                title: '是否确认全部删除',
                content: '',
                showCancel: true,
                cancelText: '取消',
                cancelColor: '#000000',
                confirmText: '确定',
                confirmColor: '#3CC51F',
                success: (result) => {
                    if (result.confirm) {
                        this.store.data.songsList = []
                        song.clear()
                        backSong.stop()
                        wx.navigateBack({
                            delta: 1
                        })
                    }
                },
                fail: () => {},
                complete: () => {}
            });
        },
        play(e) {
            let index = e.currentTarget.dataset.index
            let item = e.currentTarget.dataset.item
            if (item.id !== store.data.songDetails[0].id) {
                this.setData({
                    nowIdx: index
                })
                song.getUrl(1, index)
                setTimeout(() => {
                    this.setData({
                        nowIdx: -1
                    }, 4000)
                })
            }
        },
        del(e) {
            let index = e.currentTarget.dataset.index
            let item = e.currentTarget.dataset.item
            this.store.data.songsList.splice(index, 1)
            if (this.store.data.songsList.length === 0) {
                song.clear()
                backSong.stop()
                wx.navigateBack({
                    delta: 1
                })
            } else if (item.id === store.data.songDetails[0].id) {
                song.getUrl(1)
            }
        }
    },
    created: function() {

    },
    attached: function() {

    },
    ready: function() {
        let a = wx.getStorageSync('songDetails')
    },
    moved: function() {

    },
    detached: function() {

    },
});