document.addEventListener('DOMContentLoaded', function() {
    const formCadastro = document.getElementById('cadastroAluno');
    if (formCadastro) {
        formCadastro.addEventListener('submit', function(event) {
            event.preventDefault();

            const nome = document.getElementById('nome').value;
            const matricula = document.getElementById('matricula').value;

            // Salvar os dados do aluno
            localStorage.setItem('nomeAluno', nome);
            localStorage.setItem('matriculaAluno', matricula);

            // Redirecionar para a próxima tela
            window.location.href = 'escolhaDisciplinas.html';
        });
    }
});





document.addEventListener('DOMContentLoaded', function() {
    const formDisciplinas = document.getElementById('escolhaDisciplinas');
    if (formDisciplinas) {
        formDisciplinas.addEventListener('submit', function(event) {
            event.preventDefault();

            const disciplinasSelecionadas = [];
            const checkboxes = document.querySelectorAll('input[name="disciplina"]:checked');

            checkboxes.forEach(checkbox => {
                disciplinasSelecionadas.push(checkbox.value);
            });

            if (disciplinasSelecionadas.length > 4) {
                alert('Você só pode selecionar até 4 disciplinas.');
                return;
            }

            // Salvar as disciplinas selecionadas
            localStorage.setItem('disciplinasSelecionadas', JSON.stringify(disciplinasSelecionadas));

            // Redirecionar para a próxima tela
            window.location.href = 'escolhaProfessores.html';
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const formProfessores = document.getElementById('escolhaProfessores');
    if (formProfessores) {
        const disciplinasSelecionadas = JSON.parse(localStorage.getItem('disciplinasSelecionadas'));
        const professoresContainer = document.getElementById('professoresContainer');

        const professoresPorDisciplina = {
            'Matemática': ['Prof. Silva', 'Prof. Costa'],
            'Português': ['Prof. Oliveira', 'Prof. Souza'],
            'História': ['Prof. Lima', 'Prof. Rocha'],
            'Geografia': ['Prof. Almeida', 'Prof. Santos'],
            'Ciências': ['Prof. Pereira', 'Prof. Gomes']
        };

        disciplinasSelecionadas.forEach(disciplina => {
            const div = document.createElement('div');
            div.innerHTML = `<h3>${disciplina}</h3>`;

            professoresPorDisciplina[disciplina].forEach(professor => {
                div.innerHTML += `
                    <label>
                        <input type="radio" name="${disciplina}" value="${professor}" required> ${professor}
                    </label>
                `;
            });

            professoresContainer.appendChild(div);
        });

        formProfessores.addEventListener('submit', function(event) {
            event.preventDefault();

            const professoresSelecionados = {};
            disciplinasSelecionadas.forEach(disciplina => {
                const professorSelecionado = document.querySelector(`input[name="${disciplina}"]:checked`).value;
                professoresSelecionados[disciplina] = professorSelecionado;
            });

            // Salvar os professores selecionados
            localStorage.setItem('professoresSelecionados', JSON.stringify(professoresSelecionados));

            // Sortear salas
            const salas = ['Lab 1', 'Lab 2', 'Lab 3', 'Lab 4', 'Lab 5'];
            const salasSorteadas = {};
            disciplinasSelecionadas.forEach(disciplina => {
                salasSorteadas[disciplina] = salas[Math.floor(Math.random() * salas.length)];
            });

            // Salvar as salas sorteadas
            localStorage.setItem('salasSorteadas', JSON.stringify(salasSorteadas));

            // Redirecionar para a tela de confirmação
            window.location.href = 'confirmacaoMatricula.html';
        });
    }
});
    
    
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('confirmacaoMatricula').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const professoresSelecionados = {};
        disciplinasSelecionadas.forEach(disciplina => {
            const professorSelecionado = document.querySelector(`input[name="${disciplina}"]:checked`).value;
            professoresSelecionados[disciplina] = professorSelecionado;
        });
        
        // Salvar os professores selecionados
        localStorage.setItem('professoresSelecionados', JSON.stringify(professoresSelecionados));
        
        // Sortear salas
        const salas = ['Lab 1', 'Lab 2', 'Lab 3', 'Lab 4', 'Lab 5'];
        const salasSorteadas = {};
        disciplinasSelecionadas.forEach(disciplina => {
            salasSorteadas[disciplina] = salas[Math.floor(Math.random() * salas.length)];
        });
        
        // Salvar as salas sorteadas
        localStorage.setItem('salasSorteadas', JSON.stringify(salasSorteadas));
        
        // Redirecionar para a tela de confirmação
        const newLocal = window.location.href = 'confirmacaoMatricula.html';
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const nomeAluno = localStorage.getItem('nomeAluno');
    const matriculaAluno = localStorage.getItem('matriculaAluno');
    const disciplinasSelecionadas = JSON.parse(localStorage.getItem('disciplinasSelecionadas'));
    const professoresSelecionados = JSON.parse(localStorage.getItem('professoresSelecionados'));
    const salasSorteadas = JSON.parse(localStorage.getItem('salasSorteadas'));

    const resumoMatricula = document.getElementById('resumoMatricula');

    let html = `
        <p><strong>Nome do Aluno:</strong> ${nomeAluno}</p>
        <p><strong>Número de Matrícula:</strong> ${matriculaAluno}</p>
        <h3>Disciplinas e Professores:</h3>
        <ul>
    `;

    disciplinasSelecionadas.forEach(disciplina => {
        html += `
            <li>
                <strong>${disciplina}:</strong> ${professoresSelecionados[disciplina]} (${salasSorteadas[disciplina]})
            </li>
        `;
    });

    html += `</ul>`;

    resumoMatricula.innerHTML = html;

    document.getElementById('salvarSair').addEventListener('click', function() {
        alert('Matrícula salva com sucesso!');
        // Limpar localStorage ou enviar dados para o backend
        localStorage.clear();
        window.location.href = 'index.html';
    });
});