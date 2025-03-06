<template>
<div class="centers-container">
    <div v-if="centers.length > 0" class="center-cards">
    <div v-for="(center, index) in centers" :key="index" class="center-card">
        <h3>{{ center.name }}</h3>
        <p>
        <strong>Dirección:</strong>
        <span class="clickable-address">{{ center.address }}</span>
        </p>
        <Boton1 :address="center.address" />
    </div>
    </div>
    <div v-else>
    <p>No hay centros disponibles.</p>
    </div>

    <div class="button-container">
    <RouterLink to="/principal"><BotonGoBack /></RouterLink>
    </div>
</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import apiservices from "@/apiservices";
import Boton1 from "@/components/Boton1.vue";
import BotonGoBack from "@/components/BotonBack.vue";

const centers = ref([]);

onMounted(async () => {
try {
    centers.value = await apiservices.getCenters();
    console.log(centers.value);
} catch (error) {
    console.error("Error al obtener los centros:", error);
}
});
</script>
