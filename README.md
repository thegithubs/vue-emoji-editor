# vue-emoji-editor

![Image text](https://github.com/thegithubs/vue-emoji-editor/blob/master/public/intro.png?raw=true)
[点击查看效果图](https://picabstract-preview-ftn.weiyun.com/ftn_pic_abs_v3/f5b789ab2a8ab02bbbf5125b999320d48c65f054161320b084f7f9df9b5832e34dcd0030fadd590e2d4c85b91694bc00?pictype=scale&from=30013&version=3.3.3.3&uin=512111395&fname=intro.png&size=750)

### 说明
```
本编辑器是基于HTML5的contenteditable和VUE2.x实现，可插入emoji、图片等
emoji列表和图片上传逻辑请自行实现，本编辑器只处理传进来的文字图片显示
添加emoji或上传后执行this.$refs.emoji.addEmoji(src) 即可在编辑器内显示出来
```

### 使用方法
## NPM
```
npm i vue2-emoji-editor

import EmojiComponent from 'vue2-emoji-editor'

<emoji-component
  ref="emoji"
  @change="change"
/>
```

### Attributes
```
参数            说明                                  类型     默认值
disabled       是否禁用                               boolean  false
max            可输入的最大长度 等于0则不限制          number   0
showWordLimit  是否显示输入字数统计 max等于0则不显示   boolean  true
clearable      是否可清空                             boolean  true
placeholder    占位符                                string    请输入内容
value          绑定值                                string     -
```

### Events
```
事件名称    说明                 回调参数
change	   绑定值被改变时触发    内容content
```

### Methods
```
方法名       说明            回调参数
clear       清除内容         -
addEmoji    添加表情或图片   src
getContent  获取内容         -
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
