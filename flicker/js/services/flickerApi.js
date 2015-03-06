define( ['Vendor',
         'Observer'], function( Vendor,
                                Observer) {

    var _ = Vendor._,
        $ = Vendor.$,
        Backbone = Vendor.backbone,
        FlickerAPi;

    FlickerAPi = Backbone.Model.extend({

       gettiingData :'',

       defaults:{
           flickerAPI: 'https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?'
       },

       url : '',

       setUrl: function(data){
           this.url = this.defaults.flickerAPI + data;
       } ,

       initialize: function (str){
         this.setUrl(str);
         this.sentRequest(str);
         this.promise = $.Deferred()

       },

       sentRequest: function(value){
           var self =this,
               flickrOptions;

           flickrOptions = {
               tags: value,
               format: "json"
           };

           function displayPhotos(data) {
              self.gettiingData = data;
              self.promise.resolve();
           }
           //this.model.fetch(
           //    console.log('eeeeee')
           //)
           $.getJSON(this.attributes.flickerAPI, flickrOptions, displayPhotos);

       }

    });

return FlickerAPi;
});



