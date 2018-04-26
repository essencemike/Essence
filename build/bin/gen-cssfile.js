var fs = require('fs');
var path = require('path');
var Components = require('../../components.json');
var themes = [
  'theme-default',
];
Components = Object.keys(Components);

var basePath = path.resolve(__dirname, '../../src/');

function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (error) {
    return false;
  }
}

themes.forEach((theme) => {
  var isSCSS = theme !== 'theme-default';
  var indexContent = isSCSS ? '@import ""./base.scss";\n' : '@import "./base.css";\n';

  Components.forEach(function(key) {
    if (['icon', 'option', 'option-group'].indexOf(key) > -1) return;
    var fileName = key + (isSCSS ? '.scss' : '.css');
    indexContent += '@import "./' + fileName + '";\n';
    var filePath = path.resolve(basePath, theme, 'src', fileName);

    if (!fileExists(filePath)) {
      fs.writeFileSync(filePath, '', 'utf8');
      console.log(theme, '创建遗漏的 ', fileName, ' 文件');
    }
  });

  fs.writeFileSync(path.resolve(basePath, theme, 'src', isSCSS ? 'index.scss' : 'index.css'), indexContent);
});
