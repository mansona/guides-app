/* eslint-env node */
'use strict';

const gcloudProjectId = 'stone-circle-internal';

module.exports = function(deployTarget) {
  let ENV = {
    gcloudUrl: 'https://storage.googleapis.com',
    'gcloud-storage': {
      projectId: gcloudProjectId,
    },
    'gcs-index': {
      projectId: gcloudProjectId,
    },
    build: {}
    // include other plugin configuration that applies to all deploy targets here
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    // configure other plugins for production deploy target here

    const productionBucket = 'emberguides.stonecircle.io';

    ENV['gcloud-storage'].bucket = productionBucket;
    ENV['gcloud-storage'].filePattern = '**/*.{js,css,png,gif,ico,jpg,map,xml,txt,svg,swf,eot,ttf,woff,woff2,json}';
    ENV['gcs-index'].bucket = productionBucket;
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
