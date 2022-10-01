# API 接口文档

> 编写日期：2022-4-1
>
> 作者：Lucy
>
> 注意：
>
> 1. 以 /api 开头的请求路径不需要访问权限
> 2. 以 /my 开头的请求路径，需要在请求头中华携带 **Authorization**  身份认证字段，才能正常访问成功

## 请求根路径

### http://120.25.234.223:3007

---

## 接口

### 1. 用户注册

#### 请求路径

- `/api/reguser`

#### 请求方式 

-  POST

#### 请求体

| 参数名   | 必须 | 类型   | 说明   |
| -------- | ---- | ------ | ------ |
| username | 是   | string | 用户名 |
| password | 是   | string | 密码   |

#### 返回成功示例

```json
{
    "status": 200,
    "message": "注册成功",
    "data": {}
}
```

----

### 2. 用户登录

#### 请求路径

- `/api/login`

#### 请求方式 

-  POST

#### 请求体

| 参数名   | 必须 | 类型   | 说明   |
| -------- | ---- | ------ | ------ |
| username | 是   | string | 用户名 |
| password | 是   | string | 密码   |

#### 返回成功示例

```json
{
    "status": 200,
    "message": "登录成功",
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoibHVjeSIsInBhc3N3b3JkIjoiIiwiZW1haWwiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJwaWMiOiIiLCJpYXQiOjE2NDg4Njc5NTIsImV4cCI6MTY0ODg3MTU1Mn0.VzLBozIaCOaOYAe8HCF5P2IwowKpYR2akGpAFKWVq6I"
}
```

----

### 3. 获取用户的基本信息

#### 请求路径

- `/my/userinfo`

#### 请求方式 

-  GET

#### 请求头

| 参数名        | 必须 | 类型   | 说明         |
| ------------- | ---- | ------ | ------------ |
| Authorization | 是   | string | 身份认证字段 |

#### 请求体

| 参数名 | 必须 | 类型 | 说明 |
| ------ | ---- | ---- | :--- |
| 无     |      |      |      |

#### 返回成功示例

```json
{
    "status": 200,
    "message": "获取用户信息成功",
    "data": {
        "userid": 14,
        "username": "lucy",
        "email": null,
        "nickname": null,
        "pic": null
    }
}
```

----

### 4. 更新用户信息

#### 请求路径

- `/my/userinfo`

#### 请求方式 

-  POST

#### 请求头

| 参数名        | 必须 | 类型   | 说明         |
| ------------- | ---- | ------ | ------------ |
| Authorization | 是   | string | 身份认证字段 |

#### 请求体

| 参数名   | 必须 | 类型   | 说明     |
| -------- | ---- | ------ | -------- |
| nickname | 是   | string | 用户别名 |
| email    | 是   | string | 邮箱     |



#### 返回成功示例

```json
{
    "status": 200,
    "message": "修改成功",
    "data": {}
}
```

----

### 5. 重置密码

#### 请求路径

- `/my/updatepwd`

#### 请求方式 

-  POST

#### 请求头

| 参数名        | 必须 | 类型   | 说明         |
| ------------- | ---- | ------ | ------------ |
| Authorization | 是   | string | 身份认证字段 |

#### 请求体

| 参数名 | 必须 | 类型   | 说明   |
| ------ | ---- | ------ | ------ |
| oldPwd | 是   | string | 旧密码 |
| newPwd | 是   | string | 新密码 |

#### 返回成功示例

```json
{
    "status": 200,
    "message": "修改密码成功",
    "data": {}
}
```

----

### 6. 更新头像

#### 请求路径

- `/my/updateavatar`

#### 请求方式 

-  POST

#### 请求头

| 参数名        | 必须 | 类型   | 说明         |
| ------------- | ---- | ------ | ------------ |
| Authorization | 是   | string | 身份认证字段 |

#### 请求体

| 参数名 | 必须 | 类型   | 说明                        |
| ------ | ---- | ------ | :-------------------------- |
| avatar | 是   | string | 新头像，base64 格式的字符串 |

#### 返回成功示例

```json
{
    "status": 200,
    "message": "更新用户头像成功",
    "data": {}
}
```

----

### 7. 获取文章分类列表

#### 请求路径

- `/my/article/cates`

#### 请求方式 

- GET

#### 请求头

| 参数名        | 必须 | 类型   | 说明         |
| ------------- | ---- | ------ | ------------ |
| Authorization | 是   | string | 身份认证字段 |

#### 请求体

