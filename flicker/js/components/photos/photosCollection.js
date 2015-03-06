define(['Vendor'],function(Vendor){
    
    'use strict';

    var _          = Vendor._,
        Backbone   = Vendor.backbone,
        CategorisCollection;

    CategorisCollection = Backbone.Collection.extend({
        sortParam  : '',
        sortMode   : 1,

       comparator: function(a, b){
            var a = a.get( this.sortParam ),
                b = b.get( this.sortParam );

            if ( a == b ) return 0;

            if ( this.sortMode == 1 ) {
                return a > b;
            } else {
                return a < b;
            }
       }
    });

 return CategorisCollection;
});