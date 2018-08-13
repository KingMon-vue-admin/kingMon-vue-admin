import Mock from 'mockjs'
import loginAPI from './login'
import articleAPI from './article'
import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)
// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)
Mock.mock(/\/ta\/aa/, 'post', {loads:{
    'authApp:addAuthApp':'/b/b'
}})
Mock.mock(/\/b\/b/, 'post', {title:'success'})
// 学生管理相关
Mock.mock(/\/student\/information/, 'post', [{name: '张三', schoolNumber: '201800001', sex: '男', examineeNumber: '考生号', schoolSystem: '三年制', grade: '2018级', classes: '1班', collegeName: '艺术学院', majorName: '美术', sfzh: '370910414141414', birthday: '1994-01-01', nation: '汉', zzmm: '团员', census: '城市', isTransferToSchoole: '是' },{name: '张三', schoolNumber: '201800001', sex: '男', examineeNumber: '考生号', schoolSystem: '三年制', grade: '2018级', classes: '1班', collegeName: '艺术学院', majorName: '美术', sfzh: '370910414141414', birthday: '1994-01-01', nation: '汉', zzmm: '团员', census: '城市', isTransferToSchoole: '是' }])
Mock.mock(/\/student\/hotel/, 'post', [{id: 1, hostelNumber: '1号', buildingNumber: '一号楼', floor: '一层', address: '暂无', status: '可用', createTime: '2018-01-01'},{id: 1, hostelNumber: '1号', buildingNumber: '一号楼', floor: '一层', address: '暂无', status: '可用', createTime: '2018-01-01'}])
Mock.mock(/\/student\/coming/, 'post', [{id: 1, mode: '火车', accompanyCount: '2人', arriveTime: '2018-08-31', carNumber: '123', stuId: '李华', schoolNumber: '201800001', grade: '2018级', collegeId: '信息工程学院', classesId: '1班', majorId: '计算机应用'},{id: 1, mode: '火车', accompanyCount: '2人', arriveTime: '2018-08-31', carNumber: '123', stuId: '李华', schoolNumber: '201800001', grade: '2018级', collegeId: '信息工程学院', classesId: '1班', majorId: '计算机应用'},{id: 1, mode: '火车', accompanyCount: '2人', arriveTime: '2018-08-31', carNumber: '123', stuId: '李华', schoolNumber: '201800001', grade: '2018级', collegeId: '信息工程学院', classesId: '1班', majorId: '计算机应用'}])
Mock.mock(/\/student\/clothing/, 'post', [{id: 1, stuId: '李华', schoolNumber: '2018000001', grade: '2018级', collegeId: '信息工程学院', classesId: '1班', majorId: '计算机应用', size: 'XL'},{id: 1, stuId: '李华', schoolNumber: '2018000001', grade: '2018级', collegeId: '信息工程学院', classesId: '1班', majorId: '计算机应用', size: 'XL'},{id: 1, stuId: '李华', schoolNumber: '2018000001', grade: '2018级', collegeId: '信息工程学院', classesId: '1班', majorId: '计算机应用', size: 'XL'}])
export default Mock
