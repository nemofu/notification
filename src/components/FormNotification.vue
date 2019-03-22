<template>
    <v-form v-model="valid">
        <v-layout>
             <v-flex xs12 md4>
                <v-text-field
                        v-model="notification.titulo"

                        label="titulo"
                        required></v-text-field>
            </v-flex>
         

            <v-flex xs12 md4>
                <v-text-field
                        v-model="notification.descripcion"                 
                        label="descripcion"
                        required></v-text-field>
            </v-flex>

            <v-flex xs12 md4>

                <v-select
                 v-model="notification.area"
          :items="areas"
          label="Areas"
          outline
           required
        ></v-select>
            </v-flex>
            
          
        </v-layout>
       
         <v-btn v-if="editarDatos.valor==1"  @click.prevent="edit" color="success">Modificar</v-btn>
   
         <v-btn v-else @click.prevent="save" color="success">Guardar</v-btn>
          
    </v-form>
</template>

<script>

    export default {
        name: "notification-form",
        props: [
            'notification',
            'editarDatos'
        ],
        data: () => ({
            //datosParaEnviar:''
            valid: false,
            areas: ['Recursos Humanos', 'Sistemas', 'Finanzas', 'Economia']

        }),
        methods:{
            save(){
                this.$emit('saveSms', /*this.datosParaEnviar*/)
            },
             edit(){
                this.$emit('editSms', /*this.datosParaEnviar*/)
            },
        }
    }
</script>