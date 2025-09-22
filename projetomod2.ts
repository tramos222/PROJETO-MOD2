// Classe Produto
class Produto {
    constructor(
        public codigo: number,
        public nome: string,
        public quantidade: number,
        public preco: number
    ) {}
}

// Classe abstrata Movimentação
abstract class Movimentacao {
    constructor(
        public produto: Produto,
        public quantidade: number,
        public data: Date = new Date()
    ) {}

    abstract aplicar(): void; // método que será implementado em Entrada e Saída
}

// Classe Entrada (herda Movimentação)
class Entrada extends Movimentacao {
    aplicar(): void {
        this.produto.quantidade += this.quantidade;
        console.log(`Entrada de ${this.quantidade} unid. do produto ${this.produto.nome}`);
    }
}

// Classe Saída (herda Movimentação)
class Saida extends Movimentacao {
    aplicar(): void {
        if (this.produto.quantidade >= this.quantidade) {
            this.produto.quantidade -= this.quantidade;
            console.log(`Saída de ${this.quantidade} unid. do produto ${this.produto.nome}`);
        } else {
            console.log(`Estoque insuficiente para saída de ${this.produto.nome}`);
        }
    }
}

// Classe Estoque (gerencia produtos e movimentações)
class Estoque {
    private produtos: Produto[] = [];
    private movimentacoes: Movimentacao[] = [];

    adicionarProduto(produto: Produto): void {
        this.produtos.push(produto);
    }

    registrarMovimentacao(mov: Movimentacao): void {
        mov.aplicar();
        this.movimentacoes.push(mov);
    }

    listarProdutos(): void {
        console.log("📦 Produtos em estoque:");
        this.produtos.forEach(p => {
            console.log(`${p.codigo} - ${p.nome} | Quantidade: ${p.quantidade} | Preço: R$ ${p.preco}`);
        });
    }

    gerarRelatorio(): void {
        console.log("\n📊 Relatório de Movimentações:");
        this.movimentacoes.forEach(m => {
            console.log(`${m.data.toLocaleString()} - ${m.constructor.name} - ${m.produto.nome} (${m.quantidade})`);
        });
    }
}

// ----------------- Testando -----------------
const estoque = new Estoque();

// Criar produtos
const p1 = new Produto(1, "Mouse", 10, 50);
const p2 = new Produto(2, "Teclado", 5, 100);

// Adicionar no estoque
estoque.adicionarProduto(p1);
estoque.adicionarProduto(p2);

// Movimentações
estoque.registrarMovimentacao(new Entrada(p1, 20));
estoque.registrarMovimentacao(new Saida(p2, 2));
estoque.registrarMovimentacao(new Saida(p1, 50)); // estoque insuficiente

// Relatórios
estoque.listarProdutos();
estoque.gerarRelatorio();
