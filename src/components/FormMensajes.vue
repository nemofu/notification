<template>
    <v-form v-model="valid_mensaje">
        <v-layout>
             <v-flex xs12 md7>
                <v-text-field
                        v-model="mensaje.respuesta"
                        label="Mensaje"
                        required></v-text-field>
            </v-flex>
         <v-btn @click.prevent="saveMensaje" color="success">Guardar</v-btn>
         
        </v-layout>
   
          
    </v-form>
</template>


<script>

    export default {
        name: "mensaje-form",
        props: [
            'mensaje',
        ],
        data: () => ({
            //datosParaEnviar:''
            valid_mensaje: false,

        }),
        methods:{
            saveMensaje(){
                this.$emit('saveMensaje', /*this.datosParaEnviar*/)
            },
            
        }
    }
</script>