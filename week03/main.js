import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.3/vue.esm-browser.prod.min.js';
const url = "https://vue3-course-api.hexschool.io/v2";
const loginAPI = `${url}/admin/signin`;
const user = {
  "username": "",
  "password": ""
}
  
const app = createApp({
  data() {
    return {
      url,
      user,
      message:''
    }
  },
  methods:{
    login(){
      console.log('login');
      axios.post(loginAPI,user)
        // 成功
        .then((res) => {
          // expired 到期日
          // token
          // uid 資料庫的代號
          const { token , expired } = res.data;
          // console.log(token , expired);
          document.cookie = `ireneVueToken=${token}; expires=${new Date(expired)};`;
          location.href = 'editproducts.html';
        })
        // 失敗
        .catch((err) => {
          // 失敗顯示的訊息
          this.message = err.data.message
        })
    },
  },
  // mounted,
})

app.mount('#app')
