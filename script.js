// Mostrar a seta quando o usuário rolar para baixo
window.onscroll = function() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollButton.style.display = 'block'; // Exibe a seta
    } else {
        scrollButton.style.display = 'none'; // Esconde a seta
    }
};

// Função para rolar para o topo
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Validação do formulário
function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.border = '1px solid red'; // Destaca campos inválidos
        } else {
            input.style.border = '1px solid #ccc'; // Remove o destaque se válido
        }
    });

    if (isValid) {
        document.getElementById('form-feedback').style.display = 'block';
        document.getElementById('form-error').style.display = 'none';
        form.reset(); // Limpa o formulário após o envio
    } else {
        document.getElementById('form-error').style.display = 'block';
        document.getElementById('form-feedback').style.display = 'none';
    }
}

// Interatividade nos botões de candidatura
document.querySelectorAll('.job-listing button').forEach(button => {
    button.addEventListener('click', () => {
        alert('Você será redirecionado para a página de candidatura.');
        // window.location.href = 'link-da-candidatura';
    });
});
