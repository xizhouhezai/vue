<template>
  <div class="home">
    <mt-header fixed title="首页" ></mt-header>
    <mt-navbar class="tab" fixed v-model="selected">
      <mt-tab-item
        v-for="(item, index) in league"
        :key="index"
        :id="index"
      ><span @click="selectItem(item)">{{item}}</span></mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected" style="margin-top: 100px">
      <mt-tab-container-item
        v-for="(item, index) in league"
        :key="index"
        :id="index"
      >
        <cell v-for="(item, index) in leagueData" :key="index" :id="index" :title="item.c4T1 + ' VS ' + item.c4T2"></cell>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import axios from 'axios'
import { Header, Navbar, TabItem, TabContainer, TabContainerItem, Cell } from 'mint-ui'

const MtHeader = Header
const MtNavbar = Navbar
const MtTabItem = TabItem
const MtTabContainer = TabContainer
const MtTabContainerItem = TabContainerItem

export default {
  data () {
    return {
      selected: 0,
      league: ['中超', '英超', '西甲', '意甲', '德甲', '法甲'],
      leagueData: null
    }
  },
  mounted () {
    if (!this.leagueData) {
      this.getLeagueData('中超')
    }
  },
  methods: {
    selectItem (name) {
      this.getLeagueData(name)
    },
    getLeagueData (type) {
      axios.get('http://localhost:3333/data/league?type=' + type).then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          this.leagueData = res.data.items.result.views.saicheng1
          console.log(this.leagueData)
        }
      })
    }
  },
  components: {
    MtHeader,
    MtNavbar,
    MtTabItem,
    MtTabContainer,
    MtTabContainerItem,
    Cell
  }
}
</script>

<style lang="css">
  .mint-navbar {
    margin-top: 40px;
  }
</style>
