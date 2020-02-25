//Component Object
Component({
    properties: {
        searchAll: {
            type: Object,
            value: {},

        },

    },
    data: {

    },
    methods: {
        keyword(e) {
            let a = e.detail
            this.triggerEvent('keyword', a)

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