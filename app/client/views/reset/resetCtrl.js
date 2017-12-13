angular.module('reg')
  .controller('ResetCtrl', [
    '$scope',
    '$stateParams',
    '$state',
    'AuthService',
    function($scope, $stateParams, $state, AuthService){
      var token = $stateParams.token;

      $scope.loading = true;

      $scope.changePassword = function(){
        var password = $scope.password;
        var confirm = $scope.confirm;

        if (password !== confirm){
          $scope.error = "¡Las contraseñas no coinciden!";
          $scope.confirm = "";
          return;
        }

        AuthService.resetPassword(
          token,
          $scope.password,
          function(message){
            sweetAlert({
              title: "¡Wuju!",
              text: "¡Tu contraseña ha sido actualizada!",
              type: "success",
              confirmButtonColor: "#e76482"
            }, function(){
              $state.go('login');
            });
          },
          function(data){
            $scope.error = data.message;
            $scope.loading = false;
          });
      };

    }]);