| 参数名 | 必须 | 类型 | 说明 |
| ------ | ---- | ---- | :--- |
| 无     |      |      |      |

#### 返回成功示例

```json
{
    "status": 200,
    "message": "获取数据分类列表成功",
    "data": [
        {
            "id": 6,
            "name": "Vue",
            "alias": "vue",
            "is_delete": 0
        },
        {
            "id": 7,
            "name": "JavaScript",
            "alias": "js",
            "is_delete": 0
        },
        {
            "id": 8,
            "name": "Nodejs",
            "alias": "node",
            "is_delete": 0
        }
    ]
}
```

----

### 8. 新增文章分类

#### 请求路径

- `/my/article/addcates`

#### 请求方式 

- POST

#### 请求头

| 参数名        | 必须 | 类型   | 说明         |
| ------------- | ---- | ------ | ------------ |
| Authorization | 是   | string | 身份认证字段 |

#### 请求体

| 参数名 | 必须 | 类型   | 说明     |
| ------ | ---- | ------ | :------- |
| name   | 是   | string | 分类名称 |
| alias  | 是   | string | 分类别名 |

#### 返回成功示例

```json
{
    "status": 200,
    "message": "新增文章分类成功",
    "data": {}
}
```

----

### 9. 根据文章分类 id 删除当前文章分类

#### 请求路径

- `/my/article/delartcate`

#### 请求方式 

- POST

#### 请求头

| 参数名        | 必须 | 类型   | 说明         |
| ------------- | ---- | ------ | ------------ |
| Authorization | 是   | string | 身份认证字段 |

#### 请求体

| 参数名 | 必须 | 类型   | 说明        |
| ------ | ---- | ------ | :---------- |
| Id     | 是   | string | 文章分类 id |

#### 返回成功示例

```json
{
    "status": 200,
    "message": "删除文章分类成功",
    "data": {}
}
```

----

### 10. 根据文章分类 id 查询当前文章分类信息

#### 请求路径

- `/my/article/cates/:id`

#### 请求方式 

- GET

#### 请求头

| 参数名        | 必须 | 类型   | 说明         |
| ------------- | ---- | ------ | ------------ |
| Authorization | 是   | string | 身份认证字段 |

#### 请求体

| 参数名 | 必须 | 类型 | 说明 |
| ------ | ---- | ---- | :--- |
| 无     |      |      |      |

#### 

#### 返回成功示例

```json
{
    "status": 200,
    "message": "查询文章分类信息成功",
    "data": {
        "id": 6,
        "name": "Vue",
        "alias": "vue",
        "is_delete": 0
    }
}}
```

----

### 11. 根据文章分类 id 更新当前文章分类信息

#### 请求路径

- `/my/article/updatecate`

#### 请求方式 

- POST

#### 请求头

| 参数名        | 必须 | 类型   | 说明         |
| ------------- | ---- | ------ | ------------ |
| Authorization | 是   | string | 身份认证字段 |

#### 请求体

| 参数名 | 必须 | 类型   | 说明             |
| ------ | ---- | ------ | :--------------- |
| Id     | 是   | string | 文章分类 id      |
| name   | 是   | string | 新的文章分类名称 |
| alias  | 是   | string | 新的文章分类别名 |

#### 返回成功示例

```json
{
    "status": 200,
    "message": "更新文章信息成功",
    "data": {}
}
```

----

### 12. 发布文章

#### 请求路径

- `/my/article/add`

#### 请求方式 

- GET

#### 请求头

| 参数名        | 必须 | 类型   | 说明         |
| ------------- | ---- | ------ | ------------ |
| Authorization | 是   | string | 身份认证字段 |

#### 请求体(Form-data)

| 参数名    | 必须 | 类型       | 说明                         |
| --------- | ---- | ---------- | :--------------------------- |
| title     | 是   | string     | 文章标题                     |
| cate_id   | 是   | int        | 所属分类 Id                  |
| content   | 是   | string     | 文章内容                     |
| cover_img | 是   | blob二进制 | 文章封面                     |
| state     | 是   | string     | 状态，可选值为：已发布、草稿 |

#### 返回成功示例

```json
{
    "status": 200,
    "message": "发布文章成功",
    "data": {
        "title": "new title",
        "cate_id": 6,
        "content": "new content",
        "state": "已发布",
        "cover_img": "/upload/ed0b366c2ccb43339d3e6394ecc45740",
        "pub_date": "2022-04-02T04:48:43.563Z",
        "author_id": 14,
        "authod_name": "lucy"
    }
}
```

----

### 