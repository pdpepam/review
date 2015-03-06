define( ['Vendor',
         'Observer',
         'text!./helloTemplate.html'], function( Vendor,
                                                 Observer,
                                                 Template){

    var _          = Vendor._,
        Backbone   = Vendor.backbone,
        HelloView;

    HelloView = Backbone.View.extend({

        initialize: function(){
           this.render();
        },

        render: function(){
            this.template = _.template(Template);
            this.view =this.template();
            this.$el.html(this.view);
            return this.$el;
        },

        clear: function(){
        }

    });

return HelloView;
});