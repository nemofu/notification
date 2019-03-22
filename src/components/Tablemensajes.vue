<template>
<div>
  <v-data-table :headers="headers_data" :items="mensaje" class="elevation-1">
            <template v-slot:items="props">
                 <td v-if="props.item.id_user==1">Usuario</td>
                 <td v-else>Soporte</td>

                <td>{{ props.item.respuesta }}</td>

                <td>
                          <v-btn v-if="user.id==props.item.id_user" @click.prevent="deleteMensaje(props.item.id)" color="default">
                        Eliminar</v-btn>
                      
                </td>
            </template>
        </v-data-table>
           <v-card-text>
      <p class="text-lg-right">Total de mensajes:
      {{total}}
      </p>
      </v-card-text>
</div>
</template>

<script>

    export default {
        name: "mensaje-form",
        props: [
            'mensaje',
            'headers_data',
            'user'
        ],
        data: () => ({
            //datosParaEnviar:''
          

        }),
        computed:{
           total(){
               let total=0;
               this.mensaje.forEach((data)=>{
                  total=total+1
               })
               return total;
           }
        },
        
        methods:{
            deleteMensaje(id){
                this.$emit('deleteMensaje',id)
            },
            
        }
    }
</script>