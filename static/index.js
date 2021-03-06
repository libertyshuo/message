document.getElementById('refresh').onclick = function(){location.reload();}

/**
 *  以下内容多摘自官方demo
 *
**/
wx.config({     //wx：jsSDK模块
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: appId, // 必填，公众号的唯一标识
    timestamp: timestamp, // 必填，生成签名的时间戳
    nonceStr: noncestr, // 必填，生成签名的随机串
    signature: signature,// 必填，签名，见附录1
    jsApiList: ['checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'translateVoice',
        'startRecord',
        'stopRecord',
        'onRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard'] // 必填，需要使用的JS接口列表，
});

wx.ready(function(){
  // 9 微信原生接口
  // 9.1.1 扫描二维码并返回结果
  // document.querySelector('#scanQRCode0').onclick = function () {
  //   wx.scanQRCode();
  // };

  $.extend({
    StandardPost:function(url,args){
        var form = $("<form method='post'></form>"),
            input;
        form.attr({"action":url});
        $.each(args,function(key,value){
            input = $("<input type='hidden'>");
            input.attr({"name":key});
            input.val(value);
            form.append(input);
        });
        form.submit();
    }
  });

  document.querySelector('#getNumber').onclick = function () {
    wx.getLocation({
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        var isAtPku = false;
        if (latitude>39.755 && latitude < 39.765 &&
          longitude>116.350 && longitude < 116.3554) {
          isAtPku = true;
        }
        var inputdata = {"userId": userId, "location": isAtPku};
        $.StandardPost("/location",inputdata);    //post请求到后端，$:jQuery，
      },
      cancel: function (res) {
        console.log(JSON.stringify(res));
        alert('用户拒绝授权获取地理位置');
      }
    });
    
  }
  document.querySelector('#QRCode').onclick = function (){
    $.get("QRCode");    //jQuery，get请求到后端，
  }
});

wx.error(function(res){
	JSON.stringify(res)
});
