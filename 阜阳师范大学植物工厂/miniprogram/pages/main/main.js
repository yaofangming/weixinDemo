// pages/main/main.js

// const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {       
       red_01:0,       blue_01:0,       sun_01:0,
       red_02:0,       blue_02:0,       sun_02:0,
       red_03:0,       blue_03:0,       sun_03:0,
       red_04:0,       blue_04:0,       sun_04:0,
       red_05:0,       blue_05:0,       sun_05:0,
       red_06:0,       blue_06:0,       sun_06:0,
       red_07:0,       blue_07:0,       sun_07:0,
   
    colors:[
      { red:"1号点空气湿度:", blue:"1号点空气温度:", sun:"1号点光照:"},
      { red:"2号点湿度：", blue:"2号点温度：", sun:"2号点光照："},
      { red:"3号点CO₂浓度：", blue:"4号点CO₂浓度：", sun:"5号点土壤温度："},
      { red:"5号点土壤温度：", blue:"5号点土壤水分：", sun:"5号点土壤电导率："},
      { red:"6号点土壤温度：", blue:"6号点土壤水分：", sun:"6号点土壤电导率："},
      { red:"7号点土壤PH：", blue:"8号点土壤PH：", sun:"9号点叶面湿度："},
      { red:"9号点_叶面温度：", blue:"10号点叶面湿度：", sun:"10号点叶面温度："}
    ],
    
  },

  updata:function()
  {
   
    
    var that=this
    wx.cloud.callFunction({
    name:"mysql",//指明云函数名
    
    
    success:function(res){
      console.log('ok阅读数据',res.result)//现在需要将数据都显示出来
          that.setData({            
            red_01:res.result[0].sdata.toFixed(1),       blue_01:res.result[1].sdata.toFixed(1),       sun_01:res.result[2].sdata.toFixed(0),
            red_02:res.result[3].sdata.toFixed(1),       blue_02:res.result[4].sdata.toFixed(1),       sun_02:res.result[5].sdata.toFixed(0),
            red_03:res.result[6].sdata.toFixed(0),       blue_03:res.result[7].sdata.toFixed(0),       sun_03:res.result[8].sdata.toFixed(1),
            red_04:res.result[9].sdata.toFixed(1),       blue_04:res.result[10].sdata.toFixed(1),       sun_04:res.result[11].sdata.toFixed(1),
            red_05:res.result[12].sdata.toFixed(1),       blue_05:res.result[13].sdata.toFixed(1),       sun_05:res.result[14].sdata.toFixed(1),
            red_06:res.result[15].sdata.toFixed(1),       blue_06:res.result[16].sdata.toFixed(1),       sun_06:res.result[17].sdata.toFixed(1),
            red_07:res.result[18].sdata.toFixed(1),       blue_07:res.result[19].sdata.toFixed(1),      
          })
          
        },
        fail:function(res){
          console.log("获取失败 ",res)
        }
        
        
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let that=this
    // // db.collection('Datas').get({
    // //     success:function(res){
    // //       console.log("获取成功",res)
    // setInterval(function () {
    //  // that.selectPageShufflingText();
    //   console.log("轮播请求1秒触发一次");
    //   that.login()
    // }, 500)
    this.login();
   //this.updata()
 
   

  },

  login: function(){
   
    var that = this
    wx.cloud.callFunction({
      name: 'queryDatabase',
      data: {
        host: "39.99.250.144",
        port: 3306,
        user: 'client',
        password: '0112',
        type:3,
        database:"easyiot",
        sql:"select * from color;"
      },
      success:function(res){
        console.log('ok阅读数据',res.result)//现在需要将数据都显示出来
            that.setData({            
              red_01:res.result[0].sdata.toFixed(1),       blue_01:res.result[1].sdata.toFixed(1),       sun_01:res.result[2].sdata.toFixed(0),
              red_02:res.result[3].sdata.toFixed(1),       blue_02:res.result[4].sdata.toFixed(1),       sun_02:res.result[5].sdata.toFixed(0),
              red_03:res.result[6].sdata.toFixed(0),       blue_03:res.result[7].sdata.toFixed(0),       sun_03:res.result[8].sdata.toFixed(1),
              red_04:res.result[9].sdata.toFixed(1),       blue_04:res.result[10].sdata.toFixed(1),       sun_04:res.result[11].sdata.toFixed(1),
              red_05:res.result[12].sdata.toFixed(1),       blue_05:res.result[13].sdata.toFixed(1),       sun_05:res.result[14].sdata.toFixed(1),
              red_06:res.result[15].sdata.toFixed(1),       blue_06:res.result[16].sdata.toFixed(1),       sun_06:res.result[17].sdata.toFixed(1),
              red_07:res.result[18].sdata.toFixed(1),       blue_07:res.result[19].sdata.toFixed(1),      
            })
            
          },
          fail:function(res){
            console.log("获取失败 ",res)
          }
    })
  }

})
