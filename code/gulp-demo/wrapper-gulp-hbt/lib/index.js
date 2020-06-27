const path = require("path");

const { src: getInput, dest, parallel, series, watch } = require("gulp");
const plugins = require("gulp-load-plugins")();
const del = require("del");
const browserSync = require("browser-sync");
const { use } = require("browser-sync");

//定义默认配置
let config = {
  data: {
    menus: [],
    pkg: null,
    date: new Date(),
  },
  build: {
    src: "src",
    dist: "dist",
    temp: "temp",
    public: "public",
    paths: {
      html: "*.html",
      js: "assets/scripts/*.js",
      css: "assets/styles/*.scss",
      images: "assets/images/**",
      fonts: "assets/fonts/**",
    },
  },
};
//获取配置
const cwd = process.cwd();
try {
  const inputConfig = require(path.join(cwd, "wrapper-gulp-config.js"));
  config = { ...config, ...inputConfig };
} catch (e) {}

const { src, dist, temp, public, paths } = config.build;
const { html, js, css, images, fonts } = paths;
const inputStreamConfig = {
  base: src,
  cwd: src,
};
// 处理html
const handleHtml = () => {
  return getInput(html, inputStreamConfig)
    .pipe(plugins.swig({ data: config.data, defaults: { cache: false } }))
    .pipe(dest(config.build.temp));
};

//处理css
const handleCss = () => {
  return getInput(css, inputStreamConfig)
    .pipe(plugins.sass({ outputStyle: "expanded" }))
    .pipe(dest(temp));
};

//处理js
const handleJs = () => {
  return getInput(js, inputStreamConfig)
    .pipe(plugins.babel({ presets: [require("@babel/preset-env")] }))
    .pipe(dest(temp));
};

//处理图片、字体
const image = () => {
  return getInput(images, inputStreamConfig)
    .pipe(plugins.imagemin())
    .pipe(dest(temp));
};
const font = () => {
  return getInput(fonts, inputStreamConfig)
    .pipe(plugins.imagemin())
    .pipe(dest(temp));
};

//其他文件，主要是指public下的文件
const other = () => {
  return getInput("**", {
    base: public,
    cwd: public,
  }).pipe(dest(dist));
};

//文件的删除
const clean = () => {
  return del([dist, temp]);
};

//文件的引用、压缩
const useref = () => {
  return getInput(html, {
    base: temp,
    cwd: temp,
  })
    .pipe(plugins.useref({ searchPath: [temp, "."] }))
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(
      plugins.if(
        /\.html$/,
        plugins.htmlmin({
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
        })
      )
    )
    .pipe(dest(dist));
};

//开发服务器相关
const bs = browserSync.create();
const serve = () => {
  watch(css, { cwd: src }, handleCss);
  watch(js, { cwd: src }, handleJs);
  watch(html, { cwd: src }, handleHtml);
  watch("**", { cwd: public }, bs.reload);
  watch([images, fonts, "public/**"], { cwd: src }, bs.reload);
  bs.init({
    notify: false,
    port: 4900,
    open: false,
    files: temp + "/**",
    server: {
      baseDir: [temp, dist, public],
      routes: {
        "/node_modules": "node_modules",
      },
    },
  });
};

const complile = parallel(handleHtml, handleCss, handleJs);

const build = series(
  clean,
  parallel(series(complile, useref), image, font, other)
);

const dev = series(complile, serve);

module.exports = {
  build,
  dev,
};
