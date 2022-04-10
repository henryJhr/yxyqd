<template>
	<view class="page-box">
		<view v-if="data.length == 0">
			<view class="page-box">
				<view>
					<view class="centre">
						<view class="explain">
							暂无信息
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<view class="order" v-for="(item, index) in data" :key="index">
				<view class="item" @click="gotoDetail(item.id)">
					<view class="left">
						<image :src="item.coverImg" mode="aspectFill"></image>
					</view>
					<view class="content">
						<view class="title u-line-2 text-bold">{{ item.name }}</view>
						<view class="type">活动时间：{{ item.time }}</view>
						<view class="type">举办地点：{{ item.address }}</view>
						<view class="type">活动主持人： {{ item.compere }}</view>
					</view>
				</view>
				<!-- <u-line color="#f1f1f1" margin="24rpx 0 15rpx 0"></u-line>
				<view class="bottom">
					<view>
						<view class="cu-avatar-group" style="padding-left: 24rpx;">
							<view class="cu-avatar round" v-for="(item,index) in avatar" :key="index" :style="[{ backgroundImage:'url(' + avatar[index] + ')' }]"></view>
						</view>
						<text style="color: #80C042;" class="text-shadow">参与人数:12人</text>
					</view>
					
					<view class="btnBox">
						<view class="go-learn">
							<view class="button">
								立即报名
							</view>
						</view>
					</view>
				</view> -->
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name: "activityList",
		props: {
			data: {
				type: Array,
				default: function() {
					return [];
				}
			},
		},
		data() {
			return {
				
			};
		},
		methods: {
			gotoDetail: function(id) {
				uni.navigateTo({
					url: '/pages/activity/activity-details?id=' + id
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.go-learn {
		display: flex;
		margin-top: 8rpx;
	
		.button {
			background: #80C042;
			color: #FFFFFF;
			font-size: 24rpx;
			text-align: center;
			height: 50rpx;
			line-height: 50rpx;
			padding: 0 20rpx;
			border-radius: 50rpx;
		}
	}
	
	button::after {
		border: none;
		padding: 0;
	}
	
	.page-box{
		padding-top: 90rpx;
	}
	
.order {
	width: 710rpx;
	background-color: #ffffff;
	margin: 20rpx auto;
	border-radius: 20rpx;
	box-sizing: border-box;
	padding: 20rpx;
	font-size: 28rpx;
	.top {
		display: flex;
		justify-content: space-between;
		.left {
			display: flex;
			align-items: center;
			.store {
				margin: 0 10rpx;
				font-size: 34rpx;
				font-weight: bold;
			}
		}
		.right {
			color: $u-type-warning-dark;
			.progressBox{
				width: 150rpx;
				float: right;
			}
		}
	}
	.item {
		display: flex;
		margin: 20rpx 0 0;
		.left {
			margin-right: 20rpx;
			image {
				width: 260rpx;
				height: 170rpx;
				border-radius: 10rpx;
			}
		}
		.content {
			.title {
				font-size: 28rpx;
				line-height: 45rpx;
			}
			.type {
				margin: 6rpx 0;
				font-size: 24rpx;
				color: $u-tips-color;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				line-clamp: 3;
				-webkit-box-orient: vertical;
			}
			.delivery-time {
				color: #0081ff;
				font-size: 24rpx;
			}
		}
		.right {
			margin-left: 10rpx;
			padding-top: 20rpx;
			text-align: right;
			.decimal {
				font-size: 24rpx;
				margin-top: 4rpx;
			}
			.number {
				color: $u-tips-color;
				font-size: 24rpx;
			}
		}
	}
	.total {
		margin-top: 20rpx;
		text-align: right;
		font-size: 24rpx;
		.total-price {
			font-size: 32rpx;
		}
	}
	.bottom {
		line-height: 60rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.btnBox{
			width: 150rpx;
			display: flex;
			justify-content: space-between;
			.btn {
				line-height: 52rpx;
				width: 140rpx;
				border-radius: 12rpx;
				border: 2rpx solid $u-tips-color;
				font-size: 26rpx;
				text-align: center;
				color: $u-tips-color;
			}
			.evaluate {
				color: $u-type-primary;
				border-color: $u-type-primary;
			}
		}
	}
}
.centre {
	text-align: center;
	margin: 200rpx auto;
	font-size: 32rpx;
	image {
		width: 300rpx;
		border-radius: 50%;
		margin: 0 auto;
	}
	.tips {
		font-size: 24rpx;
		color: #999999;
		margin-top: 20rpx;
	}
	.btn {
		margin: 80rpx auto;
		width: 200rpx;
		border-radius: 32rpx;
		line-height: 64rpx;
		color: #ffffff;
		font-size: 26rpx;
		background: linear-gradient(270deg, #1cbbb4 0%, #0081ff 100%);
	}
}
.wrap {
	display: flex;
	flex-direction: column;
	height: calc(100vh - var(--window-top));
	width: 100%;
}
.swiper-box {
	flex: 1;
}
.swiper-item {
	height: 100%;
}
</style>