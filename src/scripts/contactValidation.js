import Swal from 'sweetalert2';

export function setupContactForm() {
    const form = document.getElementById("formulario");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailValue = emailInput.value.trim();
        const messageValue = messageInput.value.trim();

        const toastOptions = {
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        };

        if (!emailRegex.test(emailValue)) {
            Swal.fire({
                ...toastOptions,
                icon: "error",
                title: "Correo inválido",
                text: "Por favor ingresa un correo válido."
            });
            return;
        }

        if (messageValue.length < 5) {
            Swal.fire({
                ...toastOptions,
                icon: "error",
                title: "Mensaje demasiado corto",
                text: "El mensaje debe tener al menos 5 caracteres."
            });
            return;
        }

        Swal.fire({
            ...toastOptions,
            icon: 'success',
            title: 'Mensaje enviado con éxito'
        }).then(() => {
            form.submit();
            form.reset();
        });

    });
}
