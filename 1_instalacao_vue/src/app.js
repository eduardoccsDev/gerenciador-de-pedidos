const MyNameApp = {
    data(){
        return{
            name:"",
            age: 21,
            inputName:""
        }
    },
    methods:{
        submitForm(e){
            e.preventDefault();
            this.name = this.inputName;
        }
    }
}

Vue.createApp(MyNameApp).mount("#app");