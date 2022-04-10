<template>
	<view>
		<view class="page-box">
			<view class="order" v-for="(item, index) in data" :key="index">
				<view class="item">
					<view class="left" style="margin-bottom: -10rpx;">
						<image :src="item.avatar" style="height: 166rpx;" mode="aspectFill" ></image>
					</view>
					<view class="content">
						<view class="title u-line-2 text-bold">{{ item.title }}</view>
						<view class="type">{{ item.richContent }}</view>
						<view class="cu-tag bg-grey light sm round">
							<u-icon name="play-circle" style="margin-right: 2rpx;"></u-icon>
							免费
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "shareList",
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
					url: '/pages/detail/detail?id=' + id
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
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
			// margin: 20rpx 0 0;
			.left {
				margin-right: 20rpx;
				image {
					width: 260rpx;
					height: 160rpx;
					border-radius: 10rpx;
				}
			}
			.content {
				.title {
					font-size: 32rpx;
					line-height: 40rpx;
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
			line-height: 40rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.btnBox{
				width: 150rpx;
				display: flex;
				justify-content: space-between;
				.btn {
					line-height: 40rpx;
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
</style>
