var fs = require('fs');
var nodePath = require('path');

exports.check = function(marko, hotReload, expect) {
    var srcTemplatePath = nodePath.join(__dirname, 'template.html');
    var templateSrc = fs.readFileSync(srcTemplatePath, { encoding: 'utf8' });

    var tempTemplatePath = nodePath.join(__dirname, 'template.temp.html');
    fs.writeFileSync(tempTemplatePath, templateSrc, { encoding: 'utf8' });

    var template = marko.load(tempTemplatePath);

    expect(template.renderSync({ name: 'John' }).toString()).to.equal('Hello John!');

    fs.writeFileSync(tempTemplatePath, templateSrc + '!', { encoding: 'utf8' });

    expect(template.renderSync({ name: 'John' }).toString()).to.equal('Hello John!');

    hotReload.handleFileModified(tempTemplatePath, {
        extension: '.html'
    });

    expect(template.renderSync({ name: 'John' }).toString()).to.equal('Hello John!!');
};