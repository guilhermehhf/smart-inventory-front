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
    _id: number
    comprador: string;
    dataVenda: Date;
    vendasParciais: VendaParcial[];
    lucroTotal: number;
    valorTotal: number;
}

export interface Estoque {
    _id: number
    categorias: Categoria[];
    totalDeProdutos: number;
}

export interface VendaParcial {
    _id: number;
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
    _id: number
    refProduto: Produto;
    qtdComprada: number;
    qtdAtual: number;
    dataDeAquisição: Date;
    precoUnit: number;
}