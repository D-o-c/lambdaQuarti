/**
 * Created by doc on 12/05/15.
 */
angular.module('ppgym')
    .controller('coursesCtrl', function ($scope, $http, $location, $routeParams, coursesUrl,
                                         categoriesUrl) {

        $scope.allCourses = [];
        $scope.allCategories = [];
        $scope.sort = 'name';$scope.myInterval = 5000;
        $scope.slides = [];

        $scope.nameOrdering = function(){
            return $scope.sort == 'name';
        };

        $http.get(coursesUrl)
            .success(function (data) {
                for (var i = 0; i < data.length; i++){
                    $scope.allCourses.push(data[i]);
                }
                setCurrentCourse();
            });

        $http.get(categoriesUrl)
            .success(function (data) {
                $scope.allCategories = data;
            });


        $scope.selectedCategory = null;
        $scope.categoryButtonText = 'Seleziona la categoria';

        $scope.selectCategory = function (id) {
            if ($scope.selectedCategory == id){
                $scope.selectedCategory = null;
                $scope.categoryButtonText = 'Seleziona la categoria';
            }
            else{
                $scope.selectedCategory = id;
                for (var i = 0; i<$scope.allCategories.length; i++){
                    if ($scope.allCategories[i].id == $scope.selectedCategory){
                        $scope.categoryButtonText = $scope.allCategories[i].name;
                        break;
                    }
                }
            }
        };

        $scope.isCategoryActive = function (category) {
            return category.id == $scope.selectedCategory;
        };

        $scope.currentCourse = null;
        var setCurrentCourse = function () {
            if ($location.path().indexOf("/courses/") == 0) {
                var found = false;
                var id = $routeParams["id"];
                for (var i = 0; i < $scope.allCourses.length; i++) {
                    if ($scope.allCourses[i].id == id) {
                        $scope.currentCourse = $scope.allCourses[i];
                        found = true;
                        for (var j=1; j<4; j++) {
                            $scope.slides.push({
                                image: 'http://ppgym.altervista.org/img/courses/' + $scope.currentCourse.id +
                                        '/' + j + '.jpg'

                            });
                        }
                        break;
                    }
                }
                if (!found){
                    $location.path('/404');
                }
            }
        };

        $scope.alert = null;

        $scope.signInCourse = function (cardNumber) {
            $scope.alert =  {
                type: 'success',
                msg: 'Complimenti ' + cardNumber +
                            '! Ti sei registrato con successo al corso di ' + $scope.currentCourse.name + '.'
            };
        };
    });