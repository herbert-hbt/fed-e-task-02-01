# 步骤

1. generator-web-hbt 
    1. yarn init -y
    2. 创建 app、component 目录
    3. 创建模板
    4. yarn add yeoman-generator
    5. 编写 app/index.js
        1. 继承 yeoman-generator
        2. 编写命令行
        3. 编写模板编译
    6. yarn link //本地测试
2. my-cli下
    1. yarn link generator-web-hbt
    2. yo web-hbt 
3. generator-web-hbt 
    1. npm publish
2. my-cli下
    1. yarn unlink generator-web-hbt 
    2. yarn add generator-web-hbt -D
    3. yo web-hbt
    
