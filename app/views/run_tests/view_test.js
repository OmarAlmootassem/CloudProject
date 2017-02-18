'use strict';

describe('CloudApp.tests module', function() {

  beforeEach(module('myApp.view2'));

  describe('view2 controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var TestsCtrl = $controller('TestsCtrl');
      expect(TestsCtrl).toBeDefined();
    }));

  });
});