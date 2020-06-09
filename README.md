# xmind-homework
## 
### 服务端
语言：nodejs
框架：koa2
题目是基于csv类型的文件构建一个建议单记账本应用，因此以nodejs作为服务端语言对csv文件进行读写操作，以此达到数据的增删改查。
对于csv是有特殊格式的文件，所以nodejs模块中，针对此类文件开发了格式转方法以便于服务端接口与前端数据对接。
服务端目录及文件解释：
- ./resources：资源文件夹，内部存放题目中的原始文件，此文件夹可忽略
- ./db：存放csv文件，作为数据源使用 
- ./src/api/csv.js：api路由文件
- ./src/api/index.js：api路由入口
- ./src/api/response.js：响应数据的格式工厂，规范化api请求响应数据
- ./src/utils/csv.js：csv文件读写取工具
- ./www：客户端代码路径
- index.js：入口文件，作为nodejs的入口，引入koa、路由等。

### 客户端
框架：vue、element-ui、vue-element-admin
· 基于框架可以避免重复造轮子
· 请求拦截
· 模块化公共组件
· vuex状态管理公共的categories
· 增强用户体验的数据展示（根据账单类型以及数据正负统一成可读性高的数据，红色代表绝对收益，绿色代表绝对支出）
· 题目之外加上了数据的修改和数据删除，以达到微项目的完整性
客户端目录及文件解释：
- ./www/account-book-admin：客户端源代码路径
- ./www/account-book-admin/build：客户端构建代码配置目录
- ./www/account-book-admin/public：客户端源静态资源目录
- ./www/account-book-admin/src/api：客户端接口目录
- ./www/account-book-admin/src/assets：客户端资源目录
- ./www/account-book-admin/src/components：客户端源公共组件目录
- ./www/account-book-admin/src/icons：客户端公共组件iconSvg的静态svg文件存放目录
- ./www/account-book-admin/src/layout：客户端全局布局组件目录
- ./www/account-book-admin/src/router：客户端前端路由配置目录
- ./www/account-book-admin/src/store：客户端vuex全局状态管理目录
- ./www/account-book-admin/src/styles：客户端样式文件目录
- ./www/account-book-admin/src/views：客户端页面文件目录
- ./www/account-book-admin/src/App.vue：客户端vue组件入口文件
- ./www/account-book-admin/src/main.js：客户端入口
- ./www/account-book-admin/src/permission.js：客户端权限控制中心
- ./www/account-book-admin/src/setting.js：客户端全局配置文件


