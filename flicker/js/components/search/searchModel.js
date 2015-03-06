define(['Vendor',
    'Observer',
    'services/flickerApi'], function( Vendor,
                                      Observer,
                                      FlickerApi){

    var Backbone =Vendor.backbone,
        SearchModel;


    SearchModel = Backbone.Model.extend({
        defaults: {
        },

        validate: function(attrs){
            if(attrs.inputvalue.length != 0){
                var flickerApi = new FlickerApi(attrs.inputvalue);
                $.when(flickerApi.promise).done(function(){
                    Observer.trigger('getRequest', flickerApi.gettiingData);
                });
                return true;
            }
            else{
                return new Error('this field can\'ot be empty');
            }
        }
    });


    return SearchModel;
});