define('main',[ 'Vendor',
                'Observer',
                'services/flickerApi',
                'components/auxiliaryComponents/hello/helloView',
                'components/auxiliaryComponents/Popup/popupView',
                'components/search/searchView',
                'components/categoris/categoriesView',
                'components/photos/photosView',
                'components/selectedList/selectedListItemsView',
                'components/reset/resetView'], function( Vendor,
                                                         Observer,
                                                         FlickerApi,
                                                         HelloView,
                                                         PopupView,
                                                         SearchView,
                                                         CategoriesView,
                                                         PhotosView,
                                                         SelectedListItemsView,
                                                         ResetView ){
    'use strict';

    var _ =Vendor._,
        Holders,
        popubView,
        helloView,
        searchView,
        categoriesView,
        photosView,
        selectedListItemsView,
        resetView;

    Holders = {
        'searchHolder'     : '._search',
        'categoriesHolder' : '._categories',
        'photosHolder'     : '._photos',
        'resetHolder'      : '._reset',
        'popupHolder'      : 'body'
    };

    searchView            = new SearchView({el:Holders.searchHolder});
    categoriesView        = new CategoriesView({el:Holders.categoriesHolder});
    photosView            = new PhotosView({el:Holders.photosHolder});
    resetView             = new ResetView({el:Holders.resetHolder});
    helloView             = new HelloView({el:Holders.photosHolder});
    popubView             = new PopupView({el:Holders.popupHolder});
    selectedListItemsView ;

    Observer.on('getRequest', getRequest);
    Observer.on('selectCategory', selectCategory);
    Observer.on('selectAllCategories', selectAllCategories);
    Observer.on('showAll_', showAll_);
    Observer.on('selectItem', selectItem)
    Observer.on('reset', reset);

    /**
     * Getting data from Flicker Api and adding category to the Components Categorries
     * @param { object} data
     */
    function getRequest(request){
        var gettingCategory =  _.last((request.title).split(' '));

        var categories = categoriesView.collection.pluck('categoryName');
        if(!_.contains(categories, gettingCategory)){
            helloView.clear();
            getPhotos(request);
            getCategory(request);
        }
    }

    function getCategory(data){
       var dataTitle,
           categoryName,
           link;

       dataTitle = data.title;
       categoryName = _.last(dataTitle.split(' '));
       link = data.link;
       categoriesView.collection.add({ 'categoryName': categoryName,
                                       link: link});
    }

    function getPhotos(data) {
        var items     = data.items,
            category = _.last(data.title.split(' '));


        _.forEach(items, function (item) {
            var link        = item.media.m,
                title       = item.title,
                published   = item.published,
                description = item.description,
                author      = ((item.author).split('(')[1]).split(')')[0];

            photosView.collection.add({
                'link'        : link,
                'title'       : title,
                'published'   : published,
                'description' : description,
                'category'    : category,
                'author'      : author
            });
        })
    }


    function selectCategory(model){
        var json = model.toJSON(),
            categoryName = json.categoryName;

        showPhoto(categoryName);
    }

    function showPhoto(categoryName){
        var selectedParametrs = photosView.collection.where({category: categoryName});

        photosView.selectedRender(selectedParametrs)
    }


    function selectAllCategories(){
        showAllPhotos()
    }

    function showAllPhotos(){
        photosView.render();
    }


    function showAll_(sort){

        selectedListItemsView = new SelectedListItemsView()
        var collection = photosView.collection;

        if(sort == 'all-title'){
            addingPopub('title', 'title', collection)
        }

        if(sort == 'all-authors'){
            addingPopub('author', 'author', collection)
        }

        function addingPopub(param, paramType, collection){
            var sortParam = param,
                jsonCollection = _.uniq(collection.pluck(sortParam)),
                BackboneCollection,
                selectedListCollection;

            BackboneCollection = Backbone.Collection.extend();

            selectedListCollection = new BackboneCollection();

            _.forEach(jsonCollection, function(item){
                selectedListCollection.add({'item' : item,
                    'paramType' : paramType})
            });

            selectedListItemsView.collection = selectedListCollection;

            popubView.showPopup({ 'title'     : param +'s',
                                  'content'   : selectedListItemsView.render()})

        }
    }

    function selectItem(obj){

        var itemValue = obj.itemValue,
            itemType  = obj.type;

        if(itemType =='author'){
            var selectedPhotos = photosView.collection.where({author:itemValue});
            photosView.selectedRender(selectedPhotos);
            popubView.close();
            var photosContainer=photosView.replaceImgContainerStyles('new-gallery-style');
            console.log(photosContainer)

        }

        if(itemType =='title'){
            var selectedPhotos = photosView.collection.where({title:itemValue});
            photosView.selectedRender(selectedPhotos);
            popubView.close()
            var photosContainer=photosView.replaceImgContainerStyles('new-gallery-style');
            console.log(photosContainer)
        }
    }

    /**
     * Remove all items in Component Photos and Component Categories
      */
    function reset(){
        categoriesView.collection.reset();
        photosView.collection.reset();
        searchView.clear();
        helloView   = new HelloView({el:Holders.photosHolder})
    }

});