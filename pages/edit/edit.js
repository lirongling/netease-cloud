import create from '../../utils/store/create'
import store from '../../store/index'
import api from "../../http/api"
import util from "../../utils/util"
import area from "../../assets/js/area";
create.Page(store, {
    use: ['userInfo'],
    /**
     * 页面的初始数据
     */
    data: {
        sexOption: [
            { text: '保密', value: 0 },
            { text: '男性', value: 1 },
            { text: '女性', value: 2 }
        ],
        nickname: null,
        sexValue: null,
        currentDate: new Date().getTime(),
        maxDate: new Date().getTime(),
        minDate: new Date('1980-01-01 00:00:00').getTime(),
        formatter(type, value) {
            if (type === 'year') {
                return `${value}年`;
            } else if (type === 'month') {
                return `${value}月`;
            }
            return value;
        },
        showPop: false,
        birthday: '',
        birthdays: null,
        city: '四川',
        showCity: false,
        areaList: area,
        province: null,
        citys: null,
        signature: null,
        areaValue: null,
    },
    changeName(e) {
        this.setData({
            nickname: e.detail
        })
    },
    changeSex(e) {
        this.setData({
            sexValue: e.detail
        })
    },
    onInput(event) {
        this.setData({
            currentDate: event.detail
        });
    },
    // 选择时间
    checkTime() {
        this.setData({
            showPop: true
        })
    },

    onClose() {
        this.setData({
            showPop: false
        })
    },
    // 确认日期
    confirmBirthday(e) {

        let a = e.detail
        this.setData({
            birthday: util.changeTime(a),
            birthdays: a,
            showPop: false
        })
    },
    getBirthday() {
        let a = store.data.userInfo.birthday
        if (a < 0) {
            this.setData({
                birthday: '暂未设置出生日'
            })
        } else {
            this.setData({
                birthday: util.changeTime(a)
            })
        }

    },
    onClose1() {
        this.setData({
            showCity: false
        })
    },
    // 选择城市
    checkCity() {
        this.setData({
            showCity: true
        })
    },
    confirmCity(e) {
        let a = e.detail.values
        let b = `${a[0].name}  ${a[1].name} `
        this.setData({
            showCity: false,
            city: b,
            province: a[0].code,
            citys: a[1].code,
        })
    },
    signatureBlur(e) {
        this.setData({
            signature: e.detail.value
        })
    },
    // 修改
    sure() {
        wx.showModal({
            title: '是否确认修改？',
            content: '',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
                if (result.confirm) {
                    let gender = this.data.sexValue
                    let birthday = this.data.birthdays
                    let nickname = this.data.nickname
                    let province = this.data.province
                    let city = this.data.citys
                    let signature = this.data.signature
                    this.updateUser(signature, city, nickname, birthday, province)
                }
            },
            fail: () => {},
            complete: () => {}
        });
    },
    updateUser(signature, city, nickname, birthday, province) {
        api.updateUser(signature, city, nickname, birthday, province).then(res => {
            console.log(res);
            wx.hideLoading();
            if (res.code === 200) {} else {

            }
        }).catch(err => {
            wx.hideLoading();
            wx.showToast({
                title: err.response.data.msg,
                icon: 'none',
            });
        })
    },
    getUser() {
        let a = store.data.userInfo.province
        let a1 = null
        let b = store.data.userInfo.city
        let b1 = null
        for (let i in area.province_list) {
            if (i == a) {
                a1 = area.province_list[i]
                break
            }
        }
        for (let i in area.city_list) {
            if (i == b) {

                b1 = area.city_list[i]
                break
            }
        }
        let c = `${a1} ${b1}`
        this.setData({
            nickname: store.data.userInfo.nickname,
            sexValue: store.data.userInfo.gender,
            birthdays: store.data.userInfo.birthday,
            province: store.data.userInfo.province,
            citys: store.data.userInfo.city,
            signature: store.data.userInfo.signature,
            areaList: area,
            areaValue: store.data.userInfo.city,
            city: c

        })

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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
        this.getBirthday()
        this.getUser()
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})