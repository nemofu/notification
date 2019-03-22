<template>
  <v-app>
    <v-toolbar app style="background-color:#BDBDBD">
      <v-toolbar-title class="headline text-uppercase">
      <v-btn
        href="#/"
        color="info"
        
      > Usuario

      </v-btn>
      <v-btn
      color="info"
        href="#/soporte"
       
      >  Soporte
      </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    
    </v-toolbar>
    
    <v-content>
      <router-view/>
    </v-content>
 
  </v-app>
</template>

<script>


export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}
</script>
