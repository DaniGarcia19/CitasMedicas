    <template>
        <div class="edit-profile">
        <h2>Editar Perfil</h2>
        <form @submit.prevent="submitForm">
            <div class="form-group">
            <label for="name">Nombre:</label>
            <input
                type="text"
                id="name"
                v-model="editForm.name"
                required
            />
            </div>
            <div class="form-group">
            <label for="lastname">Apellidos:</label>
            <input
                type="text"
                id="lastname"
                v-model="editForm.lastname"
                required
            />
            </div>
            <div class="form-group">
            <label for="email">Correo electrónico:</label>
            <input
                type="email"
                id="email"
                v-model="editForm.email"
                required
            />
            </div>
            <div class="form-group">
            <label for="phone">Teléfono:</label>
            <input
                type="tel"
                id="phone"
                v-model="editForm.phone"
                required
            />
            </div>
            <div class="form-buttons">
            <button type="submit">Guardar cambios</button>
            <button type="button" @click="cancelEdit">Cancelar</button>
            </div>
        </form>
        </div>
    </template>
    
    <script setup>
    import { ref, onMounted } from "vue";
    import apiservices from "@/apiservices";
    import { useRouter } from "vue-router";
    import Swal from "sweetalert2"; // Importar SweetAlert2
    
    const router = useRouter();
    
    // Estado del formulario y datos del perfil
    const editForm = ref({
        name: "",
        lastname: "",
        email: "",
        phone: "",
        date: "",
    });
    
    const fetchUserProfile = async () => {
        try {
        const profile = await apiservices.getProfile();
        editForm.value = { 
            name: profile.name,
            lastname: profile.lastname,
            email: profile.email,
            phone: profile.phone,
        }; 
        } catch (error) {
        console.error("Error al obtener los datos del perfil:", error);
        }
    };
    
    // Función para enviar los datos actualizados
    const submitForm = async () => {
        try {
        const updatedProfile = await apiservices.updateProfile(editForm.value);
        
        // Mostrar SweetAlert de éxito
        Swal.fire({
            title: "¡Éxito!",
            text: "Perfil actualizado correctamente",
            icon: "success",
            confirmButtonText: "Aceptar"
        });
    
        router.push("/principal");
        } catch (error) {
        console.error("Error al actualizar el perfil:", error);
        
        // Mostrar SweetAlert de error
        Swal.fire({
            title: "Error",
            text: "No se pudo actualizar el perfil.",
            icon: "error",
            confirmButtonText: "Aceptar"
        });
        }
    };
    
    // Cancelar la edición y regresar a la vista anterior
    const cancelEdit = () => {
        router.push("/datos"); 
    };
    
    // Cargar el perfil cuando el componente se monta
    onMounted(() => {
        fetchUserProfile();
    });
    </script>
    