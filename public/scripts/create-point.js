
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

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"; //limpa/reescreve o campo
    citySelect.disabled = true; //bloqueia novamente

    fetch(url)
    .then( res => res.json() ) //função anonima (arrow function) que retorna um valor
    .then( cities => {

        for(const city of cities ){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
        }

        citySelect.disabled = false; //habilita o campo novamente
    })
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities);  //está ouvindo o evento de mudança



//Itens de coleta
//pega todo os li's
const itemsToCollect = document.querySelectorAll(".items-grid li");

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem); //adicionado uma callback, para executar somente quando clicar 
}


const collectedItems = document.querySelector("input[name=items]");

let selectedItems = [];

function handleSelectedItem(event){

    const itemLi = event.target; //pega "um li clicado"


    //adicionar ou remover um classe com javascript
    itemLi.classList.toggle("selected");

    const itemId = itemLi.dataset.id; //pega o id

    // console.log('ITEM ID: ' + itemId);

    //verificar se existem itens selecionados, se sim
    //pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId; 
        return itemFound;
    });

    
    //se já estiver selecionado, tirar a seleção
    if(alreadySelected >= 0){
        //tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId;
            return itemIsDifferent;
        });

        selectedItems = filteredItems;
    } else {
        //se não estiver selecionado
        //adicionar a seleção
        selectedItems.push(itemId);
    }
    //console.log(selectedItems); //verifica o array que armazena os dados como está sndo atualizado

    // console.log('Selected Items: ' + selectedItems);

    //atualizar o campo escondido com os itens selecionado
    collectedItems.value = selectedItems;


}

