<template>
  <div class="city">
    <search></search>
    <scroll :listenScroll="true" :data="citylist">
      <div>
        <position-box
          :nowCity="nowcity"
          @changeCity="changeCity"
          :chooseCity="chooseCity"
          :historyCity="historyCity"
        ></position-box>
        <city-list :citylist="citylist"></city-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import Search from '@/components/search/search'
import PositionBox from '@/components/position-box/position-box'
import Scroll from '@/base/scroll/scroll'
import CityList from '@/components/city-list/city-list'

import axios from 'axios'

export default {
  data () {
    return {
      citylist: [],
      nowcity: {},
      // 点击选择的城市
      chioceCityName: '',
      historyCity: []
    }
  },
  computed: {
    chooseCity () {
      return this.chioceCityName ? this.chioceCityName : this.nowcity.city
    }
  },
  created () {
    this._getCityList()
    this._getNowCity()
  },
  methods: {
    _getCityList () {
      axios.get('http://localhost:1234/').then((res) => {
        if (res.status === 200) {
          this.citylist = res.data.openCityList
        }
      })
    },
    _getNowCity () {
      this.getLocalStorageCity()
      axios.get('http://localhost:1234/nowcity').then((res) => {
        if (res.status === 200) {
          this.nowcity = res.data
          if (!this.chioceCityName) {
            this.chioceCityName = this.nowcity.city
          }
        }
      })
    },
    // 当选择城市时，将选择的城市放入historyCity
    setHistoryCity (city) {
      if (this.historyCity) {
        for (let key in this.historyCity) {
          if (this.historyCity[key] === city) {
            return false
          }
        }
      }
      this.historyCity.unshift(city)
      this.historyCity = this.historyCity.slice(0, 2)
    },
    // 把点击选择的城市存入localstorage
    setLocalStorageCity (cityArr) {
      localStorage.setItem('historyCity', cityArr)
    },
    // 获取localstorage
    getLocalStorageCity () {
      let city = localStorage.getItem('historyCity')
      if (!city) {
        this.historyCity = []
      } else {
        this.historyCity = city.split(',')
      }
    },
    changeCity (city) {
      this.chioceCityName = city
      this.setHistoryCity(city)
    }
  },
  watch: {
    historyCity (val) {
      this.setLocalStorageCity(val)
    }
  },
  components: {
    Search,
    PositionBox,
    Scroll,
    CityList
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .city
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    color #2c3e50
</style>
