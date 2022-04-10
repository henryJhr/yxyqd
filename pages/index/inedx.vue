<!-- 首页 -->
<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="content">养学游</block>
		</cu-custom>
		
		<add-tip :tip="tip" :duration="duration"/>

		<!-- banner图 -->
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" circular="true" indicator-dots="true" autoplay="true" interval="3500" duration="600">
						<swiper-item class="swiper-list" v-for="(item, index) in bannerList" :key="index">
							<view class="swiper-item uni-bg-red" @tap="mentalTest">
								<image class="swiper-img" :src="item.imageUrl" mode=""></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		
		<!-- 导航栏 -->
		<view class="cu-list grid solids-bottom col-5 no-border">
			<view class="cu-item" v-for="(item,index) in categories" :key="index" 
			 @click="goCategorieslist" :data-mid="item.mid">
				<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
		
		<!-- <block>
			<view class="cu-bar bg-white margin-top-xs">
				<view class="action">
					<text class="text-xl text-bold text-shadow">共读回放</text>
					<text style="margin-left: 10rpx;font-size: 14px;">在阅读中领略书香之气</text>
				</view>
				<view class="action">
					<text class="text-lg text-grey text-shadow">全部</text>
				</view>
			</view>
			
<!-- 			<view>
				<view class="page-box">
					<view class="order" v-for="(item, index) in bookList" :key="index">
						<view class="item">
							<view class="left" style="margin-bottom: -10rpx;">
								<image :src="item.img" style="height: 190rpx;" mode="aspectFill" ></image>
							</view>
							<view class="content">
								<view class="title u-line-2 text-bold">{{ item.title }}</view>
								<view class="type">{{item.type}} | {{item.author}}</view>
								<view class="type">{{ item.shortDescription }}</view>
								<view class="cu-tag bg-grey light sm round">
									<u-icon name="play-circle" style="margin-right: 2rpx;"></u-icon>
									1000阅读量
								</view>
							</view>
						</view>
					</view>
				</view>
			</view> -->
		<!-- 	
			<view class="page-box">
				<view class="order" v-for="(item, index) in gdhfList" :key="index">
					<view class="item">
						<view class="left" style="margin-bottom: -10rpx;position: relative;">
							<image :src="item.thumbnail" style="height: 166rpx;" mode="aspectFill"></image>
							<view style="border-radius: 6rpx;width:58rpx;height: 36rpx;line-height: 36rpx; text-align: center; position:absolute;right: 0rpx;bottom: 10rpx;background-color: #85888E;color: #fff;font-size: 20rpx;">音频</view>
						</view>
						<view class="content">
							<view class="title u-line-2 text-bold">{{ item.title }}</view>
							<view class="type">{{ item.shortDescription }}</view>
							<view class="cu-tag bg-grey light sm round" style="margin-top: 38rpx;color: red;">
								<u-icon name="play-circle" style="margin-right: 2rpx;"></u-icon>
								免费
							</view>
						</view>
					</view>
				</view>
			</view>
		</block> -->
		
		<block>
			<view class="cu-bar bg-white margin-top-xs">
				<view class="action">
					<text class="text-xl text-bold text-shadow">自然活动</text>
					<text style="margin-left: 10rpx;font-size: 14px;">一起分享阅读的乐趣</text>
				</view>
				<view class="action">
					<text class="text-lg text-grey text-shadow">全部</text>
				</view>
			</view>
			
			<view>
				<!-- <activity-item v-for="(item,index) in goodsList" :key="item.id" :item="item"></activity-item> -->
				<view class="page-box">
					<view class="order" v-for="(item, index) in activityList" :key="index">
						<view class="item" @click="gotoDetail(item.id)">
							<view class="left">
								<image :src="item.activityUrl" mode="aspectFill"></image>
							</view>
							<view class="content">
								<view class="title u-line-2 text-bold">{{ item.name }}</view>
								<view class="type">活动时间：{{ item.time }}</view>
								<view class="type">举办地点：{{ item.address }}</view>
								<view class="type">活动主持人： {{ item.compere }}</view>
							</view>
						</view>
<!-- 						<u-line color="#f1f1f1" margin="12rpx 0 15rpx 0"></u-line>
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
		</block>
		
		<view style="height: 200rpx;width: 100%;text-align: center;margin-top: 16rpx;">哎呀，到底啦~</view>
	</view>
</template>

