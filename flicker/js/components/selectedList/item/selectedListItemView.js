define( ['Vendor',
         'Observer',
         'text!./selectedListItem.html'], function( Vendor,
                                            Observer,
                                            Template){

    var _          = Vendor._,
        Backbone   = Vendor.backbone,
        selectedListItemView;

    selectedListItemView = Backbone.View.extend({

        some: '',

        className : 'selected-list',

        events:{},

        initialize: function(){
           this.render();
        },

        render: function(){
            this.template = _.template(Template);
            this.view =this.template(this.model.toJSON());
            this.$el.html(this.view);
            return this.$el;
        }
    });

return selectedListItemView;
});