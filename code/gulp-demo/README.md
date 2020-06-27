# 步骤

1. 在 wrapper-gulp-hbt 中封装 gulp
   1. yarn init -y
   2. yarn add gulp
   3. 创建 lib/index.js，并将 package.json 中的 main 字段指向此文件
   4. 编写 index.js
      1. 读取配置合并配置
         1. 获取指令执行目录，读取该目录下的 wrapper-gulp-config.js 文件
         2. 将默认配置与项目配置进行合并
      2. 自动加载 gulp 包
         1. yarn add gulp-load-plugins
         2. const plugins = require("gulp-load-plugins")();
      3. 处理 html 文件
         1. yarn add gulp-swig
      4. 处理 css 文件
         1. yarn add gulp-sass
      5. 处理 js
         1. yarn add gulp-babel @babel/core @babel/preset-env
      6. 处理图片、字体
         1. yarn add gulp-imagemin
      7. 其他文件：原样输出
      8. 文件的删除
         1. yarn add del
      9. 文件的引用关系和压缩
         1. yarn add gulp-useref gulp-if gulp-uglify gulp-clean-css gulp-htmlmin
      10. 搭建开发服务器
          1. yarn add browser-sync
   5. 创建 bin/wrapper-gulp.js，并将 package.json 中的 bin 字段中定义指令指向该文件
   6. 编写 wrapper-gulp.js
      1. 添加脚本头
      2. 定义参数 cwd
      3. 定义参数 gulpfile
      4. 引入并运行 gulp
   7. 本地测试
      1. 注册到本地 yarn link && chmod 755
      2. 测试项目添加到依赖：yarn link wrapper-gulp-hbt
      3. 测试项目运行 wrapperGulpHbt build / yarn wrapper-gulp-hbt:dev
   8. 发布到 npm
      1. 在 package.json 中指定要发布的文件
      2. npm publish
2. 在 demo-remote 中使用 wrapper-gulp-hbt
   1. yarn add wrapper-gulp-hbt
   2. yarn wrapperGulpHbt dev

   yarn add gulp-if gulp-imagemin gulp-uglify gulp-useref