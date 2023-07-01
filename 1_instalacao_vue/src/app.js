const MyNameApp = {
    data(){
        return{
            name:"Eduardo",
            age: 21
        }
    }
}

Vue.createApp(MyNameApp).mount("#app");