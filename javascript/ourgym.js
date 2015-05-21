/**
 * Created by doc on 12/05/15.
 */
angular.module('ppgym')
    .controller('locationCtrl', function ($scope, uiGmapGoogleMapApi) {
    $scope.map = null;
    uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = {
            center: {
                latitude: 37.663965,
                longitude: 14.836323
            },
            zoom: 17
        };
        $scope.marker = {
            id: 0,
            coords: {
                latitude: 37.663965,
                longitude: 14.836323
            },
            options: {
                title: 'PPGYM'
            }
        };
    });
    })
    .controller('ourgymCtrl', function ($scope) {
        $scope.myInterval = 5000;
        var slides = $scope.slides = [];
        $scope.addSlide = function() {
            var newWidth = 600 + slides.length + 1;
            slides.push({
                image: 'http://placekitten.com/' + newWidth + '/300',
                text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
                ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
            });
        };
        for (var i=0; i<4; i++) {
            $scope.addSlide();
        }
        $scope.videoOther = '971QMyhN3OQ'




    });