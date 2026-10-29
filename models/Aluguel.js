class EstacaoAluguel {
    constructor(nome) {
        this.nome = nome
    }
    veiculos = [];
    alugueis = [];

    cadastrarVeiculo(veiculo) {
        if (!/PAT|BIC/.test(veiculo.id.split("-")[0].toUpperCase())) throw new Error("Somente veículos podem ser cadastrados");
        if (this.veiculos.some(v => v.id === veiculo.id)) throw new Error("Já existe um veículo com esse ID");

        this.veiculos.push(veiculo)
    }

    buscarVeiculo(id) {
        const veiculo = this.veiculos.find(v => v.id === id);
        if (!veiculo) throw new Error("Veículo não encontrado");
        return veiculo
    }

    listarDisponiveis() {
        return this.veiculos.filter(v => v.disponivel)
    }

    iniciarAluguel(id, cliente) {
        const veiculo = this.buscarVeiculo(id);
        const index = this.veiculos.indexOf(veiculo);
        if (!veiculo.disponivel) throw new Error("Veículo não está disponível");
        if (!cliente) throw new Error("Cliente deve ser informado");

        const status = { veiculoId: veiculo.id, cliente, ativo: true }
        this.veiculos[index].alugar();
        this.alugueis.push(status)

        const indexAluguel = this.alugueis.indexOf(status);
        // console.log(this.alugueis[indexAluguel])
        return this.alugueis[indexAluguel]
    }

    encerrarAluguel(veiculoId, tempo) {
        if (!Number(tempo) || tempo <= 0) throw new Error("Duração deve ser maior que zero");
        if (!this.alugueis.find(v => v.veiculoId === veiculoId && v.ativo)) throw new Error("Aluguel ativo não encontrado");

        const indexAluguel = this.alugueis.findIndex(v => v.veiculoId === veiculoId && v.ativo);
        this.alugueis[indexAluguel].ativo = false;
        this.alugueis[indexAluguel].duracaoMinutos = tempo;

        const veiculo = this.buscarVeiculo(veiculoId);
        const index = this.veiculos.indexOf(veiculo);
        this.veiculos[index].devolver();

        const total = veiculo.valorPorMinuto * tempo;
        const desc = tempo > 60 ? total * 0.1 : 0;

        return { ...this.alugueis[indexAluguel], valorTotal: total - desc, desconto: desc }
    }
}

module.exports = EstacaoAluguel;