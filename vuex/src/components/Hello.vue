<template>
  <div class="hello">
    <h1 ref="nums">{{getCount}}</h1>
    <div @click="add">add</div>
    <div class="video">
      <video
        poster="static/logo.png"
        controls controlslist="nodownload" 
        :src="videoSrc" ref="v" 
        @play="ready" 
        @timeupdate="updateTime" 
        autoplay
        muted
      ></video>
    </div>
    <div class="progress-wrapper">
      <span class="time time-l">0</span>
      <div class="progress-bar" ref="progressBar">
        <div class="bar-inner">
          <div class="progress" ref="progress"></div>
          <div class="progress-btn-wrapper" ref="progressBtn">
            <div class="progress-btn"></div>
          </div>
        </div>
      </div>
      <span class="time time-r">{{format(duration)}}</span>
    </div>
    <div>{{duration}}</div>
    <button @click="play">play</button>
    <button @click="pause">stop</button>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'hello',
  data () {
    return {
      videoSrc: 'static/01.mp4',
      isplay: false,
      duration: 0,
      percent: 0
    }
  },
  computed: {
    ...mapGetters([
      'getCount'
    ])
  },
  mounted () {
    // console.log(this.$refs.v.duration)
    // this.$refs.v.play()
    this.init()
  },
  methods: {
    ...mapMutations({
      increment: 'increment'
    }),
    add () {
      this.increment(this.$refs.nums.textContent)
    },
    init () {
      if (!this.isplay) {
        this.isplay = true
      }
    },
    ready (e) {
      if (this.isplay) {
        this.duration = this.$refs.v.duration
        this.pause()
        this.isplay = false
      }
    },
    updateTime () {
      // console.log(this.$refs.v.duration)
    },
    play () {
      this.$refs.v.play()
    },
    pause () {
      this.$refs.v.pause()
    },
    format (duration) {
      let result = ''
      let interval = Math.floor(duration)
      let min = Math.floor(interval / 60)
      let sec = interval % 60
      result = min + ' : ' + sec
      return result
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.video {
  width: 100%;
  height: auto;
}
video {
  width: 100%;
}
.progress-bar {
  width: 100%;
  height: 30px;
}
.bar-inner {
  position: relative;
  top: 13px;
  height: 4px;
  background: rgba(0, 0, 0, 0.3);
}
.progress {
  position: absolute;
  height: 80%;
  background: #ffcd32;
}
.progress-btn-wrapper {
  position: absolute;
  left: -8px;
  top: -13px;
  width: 30px;
  height: 30px;
}
.progress-btn {
  position: relative;
  top: 7px;
  left: 7px;
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  border: 3px solid #fff;
  border-radius: 50%;
  background: #ffcd32;
}
.progress-wrapper {
  display: flex;
  align-items: center;
  width: 80%;
  margin: 0px auto;
  padding: 10px 0;
}
.time {
  color: #000;
  font-size: 12px;
  flex: 0 0 32px;
  line-height: 30px;
  width: 30px;
}
.time.time-l {
  text-align: left;
}
.time.time-r {
  text-align: right;
}          
.progress-bar-wrapper {
  flex: 1;
}
            
</style>
