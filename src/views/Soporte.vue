<template>
  <div class="about">
  
      <pagina-notification
                        :user="user"
                         />


  </div>
</template>


<script>
  import paginaNotification from './../components/paginaNotification'
 import axios from "axios";
    export default {
        name: "usuario",
        components:{
          paginaNotification
        },
       
        data: () => ({
            user: {},
        }),
        created(){
          this.show()
        },
        methods: {
            show() {               
                let vm = this    
                         
                          axios.get("http://localhost:3001/users")
                    .then(response => {
                      vm.user = response.data[1]
                     })   
                      .catch(err => {
                         alert("Error")
                         })   

            }
        }
    }
</script>

<style scoped>
</style>