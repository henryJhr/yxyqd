<template>
	<view class="box">
		<view class="cu-card article no-card">
			<view class="cu-item shadow">
				<view class="content" style="padding: 0;">
					<image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.daimg.com%2Fuploads%2Fallimg%2F201002%2F1-2010021J246.jpg&refer=http%3A%2F%2Fimg.daimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1646483332&t=529435993f39730239df45198bdb27a4" mode="aspectFill"></image>
					<view class="desc">
			
						<view class="list_title">
							{{item.title}}
						</view>
						
						<view class="list_content">
							玄幻小说 | 张三 / 著
						</view>
			
						<view class="list_content">
							{{item.shortDescription}}
						</view>
						<view class="flex justify-between">
							<view class="cu-tag bg-grey light sm round">
								<u-icon name="play-circle" style="margin-right: 2rpx;"></u-icon>
								1000阅读量
							</view>
							<view class="go-learn">
								<view class="button">
									立即阅读
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "book-item",
		props: ['item', 'hasBuy'],
		data() {
			return {

			};
		},
		methods: {
			openBook() {
			}
		}
	}
</script>

<style lang="scss" scoped>
	.go-learn {
		display: flex;
		margin-top: 8rpx;
	
		.button {
			background: #18B3BF;
			color: #FFFFFF;
			font-size: 24rpx;
			text-align: center;
			height: 50rpx;
			line-height: 50rpx;
			padding: 0 20rpx;
			border-radius: 50rpx;
		}
	}
	.box {
		padding: 20rpx 30rpx;
		    margin: 6px auto;
	}
	.article{
		padding-bottom:0px;
		.cu-item{
			padding-bottom:0px;	
		}
	}
	.list_title {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		font-size: 30rpx;
		font-weight: 600;
		color: #333333;
	}
	
	.list_content {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		word-break: break-all;
		font-size: 24rpx;
		color: #888;
	}
	
	button::after {
		border: none;
		padding: 0;
	}
</style>
