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
```
| 参数 | 说明 | 类型 | 默认值 |
| ---- | ----- | ------ | ------ |
| disabled | 是否禁用 | boolean | false |
| max | 可输入的最大长度  0则不限制 | number |  0 |
| clearable | 是否可清空 | boolean | true |
| placeholder | 占位符 | string | 请输入... |
| value |  绑定值 | string | - |
| autofocus | 是否自动聚焦 | boolean | true |
| editorStyle | 输入框样式，如height:100px | string | - |
| border | 默认边框 | string | 1px solid #ddd |
| borderActive | 激活时边框 | string | 1px solid #409eff |
| imgStyle | 输入框内图片样式，如width: 52px | string | - |
```

## 事件 Events
```
事件名称    说明                  回调参数
change	   绑定值被改变时触发     (value, length)
focus	     输入框获得焦点时触发   (event: Event)
blur	     输入框失去焦点时触发   (event: Event)
clear	     点击清除按钮时触发     -
```

## 方法 Methods
```
方法名       说明                回调参数
addEmoji    添加表情或图片       src
clear       清除内容             -
getContent  获取内容             -
focus       使输入框获取焦点      -
blur        使输入框失去焦点      -
```

## License
```
[MIT](http://opensource.org/licenses/MIT/)
Copyright (c) 2020-present, thegithubs
```

