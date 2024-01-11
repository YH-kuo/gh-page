import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.3/vue.esm-browser.prod.min.js'

const api_path = 'irenevue2023';
const url = "https://vue3-course-api.hexschool.io/v2";
const productsAPI = `${url}/api/${api_path}/products/all`;
const checkAPI = `${url}/api/user/check`;

// 產品資料格式

const app = createApp({
  data() {
    return {
      temp:{}, 
      products:[],
    }
  },
  methods:{
    getProducts(){
      // 取得產品列表
      axios.get(productsAPI)
      .then((res) => {
          this.products = res.data.products;
      })
    }
  },
  mounted(){
    // 驗證登入
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)ireneVueToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1",
    );
    axios.defaults.headers.common['Authorization'] = token;
    axios.post(checkAPI)
      .then((res) => {
          console.log('驗證成功');
          this.getProducts();
      })
      .catch((err) => {
        // 驗證失敗 alert
        alert(err.data.message);
        // 跳至登入頁面
        location.href = 'index.html';
      })
  },
})

app.mount('#app')


