class Produto {
  constructor(
    private nome: string,
    private codigo: string,
    private preco: number,
    private quantidade: number
  ) {}

  getNome(): string {
    return this.nome;
  }

  getCodigo(): string {
    return this.codigo;
  }

  getPreco(): number {
    return this.preco;
  }

  getQuantidade(): number {
    return this.quantidade;
  }

  adicionarQuantidade(qtd: number): void {
    this.quantidade += qtd;
  }

  removerQuantidade(qtd: number): void {
    if (qtd > this.quantidade) {
      throw new Error("Quantidade insuficiente em estoque!");
    }
    this.quantidade -= qtd;
  }
}

// Classe abstrata
abstract class Movimentacao {
  constructor(
    protected produto: Produto,
    protected quantidade: number,
    protected data: Date = new Date()
  ) {}

  abstract executar(): void;

  getInfo(): string {
    return `${this.constructor.name} | Produto: ${this.produto.getNome()} | Quantidade: ${this.quantidade} | Data: ${this.data.toLocaleString()}`;
  }
}

class Entrada extends Movimentacao {
  executar(): void {
    this.produto.adicionarQuantidade(this.quantidade);
  }
}

class Saida extends Movimentacao {
  executar(): void {
    this.produto.removerQuantidade(this.quantidade);
  }
}

class Estoque {
  private produtos: Map<string, Produto> = new Map();
  private movimentacoes: Movimentacao[] = [];

  adicionarProduto(produto: Produto): void {
    this.produtos.set(produto.getCodigo(), produto);
  }

  registrarMovimentacao(mov: Movimentacao): void {
    mov.executar();
    this.movimentacoes.push(mov);
  }

  gerarRelatorio(): void {
    console.log("=== Relatório de Estoque ===");
    this.produtos.forEach((produto) => {
      console.log(
        `${produto.getNome()} (Código: ${produto.getCodigo()}) | Qtd: ${produto.getQuantidade()} | Preço: R$${produto.getPreco()}`
      );
    });

    console.log("\n=== Histórico de Movimentações ===");
    this.movimentacoes.forEach((mov) => {
      console.log(mov.getInfo());
    });
  }
}

// ---------- Exemplo de uso ----------
const estoque = new Estoque();

const p1 = new Produto("Camiseta Naruto", "001", 79.9, 10);
const p2 = new Produto("Action Figure Goku", "002", 199.9, 5);

estoque.adicionarProduto(p1);
estoque.adicionarProduto(p2);

// Movimentações
const entrada = new Entrada(p1, 5);
const saida = new Saida(p2, 2);

estoque.registrarMovimentacao(entrada);
estoque.registrarMovimentacao(saida);

estoque.gerarRelatorio();
