---
title: 2018-11-12未命名文件 
tags: 新建,模板,小书匠
grammar_cjkRuby: true
---
# Node博客

### 路由设计



| 路径      | 方法 | get参数 | post参数                | 是否需要登录 | 备注         |     |
| --------- | ---- | ------- | ----------------------- | ------------ | ------------ | --- |
| /         | get  |         |                         |              | 渲染首页     |     |
| /register | get  |         |                         |              | 渲染注册页面 |     |
| /register | post |         | email,nickname,password |              |              |     |
| /login    | get  |         |                         |              | 渲染登录页面 |     |
| /login    | post |         | email,password          |              | 处理登录请求 |     |
| /logout   | get  |         |                         |              | 处理退出请求 |     |