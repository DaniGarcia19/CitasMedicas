<template>
    <div class="datos-view">
      <h2>Mis Datos</h2>
  
      <div v-if="userData">
        <p><strong>Nombre:</strong> {{ userData.name }}</p>
        <p><strong>Correo electrónico:</strong> {{ userData.email }}</p>
        <p><strong>Teléfono:</strong> {{ userData.phone }}</p>
        <p><strong>Dirección:</strong> {{ userData.address }}</p>
        <p><strong>Fecha de nacimiento:</strong> {{ userData.birthdate }}</p>
        <!-- Puedes agregar más campos según la información disponible -->
      </div>
  
      <div v-else>
        <p>Cargando tus datos...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import apiservices from "@/apiservices";
  
  const userData = ref(null); // Almacenará los datos del usuario
  
  // Cargar los datos del perfil
  const fetchUserProfile = async () => {
    try {
      userData.value = await apiservices.getProfile();
    } catch (error) {
      console.error("Error al obtener los datos del perfil:", error);
    }
  };
  
  // Cargar los datos cuando el componente se monte
  onMounted(() => {
    fetchUserProfile();
  });
  </script>
  
  <style scoped>
  .datos-view {
    padding: 20px;
  }
  
  .datos-view h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .datos-view p {
    font-size: 18px;
    margin-bottom: 10px;
  }
  </style>
  