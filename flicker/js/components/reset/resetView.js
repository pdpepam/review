define( ['Vendor',
         'Observer',
         'text!./resetTemplate.html'], function( Vendor,
                                                 Observer,
                                                 Template){

    var _          = Vendor._,
        Backbone   = Vendor.backbone,
        ResetView;

    ResetView = Backbone.View.extend({

        tagName: 'photo-border',

        events:{
            'click .reset': 'reset'
        },

        initialize: function(){
           this.render()
        },

        render: function(){
            this.template = _.template(Template);
            this.view =this.template();
            this.$el.html(this.view);
            return this.$el;
        },

        reset: function(){
            Observer.trigger('reset');
        }
    });

return ResetView;
});