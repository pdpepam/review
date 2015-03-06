define('Vendor', ['./serviceVendor',
                  './libsVendor'],function(serviceVendor,
                                           libsVendor){

    'use strict';


    return {
        '$'         : libsVendor.$,
        '_'         : libsVendor._,
        'backbone'  : libsVendor.backbone,
        'services'  : serviceVendor
    };

});