<!-- 个人中心 -->
<template>
	<view class="user">
		<block>
			<view class="header">
			  <view class="head-1">
			    <image :src="userInfo.face || '/static/images/missing-face.png'"></image>
			  </view>
			  <view class="head-2" v-if="userInfo.userId">
			    <view class="user-name">{{ userInfo.userName }}</view>
			  </view>
			  <view class="head-2" v-else>
			    <view class="user-name" bindtap="getUserProfile"  @click="getUserProfile()" v-trigger>登录/注册</view>
			  </view>
			</view>
		</block>
		
		<block>
			<view class='padding flex text-center text-grey bg-white shadow-warp-my'>
				<view class='flex flex-sub flex-direction solid-right'>
					<view class="text-xxl text-orange">0</view>
					<view class="margin-top-sm">我的书单</view>
				</view>
				<view class='flex flex-sub flex-direction solid-right'>
					<view class="text-xxl text-blue">0</view>
					<view class="margin-top-sm">我的活动</view>
				</view>
				<view class='flex flex-sub flex-direction'>
					<view class="text-xxl text-red">0</view>
					<view class="margin-top-sm">我的分享</view>
				</view>
			</view>


			<view class="cu-list card-menu margin-top-lg bg-white">
				<view class="flex-wrp flex-other">
<!-- 					<view class="flex-item">
						<text>消息中心</text>
						<view class="value"></view>
						<image src="@/static/images/icon-link.png"></image>
					</view> -->
<!-- 					<view @tap="feedBack" class="flex-item" data-type="意见">
						<text>意见反馈</text>
						<view class="value">留下您宝贵的意见</view>
						<image src="@/static/images/icon-link.png"></image>
					</view> -->
					<view @tap="about" class="flex-item">
						<text>关于我们</text>
						<view class="value">关于我们</view>
						<image src="@/static/images/icon-link.png"></image>
					</view>
					<view @tap="logout" class="flex-item">
						<text>退出</text>
						<view class="value">退出登录</view>
						<image src="@/static/images/icon-link.png"></image>
					</view>
				</view>

			</view>

		</block>

		<view style="height: 110rpx;width: 1rpx;"></view>

	</view>
