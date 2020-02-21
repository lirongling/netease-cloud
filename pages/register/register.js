import create from '../../utils/store/create'
import store from '../../store/index'
// import Notify from '../../lib/vant/notify/notify';
import api from "../../http/api";
create.Page(store, {
    use: ['navHeight', 'navTop', 'navRight', 'windowHeight', 'navHeights'],
    /**
     * 页面的初始数据
     */
    data: {
        userphone: '',
        password: '',
        sms:'',
        username:'',
        disabled:true,
        passType: 'password',
        flagePhone: false,
        flagePass: false,
        flageName: false,
        flageSms: false,
        sendCode: "发送验证码"
    },
    showPass() {
        if (this.data.passType === 'password') {
            this.setData({
                passType: 'text'
            })
        } else {
            this.setData({
                passType: 'password'
            })
        }
    },
    // 手机号验证
    phoneBlur(e) {
        this.data.flagePhone = false;
      let a = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        let b = e.detail.value
        if (b.trim() === "") {
            // 警告通知
            wx.showToast({
              title: '手机号不能为空',
              icon: 'none',
            
            });
            // Notify({ type: "warning", message: "邮箱不能为空" });
            this.setData({
                flagePhone: false,

            })
        } else if (!a.test(b)) {
            // Notify({ type: "warning", message: "邮箱不合法" });
            wx.showToast({
              title: '手机号不合法',
              icon: 'none',
            
            });
            this.setData({
                flagePhone: false,
            })
        } else {
            this.setData({
                flagePhone: true,
                userphone: b
            })
        }
    },
    phoneInput(e) {
      let a =  /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
      let b =e.detail
      if (a.test(b)) {
       
        this.setData({
         disabled:false
        })
      } else {
        this.setData({
          disabled:true
         })
      }
    },
      // 发送验证码
      sendCodes() {
        // this.getCode()
        var count = 30;
        var timer = setInterval(() => {
          count--;
          if (count <= 0) {
            this.setData({
             sendCode : "重新获取",
            disabled : false
            })
            clearInterval(timer);
          } else {
            this.setData({
              sendCode : "已发送" + count,
             disabled : true
             })
          }
        }, 1000);
      },
    // 密码验证
    passBlur(e) {
        this.data.flagePass = false;
        let b = e.detail.value
        if (b.trim() === "") {
            // 警告通知
            // Notify({ type: "warning", message: "密码不能为空" });
            wx.showToast({
              title: '密码不能为空',
              icon: 'none',
            
            });
            this.setData({
                flagePass: false,
            })
        } else if (b.length < 6) {
            // Notify({ type: "warning", message: "密码不能小于6位" });
            wx.showToast({
              title: '密码不能小于6位',
              icon: 'none',
            
            });
            this.setData({
                flagePass: false,
            })
        } else {
            this.setData({
                flagePass: true,
                password: b
            })
        }
    },
    // 用户名验证
    nameBlur(e){
      this.data.flageName = false;
        let b = e.detail.value
        if (b.trim() === "") {
            // 警告通知
            // Notify({ type: "warning", message: "密码不能为空" });
            wx.showToast({
              title: '用户名不能为空',
              icon: 'none',
            
            });
            this.setData({
              flageName: false,
            })
        }else if(b.length<4){
          wx.showToast({
            title: '用户名至少为三个字符',
            icon: 'none',
          
          });
        }
        else {
          this.setData({
            flageName: true,
            username:b
          })
        } 
    },
    // 验证码
    smsBlur(e){
     this.setData({
      flageSms:false
     })
     let b = e.detail.value
     if (b.trim() === "") {
      // 警告通知
      // Notify({ type: "warning", message: "密码不能为空" });
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
      
      });
     
  }else if(String(b).length!==6&&String(b).length!==4){
    wx.showToast({
      title: '验证码为6位或4位',
      icon: 'none',
    });
  }
  else{
    this.setData({
      flageSms: true,
      sms:b
    })
  } 
    },
    sendCaptchas(){
      api.sendCaptcha(this.data.userphone).then(res => {
        console.log(res);
        wx.hideLoading();
        if (res.code === 200) {
          this.sendCodes()
            // this.setData({
            //     artistDetails: res
            // })
        } else {
        
        
        }
    }).catch(err => {
        wx.hideLoading();
        wx.showToast({
          title: err.response.message,
          icon: 'none',

      });
    })
    },
    sendCaptcha(){
      // checkTel
      api.checkTel( this.data.userphone).then(res => {
      
        wx.hideLoading();
        if (res.code === 200) {
          if( res.exist===1){
             wx.showToast({
               title: '改号码已被注册',
               icon: 'none',
               image: '',
               duration: 2000,
             });
          }else{
            this.sendCaptchas()
          }
        } 
    }).catch(err => {
        wx.hideLoading();
        wx.showToast({
          title: err.response.message,
          icon: 'none',

      });
    })
    },
    registers() {
        if (this.data.flagePass && this.data.flagePhone&&this.data.flageName&&this.data.flageSms) {
            wx.showLoading({
                title: '加载中',
            });
            let a = this.data.userphone
            let b = this.data.password
            let captcha=this.data.sms
            let phone=this.data.userphone
            let password=this.data.password
            let nickname=this.data.username
            api.register( phone, password,captcha,nickname).then(res => {
                    wx.hideLoading();
                    if (res.code === 200) {
                       wx.showToast({
                         title: '注册成功',
                         icon: 'success',
                         duration: 1500,
                  
                       });
                       wx.navigateTo({
                        url: '/pages/login/login'
                       });
                    } else {
                        wx.showToast({
                            title: res.message,
                            icon: 'none',
                        });
                    }
                }).catch(err => {
                    wx.hideLoading();
                    wx.showToast({
                      title: err.response.data.message,
                      icon: 'none',

                  });
                })
                // loginbyTel
        } else {
          wx.showToast({
            title: '请输入完整',
            icon: 'none',
          });
        }
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