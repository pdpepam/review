define( ['Vendor',
         'Observer',
         'text!./photoTemplate.html'], function(  Vendor,
                                                  Observer,
                                                  Template){

    var _          = Vendor._,
        Backbone   = Vendor.backbone,
        SearchView;

    SearchView = Backbone.View.extend({

        tagName:'a',

        className: 'photo-border',

        events:{
          //'click img':'showPopup'
        },

        initialize: function(){
            this.render();
            this.addUrl()
        },

        render: function(){
            this.template = _.template(Template);
            this.view =this.template(this.model.toJSON());
            this.$el.html(this.view);
            return this.$el;
        },

        addUrl:function(){
          var link=(this.model.toJSON()).link;
          $(this.tagName).attr('link', link).attr('rel',"gallery")
        },
        showPopup: function(){
            this.$el.attr('href','#myModal');
            this.$el.attr('data-toggle',"modal");
        }
    });

return SearchView;
});