class Produto{ // classe Produto
    constructor(
    public nome: string, // atributo da classe
    public codigo: number, // atributo da classe
    public preco: number, // atributo da classe
    public quantidade: number, // atributo da classe
    
    ){}

    }
class Entrada{      // classe Entrada 
    constructor(produto:string){} // atributo da classe 
    produto:Produto [] = [];

    adicionarProduto(produto:Produto): void{ // metodo da classe 
        this.produto.push(produto);
        console.log(`${produto.nome} adcionado`);


    }
    listarProduto(): void{
        this.produto.forEach(p=>console.log(p.nome)); // metodo da classe
    }
    


}


