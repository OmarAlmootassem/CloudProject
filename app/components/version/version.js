'use strict';

angular.module('CloudApp.version', [
  'CloudApp.version.interpolate-filter',
  'CloudApp.version.version-directive'
])

.value('version', '0.1');
