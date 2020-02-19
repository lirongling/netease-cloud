//Component Object
Component({
    properties: {
        details: {
            type: Object,
            value: {},
        },
        name: {
            type: String,
            value: ''
        }

    },
    data: {
        activeNames: -1
    },
    methods: {
        onChange(event) {
            this.setData({
                activeNames: event.detail
            });
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