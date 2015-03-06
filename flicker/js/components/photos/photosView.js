define( ['Vendor',
         'Observer',
         'text!./photosTemplate.html',
         '../photos/photo/photoView',
         './photosCollection',
         'jquery.fancybox',
         'izotope'], function( Vendor,
                               Observer,
                               Template,
                               ItemView,
                               Collection,
                               JqueryFancybox,
                               Izotope) {

    var _ = Vendor._,
        Backbone = Vendor.backbone,
        PhotosView;

    PhotosView = Backbone.View.extend({

        Holders: {
            'gallery'     : '#gallery',
            'toolbar'     : '.toolbar',
            'galleryItem' : '.photo-border'
        },

        collection: new Collection(),

        events: {
            'click form ul' : 'sortCollection',
            'click '        : 'izotopeShuffle'
        },

        initialize: function () {
            this.listenTo(this.collection, 'all', this.render);
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
                $('#gallery').append(itemView.render());
            });
            if(this.collection.length!=0){

                this.initFancyBox();
                this.initIzotope();
            }
        },

        selectedRender: function (data) {
            $('#gallery').empty();
            var self = this;
            this.template = _.template(Template);
            this.view = this.template;
            this.$el.html(this.view);
            /*Print ellemetns from  photos collection*/
            _.forEach(data, function (model) {
                var itemView = new ItemView({model: model});
                $('#gallery').append(itemView.render());
            });

            if(this.collection.length!=0){
                this.initFancyBox();
                this.initIzotope();
            }
        },

        initFancyBox: function(){
            var $funcyBoxItems = $('.photo-border');

            $($funcyBoxItems).fancybox({
                'transitionIn': 'elastic',
                'transitionOut': 'elastic',
                'speedIn': 400,
                'speedOut': 200,
                //'overlayShow': false,
                'cyclic': true,

                'width': '1500px',

                beforeShow: function(){
                    $('.photo-border').css('display','inline')
                },

                afterShow: function(){
                    $('.photo-border').css('display','inline')
                },

                afterClose: function(){
                    $('.photo-border').css('display','inline')
                },


                //beforeLoad: function(){
                //    $('.photo-border').css('display','inline')
                //}
            });
        },

        initIzotope: function(){
            var $container = $('#gallery'),
                isotope;

            $container.isotope({itemSelector : '.photo-border'});
            isotope = $container.data('isotope');

            this.addEventClasse = function addEvenClasses() {
                isotope.$filteredAtoms.each( function( i, elem ) {
                    $(elem)[ ( i % 2 ? 'addClass' : 'removeClass' ) ]('even')
                });
            };

            this.izotopeContainer = $container;
        },

        sortIzotope: function (e){
            var sortParam = $(e.target).attr('data-purpose'),
                categorys = _.uniq(this.collection.pluck('category')),
                categorysFilter = "'"+categorys.join(', ')+"'";

            if(sortParam == 'sort-category'){
                this.izotopeContainer.isotope('shuffle');
                this.addEventClasse()
            }
        },

        sortCollection: function (e) {
           var sortParam=$(e.target).attr('data-sort')
           if(sortParam=='title'){
               this.collection.sortParam='title';
               this.collection.sortMode = this.collection.sortMode * (-1);
               this.collection.sort('title');
           }
            if(sortParam=='published'){
                this.collection.sortParam='published';
                this.collection.sortMode = this.collection.sortMode * (-1);
                this.collection.sort();
            }
        },

        izotopeShuffle: function(e){
            if($(e.target).attr('data-purpose')=='shuffle'){
                this.izotopeContainer.isotope('shuffle');
                this.addEventClasse()
            }
        },

        getImagesContainer: function(){
            return this.Holders.gallery;
        },

        replaceImgContainerStyles: function(cl){
          var holder = this.Holders.galleryItem;
          $(holder).addClass(cl);
        }
    });

    return PhotosView;
});


