const btnTogglePainel = document.querySelector('#btn-toggle-painel');
const secaoPainel = document.querySelector('#secao-painel');

btnTogglePainel.addEventListener('click', () => {
    secaoPainel.style.display = secaoPainel.style.display === 'none' ? 'block' : 'none';
});
const btnTogglePlantio = document.querySelector('#btn-toggle-plantio');
const secaoPlantio = document.querySelector('#secao-plantio');

btnTogglePlantio.addEventListener('click', () => {
    secaoPlantio.style.display = secaoPlantio.style.display === 'none' ? 'block' : 'none';
});

const btnToggleMapa = document.querySelector('#btn-toggle-mapa');
const secaoMapa = document.querySelector('#secao-mapa');

btnToggleMapa.addEventListener('click', () => {
    secaoMapa.style.display = secaoMapa.style.display === 'none' ? 'block' : 'none';
});

const ciclosDeVida = {
    tomate: 90,
    alface: 45,
    cenoura: 75,
    batata: 120,
    beterraba: 60
};