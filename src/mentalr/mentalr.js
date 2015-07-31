angular.module('mentalr', [])
  .controller('MentalrController', ['$scope',
    function($scope) {

      var modalOptions = {
        keyboard: false,
        show: true
      };

      $scope.personas = [];

      //*** PERSONA FUNCTIONS ***//
      $scope.addPersona = function() {
        $scope.editorPersona = {};
        $scope.editorPersonaMode = 'new';
        $('#personaModal').modal(modalOptions);
      };

      $scope.editPersona = function(persona) {
        $scope.editorPersona = persona;
        $scope.editorPersonaMode = 'edit';
        $('#personaModal').modal(modalOptions);
      };

      $scope.deletePersona = function(persona) {
        $('#personaModal').modal('hide');
        if (confirm('Are you sure you want to delete this persona?')) {
          var index = $scope.personas.indexOf(persona);
          $scope.personas.splice(index, 1);
        }
      };

      $scope.savePersona = function(persona) {
        $('#personaModal').modal('hide');

        if ($scope.editorPersonaMode == 'new') {
          $.extend(true, persona, { verticals: [] });
          $scope.personas.push(persona);
        }
      };

      //*** CARD FUNCTIONS ***//
      $scope.addNeed = function(persona) {
        $scope.editorPersona = persona;
        $scope.editorCard = { color: 'white' };
        $scope.editorCardMode = 'new';
        $scope.editorCardType = 'need';
        $('#cardModal').modal(modalOptions);
      };

      $scope.addFeature = function(vertical) {
        $scope.editorVertical = vertical;
        $scope.editorCard = { color: 'black' };
        $scope.editorCardMode = 'new';
        $scope.editorCardType = 'feature';
        $('#cardModal').modal(modalOptions);
      };

      $scope.editNeed = function(card, vertical, persona) {
        $scope.editorCard = card;
        $scope.editorVertical = vertical;
        $scope.editorPersona = persona;
        $scope.editorCardMode = 'edit';
        $scope.editorCardType = 'need';
        $('#cardModal').modal(modalOptions);
      };

      $scope.editFeature = function(card, vertical) {
        $scope.editorCard = card;
        $scope.editorVertical = vertical;
        $scope.editorCardMode = 'edit';
        $scope.editorCardType = 'feature';
        $('#cardModal').modal(modalOptions);
      };

      $scope.saveCard = function(card) {
        $('#cardModal').modal('hide');

        if ($scope.editorCardMode == 'new') {
          if ($scope.editorCardType == 'need') {
            $scope.editorPersona.verticals.push({
              needs: [card],
              features: []
            });
          }
          else {
            $scope.editorVertical.features.push(card);
          }
        }
      };

      $scope.deleteCard = function(card) {
        $('#cardModal').modal('hide');
        if (confirm('Are you sure you want to delete this card?')) {
          if ($scope.editorCardType == 'need') {
            var verticalIndex = $scope.editorPersona.verticals.indexOf($scope.editorVertical);
            $scope.editorPersona.verticals.splice(verticalIndex, 1);
          }
          else {
            var featureIndex = $scope.editorVertical.features.indexOf(card);
            $scope.editorVertical.features.splice(featureIndex, 1);
          }
        }
      };

      $scope.reset = function() {
        if (confirm('Are you sure you want to clear the whole mental model?')) {
          $scope.personas = [];
        }
      };

      $scope.import = function() {
        $('#codeModal').modal(modalOptions);
        $scope.jsonSourceMode = 'import';
        $scope.jsonSource = '';
      };

      $scope.export = function() {
        $('#codeModal').modal(modalOptions);
        $scope.jsonSourceMode = 'export';
        $scope.jsonSource = JSON.stringify($scope.personas);
      };

      $scope.loadSource = function() {
        if (confirm('Importing JSON will overwrite any changes you\'ve made. Are you sure you want to import from JSON?')) {
          $scope.personas = JSON.parse($scope.jsonSource);
          $('#codeModal').modal('hide');
        }
      };

      $scope.personas = [
        { 
          label: 'Developers',
          verticals: [
            {
              needs: [
                {
                  label: 'Get Out of Bed',
                  weight: 60,
                  color: 'white',
                  description: 'It is difficult for developers to get out of bed, much less on time.'
                }
              ],
              features: [
                { 
                  label: 'Alarm Clock',
                  description: 'Create an alarm clock feature that will wake the developer up at a specified time.',
                  color: 'black'
                }
              ]
            },
            {
              needs: [
                {
                  label: 'Wash Up',
                  weight: 25,
                  color: 'white',
                  description: 'Developers are smelly.'
                }
              ],
              features: [
                { 
                  label: 'Soap',
                  description: 'Create soap to enable the shower feature.',
                  color: 'black'
                },
                {
                  label: 'Shower',
                  description: 'Create a shower feature so that developers can wash themselves.',
                  color: 'black'
                }
              ]
            },
            {
              needs: [
                {
                  label: 'Caffeine',
                  weight: 25,
                  color: 'white',
                  description: 'Developers need caffeine. Given it, they will turn it into code.'
                }
              ],
              features: [
                { 
                  label: 'Coffee',
                  description: 'Source coffee to use with the French press feature.',
                  color: 'black'
                },
                {
                  label: 'French Press',
                  description: 'Using coffee, will produce a caffeinated beverage for developers to consume.',
                  color: 'black'
                }
              ]
            }
          ]
        },
        { 
          label: 'Managers',
          verticals: [
            {
              needs: [
                {
                  label: 'Know What Developers are Doing',
                  weight: 75,
                  color: 'white',
                  description: 'Managers want to know what their developers are doing.'
                }
              ],
              features: [
                {
                  label: 'Code Education',
                  description: 'Good luck with this one...',
                  color: 'black'
                },
                {
                  label: 'Source Control Client',
                  description: 'Provide a source control client so that managers can review code.',
                  color: 'black'
                },
                {
                  label: 'Boredom',
                  description: 'Why else would anyone want to do this. User may provide this for themselves.',
                  color: 'black'
                }
              ]
            },
            {
              needs: [
                {
                  label: 'Exercise',
                  weight: 25,
                  color: 'white',
                  description: 'Managers need exercise to maintain their girlish figures.'
                }
              ],
              features: [
                {
                  label: 'Jogging Path',
                  description: 'The jogging path feature can be used by managers and others to exercise.',
                  color: 'black'
                }
              ]
            }
          ]
        }
      ];
    }
  ]);