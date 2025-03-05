<template>
<div class="login-container">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="handleLogin">
    <div class="input-group">
        <label for="username">Usuario:</label>
        <input type="text" id="username" v-model="username" required />
    </div>

    <div class="input-group">
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="password" required />
    </div>

    <button type="button" @click="sendLogin">Ingresar</button>
    </form>

    <p class="register-link">
    ¿No tienes cuenta? <RouterLink to="/register">Regístrate</RouterLink>
    </p>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import apiservices from '@/apiservices';

const router = useRouter();
const username = ref('');
const password = ref('');

const handleLogin = () => {
console.log("Usuario:", username.value, "Contraseña:", password.value);
};

let sendLogin = async () => {
try {
    let response = await apiservices.login(username.value, password.value);

    console.log(response);

    if (response.access_token) {
    router.push('/principal');
    } else {
    alert('Credenciales incorrectas');
    }
} catch (error) {
    console.error('Error al enviar el login:', error);
    alert('Hubo un error al intentar iniciar sesión. Inténtalo nuevamente.');
}
};
</script>
