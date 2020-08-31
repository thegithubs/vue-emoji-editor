# vue-emoji-editor

![Image text](https://img-cdn-aliyun.dcloud.net.cn/stream/plugin_screens/c7d536b0-e747-11ea-b015-5794bd84f21f_0.png?v=1598418218)
[点击查看效果图Effect Picture](https://img-cdn-aliyun.dcloud.net.cn/stream/plugin_screens/c7d536b0-e747-11ea-b015-5794bd84f21f_0.png?v=1598418218)

## 说明 Introduction
```
本输入组件是基于HTML5的contenteditable和vue实现，可插入emoji、图片等
emoji列表和图片上传逻辑请自行实现，本组件只处理传进来的文字图片显示
添加emoji或上传后执行this.$refs.emoji.addEmoji(src) 即可在组件内显示
This component is based on HTML5 contenteditable and vue, 
which can insert emoji, pictures, etc
Please implement the emoji list and picture upload logic by yourself
Use this.$refs. Emojis. AddEmoji (SRC) to display in the component 
after adding emoji or uploading
```

## 安装 Install
```
npm i vue2-emoji-editor
```

## 使用 Quickstart
```
import EmojiComponent from 'vue2-emoji-editor'

<emoji-component
  ref="emoji"
  @change="change"
/>
```

## 属性 Attributes
###
<table style="width: 100%;">
	<tr>
		<th>参数</th><th>说明</th><th>类型</th><th>默认值</th>
	</tr>
	<tr>
		<td>disabled</td><td>是否禁用</td><td>boolean</td><td>false</td>
	</tr>
	<tr>
		<td>max</td><td>可输入的最大长度  0则不限制</td><td>number</td><td>0</td>
	</tr>
	<tr>
		<td>clearable</td><td>是否可清空</td><td>boolean</td><td>true</td>
	</tr>
	<tr>
		<td>placeholder</td><td>占位符</td><td>string</td><td>请输入...</td>
	</tr>
	<tr>
		<td>value</td><td>绑定值</td><td>string</td><td>-</td>
	</tr>
	<tr>
		<td>autofocus</td><td>是否自动聚焦</td><td>boolean</td><td>false</td>
	</tr>
	<tr>
		<td>editorStyle</td><td>输入框样式</td><td>string</td><td>-</td>
	</tr>
	<tr>
		<td>border</td><td>默认边框</td><td>string</td><td>1px solid #ddd</td>
	</tr>
	<tr>
		<td>borderActive</td><td>激活时边框</td><td>string</td><td>1px solid #409eff</td>
	</tr>
	<tr>
		<td>imgStyle</td><td>输入框内图片样式，如width: 52px</td><td>string</td><td>-</td>
	</tr>
</table>


## 事件 Events
###
<table style="width: 100%;">
	<tr>
		<th>事件名称</th><th>说明</th><th>回调参数</th>
	</tr>
	<tr>
		<td>change</td><td>绑定值被改变时触发</td><td>(value, length)</td>
	</tr>
	<tr>
		<td>focus</td><td>输入框获得焦点时触发</td><td>(event: Event)</td>
	</tr>
	<tr>
		<td>blur</td><td>输入框失去焦点时触发</td><td>(event: Event)</td>
	</tr>
	<tr>
		<td>clear</td><td>点击清除按钮时触发</td><td>-</td>
	</tr>
</table>

## 方法 Methods
###
<table style="width: 100%;">
	<tr>
		<th>方法名</th><th>说明</th><th>回调参数</th>
	</tr>
	<tr>
		<td>addEmoji</td><td>添加表情或图片</td><td>(value, length)</td>
	</tr>
	<tr>
		<td>clear</td><td>清除内容</td><td>-</td>
	</tr>
	<tr>
		<td>getContent</td><td>获取内容</td><td>-</td>
	</tr>
	<tr>
		<td>focus</td><td>使输入框获取焦点</td><td>-</td>
	</tr>
	<tr>
		<td>blur</td><td>使输入框失去焦点</td><td>-</td>
	</tr>
</table>

## License
```
[MIT](http://opensource.org/licenses/MIT/)
Copyright (c) 2020-present, thegithubs
```

