define( ['Vendor',
         'Observer',
         'text!./categorieTemplate.html'], function( Vendor,
                                                     Observer,
                                                     Template){
    'use strict';

    var _          = Vendor._,
        Backbone   = Vendor.backbone,
        SearchView;

    SearchView = Backbone.View.extend({


        className: 'item-category',

        events:{
            'click button' : 'getData'
        },

        initialize: function(){
           this.render();
        },

        render: function(){
            this.template = _.template(Template);
            this.view =this.template(this.model.toJSON());
            this.$el.html(this.view);
            return this.$el;
        },

        getData: function(){
            this.addSelector();
            Observer.trigger('selectCategory',this.model)
        },

        addSelector: function(){
             $('.item-category').children('button').removeClass('btn-success').addClass('active')
             $(this.$el).children('button').removeClass('active').addClass('btn-success')
        }
    });

    return SearchView;
});