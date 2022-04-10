<!-- 心灵测评 -->
<template>
	<view class="contaier">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">在线测评</block>
		</cu-custom>
		
		<!-- 答题主页面 -->
		<view class="padding">
			
			<view v-show="show" class="mainBox radius" style="box-shadow: 0 0 6px rgb(0 0 0 / 10%);background-color: #fff;">
				<view style="font-size: 24rpx;line-height: 24px;display: block;padding-bottom: 16rpx;clear: both;border-bottom: 1px dashed #ccc;">
				    现在开始答题啦，仅凭直觉填选就好。
				</view>
				<view v-for="(item,index) in dataList" :key="index">
					<view class="mentalTitle text-black text-bold" style="padding-top: 40rpx;">
						<text>{{ item.serialNumber || '' }}</text>
						<text>.</text>
						<text>{{ item.title || '' }}</text>
						
						<view style="padding-top: 30rpx;" v-if="item.serialNumber > 20">
							<u-radio-group
								v-model="item.value"
							    placement="column">
								<u-radio name="1">是</u-radio>
							    <u-radio name="0">否</u-radio>
							</u-radio-group>
						</view>
						<view style="padding-top: 30rpx;" v-else>
							<u-rate :count="item.count" v-model="item.value"></u-rate>
						</view>
					</view>
					<view v-if="item.img &&  item.img != ''">
						<image style="width: 100%;height: 320rpx;" :src="item.img" mode="widthFix"></image>
					</view>
				</view>
				
				<view style="padding-top: 20rpx;">
					<view style="padding-bottom: 60rpx;padding-top: 50rpx;">
						<view class="button" @click="submit">
							立即提交
						</view>
					</view>
				</view>
			</view>
			
			<view v-show="showResult">
				<view class="text-center text-bold text-black text-xxl margin-tb-xl">您已完成测评，结果如下</view>
				<view class="text-center margin-tb-lg text-lg">评测结果：分值：{{score}}</text>，平均值：{{avgScore}}。</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mentalData from "@/common/mental-test.js";
	import {test} from '@/api/test'
	export default {
		data() {
			return {
				age: -1,
				sex: -1,
				edu: -1,
				show: true,
				showResult: false,
				dataList:[],
				score:0,
				avgScore:0
			};
		},
		onLoad(option) {
			this.age = option.age;
			this.sex = option.sex;
			this.edu = option.edu;
			const that = this;
			this.getData();
		},
		methods: {
			getData() {
				this.dataList = mentalData[0].dataList;
			},
			change(val){
				console.log(val)
			},
			submit() {
				let params = {
				  age: parseInt(this.age),
				  sex: parseInt(this.sex),
				  edu: parseInt(this.edu),
				  test: [
						this.dataList[0].value,
						this.dataList[1].value,
						this.dataList[2].value,
						this.dataList[3].value,
						this.dataList[4].value,
						this.dataList[5].value,
						this.dataList[6].value,
						this.dataList[7].value,
						this.dataList[8].value,
						this.dataList[9].value,
						this.dataList[10].value,
						this.dataList[11].value,
						this.dataList[12].value,
						this.dataList[13].value,
						this.dataList[14].value,
						this.dataList[15].value,
						this.dataList[16].value,
						this.dataList[17].value,
						this.dataList[18].value,
						this.dataList[19].value
					
					  ]
				};
				
				console.log(this.params)
				
				test(params).then((res) => {
				console.log(res);
				  this.avgScore = res.data.data.avgScore;
				  this.score = res.data.data.score;
				  this.showResult = true;
				  this.show = false;
				});
			},
			goExplain() {
				uni.navigateTo({
					url: './explain'
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.title{
		    font-size: 32rpx;
		    line-height: 32px;
		    font-weight: bold;
		    margin: 0;
		    padding: 0;
		    text-align: center;
			    color: #1ea0fa;
	}
	
	.button {
		background: #80C042;
		color: #FFFFFF;
		font-size: 24rpx;
		text-align: center;
		height: 65rpx;
		line-height: 65rpx;
		padding: 0 20rpx;
		border-radius: 50rpx;
	}
	
	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.rect {
		width: 480rpx;
		// height: 520rpx;
		border-radius: 20rpx;
		padding: 25rpx 25rpx 80rpx 25rpx;
		box-sizing: border-box;
		background-color: #fff;
	}

	.closeImg {
		width: 100%;
		height: 200rpx;
		margin: 10rpx auto 30rpx;

		image {
			height: 200rpx;
		}
	}

	.cu-bar .cu-avatar:first-child {
		margin-left: -11px;
	}

	.cu-bar {
		height: 90rpx !important;
	}

	.mainBox {
		padding: 60rpx 40rpx 20rpx 40rpx;
	}

	.explainMain {
		width: 100%;
		text-align: center;
		font-size: 24rpx;
		text-align: center;
		color: #999999;
		margin-top: 30rpx;
	}

	.userHeard {
		position: absolute;
		left: 50%;
		top: -50rpx;
		margin-left: -50rpx;
	}

	.mentalTitle {
		margin: 0 0 30rpx 0;
	}

	.mentalList {
		width: 100%;
		height: 78rpx;
		line-height: 78rpx;
		padding-right: 20rpx;
		border-radius: 12rpx;
		margin: 30rpx 0;
		overflow: hidden;
		border: 1px solid #dddddd;

		.indexBox {
			width: 70rpx;
			height: 78rpx;
			text-align: center;
			line-height: 78rpx;
			float: left;
			background-color: #dddddd;
			margin-right: 15rpx;
		}
	}

	.mentalListActive {
		width: 100%;
		height: 78rpx;
		line-height: 78rpx;
		padding-right: 20rpx;
		border: 1px solid #0081ff;
		border-radius: 12rpx;
		color: #0081ff;
		margin: 30rpx 0;
		font-weight: 600;
		background-image: url(http://cdn.zhoukaiwen.com/answerYes.png);
		background-repeat: no-repeat;
		background-size: 38rpx;
		background-position: right 30rpx center;

		.indexBox {
			background-color: #0081ff;
			color: #ffffff;
		}
	}

	.contaier {
		background-color: #f2f2f2;

		.bannerBox {
			width: 750rpx;

			image {
				width: 750rpx;
			}
		}

		.explain {
			width: 750rpx;
			// position: absolute;
			bottom: 40rpx;
			font-size: 24rpx;
			margin: 10rpx 0 40rpx 0;
			text-align: center;
			color: #999999;

			.integral {
				font-size: 30rpx;
				margin-bottom: 15rpx;
				color: #333333;
			}
		}
	}
</style>
