'use strict';

const fs = require('fs-extra');
const path = require('path');

process.on('unhandledRejection', err => {
  console.log('unhandledRed' + err);
  throw err;  // fail instead of silently ignore exceptions  
});

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const paths = {
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
};
async function execute(pApplyRename) {
  console.error('build.js being executed (rename applied: ' + pApplyRename + ')');
  if (!pApplyRename) {
    await cleanBuildFolder();
  }
  copyPublicFolder();
  if (pApplyRename) {
    renameHtmlFilesInBuildFolder();
  }
}

if (process && process.argv && process.argv.length > 2) {
  execute(process.argv[2]);
} else {
  execute(false);
}

async function cleanBuildFolder() {
  console.log('clearing folder: ' + paths.appBuild);
  const dir = paths.appBuild;
  await fs.promises.rmdir(dir, {
    recursive: true
  })
  await fs.promises.mkdir(dir);
}

function copyPublicFolder(clearFolder) {
  console.log('copy public folder to build  (source: ' + paths.appPublic + ', destination: ' + paths.appBuild + ' )');
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    overwrite: false,
    filter: file => file !== paths.appHtml,
  });
}

function renameHtmlFilesInBuildFolder() {
  // rename index.html to app.html 
  console.log('rename build/index.html to build/app.html');
  fs.rename(paths.appBuild + '/' + 'index.html', paths.appBuild + '/' + 'app.html', function (err) {
    if (err) {
      console.log('ERROR: ' + err);
      throw err;
    } else {
      // rename buildIndex.html to index.html
      console.log('rename build/buildIndex.html to build/index.html');
      fs.rename(paths.appBuild + '/' + 'buildIndex.html', paths.appBuild + '/' + 'index.html', function (err) {
        if (err) {
          console.log('ERROR: ' + err);
          throw err;
        }
      });
    }
  });
}


