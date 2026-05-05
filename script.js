function fazerLogin() {
    const usuario = document.getElementById('username').value;
    const senha = document.getElementById('password').value;

    if (usuario === 'admin' && senha === '123') {
        window.location.href = "painel.html";
    } else {
        alert("Usuário ou senha incorreto!");
    }
}
document.getElementById('btn-salvar').addEventListener('click',
    function () {
        const novoPlantio = {
            vegetal: document.getElementById('plantio').value,
            data: document.getElementById('data').value,
            quantidade: document.getElementById('quantidade').value,
            endereco: document.getElementById('endereco').value
        };

        const plantios = JSON.parse(localStorage.getItem('plantios') || '[]');
        plantios.push(novoPlantio);
        localStorage.setItem('plantios', JSON.stringify(plantios));
        alert('Plantio adicionado com sucesso!');

    });

const infoCulturas = {
    Alface: { ciclo: 45, sementesM2: 50 },
    Tomate: { ciclo: 90, sementesM2: 10 },
    Cenoura: { ciclo: 70, sementesM2: 100 },
};


function cadastrarPlantio(event) {
    event.preventDefault();

    const plantio = document.getElementById("plantio").value;
    const data = document.getElementById("data").value;
    const quantidade = parseFloat(document.getElementById("quantidade").value);
    const endereco = document.getElementById("endereco").value;

    let dataColheita = new Date(data);
    dataColheita.setDate(dataColheita.getDate() + infoCulturas[plantio].ciclo);

    const totalSementes = Math.ceil(areaM2 * infoCulturas[plantio].sementesM2);

    const novoCanteiro = {
        id: Date.now(),
        plantio: plantio,
        dataColheita: dataColheita.toLocaleDateString("pt-BR"),
        timestampColheita: dataColheita.getTime(),
        local: endereco,
        sementes: totalSementes,
    };


    let lista = JSON.parse(localStorage.getItem("hortas")) || [];
    lista.push(novoCanteiro);
    localStorage.setItem("hortas", JSON.stringify(lista));

    alert("✅ Canteiro cadastrado! Calculamos " + totalSementes + " sementes.");
    window.location.href = "painel-de-controle.html";
}

function carregarPainel() {
    const listaCanteiros = document.getElementById("lista-canteiros");
    if (!listaCanteiros) return; // Só roda se estiver na página do painel

    const dados = JSON.parse(localStorage.getItem("hortas")) || [];

    if (dados.length > 0) listaCanteiros.innerHTML = "";

    dados.forEach((item) => {
        const hoje = new Date().getTime();
        const estaPronto = hoje >= item.timestampColheita;


        const card = document.createElement("article");
        card.className = card - minimalista ${ estaPronto ? "alerta" : "" };

        card.innerHTML = `
            <div class="card-header">
                <h3>${item.cultura}</h3>
                <span class="tag-status ${estaPronto ? "" : "ok"}">
                    ${estaPronto ? "⚠️ COLHEITA!" : "🌱 CRESCENDO"}
                </span>
            </div>
            <div class="card-body">
                <p><strong>📍 Local:</strong> ${item.local}</p>
                <p><strong>📦 Insumos:</strong> ${item.sementes} sementes</p>
                <p><strong>📅 Colheita:</strong> ${item.dataColheita}</p>
            </div>
            <button class="btn-check" onclick="removerCanteiro(${item.id})">Finalizar</button>
        `;
        listaCanteiros.appendChild(card);
    });
}

function removerCanteiro(id) {
    let lista = JSON.parse(localStorage.getItem("hortas"));
    lista = lista.filter((c) => c.id !== id);
    localStorage.setItem("hortas", JSON.stringify(lista));
    carregarPainel();
}

window.onload = () => {
    const form = document.getElementById("form-plantio");
    if (form) form.addEventListener("submit", cadastrarPlantio);
    carregarPainel();
};

function irPara(pagina) {
    switch (pagina) {
        case "painel":
            window.location.href = "/pages/painel-de-controle.html";
            break;
        case "plantio":
            window.location.href = "/pages/novo-plantio.html";
            break;
        case "mapa":
            window.location.href = "/pages/mapa-plantio.html";
            break;
        default:
            console.error("Página desconhecida:", pagina);
    }
}
