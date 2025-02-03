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

// Validação do formulário e envio para o Firebase
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
        addJobToFirebase(inputs);
    } else {
        document.getElementById('form-error').style.display = 'block';
        document.getElementById('form-feedback').style.display = 'none';
    }
}

// Função para adicionar vaga no Firestore
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC8WZRjaa-_WUQXHZuKTIAxMssNWBAXJbI",
    authDomain: "empregos-capixaba-582ad.firebaseapp.com",
    projectId: "empregos-capixaba-582ad",
    storageBucket: "empregos-capixaba-582ad.firebasestorage.app",
    messagingSenderId: "60547519504",
    appId: "1:60547519504:web:d55cf96fefa7e6afe32695",
    measurementId: "G-YE6876RQ9W"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Função para adicionar vaga no Firebase
function addJobToFirebase(inputs) {
    const jobData = {
        title: inputs[0].value,
        location: inputs[1].value,
        salary: inputs[2].value,
        description: inputs[3].value
    };

    addDoc(collection(db, "jobs"), jobData)
        .then(() => {
            console.log("Vaga enviada com sucesso!");
        })
        .catch(error => {
            console.error("Erro ao enviar vaga: ", error);
        });
}
