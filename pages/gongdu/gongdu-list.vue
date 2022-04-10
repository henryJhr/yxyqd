<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">共读回放</block>
		</cu-custom>
		
		<view class="slot-wrap">
			<view class="search-wrap">
				<!-- <u-search @click="gotoSearch" v-model="keyword" :show-action="showAction" :disabled="true" height="64" :clearabled="true">
				</u-search> -->
				
				<view class="search-form-inner">
					<view class="search-box">
						<view class="search-icon"></view>
						<input :focus="false" class="input"
							confirmType="search" maxlength="maxLen" name="keyword" :placeholder="keyword||'搜索你感兴趣的内容'"
							placeholderClass="placeholder" type="text" :value="keyword"></input>
					</view>
					<button class="search-btn" @tap="search">搜索</button>
				</view>
			</view>
		</view>
		
		<view class="tabs">
			<u-tabs-swiper :active-color="activeColor" ref="tabs" :list="tabs" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
		</view>
		
		<view class="ranklist" v-if="current==0">
			<view class="rankMenu">
				<view class="menuItem" @tap="munuTape(index)" :class="cut==index?'active':''"
					v-for="(item,index) in typeList" :key="index">
					{{item.name}}
				</view>
			</view>
			
			<view class="rank">
				<gongdu-list :data="gdhfList"></gongdu-list>
			</view>
			<view class="loading">
				<u-loadmore :status="status" />
			</view>
		</view>
		
		<view class="ranklist" v-if="current==1">
			<view class="rankMenu">
				<view class="menuItem" @tap="munuTape(index)" :class="cut==index?'active':''"
					v-for="(item,index) in typeList" :key="index">
					{{item.name}}
				</view>
			</view>
			
			<view class="rank">
				<gongdu-list :data="jxhfList"></gongdu-list>
			</view>
			<view class="loading">
				<u-loadmore :status="status" />
			</view>
		</view>
		
		<view class="ranklist" v-if="current==2">
			<view class="rankMenu">
				<view class="menuItem" @tap="munuTape(index)" :class="cut==index?'active':''"
					v-for="(item,index) in typeList" :key="index">
					{{item.name}}
				</view>
			</view>
			
			<view class="rank">
				<gongdu-list :data="gdfxList"></gongdu-list>
			</view>
			<view class="loading">
				<u-loadmore :status="status" />
			</view>
		</view>
		
	</view>
	
</template>

<script>
	var app = getApp();
	export default {
		data() {
			return {
				tabs: [{
					name: '共读回放'
				}, {
					name: '精选回放'
				}, {
					name: '共读分享',
				}],
				typeList: [{
					name: '音频'
				}, {
					name: '视频'
				}, {
					name: '图文'
				}],
				current: 0,
				showAction: true,
				keyword: '',
				background: {
					backgroundColor: '#fff',
				},
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
				jxhfList: [
					{
						thumbnail: 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D680%2C800/sign=9d69894070cb0a468577833f5353da1c/f636afc379310a552283b54ebc4543a9832610e0.jpg',
						title: '【音频】人类终极养生-辟谷-25分钟',
						time:'2022-02-21 13:00-18:00',
						address:'北京海淀区xxx',
						views: 222,
						comments: 2
					}
				],
				gdfxList: [
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
					}
				],
				pages: 1,
				activeColor: '#434343',
				cut: 0,
				status: "loading",
			}
		},
		onLoad() {
		},
		onShow() {
			
		},
		onReachBottom() {
			
		},
		methods: {
			gotoSearch: function() {
				uni.navigateTo({
					url: '../search/search'
				})
			},
			onSearchInput: function(e) {
				this.keyword = e.detail.value
			},
			munuTape: function(index) {
				this.cut = index;
				this.pages = 1;
			},
			change: function(e) {
				this.current = e;
				this.status = "loading";
				this.isLastPage=false;
			},
		},
		
	}
</script>

