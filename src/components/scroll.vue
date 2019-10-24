<style>
#x-scroll {
	transform: translateY(0);
	transition: all .2s ease-in;
}
.down,
.up {
	width: 100%;
	font-size: 30px;
	background-color: #fff;
	text-align: center;
	transform: scaleY(1.1);
	padding: 15px 0px;
}
</style>
<template>
	<div id="x-scroll" ref="xscroll">
		<div class="down" v-show="downLoading">{{ downText }}</div>
		<slot></slot>
		<div class="up" v-show="upLoading">{{ upText }}</div>
	</div>
</template>
<script>
	
export default {
	data () {
		return {
			downText: '',
			downLoading: false,

			upText: '',
			upLoading: false,


			startY: 0,
			move: 0,


			/* 定义实例方法 */
			setRefXscrollFun: {
				load: () => {
					if (this.move > 0) {
						this.downLoading = false
					} else {
						this.upLoading = false
					}
				},
				reload: this.initAddevent,
				complete: () => {
					this.setRefXscrollFun.load()
					this.removeAddevent()
				}
			}
		}
	},
	props: {
		down: {
			type: Object,
			default: () => {
				offsetTop: 100
			}
		},
		up: {
			type: Object,
			default: () => {
				offsetTop: 100
			}
		}
	},
	methods: {
		/*
		* 开始监听
		*/
		initAddevent () {
			this.$nextTick(() => {
				const el = this.$refs.xscroll
				el.addEventListener('touchstart', this.refreshTouchStart)
				el.addEventListener('touchmove', this.refreshTouchMove)
				el.addEventListener('touchend', this.refreshTouchEnd)
			})
		},
		/*
		* 移除监听
		*/
		removeAddevent () {
			this.$nextTick(() => {
				const el = this.$refs.xscroll
				el.removeEventListener('touchstart', this.refreshTouchStart)
				el.removeEventListener('touchmove', this.refreshTouchMove)
				el.removeEventListener('touchend', this.refreshTouchEnd)
			})
		},
		setTranslateY (num) {
			this.$refs.xscroll.style.transform = 'translateY('+ num +'px)'
		},
		/**
		* 开始移动 定位
		*/
		refreshTouchStart (e) {
			// 数据获取中，禁止再次触发
			if (this.downLoading || this.upLoading) {
				return
			}
			let touch = e.targetTouches[0]
			this.startY = touch.screenY
		},
		/**
		* 移动 测距
		*/
		refreshTouchMove (e) {
			let touch = e.targetTouches[0]
			this.move = touch.screenY - this.startY

			if (this.move > 0) { // 判断上拉还是下拉
				this.downText = '往下拉'
				this.downLoading = true

				if (this.move >= this.down.offsetTop) {
					this.downText = '请松开手手了'
					return
				}
			} else {
				this.upText = '往上拉'
				this.upLoading = true

				if (Math.abs(this.move) >= this.up.offsetTop) {
					this.upText = '请松开手手了'
					return
				}
			}
			this.setTranslateY(this.move)
		},
		/**
		* 移动结束
		*/
		refreshTouchEnd (e) {
			// 判断 请松开手的阶段继续
			if (this.move > 0) {
				if (this.move >= this.down.offsetTop) {
					this.downText = '请求数据中。。。'
					this.$emit('down-pull', this.setRefXscrollFun)
				}
			} else {
				if (Math.abs(this.move) >= this.up.offsetTop) {
					this.upText = '请求数据中。。。'
					this.$emit('up-pull', this.setRefXscrollFun)
				}
			}
			this.setTranslateY(0)
		},
	},
	mounted () {
		this.initAddevent()
	},
}
</script>