<script>
	import {getActivityList} from '@/api/activity.js'
	import addTip from "../../components/wxcomponents/struggler-uniapp-add-tip/struggler-uniapp-add-tip.vue"
	export default {
		components: {
			addTip
		},
		data() {
			return {
				tip:"点击「添加小程序」，下次访问更便捷",
				duration:1,
				
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				avatar: [
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg'
				],
				gdhfList: [
					{
						thumbnail: 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D680%2C800/sign=9d69894070cb0a468577833f5353da1c/f636afc379310a552283b54ebc4543a9832610e0.jpg',
						title: '【音频】人类终极养生-辟谷-25分钟',
						time:'2022-02-21 13:00-18:00',
						address:'北京海淀区xxx',
						views: 222,
						comments: 2
					},{
						thumbnail: 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D680%2C800/sign=9d69894070cb0a468577833f5353da1c/f636afc379310a552283b54ebc4543a9832610e0.jpg',
						title: '【音频】人类终极养生-辟谷-25分钟',
						time:'2022-02-21 13:00-18:00',
						address:'北京海淀区xxx',
						views: 222,
						comments: 2
					},{
						thumbnail: 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D680%2C800/sign=9d69894070cb0a468577833f5353da1c/f636afc379310a552283b54ebc4543a9832610e0.jpg',
						title: '【音频】人类终极养生-辟谷-25分钟',
						time:'2022-02-21 13:00-18:00',
						address:'北京海淀区xxx',
						views: 222,
						comments: 2
					},{
						thumbnail: 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D680%2C800/sign=9d69894070cb0a468577833f5353da1c/f636afc379310a552283b54ebc4543a9832610e0.jpg',
						title: '【音频】人类终极养生-辟谷-25分钟',
						time:'2022-02-21 13:00-18:00',
						address:'北京海淀区xxx',
						views: 222,
						comments: 2
					}
				],
				bookList: [
					{
						id:1,
						title:'时间简史',
						type:'科普小说',
						author:'霍金',
						shortDescription:'前华为领导力培训负责人张三亲授是打发手动阀世纪东方啦',
						img:"https://img2.baidu.com/it/u=3355615925,3337403260&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=691"
					},
					{
						id:2,
						title:'道德经',
						type:'哲学著作',
						author:'老子',
						shortDescription:'前华为领导力培训负责人张三亲授是打发手动阀世纪东方啦',
						img:"https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D680%2C800/sign=9d69894070cb0a468577833f5353da1c/f636afc379310a552283b54ebc4543a9832610e0.jpg"
					},
					{
						id:3,
						title:'老人与海',
						type:'中篇小说',
						author:'海明威',
						shortDescription:'前华为领导力培训负责人张三亲授是打发手动阀世纪东方啦',
						img:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fupload-images.jianshu.io%2Fupload_images%2F11468487-1e835532217c3e54.jpg&refer=http%3A%2F%2Fupload-images.jianshu.io&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1646615794&t=5565aaac4807cbef0727bdfa2ac7a20a"
					},
					{
						id:4,
						title:'史记',
						type:'纪传体史书',
						author:'司马迁',
						shortDescription:'前华为领导力培训负责人张三亲授是打发手动阀世纪东方啦',
						img:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn10115%2F418%2Fw697h521%2F20190428%2F8ea0-hwfpcxm7462546.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1646616301&t=2d22240e5ee371b8d3cfcbe61c563f24"
					}
				],
				activityList: [],
				bannerList: [
					{
						imageUrl: 'https://aaaabbb.oss-cn-beijing.aliyuncs.com/8381648289240_.pic.jpg',
					}
				],
				categories: [{
					cuIcon: 'file',
					color: 'yellow',
					mid: '1',
					name: '在线书库'
				}, {
					cuIcon: 'video',
					color: 'cyan',
					badge: 1,
					mid: '2',
					name: '共读回放'
				}, {
					cuIcon: 'activity',
					color: 'orange',
					mid: '3',
					name: '自然活动'
				}, {
					cuIcon: 'choiceness',
					color: 'cyan',
					mid: '4',
					name: '家庭教育'
				}, {
					cuIcon: 'share',
					color: 'red',
					mid: '5',
					name: '个人分享'
				}]
			}
		},
		watch: {

		},
		mounted() {
			this.getActivityListByStatus(1,1,10);
		},
		methods: {
			// 答题测试
			mentalTest() {
				uni.navigateTo({
					url: '../mentalTest/index'
				})
			},
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			goCategorieslist: function(e) {
				if(e.currentTarget.dataset.mid == 1){
					uni.showToast({
					    title: '暂未开放,敬请期待',
						icon: 'none',
					    duration: 2000
					});
				}else if(e.currentTarget.dataset.mid == 2){
					// uni.navigateTo({
					// 	url: '/pages/gongdu/gongdu-list'
					// })
					uni.showToast({
					    title: '暂未开放,敬请期待',
						icon: 'none',
					    duration: 2000
					});
				}else if(e.currentTarget.dataset.mid == 3){
					uni.navigateTo({
						url: '../activity/activity-list'
					})
				}else if(e.currentTarget.dataset.mid == 4){
					uni.showToast({
					    title: '暂未开放,敬请期待',
						icon: 'none',
					    duration: 2000
					});
				}else if(e.currentTarget.dataset.mid == 5){
					// uni.navigateTo({
					// 	url: '../share'
					// })
					uni.showToast({
					    title: '暂未开放,敬请期待',
						icon: 'none',
					    duration: 2000
					});
				}
			},
			getActivityListByStatus: function(status,page,pageSize) {
				let params = {
					status : status,
					page : page,
					pageSize : pageSize
				};
				
				getActivityList(params).then((res) => {
					this.activityList = res.data.data.list;
				});
			},
			gotoDetail: function(id) {
				uni.navigateTo({
					url: '/pages/activity/activity-details?id=' + id
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	.swiper{
		height: 175px;
	}
	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}
	/*scroll-view外层*/
	.skill-sequence-panel-content-wrapper {
		position: relative;
		white-space: nowrap;
		padding: 10rpx 0 10rpx 10rpx;
	}

	.line {
		width: 100%;
		height: 20rpx;
		background-color: #f3f6f9
	}
	
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
