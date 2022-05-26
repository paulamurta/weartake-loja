//cria o carrinho
const cart = []

// captura o main pra interceptar os botões de add produto
let main = document.querySelector("main")

//captura o container do carrinho pra interceptar os botões de remover
let containerCart = document.getElementById("cartContent")

//captura o resumo da compra pra desocultar ela assim que o carrinho encher
let cartSummary = document.querySelector(".cart-summary")


// faz o loop pra adicionar todos os cards no main de forma dinâmica
function createCard(database) {
  for (let i = 0; i < database.length; i++) {
    let card = document.createElement("div")
    card.className = "card"
    main.appendChild(card);

    let containerPhoto = document.createElement("div")
    containerPhoto.className = "container-photo"
    card.appendChild(containerPhoto)

    let img = document.createElement("img")
    img.className = "img"
    img.src = data[i].img
    containerPhoto.appendChild(img)

    let containerTags = document.createElement("div")
    containerTags.className = "container-tags"
    card.appendChild(containerTags);

    let category = document.createElement("p")
    category.className = "category"
    category.innerText = data[i].tag[0]
    containerTags.appendChild(category);

    let title = document.createElement("h1")
    title.className = "title"
    title.innerText = data[i].nameItem
    containerTags.appendChild(title);

    let label = document.createElement("p")
    label.className = "label"
    label.innerText = data[i].description
    containerTags.appendChild(label);

    let price = document.createElement("p")
    price.className = "price"
    price.innerText = `R$: ${(data[i].value).toFixed(2)}`
    containerTags.appendChild(price);

    let buttonAdd = document.createElement("button")
    buttonAdd.id = data[i].id
    buttonAdd.className = "button-add"
    buttonAdd.name = "buttonAdd"
    buttonAdd.innerText = "Adicionar ao carrinho"
    containerTags.appendChild(buttonAdd);

  }
}

//Resulta em:
//1- varios cards de produtos disponiveis pra compra
// chama a função pra criar os cards acima
createCard(data)




//ABAIXO ---> PROCESSO ASSIM QUE O CLIQUE DE ADD ITEM ACONTECER
//Resulta em:
//1- um carrinho(array) cheio de elementos(objetos)
//2- a aparição do resumo do carrinho com os valores adicionados (usa o totalPrice) 
//3- carrinho limpo (por causa do renderCart()
//4- itens renderizados no carrinho (por causa do renderCart())

// escuta colocada no main pra pegar as infos do produto selecionado, e bota essa info pra comparar com a database. A "ponte" entre os dois é o id. Se for igual, pega esse elemento(objeto) da database e joga no carrinho. 
main.addEventListener('click', function (event) {
  if (event.target.name == "buttonAdd") {
    data.forEach(function (element) {
      if (element.id == event.target.id) {
        cart.push(element)
      }
    })
  }

  //é durante essa escuta que também já deixa o resumo do carrinho pronto pra ser mostrado no momento em que o clique for feito
  if (cart.length !== 0) {
    cartSummary.classList.add("cart-summary-show")
  }

  //durante esse clique tbm já se insere o texto da quantidade de produtos e valor final (pra iso usa o comprimento do carrinho e um for pra encontrar o valor

  let total = 0
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].value
  }

  let cartQuantity = document.querySelector(".cart-quantity")
  cartQuantity.innerText = cart.length
  let cartTotal = document.querySelector(".cart-total")
  cartTotal.innerHTML = `R$: ${(total).toFixed(2)}`

  //RECARREGA O CARRINHO
  renderCart()
})

// função que zera conteudo do conteiner carrinho, pega o array do carrinho e aplica a função de levar ele pro conteiner
function renderCart() {
  containerCart.innerHTML = ""
  cart.forEach(function (element, index) {
    let cartItem = document.createElement("div")
    cartItem.className = "cart-item"
    containerCart.appendChild(cartItem)

    let cartImg = document.createElement("img")
    cartImg.src = element.img
    cartItem.appendChild(cartImg)

    let cartDescription = document.createElement("div")
    cartDescription.className = "cart-description"
    cartItem.appendChild(cartDescription)

    let cartTitle = document.createElement("p")
    cartTitle.className = "cart-title"
    cartTitle.innerText = element.nameItem
    cartDescription.appendChild(cartTitle)

    let cartPrice = document.createElement("p")
    cartPrice.className = "cart-price"
    cartPrice.innerText = `R$: ${(element.value).toFixed(2)}`
    cartDescription.appendChild(cartPrice)

    let cartRemoveButton = document.createElement("button")
    cartRemoveButton.className = "cart-remove-button"
    cartRemoveButton.innerText = "Remover produto"
    cartRemoveButton.id = index
    cartDescription.appendChild(cartRemoveButton)

  })
}



//ABAIXO ---> PROCESSO ASSIM QUE O BOTAO P/ REMOÇÃO FOR CLICADO
//Resulta em:
//1- um carrinho(array) cheio de elementos(objetos) com o item em questao removido

//remover produto do carrinho, coloca escuta no container do carrinho, pra CASO seja o botao que a gente quer fazer uma busca do id dele junto ao carrinho. Refaz o total desse carrinho novamente e atribui valores e quantitativos atualizados.

containerCart.addEventListener("click", function (event) {

  if (event.target.name = "cart-remove-button") {
    const removedItem = event.target.id
    cart.splice(removedItem, 1)
    console.log(event.target)
  }

  let total = 0
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].value
  }

  let cartQuantity = document.querySelector(".cart-quantity")
  cartQuantity.innerText = cart.length
  let cartTotal = document.querySelector(".cart-total")
  cartTotal.innerHTML = `R$: ${(total).toFixed(2)}`
  renderCart()
})
