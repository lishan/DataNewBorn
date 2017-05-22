'use strict';
/**
 * Token field directive
 */
angular.module('dataNewBorn').directive('tokenfield',[function() {
  return {
    restrict: 'E',
    templateUrl: 'views/directive/tokenfield.html',
    transclude: true,
    replace: true,
    scope: {
      ngModel: '='
    },
    link: function (scope, element, attrs) {
      let _findLabelTips = function(){
        let result = [];
        let inputs = JSON.parse(attrs.inputs);
        for(let i in inputs){
          result.push(inputs[i].label);
        }
        return [...result];
      };
      scope.bRequired = attrs !== undefined && attrs.required === 'true';
      let _bDisabled = attrs !== undefined && attrs.disabled === 'true';
      let $e = element.find('input');
      let token = {};
      // Add tips
      token = $e.tokenfield({
        autocomplete: {
          source: [],
          delay: 100
        },
        sortable: true,
      });
      attrs.$observe('inputs', () => {
        $e.data('bs.tokenfield').$input.autocomplete({source: _findLabelTips()});
      });
      //Disable duplicated keys
      $e.on('tokenfield:createtoken', function (event) {
        let existingTokens = $(this).tokenfield('getTokens');
        $.each(existingTokens, function(index, token) {
          if (token.value === event.attrs.value) {
            event.preventDefault();
          }
        });
      });
      scope.$watch('ngModel', function() {
        token.tokenfield('setTokens', scope.ngModel);
      });
      if(_bDisabled) {
        element.find("input.token-input").attr('disabled',true);
      }
      token.on('tokenfield:sorttoken', function(){
        scope.$apply(function(){
          let fields = token.tokenfield('getTokens');
          let results = "";
          if (fields.length > 0){
            results = fields[0].value;
          }
          for (let i = 1; i < fields.length; i++) {
            if(fields[i].value !== undefined && fields[i].value.trim() !== "") {
              results += "," + fields[i].value;
            }
          }
          scope.ngModel = results;
        });
      });
    }
  };
}]);

