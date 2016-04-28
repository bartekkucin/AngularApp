angular.module('app.component2').controller('SecondComponentController', function($scope, $http, $modal, books)
{
  'use strict';

      $scope.data = {
          helloWorld: 'hello world',
          form: {},
          books: []
      };


      $scope.addBook = function(){
          $scope.values = $scope.data.books;
          $scope.values.sort(function(x,y) {return y.id - x.id; });

          var modalInstance = $modal.open({
              templateUrl: '/component-2/modal-dialog-b/modal-dialog-b.tpl.html',
              controller: 'AddBookModalController',
              size: 'lg',
              resolve: {
                  lastBook: function(){
                      return $scope.values[0];
                  }
              }
          });

          modalInstance.result.then(function (selectedItem) {
              $scope.selected = selectedItem;

              $scope.addNewBook = function() {
                $scope.data.books.push($scope.selected)
              };
              $scope.addNewBook();
          });
          $scope.values.sort(function(x,y) {return x.id - y.id; });
      };

      $scope.openEditModal = function(){
          var modalInstance = $modal.open({
              templateUrl: '/component-2/modal-dialog-b/modal-dialog-b-edit.tpl.html',
              controller: 'EditBookModalController',
              size: 'lg',
              resolve: {
                  selectedBook: function(){
                      return $scope.data.books[$scope.selectedRowIndex];
                  }
              }
          });
          modalInstance.result.then(function (selectedItem) {
              $scope.selected = selectedItem;

              $scope.editBook = function() {
                $scope.data.books[$scope.selectedRowIndex] = $scope.selected;

              };
              $scope.editBook();
          });
      };

        $scope.selectRow = function(index){
            $scope.selectedRowIndex = index;
        };

        angular.copy(books.data, $scope.data.books);

    }).controller('AddBookModalController', function($scope, $modalInstance, $http, lastBook){
        'use strict';

        $scope.lastBook = lastBook;

        $scope.open = function($event) {
          $event.preventDefault();
          $event.stopPropagation();

          $scope.opened = true;
        };

        $scope.dateOptions = {
          'year-format': "'yyyy'",
          'starting-day': 1,
          'min-mode': "year"
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate', 'yyyy'];
        $scope.format = $scope.formats[3];

        $scope.submitForm = function() {

          if(!(angular.isDefined($scope.book.genre))) {
            $scope.book.genre = "";
          }
          if (!(angular.isDefined($scope.book.year))) {
            $scope.book.year = ""
          }
          $scope.book.version = 0;
          $scope.book.id = lastBook.id + 1;
          $scope.bookToRest = {
            id: lastBook.id + 1,
            title: $scope.book.title,
            authors: $scope.book.author,
            status: "FREE"
          };
          $scope.fixYear();
          $http.post('http://localhost:8080/webstore/books/addBook', $scope.bookToRest);
          $modalInstance.close($scope.book);
        };

        $scope.fixYear = function() {
          var dateToChop = new Date($scope.book.year);
          $scope.book.year = dateToChop.getFullYear();
        };

  }).controller('EditBookModalController', function($scope, $modalInstance, $http, selectedBook){
      'use strict';

       $scope.open = function($event) {
         $event.preventDefault();
         $event.stopPropagation();

         $scope.opened = true;
       };

       $scope.dateOptions = {
         'year-format': "'yyyy'",
         'starting-day': 1,
         'min-mode': "year"
       };

       $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate', 'yyyy'];
       $scope.format = $scope.formats[3];


        $scope.selectedBook = selectedBook;
        $scope.temp = angular.copy($scope.selectedBook);
        $scope.temp.year = new Date($scope.temp.year,1,1).getTime();

        $scope.fixYear = function() {
          var dateToChop = new Date($scope.temp.year);
          $scope.temp.year = dateToChop.getFullYear();
        };

      $scope.submitEditForm = function(){
        $scope.bookToRestPut = {
          id: $scope.temp.id,
          title: $scope.temp.title,
          authors: $scope.temp.author,
          status: "FREE"
        };
        $scope.fixYear();

        $http.put('http://localhost:8080/webstore/books/book/updateBook', $scope.bookToRestPut);
        $modalInstance.close($scope.temp);
        console.log($scope.temp);

      }
});
