# 由于最近工作较忙，此题只做了简单地思路设想，没有实际完成

# 构建步骤

1. yarn init -y && yarn add grunt -D
2. 添加 gruntfile.js 文件
3. 编写 gruntfile.js
   1. 处理 html 文件//TODO
      1. 模板渲染
      2. 路径映射
      3. 文件压缩
   2. 处理 js 文件//TODO
      1. 使用 babel 对 js 文件进行转义
      2. 代码压缩
      3. 模块化
   3. 处理 css 文件：将 sass、less 等进行转换
   4. 处理 image、font：主要做压缩工作
   5. 清除文件：每次编译前涉及清除操作
   6. 其他文件：原样输出即可
   7. 开发服务器
      1. 监听文件变化，及时更新页面
      2. source-map 方便调试
   8. 组织个任务，形成开发和打包构建
4. package.json 中配置 scripts 的 dev 和 build 脚本定义的任务
5. 执行开发或构建
