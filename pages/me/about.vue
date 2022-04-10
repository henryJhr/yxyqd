<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">关于我们</block>
		</cu-custom>
		
		<view class="cu-list card-menu margin-top-lg bg-white">
			<view class="flex-wrp flex-other">
				<view class="flex-item">
					<text>地址：北京市丰台区总部基地12区</text>
					<view class="value"></view>
				</view>
				<view class="flex-item">
					<text>电话：18801458052</text>
					<view class="value"></view>
				</view>
				<view class="flex-item">
					<text>工作时间：9:00-18:00</text>
					<view class="value"></view>
				</view>
			</view>
		
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {

		};
	},
	methods: {
		
	}
};
</script>

<style lang="scss" scoped>
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
</style>

