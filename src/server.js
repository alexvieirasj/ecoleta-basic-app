const express = require("express"); //chama o método do express
const server = express(); //executa a função que variavel recebeu antes


//configurar pasta publica
server.use(express.static("public"));

//configurar caminhos da minha aplicação


//utlizando template engine
const nunjucks = require ("nunjucks");
nunjucks.configure("src/views",  {
    express: server,
    noCache: true  
});



//página inicial (configurar rotas)
//req: Requisição
//res: Resposta
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Um título" });
});

server.get("/create-point", (req, res) => {
    return res.render("create-point.html");
});

server.get("/search", (req, res) => {
    return res.render("search-results.html");
});




//ligar o servidor passa a porta
server.listen(3000);

