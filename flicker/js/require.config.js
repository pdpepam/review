require.config({

    baseUrl: 'js',

    paths: {
        'text'     : 'libs/text',
        'jquery'   : 'libs/jquery-2.1.3',
        'lodash'   : 'libs/lodash',
        'backbone' : 'libs/backbone',
        'Observer' : 'observer',

        'jquery.fancybox' : '../etc/fancyapps-fancyBox-18d1712/source/jquery.fancybox',
        'jquery.fancyvox.pack' : '../etc/fancyapps-fancyBox-18d1712/source/jquery.fancybox.pack',

        'izotope' : '../etc/izotope/izotope'

    },

    shim: {

        'jquery'   : {
            exports: '$'
        },

        'lodash'   : {
            exports: '_'
        },

        'backbone' : {
            deps: [ 'lodash', 'jquery']
        },

        'jquery.fancybox':{
            deps: ['jquery.fancyvox.pack']
        }
    },

    map: {
        '*' : {
            'underscore': 'lodash'
        }
    },

    packages : ['Vendor']


});
