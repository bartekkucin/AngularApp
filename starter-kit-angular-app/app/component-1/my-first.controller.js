angular.module('app.component1').controller('MyFirstController', function($scope, $http, $modal, books){
   'use strict';

    $scope.data = {
        helloWorld: 'hello world',
        form: {},
        books: []
    };

//    alert($scope.helloWorld);
//
//    myService.print();
//    myService2.print();


    $scope.edit = function(){
        $modal.open({
            templateUrl: '/component-1/modal-dialog/modal-dialog.tpl.html',
            controller: 'MyModalController',
            size: 'lg',
            resolve: {
                selectedBook: function(){
                    return $scope.data.books[$scope.selectedRowIndex];
                }
            }
        });
    };

       angular.copy(books.data, $scope.data.books);


    $scope.selectRow = function(index){
        $scope.selectedRowIndex = index;
    };

}).controller('MyModalController', function($scope, $modalInstance, selectedBook){
    'use strict';

    $scope.data = {
        selectedBook: {}
    };

    angular.copy(selectedBook, $scope.data.selectedBook);

    $scope.ok = function(){
        $modalInstance.close();
    };

})

    .service('myService', function(){
    'use strict';

    this.print = function(){
        alert('hello world from servce as service');
    }

}).factory('myService2', function(){
    var helloWorld = 'hello from service2 as factory';

    return {
        print: function(){
            alert(helloWorld);
        }
    };
});
