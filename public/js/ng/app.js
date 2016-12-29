var app = angular.module("postmenApp", ["ngMaterial"]);

app.factory('shipperAccountService', ['$http', function ($http) {
    var myShipperAccountService = {
        shipperAccounts: []
    };

    myShipperAccountService.get = function (id) {
        return $http.get('/shipperaccount/' + id).success(function (data) {
            angular.copy(data, myShipperAccountService.shipperAccounts);
        });
    }
    return myShipperAccountService;
}]);

app.controller('addShipperAccountDialog', [
    '$scope', '$mdDialog', '$http', 'shipperAccountService', function ($scope, $mdDialog, $http, shipperAccountService) {


        $scope.openAddDialog = function (ev) {
            $mdDialog.show({
                controller: "saveCtrl",
                templateUrl: 'views/ShipperAccountAddDialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen
            })
                .then(function (answer) {
                    $scope.inform_admin = true;
                }, function () {

                });


        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        }

        var refresh = function () {
            $http.get('/shipperaccounts').then(function (response) {
                $scope.shipperAccountList = response.data;
            });
        }

        $scope.remove = function (id) {
            $http.delete('/shipperaccount/' + id).then(function (response) {
                refresh();
            });

        }

        $scope.openEditDialog = function (id, ev) {
            $scope.shipperAccount = shipperAccountService.get(id);
            $mdDialog.show({
                controller: "updateCtrl",
                templateUrl: 'views/ShipperAccountUpdateDialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
                .then(function (answer) {
                    $scope.inform_admin = true;
                }, function () {

                });
        };


        refresh();
    }]);

app.controller('saveCtrl', [
    '$scope', '$mdDialog', '$http', 'shipperAccountService', function ($scope, $mdDialog, $http, shipperAccountService) {
        $scope.shipperAccount = '';

        $scope.save = function () {
            $http.post('/shipperaccount', $scope.shipperAccount).then(function (res) {
                $mdDialog.cancel();
                window.location.reload();
           });
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        }
    }]);

app.controller('updateCtrl', [
    '$scope', '$mdDialog', '$http', 'shipperAccountService', function ($scope, $mdDialog, $http, shipperAccountService) {
        $scope.shipperAccount = shipperAccountService.shipperAccounts;

        $scope.cancel = function () {
            $mdDialog.cancel();
        }

        $scope.update = function () {

            $scope.shipperAccounts = {
                slug:$scope.shipperAccount.slug,
                description:$scope.shipperAccount.description,
                timezone:$scope.shipperAccount.timezone,

                credentials:{
                    account_number:"******",
                    password:"******",
                    site_id:"******"
                },

                address:{
                    country:$scope.shipperAccount.address.country,
                    contact_name:$scope.shipperAccount.address.contact_name,
                    phone:$scope.shipperAccount.address.phone,
                    fax:$scope.shipperAccount.address.fax,
                    email:$scope.shipperAccount.address.email,
                    company_name:$scope.shipperAccount.address.company_name,
                    street1:$scope.shipperAccount.address.street1,
                    street2:$scope.shipperAccount.address.street2,
                    city:$scope.shipperAccount.address.city,
                    type:$scope.shipperAccount.address.type,
                    postal_code:$scope.shipperAccount.address.postal_code,
                    state:$scope.shipperAccount.address.state,
                    street3:$scope.shipperAccount.address.street3,
                    tax_id:$scope.shipperAccount.address.tax_id
                }
            }

            $http.put('/shipperaccount/'+$scope.shipperAccount._id, $scope.shipperAccounts).then(function (response) {
                $mdDialog.cancel();
                window.location.reload();
            });
        };

    }]);