define( ['Vendor',
         'Observer',
         'text!./categoriesTemplate.html',
         './categoriesCollection',
         'components/categoris/category/categorieView'], function( Vendor,
                                                                   Observer,
                                                                   Template,
                                                                   Collection,
                                                                   ItemView){
    'use strict';

    var _          = Vendor._,
        $          = Vendor.$,
        Backbone   = Vendor.backbone,
        SearchView;

    SearchView = Backbone.View.extend({

        events:{
            'click button[data-category]':'showAllPhotos',
            'click a[data-purpose]':'showAll_'
        },

        collection: new Collection(),

        initialize: function(){
            this.listenTo(this.collection,'add', this.render);
            this.listenTo(this.collection,'reset', this.render);
            this.render()
        },

        render: function(){
            /*Define holders template*/
            var self = this;
            this.template = _.template(Template);
            this.view =this.template;
            this.$el.html(this.view);
            /*Print ellemtn from  city collection*/
            this.collection.each(function (model) {
                var itemView;
                itemView = new ItemView({model: model});
                self.$el.append(itemView.render());
            });
        },

        showAllPhotos: function(event){
           if($(event.target).attr('data-category')=='all'){
               Observer.trigger('selectAllCategories', this.collection)
           }

        },

        showAll_: function(e){
            var searchParam = $(e.target).attr('data-purpose');
            Observer.trigger("showAll_", searchParam);
        }
    });

    return SearchView;
});