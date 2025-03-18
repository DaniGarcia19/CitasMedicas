<template>
  <div class="datos-view">
    <div class="header-container">
      <h2>Mis Datos</h2>
      <!-- Botón de editar a la derecha del título -->
      <RouterLink to="/EditDatos"><BotonEdit class="edit-button" /></RouterLink>
    </div>

    <div v-if="userData" class="data-box">
      <!-- Icono al lado del título de cada dato -->
      <p><span class="icon">👤</span><strong>Nombre:</strong> {{ userData.name }}</p>
      <p><span class="icon">📧</span><strong>Correo electrónico:</strong> {{ userData.email }}</p>
      <p><span class="icon">📞</span><strong>Teléfono:</strong> {{ userData.phone }}</p>
      <p><span class="icon">🎂</span><strong>Fecha de nacimiento:</strong> {{ userData.date }}</p>
    </div>

    <div v-else>
      <p>Cargando tus datos...</p>
    </div>

    <!-- Botón de volver al final de la vista -->
    <div class="back-button-container">
      <RouterLink to="/principal"><BotonGoBack class="go-back-button" /></RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import apiservices from "@/apiservices";
import BotonGoBack from "@/components/BotonBack2.vue";
import BotonEdit from "@/components/BotonEdit.vue";

const userData = ref(null);

// Cargar los datos del perfil
const fetchUserProfile = async () => {
  try {
    userData.value = await apiservices.getProfile();
    console.log('Datos del perfil:', userData.value); 
  } catch (error) {
    console.error("Error al obtener los datos del perfil:", error);
  }
};

// Cargar los datos cuando el componente se monte
onMounted(() => {
  fetchUserProfile();
});
</script>
