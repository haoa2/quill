angular.module('reg')
  .controller('AdminUsersCtrl',[
    '$scope',
    '$state',
    '$stateParams',
    'UserService',
    function($scope, $state, $stateParams, UserService){

      $scope.pages = [];
      $scope.users = [];

      // Semantic-UI moves modal content into a dimmer at the top level.
      // While this is usually nice, it means that with our routing will generate
      // multiple modals if you change state. Kill the top level dimmer node on initial load
      // to prevent this.
      $('.ui.dimmer').remove();
      // Populate the size of the modal for when it appears, with an arbitrary user.
      $scope.selectedUser = {};
      $scope.selectedUser.sections = generateSections({status: '', confirmation: {
        dietaryRestrictions: []
      }, profile: ''});

      function updatePage(data){
        $scope.users = data.users;
        $scope.currentPage = data.page;
        $scope.pageSize = data.size;

        var p = [];
        for (var i = 0; i < data.totalPages; i++){
          p.push(i);
        }
        $scope.pages = p;
      }

      UserService
        .getPage($stateParams.page, $stateParams.size, $stateParams.query)
        .success(function(data){
          updatePage(data);
        });

      $scope.$watch('queryText', function(queryText){
        UserService
          .getPage($stateParams.page, $stateParams.size, queryText)
          .success(function(data){
            updatePage(data);
          });
      });

      $scope.goToPage = function(page){
        $state.go('app.admin.users', {
          page: page,
          size: $stateParams.size || 50
        });
      };

      $scope.goUser = function($event, user){
        $event.stopPropagation();

        $state.go('app.admin.user', {
          id: user._id
        });
      };

      $scope.toggleCheckIn = function($event, user, index) {
        $event.stopPropagation();

        if (!user.status.checkedIn){
          swal({
            title: "¡Whoa, espera un segundo!",
            text: "¡Estás a punto de registrar la llegada de " + user.profile.name + "!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Si, registra su llegada.",
            closeOnConfirm: false
            },
            function(){
              UserService
                .checkIn(user._id)
                .success(function(user){
                  $scope.users[index] = user;
                  swal("Aceptado", user.profile.name + ' ha registrado su llegada.', "success");
                });
            }
          );
        } else {
          UserService
            .checkOut(user._id)
            .success(function(user){
              $scope.users[index] = user;
              swal("Aceptado", user.profile.name + ' ha registrado su salida.', "success");
            });
        }
      };

      $scope.acceptUser = function($event, user, index) {
        $event.stopPropagation();

        swal({
          title: "¡Whoa, espera un segundo!",
          text: "¡Estás a punto de aceptar a " + user.profile.name + "!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Sí, acéptalo.",
          closeOnConfirm: false
          }, function(){

            swal({
              title: "¿Estás seguro?",
              text: "Se registrará con tu cuenta que aceptaste a este usuario. " +
                "Recuerda, este poder es un privilegio.",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Si, aceptar a este usuario.",
              closeOnConfirm: false
              }, function(){

                UserService
                  .admitUser(user._id)
                  .success(function(user){
                    $scope.users[index] = user;
                    swal("Aceptado", user.profile.name + ' ha sido admitido.', "success");
                  });

              });

          });

      };

      function formatTime(time){
        if (time) {
          return moment(time).format('MMMM Do YYYY, h:mm:ss a');
        }
      }

      $scope.rowClass = function(user) {
        if (user.admin){
          return 'admin';
        }
        if (user.status.confirmed) {
          return 'positive';
        }
        if (user.status.admitted && !user.status.confirmed) {
          return 'warning';
        }
      };

      function selectUser(user){
        $scope.selectedUser = user;
        $scope.selectedUser.sections = generateSections(user);
        $('.long.user.modal')
          .modal('show');
      }

      function generateSections(user){
        return [
          {
            name: 'Información Básica',
            fields: [
              {
                name: 'Creado',
                value: formatTime(user.timestamp)
              },{
                name: 'Última Actualización',
                value: formatTime(user.lastUpdated)
              },{
                name: 'Confirmar Antes De',
                value: formatTime(user.status.confirmBy) || 'N/A'
              },{
                name: 'Check In',
                value: formatTime(user.status.checkInTime) || 'N/A'
              },{
                name: 'Correo Electrónico',
                value: user.email
              },{
                name: 'Equipo',
                value: user.teamCode || 'None'
              }
            ]
          },{
            name: 'Perfil',
            fields: [
              {
                name: 'Nombre',
                value: user.profile.name
              },{
                name: 'Género',
                value: user.profile.gender
              },{
                name: 'Escuela',
                value: user.profile.school
              },{
                name: 'Año de Graduación',
                value: user.profile.graduationYear
              },{
                name: 'Descripción',
                value: user.profile.description
              },{
                name: 'Currículum',
                value: user.profile.essay
              }
            ]
          },{
            name: 'Confirmación',
            fields: [
              {
                name: 'Número de Teléfono',
                value: user.confirmation.phoneNumber
              },{
                name: 'Restricciones de Dieta',
                value: user.confirmation.dietaryRestrictions.join(', ')
              },{
                name: 'Tamaño de Playera',
                value: user.confirmation.shirtSize
              },{
                name: 'Carrera',
                value: user.confirmation.major
              },{
                name: 'Github',
                value: user.confirmation.github
              },{
                name: 'Página Web',
                value: user.confirmation.website
              },{
                name: 'Usará Hardware',
                value: user.confirmation.wantsHardware,
                type: 'boolean'
              },{
                name: 'Tipo de Hardware',
                value: user.confirmation.hardware
              }
            ]
          },{
            name: 'Estancia',
            fields: [
              {
                name: 'Se quedará el Viernes',
                value: user.confirmation.hostNeededFri,
                type: 'boolean'
              },{
                name: 'Se quedará el Sábado',
                value: user.confirmation.hostNeededSat,
                type: 'boolean'
              },{
                name: 'Neutral de Género',
                value: user.confirmation.genderNeutral,
                type: 'boolean'
              },{
                name: 'Amigable con Gatos',
                value: user.confirmation.catFriendly,
                type: 'boolean'
              },{
                name: 'Amigable con Fumadores',
                value: user.confirmation.smokingFriendly,
                type: 'boolean'
              },{
                name: 'Notas de Estancia',
                value: user.confirmation.hostNotes
              }
            ]
          },{
            name: 'Travel',
            fields: [
              {
                name: 'Needs Reimbursement',
                value: user.confirmation.needsReimbursement,
                type: 'boolean'
              },{
                name: 'Received Reimbursement',
                value: user.confirmation.needsReimbursement && user.status.reimbursementGiven
              },{
                name: 'Address',
                value: user.confirmation.address ? [
                  user.confirmation.address.line1,
                  user.confirmation.address.line2,
                  user.confirmation.address.city,
                  ',',
                  user.confirmation.address.state,
                  user.confirmation.address.zip,
                  ',',
                  user.confirmation.address.country,
                ].join(' ') : ''
              },{
                name: 'Additional Notes',
                value: user.confirmation.notes
              }
            ]
          }
        ];
      }

      $scope.selectUser = selectUser;

    }]);











































