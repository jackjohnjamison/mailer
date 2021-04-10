const Counter = {
    data() {
        return {
            counter: 10
        }
    }
}
  
Vue.createApp(Counter).mount('#counter')