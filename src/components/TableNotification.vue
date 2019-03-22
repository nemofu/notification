<template>
<div>
  <v-data-table :headers="headers" :items="notifications" class="elevation-1">
            <template v-slot:items="props">

                <td>{{ props.item.titulo }}</td>
                <td>{{ props.item.descripcion }}</td>
                <td>{{ props.item.area }}</td>
                <td>
                    <v-btn v-if="user.type=='usuario'" @click.prevent="editarNotifacion(props.item.id)" color="success">
                        Editar</v-btn>
                          <v-btn v-if="user.type=='usuario'" @click.prevent="eliminarNotifacion(props.item.id)" color="default">
                        Eliminar</v-btn>

                          <v-btn @click.prevent="verMensajes(props.item.id)" color="secondary">
                        Ver Mensajes</v-btn>
                </td>
            </template>
        </v-data-table>
        <v-card>
    <v-card-text>
      <p class="text-lg-right">Total de notificaciones:
      {{total}}
      </p>
      </v-card-text>
  </v-card>
     
 <v-dialog
                v-model="dialog_mensajes"
                width="500">
            <v-card>
                <v-card-title
                        class="headline grey lighten-2"
                        primary-title
                >
                   Mensajes
                </v-card-title>

                <v-card-text>
                    <form-mensajes
                            :mensaje="mensaje"                         
                            @saveMensaje="saveMensaje"
                           
                            />
                              <table-mensajes
                             :headers_data="headers_data"
                            :mensaje="mensaje"  
                            :user="user"                       
                            @deleteMensaje="deleteMensaje"
                           
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
 import FormMensajes from './../components/FormMensajes'
 import TableMensajes from './../components/Tablemensajes'
 import axios from "axios";
 export default {
        name: "TableNotification",
        components:{
         FormMensajes,
         TableMensajes
        },
        computed:{
           total(){
               let total=0;
               this.notifications.forEach((notification)=>{
                  total=total+1
               })
               return total;
           }
        },
       
        data: () => ({
         dialog_mensajes: false,
         mensaje:[],
         headers_data: [
           {
                    text: 'Remitente ',

                },
               {
                    text: 'Respuesta ',

                },
                {
                    text: 'Opciones',
                },
            ],
          id_notification:0
        }),
        
        props: {
             notifications:{
                type: Array
            },
             headers:{
                type:Array
            },
            user:{
              type:Object 
            }
          },
           methods:{
          editarNotifacion(id){
            this.$emit('edit',id)
          },
          eliminarNotifacion(id){
            this.$emit('delete',id)
          },
          verMensajes(id){
           this.dialog_mensajes=true
            let vm = this 
            vm.id_notification=id
                vm.mensaje=[]
                 axios.get("http://localhost:3001/mensajes?id_notificacion="+id)
                    .then(response => {
                      vm.mensaje = response.data
                      console.log(response.data);
                     })   
                      .catch(err => {
                         vm.mensaje=[]
                   
                         }) 

          },
          saveMensaje(){
              let vm=this
                let urlResult="http://localhost:3001/mensajes"
                let data={
                          id_user: vm.user.id,
                          id_notificacion:vm.id_notification,
                          respuesta: vm.mensaje.respuesta
                }
                axios({
                    method:'post',
                    url: urlResult,
                    data: data
                }).then(function (response) {
                     vm.dialog_mensajes = false;
                     vm.verMensajes(vm.id_notification)
                     
                }).catch(function (error) {
                   
                });
            
          },
          deleteMensaje(id){
                 let vm=this
                let url="http://localhost:3001/mensajes"
                     axios({
                            method: 'delete',
                            url: url+'/'+id,
                            data:{id: id}

                        }).then(function (response) {                         
                            vm.verMensajes(vm.id_notification)
                        }).catch(function (error) {
                            toastr.warning('Si persiste este problema comuniquese con el Soporte al cliente "Soporte NextSofts Global Corporation"', 'Error en el servidor');
                      
                        });
          }
           }

 }
 </script>