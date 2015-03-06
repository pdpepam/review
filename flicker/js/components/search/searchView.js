define( ['Vendor',
    'Observer',
    'services/flickerApi',
    './searchModel',
    'text!./searchTemplate.html'], function( Vendor,
                                             Observer,
                                             FlickerApi,
                                             SearchModel,
                                             Template){

    var _          = Vendor._,
        $          = Vendor.$,
        Backbone   = Vendor.backbone,
        SearchView;

    SearchView = Backbone.View.extend({

        Holders:{
            'searchInput' : '#search'
        },

        events: {
            'click    #search-submit' : 'createRequest',
            'keypress #search'        : 'inputSearch'
        },

        initialize: function(){
            this.render()
        },

        render: function(){
            this.template = _.template(Template);
            this.view =this.template;
            this.$el.html(this.view);
        },

        createRequest: function(){
            var value;
            value = this.$(this.Holders.searchInput).val();
            this.sentRequest(value);
        },

        sentRequest:function(value){
            var searchModel = new SearchModel({inputvalue:value});
            if(searchModel.isValid()){
                $('#search-form').removeClass('error')
            }else{
                $('search-form').addClass('error')
            }

        },

        //inputSearch: function(e){
        //    if(e.charCode == 13){
        //        var  value = $(e.target).val();
        //        this.sentRequest(value)
        //        console.log(this)
        //    }
        //},

        clear: function(){
            $(this.Holders.searchInput).val('');
        }
    });

    return SearchView;
});