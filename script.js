function fazerLogin() {
    const usuario = document.getElementById('username').value;
    const senha = document.getElementById('password').value;

    if (usuario === 'admin' && senha === '123') {
        window.location.href = "painel.html";
    } else {
        alert("Usuário ou senha incorreto!");
    }
}
const infoCulturas = {
    Alface: { ciclo: 45, sementesM2: 50 },
    Tomate: { ciclo: 90, sementesM2: 10 },
    Cenoura: { ciclo: 70, sementesM2: 100 },
    Cebola: { ciclo: 100, sementesM2: 90 },
    Batata: { ciclo: 115, sementesM2: 6 }
};

    function cadastrarPlantio(event) {
        event.preventDefault();

        const vegetalSelecionado = document.getElementById("plantio").value;
        const dataPlantio = document.getElementById("data").value;
        const areaM2 = parseFloat(document.getElementById("quantidade").value);
        const enderecoHorta = document.getElementById("endereco").value;

        console.log(vegetalSelecionado);

        if (!vegetalSelecionado || !dataPlantio || !areaM2 || !enderecoHorta) {
            alert("Por favor, preencha todos os campos do formulário!");
            return;
        }

        const vegetalChave = vegetalSelecionado.charAt(0).toUpperCase() + vegetalSelecionado.slice(1);
        const culturaInfo = infoCulturas[vegetalChave];

        if (!culturaInfo) {
            alert("Erro: Cultura não encontrada nas configurações.");
            return;
        }

        let dataColheita = new Date(dataPlantio);
        dataColheita.setDate(dataColheita.getDate() + culturaInfo.ciclo);

        const totalSementes = Math.ceil(areaM2 * culturaInfo.sementesM2);


        const novoCanteiro = {
            id: Date.now(),
            cultura: vegetalChave,
            dataColheita: dataColheita.toLocaleDateString("pt-BR"),
            timestampColheita: dataColheita.getTime(),
            local: enderecoHorta,
            sementes: totalSementes,
        };

        let lista = JSON.parse(localStorage.getItem("hortas")) || [];
        lista.push(novoCanteiro);
        localStorage.setItem("hortas", JSON.stringify(lista));
        console.log(lista);
        alert(`✅ Canteiro cadastrado com sucesso!\nCalculamos ${totalSementes} sementes necessárias.`);
        window.location.href = "painel.html";
    };


function carregarPainel() {
    const listaCanteiros = document.getElementById("lista-canteiros");
    if (!listaCanteiros) return;

    const dados = JSON.parse(localStorage.getItem("hortas")) || [];

    if (dados.length > 0) listaCanteiros.innerHTML = "";

    dados.forEach((item) => {
        const hoje = new Date().getTime();
        const estaPronto = hoje >= item.timestampColheita;


        const card = document.createElement("article");
        card.className =` card - minimalista ${ estaPronto ? "alerta" : "" }`;

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

// window.onload = () => {
//     const form = document.getElementById("form-plantio");
//     if (form) form.addEventListener("submit", cadastrarPlantio());
//     carregarPainel();
// };

function irPara(pagina) {
    switch (pagina) {
        case "painel":
            window.location.href = "painel.html";
            break;
        case "plantio":
            window.location.href = "plantio.html";
            break;
        case "mapa":
            window.location.href = "mapa.html";
            break;
        default:
            console.error("Página desconhecida:", pagina);
    }
}
