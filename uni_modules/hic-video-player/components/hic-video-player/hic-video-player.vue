<template>
	<view class="hic-video-player" :style="style">
		<template v-if="tipVis">
			<view class="bg-img bg-mask" :style="{backgroundImage: 'url(' + poster + ')'}">
				<view class="">
					<text class="text-white">正在使用非WIFI网络，播放将产生流量费用</text>
					<button class="btn" @click="trafficPlayVideo">流量播放</button>
				</view>
			</view>
		</template>
		<template v-else>
			<video
				v-show="videoVis"
				:src="videoUrl"
				:poster="poster"
				:autoplay="autoplay"
				:controls="controls"
				:title="title"
				object-fit="contain"
				:show-mute-btn="true"
				:enable-play-gesture="true"
				id="videoId"
				:style="style"
				@play="play"
				@pause="pause"
				@loadedmetadata="loadedmetadata"
				@error="error"
				@waiting="waiting"
				@timeupdate="timeupdate"
				@controlstoggle="controlstoggle">
				<!-- APP video标签层级问题....看不到... ∴ 没用<cover-view> -->
				<view class="load-text">{{ videoLoadText }}</view>
				<template v-if="hasCoverView">
					<view class="cover-view" v-show="coverViewVis">
						<view class="wrap">
							<view class="text" v-if="definitionName" @click="showDefinition">{{ definitionName }}</view>
						</view>
					</view>
					<view class="picture-quality" v-show="definitionVis" @click="hideDefinition">
						<view class="definition">
							<view class="title">清晰度</view>
							<view class="list">
								<view
									v-for="item in definition" :key="item.key" 
									class="item"
									:class="{active: item.key == curDefinition}"
									@click.stop="changeDefinition(item.key)">
									<view class="">
										<view>{{ item.name }}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</template>
			</video>
			<view v-show="!videoVis">
				<image :src="poster" mode="aspectFill" :style="style"></image>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		name: 'HicVideoPlayer',
		props: {
			src: {
				// 视频播放地址
				type: String,
				default: ''
			},
			poster: {
				// 封面图片地址
				type: String,
				default: ''
			},
			autoplay: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: ''
			},
			definition: {
				// 清晰度视频地址列表
				// [{ key: 'sd', name: '标清', src: 'http://xxx' }]
				type: Array,
				default: () => ([])
			},
			defaultDefinition: {
				// 默认清晰度
				type: String,
				default: 'sd'
			},
			width: {
				type: String,
				default: ''
			},
			height: {
				type: String,
				default: ''
			},
			hideVideo: {
				// 未实现同层渲染的移动端 视频组件层级最高..
				type: Boolean,
				default: false
			},
			delay: {
				// 隐藏后显示视频组件的时延 默认500ms
				type: Number,
				default: 500
			},
			tipNotWifi: {
				// 网络类型非 wifi, 是否提示
				type: Boolean,
				default: false
			},
			controls: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				videoUrl: '',
				curDefinition: this.defaultDefinition,
				videoVis: true,
				isWifi: false,
				tipVis: false,
				videoLoadText: '正在加载请稍等',
				coverViewVis: false,
				definitionVis: false
			}
		},
		watch: {
			src: {
				handler(val) {
					this.init();
				}
			},
			definition: {
				handler(val) {
					this.init();
				}
			},
			hideVideo: {
				handler(val, oldVal) {
					// #ifdef MP-WEIXIN
					// 微信小程序已实现同层渲染 不需隐藏视频
					this.videoVis = true;
					return;
					// #endif
					if (val) {
						this.videoVis = false;
					} else if (!val && oldVal) {
						// 弹窗收起
						setTimeout(() => {
							this.videoVis = true;
						}, this.delay);
					} else {
						this.videoVis = true;
					}
				},
				immediate: true
			}
		},
		computed: {
			style() {
				if (this.width && this.height) {
					return `width: ${this.width}; height: ${this.height};`;
				}
				return 'width: 100%; height: 100%;';
			},
			videoStyle() {
				if (!this.videoVis) {
					return 'width: 0; height: 0;';
				}
				return this.style;
			},
			hasDefinition() {
				return Array.isArray(this.definition) && this.definition.length;
			},
			definitionName() {
				// 清晰度名称
				if (this.hasDefinition && this.curDefinition) {
					const index = this.definition.findIndex(item => item.key == this.curDefinition);
					if (index != -1) {
						return this.definition[index].name;
					}
				}
				return '';
			},
			hasCoverView() {
				return this.hasDefinition;
			}
		},
		async created() {
			this.isWifi = await this.networkTypeIsWifi();
			if (this.tipNotWifi && !this.isWifi) {
				this.tipVis = true;
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				if (this.hasDefinition) {
					// 清晰度列表 definition 有传, 取清晰度列表的src地址
					if (!this.curDefinition) {
						this.curDefinition = this.defaultDefinition || this.definition[0].key;
					}
					let index = this.definition.findIndex(item => item.key == this.curDefinition);
					if (index == -1) {
						index = 0;
					}
					this.videoUrl = this.definition[index].src;
				} else {
					// 没有 取 this.src
					this.videoUrl = this.src;
				}
			},
			networkTypeIsWifi() {
				// uni.getNetworkType 的封装 获取网络类型
				return new Promise((resolve, reject) => {
					uni.getNetworkType({
						success: (res) => {
							resolve(res.networkType === 'wifi');	// 网络状态是否 WiFi
						},
						fail: (err) => {
							console.log(err);
							reject();
						}
					})
				});
			},
			trafficPlayVideo() {
				this.tipVis = false;
				uni.showToast({
					title: '您当前正在使用移动数据, 记得注意流量变化',
					icon: 'none'
				});
				this.$emit('trafficPlayVideo');
			},
			play(event) {
				console.log('play');
			},
			pause(event) {
				console.log('pause');
			},
			loadedmetadata(event) {
				console.log('loadedmetadata 视频元数据加载完成', event.detail);
				this.videoLoadText = '';
			},
			error(event) {
				console.log('error 视频播放出错', event.detail);
				this.videoLoadText = '视频播放出错';
			},
			waiting(event) {
				console.log('waiting', event.detail);
				this.videoLoadText = '缓存中请稍等';
			},
			timeupdate(event) {
				// console.log('timeupdate', event.detail);
				this.videoLoadText = '';
			},
			controlstoggle(event) {
				if (this.hasCoverView) {
					if (event.detail.show) {
						this.coverViewVis = true;
					} else {
						this.coverViewVis = false;
					}
				}
			},
			showDefinition() {
				if (this.hasDefinition) {
					this.definitionVis = true;
				}
			},
			hideDefinition() {
				this.definitionVis = false;
			},
			changeDefinition(key) {
				// 切换清晰度
				this.curDefinition = key;
				this.hideDefinition();
				this.init();
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './style.scss';
	.hic-video-player {
		.bg-img.bg-mask {
			height: 100%;
			& > view {
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				text {
					text-align: center;
					margin: 20rpx 40rpx;
				}
			}
		}
		.load-text {
			position: absolute;
			top: 80%;
			left: 50%;
			transform: translate(-50%, -50%);
			color: #fff;
		}
		.cover-view {
			position: absolute;
			// top: var(--safe-area-inset-top);
			top: 50%;
			right: var(--safe-area-inset-right);
			transform: translateY(-50%);
			.wrap {
				padding: 20rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
			}
			.text {
				padding: 5rpx 15rpx;
				line-height: 1.4;
				color: #FFFFFF;
				border: 1rpx solid #FFFFFF;
				border-radius: 10rpx;
			}
		}
		.picture-quality {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			padding: var(--safe-area-inset-top) var(--safe-area-inset-right) var(--safe-area-inset-bottom) var(--safe-area-inset-left);
			background-color: rgba(0, 0, 0, 0.6);
			color: #fff;
			.definition {
				width: 100%;
				height: 100%;
				padding: 20rpx;
				box-sizing: border-box;
				
				font-size: $font-lg;
				line-height: 1.4;
				
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				align-items: flex-start;
				.title {}
				.list {
					padding-top: 30rpx;
					display: flex;
					justify-content: flex-start;
					flex-wrap: wrap;
					align-items: center;
					.item {
						width: 160rpx;
						padding: 20rpx 30rpx;
						box-sizing: border-box;
						font-size: $font-lg;
						background-color: rgba(0, 0, 0, 0.3);
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 6rpx;
					}
					.item.active {
						color: $main;
						border-bottom: 5rpx solid $main;
					}
					.item + .item {
						margin-left: 20rpx;
					}
				}
			}
		}
	}
</style>
