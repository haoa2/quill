angular.module('reg')
    .constant('EVENT_INFO', {
        NAME: 'Hackatón Ciudad 4.0',
    })
    .constant('DASHBOARD', {
        UNVERIFIED: 'Debiste haber recibido un correo electrónico pidiendo que verifiques tu correo electrónico. ¡Haz click en el link dentro del correo electrónico para que puedas continuar con tu aplicación!',
        INCOMPLETE_TITLE: '¡Necesitas completar tu registro!',
        INCOMPLETE: 'Si no completas tu registro antes del [APP_DEADLINE], no serás considerado para el evento.',
        SUBMITTED_TITLE: '¡Tu registro se ha subido satisfactoriamente!',
        SUBMITTED: 'Siéntete libre de editar tu registro en cualquier momento. Una vez cerrado el registro no podrás hacer ningún cambio a esta información.\nLas admisiones se darán en el orden de registro. ¡Asegúrate que tu información sea correcta antes de que se cierre el registro!',
        CLOSED_AND_INCOMPLETE_TITLE: 'Desafortunadamente, el registro ha terminado y han comenzado a repartirse las admisiones.',
        CLOSED_AND_INCOMPLETE: 'Debido a que no completaste tu perfil a tiempo, no serás elegible para una admisión al evento.',
        ADMITTED_AND_CAN_CONFIRM_TITLE: 'Debes confirmar tu asistencia antes del [CONFIRM_DEADLINE].',
        ADMITTED_AND_CANNOT_CONFIRM_TITLE: 'La fecha de confirmación [CONFIRM_DEADLINE] ya pasó.',
        ADMITTED_AND_CANNOT_CONFIRM: 'Aunque fuiste aceptado/aceptada, no completaste tu registro a tiempo.\nLamentablemente esto significa que no te será posible acceder al evento, esto debido a que hemos comenzado a asignar lugares a las personas en lista de espera.\n¡Esperamos verte el próximo año!',
        CONFIRMED_NOT_PAST_TITLE: 'Puedes editar tu información de confirmación hasta [CONFIRM_DEADLINE]',
        DECLINED: '¡Lamentamos que no puedas asistir al Hackatón Ciudad 4.0! :(\nNos vemos el próximo año.',
    })
    .constant('TEAM',{
        NO_TEAM_REG_CLOSED: 'El tiempo para asignación de equipos ha pasado.\nSin embargo aún puedes formar equipos o integrarte a otros durante el evento.',
    });
