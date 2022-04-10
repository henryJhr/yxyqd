<!-- 个人分享 -->
<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">个人分享</block>
		</cu-custom>
		
		<view>
			<view>
				<share-list :data="dataList"></share-list>
			</view>
			<view class="loading">
				<u-loadmore :status="status" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				status: "loading",
				dataList: [{
						userId:1,
						sex:1,
						created_at:123123,
						title:"养学游",
						avatar:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
						richContent:"养学游"
					}
				],
			}
		},
		onLoad() {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
