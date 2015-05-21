/**
 * Created by doc on 11/05/15.
 */
angular.module('ppgym', ['ngRoute', 'uiGmapgoogle-maps', 'ui.bootstrap', 'ngTouch',
                'youtube-embed', 'ngResource',  'ngAnimate', 'ngSanitize', 'angularUtils.directives.dirPagination'])
    .constant('coursesUrl', 'http://ppgym.altervista.org/courses.php')
    .constant('categoriesUrl', 'http://ppgym.altervista.org/categories.php')
    .constant('instructorsUrl','http://ppgym.altervista.org/instructors.php')
    .config(function ($routeProvider){
        $routeProvider.when('/', {
            templateUrl: 'views/home.html'
        });
        $routeProvider.when('/location', {
            templateUrl: 'views/location.html',
            controller: 'locationCtrl'
        });
        $routeProvider.when('/ourgym', {
            templateUrl: 'views/ourgym.html',
            controller: 'ourgymCtrl'
        });

        $routeProvider.when('/courses', {
            templateUrl: 'views/courses.html',
            controller: 'coursesCtrl'
        });

        $routeProvider.when('/courses/:id', {
            templateUrl: 'views/singleCourse.html',
            controller: 'coursesCtrl'
        });

        $routeProvider.when('/instructors/:id', {
            templateUrl: 'views/instructor.html',
            controller: 'instructorsCtrl'
        });

        $routeProvider.otherwise({
            templateUrl: "views/404.html"
        });
    })
    .config(function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyCJep7anFiQcevrVevDqbnOctvL3PN2s0s',
            v: '3.17',
            libraries: 'weather,geometry,visualization'
        });
    })
    .config(function(paginationTemplateProvider) {
        paginationTemplateProvider.setPath('views/pagination.html');
    })
    .directive('numbersOnly', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    if (text) {
                        var transformedInput = text.replace(/[^0-9]/g, '');

                        if (transformedInput !== text) {
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                        }
                        return transformedInput;
                    }
                    return '';
                }
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    })
    .filter('courseByCategories', function() {
        return function(courses, category) {
            if (category == null){
                return courses;
            }
            var out = [];
            for (var i = 0; i < courses.length; i++){
                if(courses[i].cid == category)
                    out.push(courses[i]);
            }
            return out;
        };
    })
    .controller('homeCtrl', function($scope, $location){

        $scope.navCollapsed = true;

        $scope.invertNavCollapsed = function(){
            $scope.navCollapsed = !$scope.navCollapsed;
        };

        $scope.collapsedClass = function () {
            return !$scope.navCollapsed && 'in';
        };

        $scope.menu = [
            {name: 'La Palestra', url: '#/ourgym'},
            {name: 'Testimonianze', url: '#/testimonial'},
            {name: 'Orario Corsi', url: '#/schedule'},
            {name: 'Registrazione e Pagamenti', url: '#/registration'},
            {name: 'Corsi', url: '#/courses'},
            {name: 'Categorie', url: '#/categories'},
            {name: 'Stanze', url: '#/rooms'},
            {name: 'Istruttori', url: '#/instructors'}];

        $scope.isActive = function (item) {
            return ('#' + $location.path()).indexOf(item.url) == 0;
        };

    });