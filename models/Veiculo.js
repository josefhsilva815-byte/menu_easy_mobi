class Veiculo {
    constructor(id, tipo, valorPorMinuto) {
        if (!Number(valorPorMinuto) || valorPorMinuto <= 0) throw new Error("Valor por minuto deve ser maior que zero");
        if(!/patinete|bicicleta/.test(tipo)) throw new Error("Tipo de veículo inválido");

        this.id = id
        this.tipo = tipo
        this.valorPorMinuto = valorPorMinuto
    }
    disponivel = true;

    alugar() {
        if (!this.disponivel) throw new Error("Veículo não está disponível");
        this.disponivel = false
    }
    devolver() {
        if (this.disponivel) throw new Error("Veículo não está alugado");
        this.disponivel = true
    }
}

module.exports = Veiculo;