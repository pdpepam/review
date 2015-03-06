define( ['Vendor',
         'Observer',
         'text!./popupTemplate.html'], function(  Vendor,
                                                  Observer,
                                                  Template){

    var _          = Vendor._,
        Backbone   = Vendor.backbone,
        SearchView;

    SearchView = Backbone.View.extend({

        Holders:{
            'titleHolder'   : '.modal-header-content',
            'contentHolder' : '.modal-body-content',
            'footerHolder'  : '.modal-footer-content'
        },

        initialize: function(){
           this.render()
        },

        render: function(){
            this.template = _.template(Template);
            this.view =this.template();
            this.$el.append(this.view);
            return this.$el;
        },

        _addTitleContent: function(el){
            $(this.Holders.titleHolder).html(el)
        },

        _addBodyContent: function(el){
            $(this.Holders.contentHolder).html(el)
        },

        _addFooterContent: function(el){
            $(this.Holders.footerHolder).html(el)
        },

        showPopup: function (obj){
            var title   = obj.title || '',
                content = obj.content || '',
                footer  = obj.footer || '';

            this._addTitleContent(title);
            this._addBodyContent(content);
            this._addFooterContent(footer);
        },

        close: function(){
            $('#myModal .close').trigger('click')
        }

    });

return SearchView;
});