</template>
<script>
	import { mpAutoLogin } from "@/api/connect.js";
	import { whetherNavigate } from "@/utils/Foundation"; //登录跳转
	import { getUserInfo } from "@/api/members";
	import { WxLogin } from "@/api/login.js";
	import { putUser } from "@/api/login.js";
	import storage from "@/utils/storage.js";
	export default {
		data() {
			return {
				userInfo: {},
			}
		},
		onLoad() {
			console.log("onLoad")
			this.userInfo = storage.getUserInfo();
			console.log(this.userInfo)
			location.reload()
			

		},
		onShow() {
			console.log("onShow")
			this.userInfo = storage.getUserInfo()
			console.log(this.userInfo)
		},
		onShareAppMessage(res) {
			console.log("onShareAppMessage")
			this.userInfo = storage.getUserInfo();
			console.log(this.userInfo)
		},
		mounted(needLogin) {
			console.log("mounted")
			this.userInfo = storage.getUserInfo();
			console.log(this.userInfo)
			if( needLogin === 1 ){
			 uni.navigateTo({
			 	url:'../login/login'
			 })
			
			}
		
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
			//获取userid
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
			 
		
	
			feedBack: function() {
				uni.navigateTo({
					url: '../me/feedback'
				})
			},
			logout: function() {
				uni.showModal({
					title: '提示',
					content: '确定要退出登录吗？',
					success: function (res) {
						if (res.confirm) {
							storage.removeUuid()
							storage.removeAccessToken()
							storage.removeRefreshToken()
							storage.removeUserInfo()
							storage.removeHasLogin()
							
							uni.redirectTo({
							    url: '/pages/index/tabbar'
							});
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				});
			},
			about() {
				uni.navigateTo({
					url: '../me/about'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user {
	  .header {
		max-width: 100%;
		padding: calc(50rpx + var(--status-bar-height)) 30rpx 0 6%;
		height: calc(var(--status-bar-height) + 360rpx);
		background-size: cover;
		border-bottom-left-radius: 30rpx;
		border-bottom-right-radius: 30rpx;
		background-position: bottom;
		background-repeat: no-repeat;
		background-color: #80C042;
		color: #ffffff;
		display: flex;
		justify-content: space-between;
		.head-1 {
		  text-align: center;
		  width: 152rpx;
		  position: relative;
		  display: flex;
		  align-items: center;
		  image {
			width: 152rpx;
			height: 144rpx;
			border-radius: 50%;
			margin-bottom: 30rpx;
			border: 3px solid #fff;
		  }
		  .edti-head {
			position: absolute;
			width: 40rpx;
			height: 40rpx;
			border-radius: 50%;
			background-color: rgba(255, 255, 255, 0.3);
			top: 100rpx;
			right: 0;
			image {
			  width: 100%;
			  height: 100%;
			}
		  }
		}
		.head-2 {
		  flex: 1;
		  margin-left: 30rpx;
		  margin-top: 100rpx;
		  line-height: 1;
		  .user-name{
			  font-size: 20px;
		  }
		}
		/deep/ .u-icon,
		.u-icon {
		  margin-top: 106rpx;
		}
	  }
	  .pointBox {
		width: 94%;
		margin: 0 3%;
		background: #fff;
		border-radius: 20rpx;
		box-shadow: 0 4rpx 24rpx 0 rgba($color: #f6f6f6, $alpha: 1);
	  }
	  .point {
		text-align: center;
		height: 160rpx;

		font-size: 16px;
		// #ifdef MP-WEIXIN
		padding: 24rpx;
		// #endif
		.u-col {
		  view {
			font-size: 28rpx;
		  }
		  view:last-child {
			margin-top: 8rpx;
		  }
		}
	  }
	  .order {
		height: 140rpx;
		text-align: center;
		font-size: 14px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 0 3%;
		color: #999;
		.order-item {
		  position: relative;
		  line-height: 2em;
		  width: 96rpx;
		  :first-child {
			font-size: 48rpx;
			margin-bottom: 10rpx;
		  }
		}
	  }
	}

	
	.flex-wrp {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding: 10rpx 0 20rpx;
	
		.t-item {
			
			position: relative;
			text-align: center;
			width: 25%;
			padding: 30rpx 0;
	
			image {
				width: 56rpx;
				height: 56rpx;
				display: block;
				margin: 0 auto;
			}
	
			text {
				font-size: 26rpx;
				color: #333;
				margin-top: 20rpx;
				display: block;
			}
			.contact{
				position: absolute;
				width: 100%;
				height: 120rpx;
				top:0;
				left:0;
				opacity: 0;
			}
		}
	}
	.flex-other {
		flex-direction: column;
		padding: 0;
		display: flex;
		align-items: center;
	
		.flex-item {
			position: relative;
			padding: 34rpx 26rpx;
			width: 100%;
			box-sizing: border-box;
			line-height: 42rpx;
			display: flex;
			align-items: center;
	
			text {
				font-size: 30rpx;
				color: #333837;
			}
	
			.value {
				font-size: 26rpx;
				color: #a0acaa;
				margin-left: auto;
			}
			
	
			image {
				width: 24rpx;
				height: 24rpx;
				margin-left: 8rpx;
			}
		}
	}

	// 头像
	.cu-avatar2 {
		font-variant: small-caps;
		margin: 0;
		padding: 0;
		display: inline-flex;
		text-align: center;
		justify-content: center;
		align-items: center;
		background: #ccc;
		color: #fff;
		white-space: nowrap;
		position: relative;
		width: 150rpx;
		height: 150rpx;
		background-size: cover;
		background-position: center;
		vertical-align: middle;
		font-size: 1.5em;
		z-index: 99;
	}

	.name {
		text-shadow: 2px 2px 1px #2f9bfe;
	}
</style>
