const { createApp } = Vue;

const api_path = 'irenevue2023';
const url = "https://vue3-course-api.hexschool.io/v2";
const getProductsAPI = `${url}/api/${api_path}/admin/products/all`;
const postProductAPI = `${url}/api/${api_path}/admin/product`;
const checkAPI = `${url}/api/user/check`;
let productModal='';
let delProductModal='';

const app = createApp({
  data() {
    return {
      newData:{},
      products:[],
      tempData:{
        imagesUrl: []
      },
      tempImg:'',
      isNew:false,
    }
  },
  methods: {
    getProducts(){
      // 取得產品列表
      axios.get(getProductsAPI)
      .then((res) => {
          this.products = res.data.products;
      })
    },
    updateProducts(){
      let usingAPI = postProductAPI;
      let http = 'post';
      if(this.isNew == false){ //如果是不是新物件 API 帶入item id
        usingAPI = `${postProductAPI}/${this.tempData.id}`
        http = 'put';
      }
      axios[http](usingAPI, { data: this.tempData })// 筆記:文件上的結構 { data: {...} }
      .then((res) => {
        // console.log(res.data.message);
        this.getProducts();
        productModal.hide();
      }).catch((err) => {
        // console.log(err.data.message);
      })
    },
    deleteProduct(){
      let usingAPI = `${postProductAPI}/${this.tempData.id}`
      axios.delete(usingAPI)// 筆記:文件上的結構 { data: {...} }
      .then((res) => {
        // console.log(res.data.message);
        this.getProducts();
        delProductModal.hide();
      }).catch((err) => {
        // console.log(err.data.message);
      })
    },
    openModal(action,item){
      this.resetTempData();
      if(action == 'new'){
        this.isNew = true;
        productModal.show();
      }else if(action == 'edit'){
        this.isNew = false;
        this.tempData = JSON.parse(JSON.stringify(item)); // 筆記:拷貝一份 深層拷貝避免其他圖片被修改
        productModal.show();
      }else if(action == 'delete'){
        this.isNew = false;
        this.tempData = {...item}; // 筆記:拷貝一份 淺層拷貝 因為只要取得id
        delProductModal.show();
      }
    },
    addImgs(){
      this.tempData.imagesUrl.push(this.tempImg);
      this.tempImg='';
    },
    resetTempData(){
      this.tempData={imagesUrl: []}
    },
    removeImg(index){
      this.tempData.imagesUrl.splice(index,1);
    }
  },
  mounted(){
    productModal = new bootstrap.Modal(document.getElementById('productModal'), {
      keyboard: false
    });
    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
      keyboard: false
    });
    // 驗證登入
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)ireneVueToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1",
    );
    axios.defaults.headers.common['Authorization'] = token;
    axios.post(checkAPI)
      .then((res) => {
          // 驗證成功
          // this.getProducts();
          // console.log('驗證成功');
          this.getProducts();
      })
      .catch((err) => {
        // 驗證失敗 alert
        alert(err.data.message);
        // 跳至登入頁面
        location.href = 'index.html';
      })
  },
});

app.mount('#app');