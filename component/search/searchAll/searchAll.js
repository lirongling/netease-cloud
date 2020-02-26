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

        },
        changeActive(e){
          
             let a = e.currentTarget.dataset.index
            this.triggerEvent('active', a)
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