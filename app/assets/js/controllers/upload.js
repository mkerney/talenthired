    app.controller('UploadController', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
    $scope.$watch('file', function () {
        if ($scope.file != null) {
            $scope.files = [$scope.file]; 
        }
    });
    $scope.log = '';

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              if (!file.$error) {
                Upload.upload({
                    url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                    data: {
                      username: $scope.username,
                      file: file  
                    }
                }).then(function (resp) {
                    $timeout(function() {
                        $scope.log = 'file: ' +
                        resp.config.data.file.name +
                        ', Response: ' + JSON.stringify(resp.data) +
                        '\n' + $scope.log;
                    });
                }, null, function (evt) {
                    var progressPercentage = parseInt(100.0 *
                    		evt.loaded / evt.total);
                    $scope.log = /*'progress: '*/ + progressPercentage + 
                    	'% ' + /* evt.config.data.file.name */+ '\n' + 
                      $scope.log ;
                });
              }
            }
        }
    };
}]);

/* 

app.controller('UploadController', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {

  $scope.fileReaderSupported = window.FileReader !== undefined && (window.FileAPI === undefined || FileAPI.html5 !== false);

  $scope.$watch('files', function () {
    $scope.upload($scope.files);
  });

  progressHandler = function(evt) {
    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
  };

  successHandler = function(data, status, headers, config) {
    console.log('file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data));
  };

  thumbHandler = function(file) {
    generateThumb(file);
  };

  generateThumb = function(file) {
    if (file !== undefined) {
      if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
        $timeout(function() {
          var fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = function(e) {
            $timeout(function() {
              file.dataUrl = e.target.result;
            });
          };
        });
      }
    }
  };

  $scope.upload = function (files) {
    if (files && files.length) {
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        Upload.upload({
          url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
          file: file
        })
        .progress(progressHandler)
        .success(successHandler);
      }
    }
  };

  $scope.$watch('files', function(files) {
    $scope.formUpload = false;
    if (files !== undefined && files !== null) {
      for (var i = 0; i < files.length; i++) {
        $scope.errorMsg = undefined;
        (thumbHandler)(files[i]);
      }
    }
  });

}]);

*/