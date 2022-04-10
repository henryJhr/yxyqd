<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">自然活动</block>
		</cu-custom>
		
<!-- 		<view class="slot-wrap">
			<view class="search-wrap">
				<view class="search-form-inner">
					<view class="search-box">
						<view class="search-icon"></view>
						<input :focus="true" class="input"
							confirmType="search" maxlength="maxLen" name="keyword" :placeholder="keyword||'搜索你感兴趣的内容'"
							placeholderClass="placeholder" type="text" :value="keyword"></input>
					</view>
					<button class="search-btn" @tap="search">搜索</button>
				</view>
			</view>
		</view> -->
		
		<view class="tabs">
			<u-tabs-swiper :active-color="activeColor" ref="tabs" :list="tabs" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
		</view>
		
		<view class="ranklist" v-if="current==0">
			<view class="rank" @scrolltolower="getActivityListByStatus">
				<activity-list :data="activityList0"></activity-list>
			</view>
			<view v-if="activityList0.length > 0">
				<view class="loading">
					<u-loadmore :status="status0" />
				</view>
			</view>
		</view>
		
		<view class="ranklist" v-if="current==1">
			<view class="rank" @scrolltolower="getActivityListByStatus">
				<activity-list :data="activityList1"></activity-list>
			</view>
			<view v-if="activityList1.length > 0">
				<view class="loading">
					<u-loadmore :status="status1" />
				</view>
			</view>
		</view>
		
		<view class="ranklist" v-if="current==2">
			<view class="rank" @scrolltolower="getActivityListByStatus">
				<activity-list :data="activityList2"></activity-list>
			</view>
			<view v-if="activityList2.length > 0">
				<view class="loading">
					<u-loadmore :status="status2" />
				</view>
			</view>
		</view>
		
	</view>
	
</template>

<script>
	import {getActivityList} from '@/api/activity.js'
	export default {
		data() {
			return {
				tabs: [
					{
						name: '预告活动'
					},
					{
						name: '进行中活动'
					},
					{
						name: '往期活动'
					}
				],
				page0: 1,
				page1: 1,
				page2: 1,
				pageSize: 5,
				status0: 'loadmore', //控制上拉加载的状态
				status1: 'loadmore', //控制上拉加载的状态
				status2: 'loadmore', //控制上拉加载的状态
				loading: true, //控制在响应回来前展示loading加载
				current: 0,
				showAction: true,
				keyword: '',
				background: {
					backgroundColor: '#fff',
				},
				activityList0:[],
				activityList1:[],
				activityList2:[],
				activeColor: '#434343',
			}
		},
		onLoad() {
			this.getActivityListByStatus(0,this.page0,this.pageSize);
		},
		// 下拉刷新
		onPullDownRefresh() {
			uni.showLoading({
				title: '加载中'
			});
			
			this.status0 = 'loadmore';
			this.status1 = 'loadmore';
			this.status2 = 'loadmore';
			this.page0 = 1;
			this.page1 = 1;
			this.page2 = 1;
			this.getActivityListByStatus(this.current,1,this.pageSize);
			
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 800);
		},
		// 上拉加载
		onReachBottom() {
			if (this.status0 !== 'nomore' && this.current === 0) {
				this.status0 = 'loading';
				this.page0 = this.page0 + 1;
				this.getActivityListByStatus(this.current,this.page0,this.pageSize);
			}
			if (this.status1 !== 'nomore' && this.current === 1) {
				this.status1 = 'loading';
				this.page1 = this.page1 + 1;
				this.getActivityListByStatus(this.current,this.page1,this.pageSize);
			}
			if (this.status2 !== 'nomore' && this.current === 2) {
				this.status2 = 'loading';
				this.page2 = this.page2 + 1;
				this.getActivityListByStatus(this.current,this.page2,this.pageSize);
			}
		},
		methods: {
			getActivityListByStatus: function(status,page,pageSize) {
				uni.showLoading({
					title: '加载中'
				});
				
				let params = {
					status : status,
					page : page,
					pageSize : pageSize
				};
				
				console.log(params);
				
				getActivityList(params).then((res) => {
					if (status === 0){
						if (res.data.data.list.length < this.pageSize){
							this.status0 = 'nomore';
						}
						else{
							this.status0 = 'loadmore';
						}
						
						if(this.page0 === 1){
							this.activityList0 = res.data.data.list;
						}
						else{
							this.activityList0 = [...this.activityList0, ...res.data.data.list];
						}
					}
					else if (status === 1){
						if (res.data.data.list.length < this.pageSize){
							this.status1 = 'nomore';
						}
						else{
							this.status1 = 'loadmore';
						}
						
						if(this.page1 === 1){
							this.activityList1 = res.data.data.list;
						}
						else{
							this.activityList1 = [...this.activityList1, ...res.data.data.list];
						}
					}
					else if (status === 2){
						if (res.data.data.list.length < this.pageSize){
							this.status2 = 'nomore';
						}
						else{
							this.status2 = 'loadmore';
						}
						
						if(this.page2 === 1){
							this.activityList2 = res.data.data.list;
						}
						else{
							this.activityList2 = [...this.activityList2, ...res.data.data.list];
						}
					}
					
					setTimeout(function () {
						uni.hideLoading();
					}, 200);
				});

			},
			change: function(e) {
				this.current = e;
				if (this.status0 !== 'nomore' && this.current === 0) {
					this.status0 = 'loading';
					this.activityList0 = [];
					this.getActivityListByStatus(this.current,1,this.pageSize);
				}
				if (this.status1 !== 'nomore' && this.current === 1) {
					this.status1 = 'loading';
					this.activityList1 = [];
					this.getActivityListByStatus(this.current,1,this.pageSize);
				}
				if (this.status2 !== 'nomore' && this.current === 2) {
					this.status2 = 'loading';
					this.activityList2 = [];
					this.getActivityListByStatus(this.current,1,this.pageSize);
				}
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
		padding-top:20rpx;
		padding-bottom:30rpx;
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
	}
</style>
