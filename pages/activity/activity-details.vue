<template>
	<view class="container">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{name}}-活动详情</block>
		</cu-custom>
		
		<!-- 活动封面 -->
		<block>
			<image style="width: 100%;height:360rpx;" :src=coverImg></image>
		</block>
		
		<block>
			<view style="margin-left:20rpx;margin-right:20rpx;margin-top:20rpx;">
				<view style="background-color: #ffffff;border-radius:10rpx;height: 320rpx;padding-left:20rpx;padding-right: 20rpx;padding-bottom:20rpx;">
					<view style="padding-top:20rpx; margin-bottom: 20rpx;">活动信息</view>
						<!--<view style=" position:relative;width:100%;height: 70rpx;line-height:70rpx;color:#fff;background: linear-gradient(to bottom, #78B566,#18B566);border-radius:4px;text-align: center;">
							喜欢就分享给好友吧
							<a style="position:absolute;bottom:0;right:0;height:70rpx;line-height:70rpx;width:100rpx;background:none;border:0px;outline: none;color:#fff;">分享</a>
						</view>-->
						<view style="margin-top:30rpx;margin-bottom: 20rpx;color:#999;"><span>活动地点：</span><span style="padding-left:16rpx;">{{address}}</span></view>
						<view style="margin-bottom: 20rpx;color:#999;"><span>活动时间：️</span><span style="padding-left:16rpx;">{{time}}</span></view>
						<view style="margin-bottom: 20rpx;color:#999;"><span>活动主持人：️</span><span style="padding-left:16rpx;">{{compere}}</span></view>
						<view style="color:#999;"><span>联系电话：</span><span style="padding-left:16rpx;">{{linkMobile}}</span></view>
				</view>
			</view>
		</block>
		
		<block >
			<view style="margin-left:20rpx;margin-right:20rpx;margin-top:20rpx;background-color: #ffffff;
			border-radius:10rpx;padding-left:20rpx;padding-right: 20rpx;padding-top:20rpx;padding-bottom:20rpx;">
					<p style="margin-bottom:20rpx;margin-top:20rpx;font-size:32rpx;color:#333">活动描述</p>	
				<p style="color:#999"><rich-text :nodes="description"></rich-text></p>
			</view>
		</block>
		
		<!-- 操作按钮 -->
		<view class="cu-bar bg-white tabbar shop shadow edit-fixed">
			<button class="action text-gray text-shadow">
				<view class='cuIcon-community text-gray'>
				</view>
			</button>
			<view class="action text-gray text-shadow">
				<text class="text-sm">{{applyNumber}}人已报名</text>
			</view>
			
			<view v-if="applyActivityStatus === 0" class='bg-gradual-blue submit margin-left-xl text-xl'>
				<button class='button-no' @click="activityApply()">
					<text class='text-white'>立即报名</text>
				</button>
			</view>
			<view v-else-if="applyActivityStatus === 1" class='bg-gradual-blue submit margin-left-xl text-xl' style="background-image: linear-gradient(45deg, #999, #999);">
				<button class='button-no'>
					<text class='text-white'>已报名</text>
				</button>
			</view>
			<view v-else-if="applyActivityStatus === 2" v-else class='bg-gradual-blue submit margin-left-xl text-xl' style="background-image: linear-gradient(45deg, #999, #999);">
				<button class='button-no'>
					<text class='text-white'>活动已截止报名</text>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {getActivityApply,getActivityById} from '@/api/activity.js';
	import storage from "@/utils/storage.js";

	export default {
		data() {
			return {
				id:'',
				name:'',
				time:'',
				address:'',
				applyNumber:'',
				compere:'',
				linkMobile:'',
				coverImg:'',
				status:-1,
				applyActivityStatus:0,
				description:''
			};
		},
		onLoad(option) {
			//保存当前页面的option对象
			this.option = option;
			this.id = option.id;
			this.loadData(this.id);
			
		},
		methods: {
			loadData: function(id){
				let params = {
					activityId : id,
					userId : storage.getUuid()
				};
				
				console.log(params);
				
				getActivityById(params).then((res) => {
					if(res.data.code === "1"){
						this.name = res.data.data.name;
						this.time = res.data.data.time;
						this.address = res.data.data.address;
						this.applyNumber = res.data.data.applyNumber;
						this.compere = res.data.data.compere;
						this.linkMobile = res.data.data.linkMobile;
						this.coverImg = res.data.data.coverImg;
						this.status = res.data.data.status;
						this.applyActivityStatus = res.data.data.applyStatus;
						this.description = res.data.data.description;
					}
				})
			},
			activityApply: function(){
				let _this = this;
				if( storage.getHasLogin() != true){
					uni.navigateTo({
						url:'../login/login'
					})
				}else{
					console.log(storage.getUuid())
					let params = {
						userId : storage.getUuid(),
						activityId : this.id
					};
					
					getActivityApply(params).then((res) => {
						if(res.data.code === "1"){
							uni.showToast({  
								title:'报名成功',  
								icon:"success"  
							});
							setTimeout(() => {
								var pages = getCurrentPages();
								var curPage = pages[pages.length - 1];
								curPage.onLoad(_this.option);
							}, 400)
						}
						else{
							uni.showToast({
								title:'服务器开小差了',  
								icon:"error"  
							});
						}
					})
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.edit-fixed {
		position: fixed;
		width: 100%;
		bottom: 0;
		z-index: 1024;
		box-shadow: 0 1rpx 6rpx rgba(0, 0, 0, 0.1);
	}

	.button-no::after {
		border: none;
	}
	.button-no {
		border: none;
		background-color: rgba(0, 0, 0, 0);
	}
</style>