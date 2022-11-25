export interface Produto {
    _id: number;
    codigoDoProduto: string;
    nome: string;
    categoriaRef: Categoria;
    categoriaProduto: string;
    marca: string;
}

export interface Categoria {
    _id: number;
    nome: string;
    produtosRemessa: Remessa;
    produtos:Produto[];
    qtdTotoalProdutosCategoria: number;
    qtdTiposProdutos: number;
    qtdTiposDeProdutosCategoria: number;
}

export interface Venda {
    comprador: string;
    dataVenda: Date;
    vendasParciais: VendaParcial[];
    lucroTotal: number;
    valorTotal: number;
}

export interface Estoque {
    categorias: Categoria[];
    totalDeProdutos: number;
}

export interface VendaParcial {
    id: number;
    codigoDoProduto: string;
    categoriaDoProduto: string;
    refDoProduto: Produto;
    refDaRemessa: Remessa;
    dataVenda: Date;
    qtdVendida: number;
    comprador: string;
    valorCompraProdutoUnit: number;
    valorVendaUnit: number;
    valorTotal: number;
    lucro: number;
}

export interface Remessa {
    produto: Produto;
    qtdComprada: number;
    qtdAtual: number;
    dataDeAquisição: Date;
    precoUnit: number;
}