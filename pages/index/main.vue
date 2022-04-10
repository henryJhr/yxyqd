<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			
			<block slot="content">创作中心</block>
		</cu-custom>
		
		<view class="cu-card">
			<view class="tabbar bg-white action flex justify-around align-center"
				style="width: 100%;height: 118rpx;">
				<button @tap="saveDraftAction" class="cu-btn round bg-grey" style="width: 25%;">保存草稿</button>
				<button @tap="commitAction" class='cu-btn round ' style="width: 25%;color: #fff;background-color: #18B3BF;">立即发布</button>
			</view>
			<chunLei-popups v-model="showExpandMenu" :x="x" :y="y" dynamic>
				<view
					:class="'flex align-center justify-start '+[index!==expandMenuList.length-1?'padding-bottom-sm':'']"
					style="flex-direction: column;" v-for="(subList,index) in expandMenuList" :key="index">
					<view class="flex justify-start align-center padding-sm">
						<view @tap="chooseColor(index,0)" class="text-bold text-xl">
							<text :class="'cuIcon-radioboxfill text-'+subList[0]"></text>
						</view>
						<view style="width: 40upx;"></view>
						<view @tap="chooseColor(index,1)" class="text-bold text-xl">
							<text :class="'cuIcon-radioboxfill text-'+subList[1]"></text>
						</view>
					</view>
				</view>
			</chunLei-popups>
		</view>
		<view class="bg-white radius margin padding-left padding-top padding-right">
			<view class="flex justify-between align-center solid-bottom">
				<input v-model="title" style="font-size: 32upx;width: 85%;" placeholder="取个好的标题万一火了呢"></input>
				<text class="text-sm">{{title.length}}/40</text>
			</view>
			<view v-for="(item,index) in dataList" :key="index">
				<!-- 文字 -->
				<view v-if="item.type=='text'" class="padding-top flex justify-start align-start"
					style="flex-direction: column;width: 100%;">
					<view class="flex justify-between align-center" style="width: 100%;">
						<view class="flex justify-start align-center">
							<text class="text-df text-gray padding-right">{{item.type_name}}</text>
						</view>
						<view class="flex justify-end align-center">
							<view @tap.stop="upAction(index)" class="text-bold text-xl">
								<text class="cuIcon-top text-gray"></text>
							</view>
							<view style="width: 40upx;"></view>
							<view @tap.stop="downAction(index)" class=" text-bold text-xl">
								<text class="cuIcon-down text-gray"></text>
							</view>
							<view style="width: 40upx;"></view>
							<view @tap.stop="deleteAction(index)" class=" text-bold text-xl">
								<text class="cuIcon-deletefill text-gray"></text>
							</view>
						</view>
					</view>
					<view style="height: 230upx;width: 100%;" class="padding-top-sm">
						<textarea v-if="item.font_size_name=='df'" cursor-spacing="30" @input="contentUpdate" :data-index="index"
							maxlength="-1" :value="item.content" placeholder="请输入内容"
							:class="[item.is_bold?'text-bold':'']+' text-'+item.text_color"
							style="height: 200upx;width: 100%;line-height: 40upx;letter-spacing: 2upx;font-size:28upx;">
							</textarea>
						<textarea v-if="item.font_size_name=='lg'" cursor-spacing="30" @input="contentUpdate" :data-index="index"
							maxlength="-1" :value="item.content" placeholder="请输入内容"
							:class="[item.is_bold?'text-bold':'']+' text-'+item.text_color"
							style="height: 200upx;width: 100%;line-height: 40upx;letter-spacing: 2upx;font-size:32upx;">
							</textarea>
						<textarea v-if="item.font_size_name=='xl'" cursor-spacing="30" @input="contentUpdate" :data-index="index"
							maxlength="-1" :value="item.content" placeholder="请输入内容"
							:class="[item.is_bold?'text-bold':'']+' text-'+item.text_color"
							style="height: 200upx;width: 100%;line-height: 40upx;letter-spacing: 2upx;font-size:36upx;">
							</textarea>
					</view>
					<view class="flex justify-start align-center padding-bottom-xs solid-bottom" style="width: 100%;">
						<text @tap.stop="textBoldAction(index)" v-if="item.is_bold"
							class="cuIcon-roundcheckfill text-blue">加粗</text>
						<text @tap.stop="textBoldAction(index)" v-else class="cuIcon-roundcheck text-gray">加粗</text>
						<view style="width: 70upx;"></view>
						<view class="flex justify-start align-center">
							<text @tap.stop="textFontSize(index,'xl')"
								:class="'text-bold text-xl text-'+[item.font_size_name=='xl'?'blue':'']">大</text>
							<view style="width: 40upx;"></view>
							<text @tap.stop="textFontSize(index,'lg')"
								:class="'text-bold text-lg text-'+[item.font_size_name=='lg'?'blue':'']">中</text>
							<view style="width: 40upx;"></view>
							<text @tap.stop="textFontSize(index,'df')"
								:class="'text-bold text-df text-'+[item.font_size_name=='df'?'blue':'']">小</text>
						</view>
						<view style="width: 85upx;"></view>
						<view @tap.stop="showExpandMenuAction" :data-index="index"
							class="text-bold text-xl">
							<text :class="'cuIcon-radioboxfill text-'+item.text_color"></text>
						</view>
					</view>
				</view>
				<!-- 大图 -->
				<view v-if="item.type=='big_image'"
					class="padding-top flex justify-start align-start padding-bottom solid-bottom"
					style="flex-direction: column;width: 100%;">
					<view class="flex justify-between align-center" style="width: 100%;">
						<text class="text-df text-gray">{{item.type_name}}</text>
						<view class="flex justify-end align-center">
							<view @tap.stop="upAction(index)" class=" text-bold text-xl">
								<text class="cuIcon-top text-gray"></text>
							</view>
							<view style="width: 40upx;"></view>
							<view @tap.stop="downAction(index)" class=" text-bold text-xl">
								<text class="cuIcon-down text-gray"></text>
							</view>
							<view style="width: 40upx;"></view>
							<view @tap.stop="deleteAction(index)" class=" text-bold text-xl">
								<text class="cuIcon-deletefill text-gray"></text>
							</view>
						</view>
					</view>
					<view v-if="item.image&&item.image.local.length>0" class="bg-img padding-top" style="width: 100%;">
						<image @tap.stop="ChooseBigImage(index)"
							:class="(item.image.is_uping==false&&item.image.remote==null)||(item.image.is_uping==true)?'bg-mask':''"
							:src="item.image.local" mode="widthFix" style="width: 100%;"></image>
						<view class="cu-load load-cuIcon text-white text-xl"
							:class="item.image.is_uping?'loading':'over'" style="position: absolute;z-index: 90;width: 30upx;height: 30upx;top: 45%;right: 48%;"></view>
						<view v-if="item.image.is_uping==false&&item.image.remote==null">
							<view @click.stop="retryUploadBig(index)"
								style="position: absolute;z-index: 99;width: 200upx;height: 200upx;top: 45%;right: 35%;">
								<view class="flex justify-center align-center padding-top-sm padding-bottom-sm" style="flex-direction: column;background-color: #3E3E3E;">
									<text class="text-white sm">上传失败</text>
									<text class="text-white sm">点击重试</text>
								</view>
							</view>
						</view>
					</view>
					<view v-else style="width: 100%;" class="flex justify-center align-center padding-top-sm">
						<view @tap.stop="ChooseBigImage(index)"
							class="solids text-gray flex justify-center align-center"
							style="width: 100upx;height: 100upx;">
							<text class="text-xl cuIcon-cameraadd text-gray"></text>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-list grid no-border padding-top-xs col-2">
				<view @tap="addNewPart(item)" class="cu-item action" v-for="(item,index) in actions" :key="index">
					<view :class="['cuIcon-' + item.icon,'text-' + item.color]">
					</view>
					<text>{{item.title}}</text>
				</view>
			</view>
		</view>
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	import chunLeiPopups from "@/components/chunLei-popups/chunLei-popups.vue";
	export default {
		components: {
			chunLeiPopups
		},
		data() {
			return {
				saveDraftTimer:null,
				//===== 富文本编辑
				textColorSettingIndex: 0,
				x: 30,
				y: 50,
				showExpandMenu: false,
				expandMenuList: [
					[
						'red',
						'orange',
					],
					[
						'blue',
						'cyan',
					],
					[
						'mauve',
						'purple'
					],
					[
						'pink',
						'green'
					],
					[
						'black',
						'grey'
					]
				],
				fontSizeXl: 16,
				fontSizeLg: 14,
				fontSizeDf: 12,
				displayFontXl: 36,
				displayFontLg: 32,
				displayFontDf: 28,
				themeColor: this.ThemeColor,
				maxImageCount: 6,
				maxVideoCount: 1,
				//========
				postId: null,
				post: null,
				dataList: [{
					type: 'text',
					type_name: "文字",
					content: '',
					is_bold: false,
					font_size: 14,
					display_font_size: 32,
					font_size_name: 'lg',
					text_color: 'black'
				}],
				docList: [],
				topic: null,
				appSetting: this.AppSetting,
				themeColor: this.ThemeColor,
				hasDraft: false,
				fromDraft: false,
				miniProgram: null,
				officialAccount: null,
				title: '',
				vote: {}
			}
		},
		mounted() {
			let that = this
			this.$nextTick(function(){
				that.saveDraftTimer = setInterval(that.autoSaveDraft,60000)
			})
		},
		onUnload() {
			clearInterval(this.saveDraftTimer)
		},
		computed: {
			videoPoster() {
				//视频封面就是文章内的第一张图
				let poster = null
				for (let index = 0; index < this.dataList.length; index++) {
					let item = this.dataList[index]
					if (item.type == 'big_image' && item.image !== null) {
						if (item.image.remote && item.image.remote.length > 0) {
							poster = item.image.remote
							break
						}
					}
					if (item.type == 'small_image' && item.image_list.length > 0) {
						for (let subIndex = 0; subIndex < item.image_list.length; subIndex++) {
							let subItem = item.image_list[subIndex]
							if (subItem.remote && subItem.remote.length > 0) {
								poster = subItem.remote
								break
							}
						}
					}
				}
				return poster
			},
			actions() {
				return [{
						action: 'text',
						icon: 'edit',
						title: '文字',
						color: 'gray'
					},
					{
						action: 'big_image',
						icon: 'pic',
						title: '图片',
						color: 'gray'
					}
				]
			},
			realDocList() 
			{
				let pDocList = []
				this.docList.forEach(item=>{
					let isTitleValidate = item.title !== null && item.title !== undefined && item.title.length>0
					let isLinkValidate = item.link !== null && item.link !== undefined && item.link.length > 0
					if(isTitleValidate && isLinkValidate) {
						pDocList.push(item)
					}
				})
				return pDocList
			},
			realRichContentList() {
				//过滤内容
				let pDataList = []
				//元素内容是不是空
				this.dataList.forEach(subItem => {
					if (subItem.type == 'text' && subItem.content && subItem.content.length > 0) {
						pDataList.push(subItem)
					} else if (subItem.type == 'big_image' && subItem.image && subItem.image.local && subItem.image
						.local.length > 0) {
						pDataList.push(subItem)
					} else if (subItem.type == 'small_image' && subItem.image_list.length > 0) {
						pDataList.push(subItem)
					} else if (subItem.type == 'video' && subItem.local && subItem.local.length > 0) {
						pDataList.push(subItem)
					}
				})
				return pDataList
			},
		},
		onPageScroll() {
			this.showExpandMenu = false
		},
		onLoad(options) {
			if (options.postId !== null && options.postId !== undefined) {
				this.postId = options.postId
				this.getPostDetail()
			}
			if (options.fromForum !== null && options.fromForum !== undefined) {
				const eventChannel = this.getOpenerEventChannel()
				// 监听replyComment事件，获取上一页面通过eventChannel传送到当前页面的数据
				let that = this
				eventChannel.on('forumPostPublish', function(data) {
					console.log(data)
					that.forum = data
				})
			}
			if (options.fromTopic !== null && options.fromTopic !== undefined) {
				const eventChannel = this.getOpenerEventChannel()
				// 监听replyComment事件，获取上一页面通过eventChannel传送到当前页面的数据
				let that = this
				eventChannel.on('topicPostPublish', function(data) {
					console.log(data)
					that.topic = data
				})
			}
			//允许发布的视频数量
			let userInfo = getUserInfo()
			this.initInfoFromDraft()
		},
		methods: {
			autoSaveDraft() 
			{
				this.saveDraftNow(true)
			},
			getPostDetail() {
				if (this.postId == null) {
					return
				}
				uni.showLoading({
					title: '正在加载...'
				})
				postDetail(this.postId).then(res => {
					uni.hideLoading()
					this.title = res.data.title
					this.post = res.data
					this.miniProgram = res.data.mini_program
					this.officialAccount = res.data.official_account
					this.forum = res.data.forum
					this.topic = res.data.topic
					this.docList = res.data.document_list
					this.dataList = []
					if (res.data.rich_content && res.data.rich_content.length > 0) {
						this.dataList = JSON.parse(res.data.rich_content)
					} else {
						//转成新的发布形式
						this.dataList.push({
							type: 'text',
							type_name: "文字",
							content: res.data.content,
							is_bold: false,
							font_size: 14,
							display_font_size: 32,
							font_size_name: 'lg',
							text_color: 'black'
						})
						if (res.data.image_list && res.data.image_list.length > 0) {
							let imageItem = {
								type: 'small_image',
								type_name: '小图',
								image_list: [],
							}
							res.data.image_list.forEach(url => {
								let item = {
									'local': url,
									'remote': url,
									'is_uping': false,
								}
								imageItem.image_list.push(item)
							})
							this.dataList.push(imageItem)
						}
					}
				}).catch(error => {
					uni.hideLoading()
				})
			},
			loadDraft() {
				this.fromDraft = true
				let draft = getDraft()
				if (draft !== null && draft !== undefined) {
					this.title = draft.title
				}
				if (draft.miniProgram) {
					this.miniProgram = draft.miniProgram
				}
				if (draft.officialAccount) {
					this.officialAccount = draft.officialAccount
				}
				if (draft.forum) {
					this.forum = draft.forum
				}
				if (draft.vote) {
					this.vote = draft.vote
				}
				if (draft.docList) {
					this.docList = draft.docList
				}
				if (draft.richContentList) {
					draft.richContentList.forEach(item=>{
						if(item.type == 'big_image') {
							item.image.is_uping = false
						}
						if(item.type == 'small_image') {
							item.image_list.forEach(subItem=>{
								subItem.is_uping = false
							})
						}
						if(item.type == 'video') {
							item.is_uping = false
						}
					})
					this.dataList = draft.richContentList
				}
			},
			deleteDraftAction() {
				let that = this
				uni.showModal({
					title: '是否删除草稿?',
					content: '删除草稿后无法找回?',
					confirmText: '确定删除',
					cancelText:'手滑了',
					success(res) {
						if (res.confirm) {
							that.deleteDraft()
							that.hasDraft = false
							that.fromDraft = false
						}
					}
				})
			},
			initInfoFromDraft() {
				if (this.postId !== null) {
					this.hasDraft = false
					return
				}
				let draft = getDraft()
				if (draft == null || draft == undefined || draft == "{}" || draft == "") {
					this.hasDraft = false
					return
				}
				this.hasDraft = true
				if(this.hasDraft) {
					let that = this
					uni.showModal({
						title:'草稿提示',
						content:'检测到你上次有未完成的草稿，是否继续编辑?',
						confirmText:'继续编辑',
						success(res) {
							if(res.confirm) {
								that.loadDraft()
							}
						}
					})
				}
			},
			// chooseOfficialAccountAction() {
			// 	let that = this
			// 	uni.navigateTo({
			// 		url: '/pages/always/official-account-list/official-account-list?isPublish=1',
			// 		events: {
			// 			finishChoose: function(data) {
			// 				that.officialAccount = data
			// 			}
			// 		}
			// 	})
			// },
			saveDraftNow(auto) {
				//标题或者内容或者图片至少有一种才可以保存
				if (this.title.length == 0 && this.realRichContentList.length == 0) {
					if(auto == null || auto == undefined || auto == false) {
						uni.showToast({
							icon: 'none',
							title: '标题、内容、图片全部为空时不可以保存为草稿'
						})
					} 
					return
				}

				let params = {
					title: this.title,
				}

				if (this.miniProgram !== null) {
					params['miniProgram'] = this.miniProgram
				}

				if (this.officialAccount !== null) {
					params['officialAccount'] = this.officialAccount
				}

				if (this.forum !== null) {
					params['forum'] = this.forum
				}

				if (this.vote && this.vote.voteItemList && this.vote.voteItemList.length > 0) {
					params['vote'] = this.vote
				}

				if (this.docList && this.docList.length > 0) {
					params['docList'] = this.docList
				}

				if (this.realRichContentList && this.realRichContentList.length > 0) {
					params['richContentList'] = this.realRichContentList
				}

				let status = saveDraft(params)
				if (status) {
					let title = '保存成功'
					if(auto && auto == true) {
						title = '已自动保存草稿'
						this.fromDraft = true
						this.hasDraft = true
					}
					uni.showToast({
						title: title
					})
					this.hasDraft = true
				}
			},
			saveDraftAction(auto) {
				if (!isSaveDraftTipReadStatusOk()) {
					let that = this
					uni.showModal({
						title: '保存草稿',
						content: '本地只能保存最多一份草稿，每次保存将覆盖前一份保存的草稿',
						confirmText: '继续保存',
						cancelText: '再想想',
						success(res) {
							if (res.confirm) {
								that.saveDraftNow()
							}
						}
					})
					SaveDraftTipReadStatus()
					return
				}
				this.saveDraftNow()
			},
			commitAction() {
				if (this.realRichContentList.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '必须要有内容'
					})
					return
				}
				if (this.title.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '必须要有标题'
					})
					return
				}
				if (this.title.length > 40) {
					uni.showToast({
						icon: 'none',
						title: '标题不可超过40字'
					})
				}
				
				//停止保存草稿
				clearInterval(this.saveDraftTimer)

				let params = {
					title: this.title
				}

				if (this.miniProgram !== null) {
					params['programId'] = this.miniProgram.program_id
				}

				if (this.officialAccount !== null) {
					params['accountId'] = this.officialAccount.account_id
				}

				if (this.forum !== null) {
					params['forumId'] = this.forum.forum_id
				}

				if (this.topic !== null) {
					params['topicId'] = this.topic.topic_id
				}

				if (this.vote && this.vote.voteItemList && this.vote.voteItemList.length > 0) {
					let items = []
					for (let i = 0; i < this.vote.voteItemList.length; i++) {
						let item = this.vote.voteItemList[i]
						items.push({
							content: item.value
						})
					}
					let vote = {
						subject: this.vote.title,
						items: items
					}
					params['vote'] = vote
				}
				if (this.realDocList.length > 0) {
					params['documents'] = this.realDocList
				}
				params['richContent'] = this.realRichContentList
				uni.showLoading({
					title: '正在发表...'
				})
				if (this.postId !== null) {
					params['postId'] = this.postId
					updatePost(params).then(res => {
						uni.hideLoading()
						let postId = res.data.post_id
						uni.showToast({
							title: '更新成功'
						})
						checkUserSubscribeMessageStatus()
						uni.navigateBack({
							delta: 1
						})
					}).catch(error => {
						uni.hideLoading()
					})
					return
				}
				createPost(params).then(res => {
					uni.hideLoading()
					let publishPostId = res.data.post_id
					if (this.fromDraft) {
						deleteDraft()
						this.hasDraft = false
						this.fromDraft = false
						uni.showModal({
							title: '发表成功',
							content: '帖子发布成功后，草稿同时被删除~',
							cancelText: '取消',
							confirmText: '查看帖子',
							success(res) {
								if (res.confirm) {
									uni.redirectTo({
										url: '/pages/detail/detail?postId='+publishPostId
									})
								} else {
									uni.navigateBack({
										delta: 1
									})
								}
								checkUserSubscribeMessageStatus()
							}
						})
					} else {
						uni.showModal({
							title: '发表成功',
							cancelText: '取消',
							confirmText: '查看帖子',
							success(res) {
								if (res.confirm) {
									uni.redirectTo({
										url: '/pages/detail/detail?postId='+publishPostId
									})
								} else {
									uni.navigateBack({
										delta: 1
									})
								}
								checkUserSubscribeMessageStatus()
							}
						})
					}
				}).catch(error => {
					uni.hideLoading()
				})
			},
			openVote() {
				let that = this
				uni.navigateTo({
					url: '/pages/lessuse/vote/vote',
					events: {
						// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
						commitEvent: function(data) {
							console.log(data)
							that.vote = data.vote
						}
					},
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						if (that.vote && that.vote.voteItemList && that.vote.voteItemList.length > 0) {
							res.eventChannel.emit('acceptDataFromOpenerPage', {
								vote: that.vote
							})
						}
					}
				})
			},
			chooseColor(index, subIndex) {
				let subItem = this.expandMenuList[index]
				this.dataList[this.textColorSettingIndex].text_color = subItem[subIndex]
			},
			showExpandMenuAction(e) {
				this.textColorSettingIndex = e.currentTarget.dataset.index
				this.x = e.touches[0].clientX
				this.y = e.touches[0].clientY
				this.showExpandMenu = !this.showExpandMenu
			},
			textFontSize(index, size) {
				this.dataList[index].font_size_name = size
				if (size == 'xl') {
					this.dataList[index].font_size = this.fontSizeXl
					this.dataList[index].display_font_size = this.displayFontXl
				}
				if (size == 'lg') {
					this.dataList[index].font_size = this.fontSizeLg
					this.dataList[index].display_font_size = this.displayFontLg
				}
				if (size == 'df') {
					this.dataList[index].font_size = this.fontSizeDf
					this.dataList[index].display_font_size = this.displayFontDf
				}
			},
			textBoldAction(index) {
				this.dataList[index].is_bold = !this.dataList[index].is_bold
			},
			swapItem(index1, index2) {
				this.dataList[index1] = this.dataList.splice(index2, 1, this.dataList[index1])[0];
			},
			upAction(index) {
				if (index == 0) {
					uni.showToast({
						icon: 'none',
						title: '无法再上移'
					})
					return
				}
				this.swapItem(index, index - 1)
			},
			downAction(index) {
				if (index == this.dataList.length - 1) {
					uni.showToast({
						icon: 'none',
						title: '无法再下移'
					})
					return
				}
				this.swapItem(index, index + 1)
			},
			deleteAction(index) {
				if (this.dataList.length == 1) {
					uni.showToast({
						icon: 'none',
						title: '请至少保留一块内容！'
					})
					return
				}
				let needTip = false
				//元素内容是不是空
				let subItem = this.dataList[index]
				if (subItem.type == 'text' && subItem.content && subItem.content.length > 0) {
					needTip = true
				} else if (subItem.type == 'big_image' && subItem.image && subItem.image.local && subItem.image.local
					.length > 0) {
					needTip = true
				} else if (subItem.type == 'small_image' && subItem.image_list.length > 0) {
					needTip = true
				} else if (subItem.type == 'video' && subItem.local && subItem.local.length > 0) {
					needTip = true
				}
				if (needTip) {
					let that = this
					uni.showModal({
						title: '删除提示',
						content: '确认需要删除当前内容块吗?',
						cancelText: '手滑了',
						confirmText: '确认删除',
						success(res) {
							if (res.confirm) {
								that.dataList.splice(index, 1)
								//是不是空了
								if (that.dataList.length == 0) {
									that.dataList.push({
										type: 'text',
										type_name: "文字",
										content: '',
										is_bold: false,
										font_size: this.fontSizeLg,
										display_font_size: this.displayFontLg,
										font_size_name: 'df',
										text_color: 'black'
									})
								}
							}
						}
					})
				} else {
					this.dataList.splice(index, 1)
				}

			},
			randomString(e) {
				e = e || 32
				var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"
				let a = t.length
				let n = "";
				for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
				return n
			},
			ChooseBigImage(index) {
				let existCount = this.existImageCount()
				if (existCount >= this.maxImageCount) {
					uni.showModal({
						title: '图片上传数量限制',
						content: '最多只能上传' + this.maxImageCount + '张图片,请合理规划~'
					})
					return
				}
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: (res) => {
						let timestamp = new Date().getTime()
						let fileKey = String(timestamp)
						let random = this.randomString(6)
						fileKey += random
						let item = {
							'local': res.tempFilePaths[0],
							'remote': null,
							'is_uping': false,
							'fileKey': fileKey,
						}
						this.dataList[index].image = item
						this.dataList[index].image.is_uping = true
						uploadImage(this.dataList[index].image.local, this.dataList[index].image.fileKey, (
							imgUrl) => {
							console.log(imgUrl)
							this.dataList[index].image.remote = imgUrl
							this.dataList[index].image.is_uping = false
						}, (error) => {
							this.dataList[index].image.is_uping = false
						})
					}
				});
			},
			existImageCount() {
				let reachMaxImageCount = false
				let existImageCount = 0
				this.dataList.forEach(item => {
					if (item.type == 'big_image') {
						if (item.image !== null) {
							existImageCount++
						}
					}
					if (item.type == 'small_image') {
						if (item.image_list.length > 0) {
							existImageCount += item.image_list.length
						}
					}
				})
				return existImageCount
			},
			addNewPart(item) {
				console.log(item);
				if (item.action == 'text') {
					this.dataList.push({
						type: 'text',
						type_name: '文字',
						content: '',
						is_bold: false,
						font_size: this.fontSizeLg,
						display_font_size: this.displayFontLg,
						font_size_name: 'lg',
						text_color: 'black'
					})
					return
				}
				if (item.action == 'big_image' || item.action == 'small_image') {
					let existCount = this.existImageCount()
					if (existCount >= this.maxImageCount) {
						uni.showModal({
							title: '最多只能上传' + this.maxImageCount + '张图片,请合理规划~'
						})
						return
					}
				}
				if (item.action == 'big_image') {
					this.dataList.push({
						type: 'big_image',
						type_name: '大图',
						image: null,
					})
					return
				}
			},
			contentUpdate(e) {
				let index = e.currentTarget.dataset.index
				this.dataList[index].content = e.detail.value
			},
			ChooseImage(index) {
				let existCount = this.existImageCount()
				if (existCount >= this.maxImageCount) {
					uni.showModal({
						title: '最多只能上传' + this.maxImageCount + '张图片,请合理规划~'
					})
					return
				}
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: (res) => {
						let subItem = this.dataList[index]
						for (let index = 0; index < res.tempFilePaths.length; index++) {
							let timestamp = new Date().getTime()
							let fileKey = String(timestamp)
							let random = this.randomString(6)
							fileKey += random
							let item = {
								'local': res.tempFilePaths[index],
								'remote': null,
								'is_uping': false,
								'fileKey': fileKey,
							}
							subItem.image_list.push(item)
						}
						subItem.image_list.forEach(item => {
							if (item.is_uping == false && item.remote == null) {
								item.is_uping = true
								uploadImage(item.local, item.fileKey, (imgUrl) => {
									console.log(imgUrl)
									item.remote = imgUrl
									item.is_uping = false
								}, (error) => {
									item.is_uping = false
								})
							} else {
								console.log('file path is uploading:' + item);
							}
						})
					}
				});
			},
			ViewImage(e) {
				let index = e.currentTarget.dataset.listindex
				let subItem = this.dataList[index]
				console.log(e.currentTarget.dataset.url)
				let currentUrl = e.currentTarget.dataset.url
				if (currentUrl == null || currentUrl.length == 0) {
					return
				}
				let previewImgList = []
				subItem.image_list.forEach(item => {
					previewImgList.push(item.local)
				})
				uni.previewImage({
					urls: previewImgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				console.log(e)
				let index = e.currentTarget.dataset.listindex
				let subItem = this.dataList[index]
				uni.showModal({
					title: '提示',
					content: '确定要删除这张图片吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							subItem.image_list.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			retryUploadBig(index) {
				let subItem = this.dataList[index]
				subItem.image.is_uping = true
				uploadImage(subItem.image.local, subItem.image.fileKey, (imgUrl) => {
					console.log(imgUrl)
					subItem.image.remote = imgUrl
					subItem.image.is_uping = false
				}, (error) => {
					subItem.image.is_uping = false
				})
			},
			retryUpload(item, index, listIndex) {
				let subItem = this.dataList[listIndex]
				subItem.image_list[index].is_uping = true
				uploadImage(item.local, item.fileKey, (imgUrl) => {
					console.log(imgUrl)
					subItem.image_list[index].remote = imgUrl
					subItem.image_list[index].is_uping = false
				}, (error) => {
					subItem.image_list[index].is_uping = false
				})
			}
		}
	}
</script>

<style>

</style>
