angular.module('ppgym')
    .controller('instructorsCtrl', function ($scope,$http,$location, $routeParams, instructorsUrl, $resource) {
            $scope.slides=[];

            $scope.allInstructors = [];
            $http.get(instructorsUrl)
                    .success(function (data) {
                        $scope.allInstructors = data;
                        setCurrentInstructor();
                    });

            $scope.currentInstructor = null;
            var setCurrentInstructor = function () {
                if ($location.path().indexOf("/instructors/") == 0) {
                    var finded = false;
                    var id = $routeParams["id"];
                    for (var i = 0; i < $scope.allInstructors.length; i++) {
                        if ($scope.allInstructors[i].id == id) {
                            $scope.currentInstructor = $scope.allInstructors[i];
                            finded = true;
                            break;
                        }
                    }
                    if (!finded){
                        $location.path('/404');
                    }
                }
                for (var i=3; i>0; i--) {
                    $scope.slides.push({

                        image: 'http://ppgym.altervista.org/img/instructors/'+$scope.currentInstructor.id+'/'+i+'.jpg'

                    });
                }
            };






    });