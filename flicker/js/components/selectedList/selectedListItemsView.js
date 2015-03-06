define( ['Vendor',
         'Observer',
         'text!./selectedListItems.html',
         './item/selectedListItemView',
         './selectedListItemsCollection'], function( Vendor,
                                             Observer,
                                             Template,
                                             ItemView,
                                             Collection) {

    var _ = Vendor._,
        Backbone = Vendor.backbone,
        ListItemsView;

    ListItemsView = Backbone.View.extend({

        tagName : 'ul',

        className : '.selected-list',

        collection : new Collection(),

        events:{
            'click li' : 'selectItem'
        },

        initialize: function () {
            this.render();
        },

        render: function () {
            /*Define holders template*/
            var self = this;
            this.template = _.template(Template);
            this.view = this.template;
            this.$el.html(this.view);
            /*Print ellemetns from  photos collection*/
            this.collection.each(function (model) {
                var itemView = new ItemView({model: model});
                self.$el.append(itemView.render());
            });

            return this.$el;
        },

        selectItem: function (e){
            var obj = {};

                obj.itemValue = $(e.target).html(),
                obj.type = $(e.target).attr('data-type');

            Observer.trigger('selectItem',obj)
        }

    });

    return ListItemsView;
});


