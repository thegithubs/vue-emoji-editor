# vue-emoji-editor

### 说明
```
本编辑器是基于HTML5的contenteditable和VUE2.x，可插入emoji、图片等，emoji列表和图片上传逻辑请自行实现，本编辑器只处理传进来的文字图片显示，添加emoji或上传后执行this.$refs.emoji.addEmoji(src) src为图片地址，即可在编辑器内显示出来
```

### 使用方法
```
<emoji-component
  ref="emoji"
  @change="change"
/>

import EmojiComponent from './components/EmojiComponent.vue'

具体见app.vue
```

### Attributes
```
disabled //是否禁用
max //可输入的最大长度 等于0则不限制
showWordLimit //是否显示输入字数统计 max等于0则不显示
clearable //是否可清空
placeholder //占位符
value //绑定值
```

### Events
```
change	绑定值被改变时触发
```

### Methods
```
clear 清除内容
addEmoji 添加表情或图片 参数 (src)
getContent 获取内容
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
