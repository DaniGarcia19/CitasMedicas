<template>
    <div class="login-container">
        <h2>Registrarse</h2>
        <form @submit.prevent="handleRegister">
        <div class="input-group">
            <label for="name">Nombre:</label>
            <input type="text" id="name" v-model="name" required />
        </div>
    
        <div class="input-group">
            <label for="lastname">Apellido:</label>
            <input type="text" id="lastname" v-model="lastname" required />
        </div>
    
        <div class="input-group">
            <label for="email">Correo Electrónico:</label>
            <input type="email" id="email" v-model="email" required />
        </div>
    
        <div class="input-group">
            <label for="username">Nombre de Usuario:</label>
            <input type="text" id="username" v-model="username" required />
        </div>
    
        <div class="input-group">
            <label for="password">Contraseña:</label>
            <input type="password" id="password" v-model="password" required />
        </div>
    
        <div class="input-group">
            <label for="phone">Teléfono:</label>
            <input type="text" id="phone" v-model="phone" required />
        </div>
    
        <div class="input-group">
            <label for="date">Fecha de Nacimiento:</label>
            <input type="date" id="date" v-model="date" required />
        </div>
    
        <button type="submit">Registrarse</button>
        </form>
    
        <p class="register-link">
        ¿Ya tienes cuenta? <RouterLink to="/login">Iniciar Sesión</RouterLink>
        </p>
    </div>
    </template>
    
    <script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import apiservices from '@/apiservices';
    import Swal from 'sweetalert2';
    
    const router = useRouter();
    const name = ref('');
    const lastname = ref('');
    const email = ref('');
    const username = ref('');
    const password = ref('');
    const phone = ref('');
    const date = ref('');
    
    const handleRegister = async () => {
        const formattedDate = date.value.split("-").reverse().join("/");
        const userData = {
            date: formattedDate,
            email: email.value,
            lastname: lastname.value,
            name: name.value,
            password: password.value,
            phone: phone.value,
            username: username.value,
        };
    
        try {
            const response = await apiservices.register(userData);
            console.log(response);
    
            await Swal.fire({
                title: "Registro Exitoso",
                text: "¡Tu cuenta ha sido creada con éxito!",
                icon: "success",
                confirmButtonText: "Aceptar"
            });
    
            router.push('/login');
        } catch (error) {
            console.error('Error en el registro:', error);
            await Swal.fire({
                title: "Error",
                text: "Hubo un error al registrar el usuario. Intenta de nuevo.",
                icon: "error",
                confirmButtonText: "Aceptar"
            });
        }
    };
    </script>
    