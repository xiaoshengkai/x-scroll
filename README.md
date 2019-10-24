# x-scroll

> 上拉加载下拉刷新组件

## 使用方式

#### 下拉

参数 | 说明| 类型| 默认值
---|---|---|---|
down | 下拉配置项 | Object | {}
up | 上拉配置项 | Object | {}
@down-pull | 下拉事件 | Function | ---
@up-pull | 上拉事件 | Function | ---

##### down / up

参数 | 说明| 类型| 默认值
---|---|---|---|
offsetTop | 距离顶部距离滑动 | number | 100

##### @up-pull/@down-pull

回调中的e对象说明：

参数 | 说明| 类型| 默认值
---|---|---|---|
e.load | 当前次下拉动作完成 | function | ---
e.reload | 重新刷新 | function | ---
e.complete | 不再下拉或者刷新，over | function | ---


### demo 
```

<style>
* {
	margin: 0;
	padding: 0;
}
#app {
	min-height: 100vh;
}
p {
	font-size: 60px;
	padding: 10px 0;
	margin: 0 10px;
	border-bottom: 1px solid #ddd;
}
</style>
<template>
	<XScroll
		:down="down"
		:up="up"
		@down-pull="downPull"
		@up-pull = "upPull"
		>
    	<div id="app">
    		<p v-for="(value, index) in list" :index="index">{{ index }}</p>
    	</div>
    </XScroll>
</template>
<script>
import XScroll from './components/scroll.vue'
const list = [1,23,4,5,6,7,8,89,901,2,2,2]

export default {
	data () {
		return {
			down: {
				offsetTop: 100
			},
			up: {
				offsetTop: 150
			},
			list,
		}
	},
	methods: {
		downPull (e) {
			setTimeout(() => {
				this.list = list
				e.load()
			}, 2000)
		},
		upPull (e) {
			console.log(this.list)
			setTimeout(() => {
				this.list = [...this.list, ...list]
				console.log(this.list.length)
				if (this.list.length > 30) {
					e.complete()
				} else {
					e.load()
				}
			}, 2000)
		},
	},
	components: {
		XScroll,
	}
}

</script>
```

