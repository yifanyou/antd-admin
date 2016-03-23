require('babel-register')

const webpack = require('webpack');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('./webpack.config');

const isProduction = process.env.NODE_ENV === 'production';
const isDeveloping = !isProduction;

const app = express();

// Webpack developer
if (isDeveloping) {
  const compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

//  RESTful API
const publicPath = path.resolve(__dirname);
app.use(bodyParser.json({ type: 'application/json' }))
app.use(express.static(publicPath));

const port = isProduction ? (process.env.PORT || 80) : 3000;

// this is necessary to handle URL correctly since client uses Browser History
app.get('*', function (req, res){
  res.sendFile(path.resolve(__dirname, '', 'index.html'))
})

app.put('/api/login', function(req, res) {
  const credentials = req.body;
  if(credentials.user==='admin' && credentials.password==='123456'){
    res.cookie('uid', '1', {domain:'127.0.0.1'});
    res.json({'user': credentials.user, 'role': 'ADMIN', 'uid': 1});
  }else{
    res.status('500').send({'message' : 'Invalid user/password'});
  }
});

app.post('/api/menu', function(req, res) {
  res.json({
    menus: [
      {
        key: 1,
        name: '账号管理',
        icon: 'user',
        child: [
          {
            name: '账号管理',
            key: 101
          },
          {
            name: '角色管理',
            key: 102
          },
          {
            name: '权限管理',
            key: 103
          }
        ]
      },
      {
        key: 2,
        name: '用户管理',
        icon: 'user',
        child: [
          {
            name: '用户管理',
            key: 201
          }
        ]
      },
      {
        key: 3,
        name: '上线管理',
        icon: 'to-top',
        child: [
          {
            name: '已上线门店',
            key: 301
          },
          {
            name: '待上线门店',
            key: 302
          },
          {
            name: '已下线门店',
            key: 303
          }
        ]
      },
      {
        key: 4,
        name: '门店管理',
        icon: 'appstore-o',
        child: [
          {
            name: '门店管理',
            key: 401
          }
        ]
      },
      {
        key: 5,
        name: '美容师管理',
        icon: 'user',
        child: [
          {
            name: '美容师管理',
            key: 501
          },
          {
            name: '评价管理',
            key: 502
          },
          {
            name: '排班管理',
            key: 503
          },
          {
            name: '美容师简历',
            key: 504
          }
        ]
      },
      {
        key: 6,
        name: '项目管理',
        icon: 'appstore-o',
        child: [
          {
            name: '项目管理',
            key: 601
          },
          {
            name: '套餐管理',
            key: 602
          },
          {
            name: '类别管理',
            key: 603
          },
          {
            name: '系列维护',
            key: 604
          },
          {
            name: '服务专题管理',
            key: 605
          }
        ]
      },
      {
        key: 7,
        name: '订单管理',
        icon: 'appstore-o',
        child: [
          {
            name: '订单管理',
            key: 701
          },
          {
            name: '退款订单',
            key: 702
          }
        ]
      },
      {
        key: 8,
        name: '活动管理',
        icon: 'team',
        child: [
          {
            name: '折扣管理',
            key: 801
          },
          {
            name: '红包管理',
            key: 802
          }
        ]
      },
      {
        key: 9,
        name: '资金管理',
        icon: 'pay-circle-o',
        child: [
          {
            name: '退款申请',
            key: 901
          },
          {
            name: '提现申请',
            key: 902
          }
        ]
      },
      {
        key: 10,
        name: '客服系统',
        icon: 'phone',
        child: [
          {
            name: '问题列表',
            key: 1001
          },
          {
            name: '未解决问题',
            key: 1002
          }
        ]
      },
      {
        key: 11,
        name: '页面管理',
        icon: 'appstore-o',
        child: [
          {
            name: '图片管理',
            key: 1101
          },
          {
            name: '内容编辑',
            key: 1102
          }
        ]
      },
      {
        key: 12,
        name: '数据管理',
        icon: 'bar-chart',
        child: [
          {
            name: '订单数据',
            key: 1201
          },
          {
            name: '营收数据',
            key: 1202
          },
          {
            name: '流量数据',
            key: 1203
          }
        ]
      },
      {
        key: 13,
        name: '合同管理',
        icon: 'file-text',
        child: [
          {
            name: '合同审核',
            key: 1301
          },
          {
            name: '历史合同',
            key: 1302
          }
        ]
      },
      {
        key: 14,
        name: '消息推送',
        icon: 'message',
        child: [
          {
            name: '用户消息推送',
            key: 1401
          },
          {
            name: '美容师消息推送',
            key: 1402
          },
          {
            name: '店主消息推送',
            key: 1403
          }
        ]
      }
    ]
  });
});

app.post('/api/shop', function(req, res) {
  res.json({
    shops:[
      {
        id: '1',
        name: '日高美容（雅戈尔店）',
        brand: '日高',
        address: '工业园区雅戈尔国际中心1-103',
        isBonus:'0',
        isValid:'0'
      },
      {
        id: '2',
        name: '金莎美容东环店',
        brand: '金莎',
        address: '工业园区葑谊街东城世纪广场5幢205（东环路家乐福）',
        isBonus:'1',
        isValid:'1'
      },
      {
        id: '3',
        name: '爱丽微儿',
        brand: '',
        address: '木渎镇金枫国际1幢121室',
        isBonus:'1',
        isValid:'1'
      },
      {
        id: '4',
        name: '黛芙妮尔五行驻颜养生会所',
        brand: '',
        address: '新区何山路88-2号',
        isBonus:'1',
        isValid:'1'
      },
      {
        id: '5',
        name: '路易芬尼美容相城店',
        brand: '',
        address: '相城区采莲路康桥花园834号',
        isBonus:'1',
        isValid:'1'
      },
      {
        id: '6',
        name: '丽源',
        brand: '',
        address: '吴中区吴中西路90号',
        isBonus:'1',
        isValid:'1'
      },
      {
        id: '7',
        name: '吴际美容美发',
        brand: '吴际',
        address: '相城区元和街道合景峰汇商铺5幢109',
        isBonus:'1',
        isValid:'1'
      },
      {
        id: '8',
        name: '路易香浓养生馆',
        brand: '',
        address: '工业园区南谢雨街凤凰新天地40-112号',
        isBonus:'1',
        isValid:'1'
      },
      {
        id: '9',
        name: '美丽宝典美容中心',
        brand: '',
        address: '苏州市吴中区月苑街19号',
        isBonus:'1',
        isValid:'1'
      },
      {
        id: '10',
        name: '百莲凯美容美体',
        brand: '',
        address: '西湖区湖底公园1号',
        isBonus:'1',
        isValid:'1'
      },
      {
        id: '11',
        name: '名媛聚美容生活馆',
        brand: '',
        address: '姑苏区凤凰街123号',
        isBonus:'1',
        isValid:'1'
      },
    ]
  });
});

app.post('/api/my', function(req, res) {
  res.json({'user': 'admin', 'role': 'ADMIN', 'uid': 1});
});

app.post('/api/logout', function(req, res) {
  res.clearCookie('uid');
  res.json({'user': 'admin', 'role': 'ADMIN'});
});

app.listen(port, function (err, result) {
  if(err){
    console.log(err);
  }
  console.log('Server running on port ' + port);
});