<style lang="scss" scoped>
	.search-form-inner {
		position: fixed;
		left: 0;
		padding-left: 22rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		background-color: #fff;
		z-index: 11;
	
		.search-box {
			flex: 1;
			width: 560rpx;
			height: 60rpx;
			padding: 0 14rpx 0 30rpx;
			border-radius: 30rpx;
			display: flex;
			align-items: center;
			background-color: #f4f3f7;
	
			.search-icon {
				width: 28rpx;
				height: 28rpx;
				background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcBAMAAACAI8KnAAAAMFBMVEVHcEzPzNrPzNrOzdvPzNrPzNnOzNrNzf/PzdnPzNnPzNrPzNnW1tbPzNrT09PPzNmGgbnPAAAAD3RSTlMAbfce1uUoAqd3uUUGWws8T62yAAAAvklEQVQY02NgwASWS5W8JsN5Fv9BoBnKq9YHcz9dgHDl/0PARzCP9///L2JnEv3//wdLG/3/JA6kCvX/K4O4/f+1wao2/f8BJJn//xcAcxn//zdgYOD8/6UAzGX3/z+BgYELaiLIhgUMDKz/v0G5+f8DGBiY/v+Bcs//V0Dmvgdx0RSjGYVmEZoz0ByJ7gWwB8+BPPgRxftQQ7ihgQOVZocGnTw0PEABGzUZZFMAPHTZQYY4IIc+b8gGZC5QAQDBUYA46nAy4gAAAABJRU5ErkJggg==') no-repeat 0 0;
				background-size: contain;
				margin-right: 18rpx;
			}
	
			.delete-icon {
				width: 38rpx;
				height: 38rpx;
				background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAD6klEQVRYR8WXTWwbVRDH578fxLFoUSsoAloqhJDaQqE9UKLgrHnPiloKHOCQiiMCIY5UlRAFri2IAwKJEx9nEIdyoFSgyPvWm40VoQChtAeEeoj4DKAiNyjBsXcHvcqJvJtde50G9d28npn/b+fNm50Hus4L11mfNgQwOztrLy4u3kpEO4mobRjGwsLCwq8TExPhoC+UG0AptRPA01EUPU5EJQBGtxgza/FpwzDOMvNHQoif88D0BZiZmdm6vLx8koheJKJCnqBE9C8RvW3b9ulSqbTYy6cnQLVavRtAFcDunMIxM2b+xbKspxzH+SrLPxPAdd2HiOgcgO0bEe/yaRPRC0KID9PipALUarVdURR9R0TbrlH8qnunPg5LKavJeOsAlFIFZv4awL7NEF+NwcwNy7L2Oo7zW3fcNICXiej1hPgXzPwBEb0E4FAvMGbW+/0mgOeI6EjipLwvpXw+E2Bqampbu92eJ6ItCcdjUspPlFI3MvM0gPvTIDqZe0QI8Y9S6hgRfZyIExHRPinlD6vPYxnwPO84M7+VDM7M3xSLRTEyMnKlXq9vbzabARHtTQQ/H4ahMz4+3ugcXY+IDqaAnhJCvJYK4LpuDYCTkeK54eHhsobwff+WMAynieieju2Ppmk+7DjOnx3xGhEdyMjSRSnlfesAgiDY0mq1GkQ923M3xG1hGNZ1INM0R3VxdbbQzRJfFTVNc4eG1b/XtqBWq+2Pouh8jsqfsyxLjo2N/V2tVndblhWVy+WftHir1ZoCcG+OGAeFEHMxANd1jwL4PIezPtcXbdse0xDaXil1MzN7OcW1/2NSynMxAM/zHmXmqw/7LQ0AQFf7XxsEOCKl/DIGoJTSRfNtHvHVtw+C4M5ms4lKpTI/4BbsF0JciAF0KvuPPgBr++/7/kaLkIloq+4VMQD9w3VdndqsFtzzGA4NDY2Mjo5eznEMfSllObUPKKV0C9atOLZ0hysWi3KQRrS0tOQDeCAl1gkp5Vqzi3VCpdSeToHFph0iekIIcXZycvIm0zR14L6t2PO8J5n5TDcAM18pFAp36UylZqBT0fqj82yC/NMoit4FcBqAnhN6rZkoil4FcALA0YThSSHEG93P1n0NgyC4fWVl5ftNGESSkLrqHxRC6HFtbaUOJEqpUqexmP2OZZ7/mfmyaZoHdMdM2meOZJ7nPcPM7xGRlUcky0aLAzgshJhNs+k5lPq+f6jdbp8BcMdGIJh5npkrlUrlUpZ/3rH8FWY+DuCGnCB6n9+xbfvUNY3l3WJ5LiYA6gA+29SLSdob66tZo9HYYRjGLgAhgN//96tZztQPbNa3BgaOOKDDf+ESDj90wCYAAAAAAElFTkSuQmCC') no-repeat 0 0;
				background-size: contain;
				margin-right: 18rpx;
				z-index: 999;
			}
	
	
			.input {
				flex: 1;
				font-size: 28rpx;
				color: #252628;
			}
	
			.placeholder {
				font-size: 28rpx;
				color: #b7b5c2;
			}
		}
	
		.search-btn,
		.cancel-btn {
			width: 120rpx;
			height: 60rpx;
			margin-left: 30rpx;
			line-height: 60rpx;
			padding: 0;
			border: none;
			font-size: 28rpx;
			background: #fff;
			color: #434343;
		}
	
	}
	.taglist {
		padding: 80rpx 30rpx;
	}
	
	.loading{
		padding-top:30rpx;
	}

	.slot-wrap {
		background-color: #fff;
		width:100%;
		position: fixed;
		z-index: 999;
		height: 60px;
		padding-top: 12px;
		padding-left: 6px;
		padding-right: 6px;
	}
	
	.tabs {
		position: fixed;
		z-index: 999;
		width: 100%;
		box-shadow: 0px 10px 50px #f9f9f9;
		margin-top:90rpx;
	}

	.ranklist {
		padding: 80rpx 0rpx 80rpx 0rpx;

		.rankMenu {
			margin-top:98rpx;
			padding: 30rpx 30rpx 30rpx 30rpx;
			position: fixed;
			width: 100%;
			background: #fff;
			z-index: 99;

			.active {
				color: #fff !important;
				background: #586d72 !important;
			}

			.menuItem {
				min-width: 15vw;
				background-color: #f0f3f7;
				color: #97a9ac;
				height: 60rpx;
				border-radius: 60rpx;
				margin-right: 12rpx;
				font-size: 24rpx;
				display: inline-block;
				line-height: 60rpx;
				text-align: center;
			}
		}

		.rank {
			padding-top: 120rpx;
		}
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
	}
	
</style>
