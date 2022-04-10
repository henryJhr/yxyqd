<template>
	<view class="container">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">身心灵评测</block>
		</cu-custom>
		
		<view>
			<view class="cu-bar bg-white margin-top-xs">
				<view class="action sub-title">
					<text class="text-xl text-bold text-blue text-shadow">身心灵阶段评测</text>
					<text class="text-ABC text-blue">psychology</text>
				</view>
			</view>
			
			<view v-for="(item, index) in dataList" :key="index" class="cu-list menu sm-border margin-bottom ">
				<view class="cu-item">
					<view class="content padding-tb-sm">
						<view class="text-xl">
							<text class="cuIcon-text text-blue margin-right-xs"></text>
							{{item.name}}
						</view>
						<view class="text-gray text-df margin-top-xs">
							<text class="cuIcon-hotfill margin-right-xs"></text>
							已有{{item.num}}位小伙伴已答题
						</view>
					</view>
					<view class="action">
						<view v-if="item.isAnswer == 0">
							<button disabled="true" class="cu-btn round shadow">暂未开放</button>
						</view>
						<view v-else-if="item.isAnswer == 1">
							<button @click="goIndex(item.id)" class="cu-btn round bg-gradual-blue shadow">立刻测评</button>
						</view>
						<view v-else-if="item.isAnswer == 2">
							<!--bg-gradual-orange-->
							<button disabled="true" @click="goIndex(item.id)" class="cu-btn round shadow">暂未开放</button>
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
				dataList: [
					{
						id: '1',
						name: '[模块一]身心灵合一程度',
						num: 896,
						isAnswer: 1
					},
					{
						id: '2',
						name: '[模块二]能量等级与分布',
						num: 0,
						isAnswer: 2
					},
					{
						id: '3',
						name: '[模块三]测评与导引',
						num: 0,
						isAnswer: 0
					},
				]
			};
		},
		onLoad() {
		},
		watch: {
			
		},
		methods: {
			goIndex(mid){
				uni.navigateTo({
					// url: 'index?mid=' + mid
					url: 'index'
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		background-color: #f2f2f2;
		width: 100%;
		height: 100%;

		.bannerBox {
			width: 100%;

			image {
				width: 100%;
			}
		}
	}
</style>
