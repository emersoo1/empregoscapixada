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
        // Adicionar a vaga ao Firebase
        addJobToFirebase(form);
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

// Função para adicionar vaga ao Firebase
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
const db = getFirestore();

async function addJobToFirebase(form) {
    const jobTitle = form.querySelector('input[placeholder="Título da Vaga"]').value;
    const jobLocation = form.querySelector('input[placeholder="Local"]').value;
    const jobSalary = form.querySelector('input[placeholder="Salário"]').value;
    const jobDescription = form.querySelector('textarea[placeholder="Descrição da Vaga"]').value;

    try {
        const docRef = await addDoc(collection(db, "vagas"), {
            title: jobTitle,
            location: jobLocation,
            salary: jobSalary,
            description: jobDescription
        });
        console.log("Vaga adicionada com ID: ", docRef.id);
    } catch (e) {
        console.error("Erro ao adicionar vaga: ", e);
    }
}

// Função para carregar as vagas do Firebase
import { getDocs } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

async function loadJobs() {
    const querySnapshot = await getDocs(collection(db, "vagas"));
    const jobListingSection = document.querySelector("#vagas .content");

    querySnapshot.forEach((doc) => {
        const job = doc.data();
        const jobElement = document.createElement('div');
        jobElement.classList.add('job-listing');

        jobElement.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>Local:</strong> ${job.location}</p>
            <p><strong>Salário:</strong> ${job.salary}</p>
            <p><strong>Descrição:</strong> ${job.description}</p>
            <button onclick="window.location.href='mailto:contato@empregoscapixaba.com?subject=Candidatura para ${job.title}'">Candidatar-se</button>
        `;

        jobListingSection.appendChild(jobElement);
    });
}

// Carregar as vagas ao carregar a página
window.onload = loadJobs;
