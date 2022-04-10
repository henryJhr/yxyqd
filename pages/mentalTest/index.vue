<!-- 心灵测评 -->
<template>
	<view class="contaier">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">在线测评</block>
		</cu-custom>
		
		<!-- 答题主页面 -->
		<view class="padding">
			
			<view class="mainBox radius" style="box-shadow: 0 0 6px rgb(0 0 0 / 10%);background-color: #fff;">
				<h1 class="title">身心能量和谐程度自测</h1>
				<view style="font-size: 24rpx;line-height: 24px;margin-top: 20rpx;display: block;padding-bottom: 16rpx;clear: both;border-bottom: 1px dashed #ccc;">
                    在你开启“养学游”互助成长的修行之前，非常有帮助的方法是，先测试一下你当前的身心能量和谐程度。经过一段时间的学习修炼之后，再进行测试，看看有没有新的变化。
				</view>
				<view style="padding-top: 30rpx;">
					<view class="text-black text-bold">1.你的年龄段：</view>
					<view style="margin-top: 20rpx;display:flex;">
						<u-radio-group
						    v-model="age"
						    placement="column">
							<u-radio name="1">A、18及18岁以下</u-radio>
						    <u-radio name="2">B、19-29岁</u-radio>
							<u-radio name="3">C、30-39岁</u-radio>
							<u-radio name="4">D、40-49岁</u-radio>
							<u-radio name="5">E、50-59岁</u-radio>
							<u-radio name="6">F、60-69岁</u-radio>
							<u-radio name="7">G、70及70岁以上</u-radio>
						</u-radio-group>
					</view>
				</view>
				<view style="padding-top: 40rpx;">
					<view class="text-black text-bold">2.你的性别：</view>
					<view style="margin-top: 20rpx;">
						<u-radio-group
						    v-model="sex"
						    placement="column">
							<u-radio name="1">男</u-radio>
						    <u-radio name="0">女</u-radio>
						</u-radio-group>
					</view>
				</view>
				<view style="padding-top: 40rpx;">
					<view class="text-black text-bold">3.你的学历：</view>
					<view style="margin-top: 20rpx;">
						<u-radio-group
							v-model="edu"
							placement="column">
							<u-radio name="1">A、初中及以下</u-radio>
							<u-radio name="2">B、高中、职高</u-radio>
							<u-radio name="3">C、大专</u-radio>
							<u-radio name="4">D、本科</u-radio>
							<u-radio name="5">E、硕士研究生</u-radio>
							<u-radio name="6">F、博士研究生</u-radio>
						</u-radio-group>
					</view>
				</view>
				<u-toast ref="uToast" />
				
				<view style="padding-top: 20rpx;">
					<view style="padding-bottom: 60rpx;padding-top: 50rpx;">
						<view class="button" @click="goNext">
							立即提交
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				age: -1,
				sex: -1,
				edu: -1,
			};
		},
		onLoad() {
			this.age = -1;
			this.sex = -1;
			this.edu = -1;
		},
		methods: {
			goNext() {
				var title = "";
				if(this.age == -1){
					title = "请选择您的年龄段";
					
					this.$refs.uToast.show({
					    title:title,
					    // 如果不传此type参数，默认为default，也可以手动写上 type: 'default'
					    type: 'error', 
					    // 如果不需要图标，请设置为false
					    icon: false
					})
					
					return false;
				}
				
				if(this.sex == -1){
					title = "请选择您的性别";
					
					this.$refs.uToast.show({
					    title:title,
					    // 如果不传此type参数，默认为default，也可以手动写上 type: 'default'
					    type: 'error', 
					    // 如果不需要图标，请设置为false
					    icon: false
					})
					
					return false;
				}
				
				if(this.edu == -1){
					title = "请选择您的学历";
					
					this.$refs.uToast.show({
					    title:title,
					    // 如果不传此type参数，默认为default，也可以手动写上 type: 'default'
					    type: 'error', 
					    // 如果不需要图标，请设置为false
					    icon: false
					})
					
					return false;
				}
				
				uni.navigateTo({
					url: 'index2?age=' + this.age + "&sex=" + this.sex + "&edu=" + this.edu
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.title{
		    font-size: 32rpx;
		    line-height: 32px;
		    font-weight: bold;
		    margin: 0;
		    padding: 0;
		    text-align: center;
			    color: #1ea0fa;
	}
	.button {
		background: #80C042;
		color: #FFFFFF;
		font-size: 24rpx;
		text-align: center;
		height: 65rpx;
		line-height: 65rpx;
		padding: 0 20rpx;
		border-radius: 50rpx;
	}
	
	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.rect {
		width: 480rpx;
		// height: 520rpx;
		border-radius: 20rpx;
		padding: 25rpx 25rpx 80rpx 25rpx;
		box-sizing: border-box;
		background-color: #fff;
	}

	.closeImg {
		width: 100%;
		height: 200rpx;
		margin: 10rpx auto 30rpx;

		image {
			height: 200rpx;
		}
	}

	.cu-bar .cu-avatar:first-child {
		margin-left: -11px;
	}

	.cu-bar {
		height: 90rpx !important;
	}

	.mainBox {
		padding: 60rpx 40rpx 20rpx 40rpx;
	}

	.contaier {
		background-color: #f2f2f2;

		.bannerBox {
			width: 750rpx;

			image {
				width: 750rpx;
			}
		}

		.explain {
			width: 750rpx;
			// position: absolute;
			bottom: 40rpx;
			font-size: 24rpx;
			margin: 10rpx 0 40rpx 0;
			text-align: center;
			color: #999999;

			.integral {
				font-size: 30rpx;
				margin-bottom: 15rpx;
				color: #333333;
			}
		}
	}
</style>
