<!-- 意见反馈 -->
<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">意见反馈</block>
		</cu-custom>
		<view class="wrap">
			<view class="formPost">
				<u-form :model="form" label-position="top">
					<u-form-item label="反馈内容">
						<u-input v-model="form.content" border="surround" type="textarea" placeholder="请输入反馈内容"/>
					</u-form-item>
					<u-form-item label="联系人">
						<u-input v-model="form.name" border="surround" placeholder="请输入联系人"/>
					</u-form-item>
					<u-form-item label="手机号码">
						<u-input v-model="form.phone" border="surround" placeholder="请输入手机号码"/>
					</u-form-item>
				</u-form>
				<u-button style="color: #fff;background-color: #80C042;" @click="submit">提交</u-button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				content: '',
				name: '',
				phone: ''
			}
		};
	},
	onLoad() {
		
	},
	computed: {
		
	},
	methods: {
		
	}
};
</script>

<style lang="scss" scoped>
	.formPost {
		padding: 0 30rpx;
	}
</style>

