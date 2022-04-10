<template>
	<view>
		<index v-if="PageCur=='index'"></index>
		<cases v-if="PageCur=='cases'"></cases>
		<me v-if="PageCur=='me'"></me>

		<view class="box">
			<view class="cu-bar tabbar bg-white shadow foot">
				<view class="action" @tap="NavChange" data-cur="index">
					<view class='cuIcon-cu-image'>
						<image v-if="PageCur=='index'" src="../../static/tabBar/index_cur.png"></image>
						<image v-if="PageCur != 'index'" src="../../static/tabBar/index.png"></image>
					</view>
					<view :class="PageCur=='index'?'color_main':'text-gray'">首页</view>
				</view>

				<view @tap="NavChange" class="action text-gray add-action" data-cur="cases">
					<image class="logo_btn" mode="widthFix" src="../../static/logo.png"></image>
					<view :class="PageCur=='cases'?'color_main':'text-gray'">创作中心</view>
				</view>

				<view class="action" @tap="NavChange" data-cur="me">
					<view class='cuIcon-cu-image'>
						<image v-if="PageCur=='me'" src="../../static/tabBar/me_cur.png"></image>
						<image v-if="PageCur != 'me'" src="../../static/tabBar/me.png"></image>
					</view>
					<view :class="PageCur=='me'?'color_main':'text-gray'">个人中心</view>
				</view>

			</view>
		</view>

	</view>
</template>

<script>
	import index from "./inedx.vue";	//首页
	import cases from "./main.vue";	//创作中心
	import me from "./me.vue";	//个人中心
	import storage from "@/utils/storage.js";
	export default {
		components: {
			index,
			cases,
			me
		},
		data() {
			return {
				PageCur: 'index',
			};
		},
		created() {
			
		},
		onShow() {
		},
		onLoad() {
		},
		methods: {
			NavChange: function(e) {
				console.log(e.currentTarget.dataset.cur)

				this.PageCur = e.currentTarget.dataset.cur;

				if (this.PageCur == 'index') {
					// document.title = '首页'
				} else if (this.PageCur == 'cases') {
					// document.title = '创作中心'
				} else if (this.PageCur == 'me') {
					// document.title = '个人中心'
				}
			}
		}
	}
</script>

<style lang="scss">
	.box {
		margin: 20upx 0;
	}
	.box view.cu-bar {
		margin-top: 20upx;
	}
	
	.logo_btn{
		width: 38*2rpx;
		height: 38*2rpx;
		position: absolute;
		z-index: 2;
		border-radius: 50%;
		top: -40rpx;
		left: 0rpx;
		right: 0;
		margin: auto;
		padding: 0;
	}
	.cu-bar.tabbar .action.add-action {
	    padding-top: 56rpx !important;
	}
</style>
