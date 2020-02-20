//Component Object
Component({
    properties: {
        disabled: {
            type: Boolean,
            value: false,
        },
        background: {
            type: String,
            value: "#fff"
        },
        color: {
            type: String,
            value: 'rgb(206, 46, 18)'
        },
        size: {
            type: String,
            value: ''
        },
        btnText: {
            type: String,
            value: '登录'
        }


    },
    data: {

    },
    methods: {
        click() {
            this.triggerEvent('clicks')
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