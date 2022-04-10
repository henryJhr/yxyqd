<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">登录</block>
		</cu-custom>
		
		<view class="content">
			<view class="logo u-flex"><image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-weitao/0d8c04b0-a59d-11ea-b997-9918a5dda011.png"></image></view>
			<view class="name">{{projectName}}</view>
			<view class="summary u-flex" style="color: #000;"><text>为您提供优质服务,{{projectName}}需要获取以下信息</text></view>
			<view class="summary u-flex"><text>获取你的公开信息(昵称，头像，地区)</text></view>
			<view class="btn">
				<button style="color: #fff;background-color: #80C042;" type="primary" bindtap="getUserProfile" @click="getUserProfile()" class="btn-auth">使用微信授权</button>
			</view>
		</view>
	</view>
</template>

<script>
import { mpAutoLogin } from "@/api/connect.js";

import { whetherNavigate } from "@/utils/Foundation"; //登录跳转
import { getUserInfo } from "@/api/members";
import storage from "@/utils/storage.js";
import config from '@/config/config'
import { WxLogin } from "@/api/login.js";
import { putUser } from "@/api/login.js";
export default {
  data() {
    return {
      // 授权信息展示，名称
      projectName: config.name,
      //微信返回信息，用于揭秘信息，获取sessionkey
      code: "",
    };
  },

  //微信小程序进入页面，先获取code，否则几率出现code和后续交互数据不对应情况
  mounted() {
    // 小程序默认分享
    uni.showShareMenu({ withShareTicket: true });

    let that = this;
    //获取code
    uni.login({
      success: (res) => {
		  console.log(res.code)
		  that.code = res.code
      },
    });
  },
  methods: {
    /**
     * TODO 此方法不一定是最优解，如果有更好的办法请在  https://gitee.com/beijing_hongye_huicheng/lilishop/issues 中提出
     * 小程序返回bug
     * 1.介于微信登录是在login.vue的基础上作为判断跳转来
     * 所以在页面栈中会自动记录回退路径，所以导致每次微信小程序点击回退就会自动返回login页面
     * 当然login页面的判断就是 没有登录就会跳转到微信小程序页面 导致了无法回退到之前页面
     * 2.解决方法： 尝试在回退的时候判断地址，让回退多一级这样就避免了
     */
    //获取用户信息
   getUserProfile(e) {
   		  let that = this;
   		 
   		uni.login({
   			
   			success:function(res){
   				
   				WxLogin({configName:res.code}).then((res) => {
   						storage.setUuid(res.data.data.userid)
   						
   						
   				});
   				
   			}
   		});
   	
   	  // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
   	  uni.getUserProfile({
   	    desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
   	    success: (res) => {
   			console.log(res)
   		  this.userInfo = {userId:storage.getUuid(),userName:res.userInfo.nickName,face:res.userInfo.avatarUrl}
   		  
   		  storage.setUserInfo(this.userInfo);
   		  storage.setHasLogin(true);
   		  putUser({userName:res.userInfo.nickName,userAvatar:res.userInfo.avatarUrl,sex:res.userInfo.gender,id:storage.getUuid()}).then((res) => {
   		  
   		  		console.log(res)
   		  		
   		  });
		uni.redirectTo({
			url: '/pages/index/tabbar'
		});
   		
   	    },
   	    fail: (res) => {
   			uni.showToast({
   			    title: '登录失败，请重试',
   				icon: 'none',
   			    duration: 2000
   			});
   	    },
   	  });
   	  
   	console.log(storage.getUuid())
   	
   },
  },
};
</script>

<style lang="scss">
page {
	background: url('https://vkceyugu.cdn.bspapp.com/VKCEYUGU-weitao/50c93d50-a594-11ea-b997-9918a5dda011.png') no-repeat center / 100% 100%;
}
.content {
	margin-top: 200rpx;
	.logo {
		justify-content: center;
		image {
			width: 128rpx;
			height: 128rpx;
			border-radius: 64rpx;
		}
	}
	.name {
		margin-top: 20rpx;
		font-size: 32rpx;
		color: #333;
		font-weight: bold;
		text-align: center;
	}
	.summary {
		justify-content: center;
		margin-top: 40rpx;
		margin-bottom: 60rpx;
		padding: 0 54rpx;
		color: #999;
		// text-align: center;
		line-height: 48rpx;
		font-size: 28rpx;
		text {
			width: 100%;
		}
	}
	.btn {
		padding: 0 100rpx;
	}
}
</style>
