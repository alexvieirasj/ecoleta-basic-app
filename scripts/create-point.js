
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() ) //função anonima (arrow function) que retorna um valor
    .then( states => {

        for(const state of states ){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
        }
    })
}

populateUFs(); //chama o metodo


function getCities(event){
    const citySelect = document.querySelector("[name=city]");
    const stateInput = document.querySelector("[name=state]");

    const ufValue = event.target.value; //pega o evento selecionado
    
    const indexOfSelectedState = event.target.selectedIndex; //pega o indice do option selecionado
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    fetch(url)
    .then( res => res.json() ) //função anonima (arrow function) que retorna um valor
    .then( cities => {

        for(const city of cities ){
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`;
        }

        citySelect.disabled = false; //habilita o campo novamente
    })
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities);  //está ouvindo o evento de mudança