<template>
  <div id="app">
    <emoji-component
			ref="emoji"
			@change="change"
		/>
		<button class="button" @click="getcontent">获取内容</button>
		<button class="button" @click="showEmoji = !showEmoji">添加emoji</button>
		<div class="emoji-list" v-if="showEmoji">
			<span v-for="(emoji, n) of emojis" :key="n">
				<img :src="emoji.src" :title="emoji.title" @click="addEmoji(emoji.src)" />
			</span>
		</div>
		<div class="content">
			<p>输出内容：</p>
			<div class="out" v-html="content"></div>
		</div>
  </div>
</template>

<script>
//import EmojiComponent from './components/EmojiComponent.vue'
import EmojiComponent from 'vue2-emoji-editor'

export default {
  name: 'app',
  components: {
    EmojiComponent
  },
	data(){
		return {
			content: '',
			showEmoji: false,
			emojis: [
				{
					src: 'http://www.fuhao114.com/uploads/allimg/150628/0Z04H148-22.png',
					title: '笑哭'
				},
				{
					src: 'http://www.fuhao114.com/uploads/allimg/150628/0Z04H137-11.png',
					title: '调皮'
				},
				{
					src: 'http://www.fuhao114.com/uploads/allimg/150628/0Z04H424-7.png',
					title: '飞吻'
				},
				{
					src: 'http://www.fuhao114.com/uploads/allimg/150628/0Z04LL5-4.png',
					title: '可爱'
				},
				{
					src: 'http://www.fuhao114.com/uploads/allimg/150628/0Z04K059-55.png',
					title: '幸运'
				},
			]
		}
	},
	methods: {
		addEmoji(src){
			this.showEmoji = false
			this.$refs.emoji.addEmoji(src)
		},
		getcontent(){
			this.content = this.$refs.emoji.getContent()
		},
		change(content){
			//内容改变时触发
			this.getcontent()
			//console.log(content)
		}
	}
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto 0;
	width: 500px;
	.button {
		background: #409eff;
		margin: 0 8px;
		padding: 6px 10px;
		color: #fff;
		border-radius: 5px;
		cursor: pointer;
		border: 0;
		font-size: 14px;
		outline: none;
		&:active {
			border: 0;
			outline: none;
		}
		&:hover {
			opacity: .8;
		}
	}
	.content {
		margin: 40px 0;
		text-align: left;
		.content {
			margin-top: 16px;
		}
	}
	.emoji-list {
		background: #fff;
		border: 1px solid #ddd;
		margin-top: 12px;
		padding: 4px;
		text-align: left;
		span {
			width: 32px;
			height: 32px;
			line-height: 32px;
			text-align: center;
			border: 1px solid #fff;
			display: inline-block;
			&:hover {
				border: 1px solid #ddd;
			}
			img {
				width: 24px;
				height: 24px;
				vertical-align: middle;
			}
		}
	}	
}
</style>
