<template>
  <div class="about">
   
 <div align="right" style="padding-right:50px"> 
     <h3>
        <span v-if="user.type=='usuario'" >Usuario:</span>
          <span v-else >Soporte:</span>
          {{user.name}}</h3></div>
 
  
 <div align="center">
  <h1 style="background-color:#E0F2F1">Lista de notificaciones</h1>
  </div>
 
 <div  align="right" style="padding-right:150px">
 <v-btn v-if="user.type=='usuario'"  @click.prevent="create()" color="primary">
                        Registrar Notificacion</v-btn>   
  </div>

      <table-notification
                          :headers="headers"
                        :notifications="notifications"
                        :user="user"
                        @mostrar="show"
                         @edit="openEdit"
                         @delete="openEliminar"
                         />

 <v-dialog
                v-model="dialog"
                width="500">
            <v-card>
                <v-card-title
                        class="headline grey lighten-2"
                        primary-title
                >
                   Notificacion 
                </v-card-title>

                <v-card-text>
                    <form-notification
                            :notification="notification"                         
                            :editarDatos="editarDatos"
                            @saveSms="save"
                             @editSms="edit"
                            />
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                 </v-card-actions>
            </v-card>
        </v-dialog>


  </div>
</template>


<script>
  import TableNotification from './../components/TableNotification'
  import FormNotification from './../components/FormNotification'
 import axios from "axios";
    export default {
        name: "usuario",
        components:{
          TableNotification,
          FormNotification
        },
       props: {
            user:{
              type:Object 
            }
          },
        data: () => ({
            editarDatos:{            
                    valor: 0,
            },
            dialog: false,
            notification: [],
            notifications: [],
            editnotification: 0,
            headers: [
                {
                    text: 'Titulo ',                
                },
                {
                    text: 'Descripcion',
                },
                {
                    text: 'Area',
                }
                ,{
                    text: 'Opciones',
                }
            ],
        }),
        created(){
          this.show()
        },
        methods: {
            show() {               
                let vm = this 
                vm.notifications=[]
                 axios.get("http://localhost:3001/notification")
                    .then(response => {
                      vm.notifications = response.data
                     })   
                      .catch(err => {
                         alert("Error")
                         })     
                        

            },
            create(){
              let vm=this
               vm.notification=[]
            vm.editarDatos.valor=0
             vm.dialog = true;
              console.log(vm.editarDatos.valor)
            },
            openEdit(id){
             let vm=this;
             vm.notification=[]
             vm.editarDatos.valor=1
                  axios.get("http://localhost:3001/notification/"+id)
                    .then(response => {
                      vm.dialog = true;
                      vm.notification = response.data;
                      vm.editnotification=id
                     })   
                      .catch(err => {
                         alert("Error")
                         }) 
             
             console.log(id);
           
            },
            edit(){
              let vm=this;
              let data={
                id_user: 1,
                   titulo: vm.notification.titulo,
               descripcion: vm.notification.descripcion,
               area: vm.notification.area
              }
              let url="http://localhost:3001/notification/";
                  axios({
                    method: 'put',
                    url: url+'/'+vm.editnotification,
                    data: data
                }).then(response => {
                      vm.notification=[]
                      vm.dialog = false;
                      vm.show();
                     })   
                      .catch(err => {
                         alert("Error")
                         }) 
            },
            openEliminar(id){
               let vm=this
                let url="http://localhost:3001/notification"
                     axios({
                            method: 'delete',
                            url: url+'/'+id,
                            data:{id: id}

                        }).then(function (response) {                         
                            vm.show();
                        }).catch(function (error) {
                            toastr.warning('Si persiste este problema comuniquese con el Soporte al cliente "Soporte NextSofts Global Corporation"', 'Error en el servidor');
                      
                        });
            },
            save(){
              let vm=this
                let urlResult="http://localhost:3001/notification"
                let data={
                    	    id_user: 1,
                            titulo: vm.notification.titulo,
                            descripcion: vm.notification.descripcion,
	                        area: vm.notification.area
                }
                axios({
                    method:'post',
                    url: urlResult,
                    data: data
                }).then(function (response) {
                     vm.dialog = false;
                     vm.notification=[]
                     vm.show()
                     
                }).catch(function (error) {
                   
                });
            
               
            }
        }
    }
</script>

<style scoped>
</style>