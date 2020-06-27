const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  prompting() {
    const questions = [
      {
        type: "input",
        name: "title",
        message: "请输入项目名称：",
        default: this.appname,
      },
    ];
    return this.prompt(questions).then((answers) => {
      this.answers = answers;
    });
  }
  writing() {
    const html = this.templatePath("index.html");
    const css = this.templatePath("css/main.css");
    const js = this.templatePath("js/main.js");

    const htmlOut = this.destinationPath(this.answers.title + "/index.html");
    const cssOut = this.destinationPath(this.answers.title + "/css/main.css");
    const jsOut = this.destinationPath(this.answers.title + "/js/main.js");

    const context = this.answers;
    this.fs.copyTpl(html, htmlOut, context);
    this.fs.copyTpl(css, cssOut, context);
    this.fs.copyTpl(js, jsOut, context);
  }
};
