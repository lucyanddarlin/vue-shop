// 导入 mock
import Mock from 'mockjs'
// 导入数据
// 注意，json 文件不用对外暴露，webpack 会默认暴露
import banner from './banner.json'
import floor from './floor.json'

// 使用 Mock 编写模拟接口
Mock.mock('/mock/banner', {
    code: 200,
    data: banner
})

Mock.mock('/mock/floor', {
    code: 200,
    data: floor
})

// 此处不用对外暴露 但是要在 main.js 中使用一次
