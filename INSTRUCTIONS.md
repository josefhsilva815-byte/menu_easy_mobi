# Desafio: Easy Mob no Terminal

Transforme o projeto **Easy Mob** em uma aplicação interativa de terminal. Ao executar o comando no terminal:

```shell
node index.js
```

O sistema deverá permanecer ativo e apresentar um menu semelhante a:

```text
=================================
            EASY MOB            
=================================
1 - Listar veículos
2 - Alugar veículo
3 - Devolver veículo
4 - Consultar aluguéis
5 - Encerrar

Escolha uma opção:
```

> 💡 **Nota:** Utilize o módulo nativo `readline` para receber as informações digitadas pelo usuário.

---

## 1. Organização com Programação Orientada a Objetos

A aplicação deverá continuar utilizando Programação Orientada a Objetos. Organize as responsabilidades em classes. Por exemplo:

```text
Veiculo
├── Bicicleta
└── Patinete

Aluguel
EasyMob
```

Você pode adaptar essa estrutura de acordo com o código já desenvolvido. Algumas responsabilidades possíveis:

* **Veiculo:** Representar as características comuns dos veículos:
  * `id`, `modelo`, `tipo`, `valorPorMinuto`, `disponivel`
* **Bicicleta e Patinete:** Especializar as características dos diferentes veículos utilizando os conceitos de herança trabalhados em aula.
* **Aluguel:** Responsável pelas informações de uma locação:
  * `id`, `veiculoId`, `cliente`, `inicio`, `fim`, `duracaoMinutos`, `valorTotal`, `status`
* **EasyMob:** Responsável por controlar as principais operações do sistema.

---

## 2. Persistência utilizando JSON e fs

Os dados não devem existir somente enquanto o programa estiver sendo executado. Utilize o módulo nativo:

```javascript
const fs = require('fs');
```

para realizar a leitura e escrita dos arquivos JSON.

### Sugestão de estrutura de pastas:

```text
easy-mob/
│
├── index.js
├── data/
│   ├── veiculos.json
│   └── alugueis.json
│
└── models/
    ├── Veiculo.js
    ├── Bicicleta.js
    ├── Patinete.js
    └── Aluguel.js
```

Os arquivos poderão começar, por exemplo, com:

```json
[
  {
    "id": 1,
    "tipo": "bicicleta",
    "modelo": "Bike Urbana",
    "valorPorMinuto": 0.25,
    "disponivel": true
  },
  {
    "id": 2,
    "tipo": "patinete",
    "modelo": "Patinete City",
    "valorPorMinuto": 0.35,
    "disponivel": true
  }
]
```

> ⚠️ Os valores acima são definidos especificamente para esta atividade e podem ser ajustados pelo professor.

---

## 3. Regra de aluguel

Ao selecionar **Alugar veículo**, o sistema deverá:

* Solicitar o nome do cliente;
* Listar somente os veículos disponíveis;
* Solicitar o ID do veículo;
* Verificar se ele realmente está disponível;
* Registrar a data e hora de início;
* Alterar o veículo para indisponível;
* Salvar as alterações nos arquivos JSON.

### Exemplo:

```text
Nome do cliente: Ana
ID do veículo: 2

Aluguel iniciado com sucesso!
Veículo: Patinete City
Início: 27/10/2026 18:30
Status: EM ANDAMENTO
```

> ⏱️ **Importante:** O horário não deve ser digitado pelo usuário. Ele deverá ser obtido automaticamente pelo programa.

---

## 4. Regra de devolução

Na devolução, o aluno deverá selecionar um aluguel que esteja em andamento. O sistema deverá:

* Registrar automaticamente o horário final;
* Calcular o tempo utilizado;
* Calcular o valor do aluguel;
* Finalizar o aluguel;
* Tornar o veículo disponível novamente;
* Atualizar os arquivos JSON.

---

## 5. Cálculo do tempo

O sistema deverá trabalhar internamente com datas utilizando `Date`. Considere:

\[\text{duração} = \text{horário final} - \text{horário inicial}\]

Como a diferença entre datas é obtida em milissegundos:

```javascript
const diferenca = fim - inicio;
```

Será necessário converter esse resultado para minutos.

### 🔴 Regra importante
Qualquer minuto iniciado será cobrado como um minuto completo. Portanto:
* `10,1` minutos \(\rightarrow\) **11** minutos
* `15,0` minutos \(\rightarrow\) **15** minutos
* `22,8` minutos \(\rightarrow\) **23** minutos

> 🔍 **Pesquise:** Qual método da classe `Math` pode ser utilizado para realizar esse arredondamento?

---

## 6. Regras de preço

Para padronizar a atividade, considere inicialmente os seguintes valores por minuto:
* **Bicicleta:** R\$ 0,25
* **Patinete:** R\$ 0,35

### Exemplos:
* Uma bicicleta utilizada durante 17 minutos: \(17 \times 0,25 =\) **R\$ 4,25**
* Um patinete utilizado durante 17 minutos: \(17 \times 0,35 =\) **R\$ 5,95**

> ⚠️ O cálculo deverá ser realizado pelo sistema. O usuário não poderá informar manualmente o valor final.

---

## 7. Padronização dos dados

Antes de armazenar as informações, estabeleça um padrão:

* **Nome do cliente:** Não devem ser aceitos valores vazios (`""`) ou apenas com espaços (`" "`). Remova espaços desnecessários no início e final do nome.
* **Tipo do veículo:** No JSON, utilize sempre `"bicicleta"` ou `"patinete"`. Evite armazenar variações como `"Bike"`, `"BIKE"`, `"Patinete elétrico"` ou `"PATINETE"`.
* **Valores monetários:** Internamente, os valores devem permanecer numéricos (ex: `4.25`). Evite armazenar strings formatadas como `"R$ 4,25"`. A formatação em reais deverá acontecer **somente** quando o valor for exibido ao usuário.

---

## 8. Validações obrigatórias

O Easy Mob não deverá aceitar uma operação apenas porque o usuário digitou algum valor. Implemente verificações para impedir situações como:

* **Aluguel:** Veículo inexistente, veículo já alugado, ID inválido ou nome do cliente vazio.
* **Devolução:** Aluguel inexistente, aluguel já finalizado ou veículo não relacionado ao aluguel.
* **Menu:** Caso o usuário digite opções inválidas como `9`, `abc` ou `-2`, o sistema deverá informar que a opção é inválida e retornar ao menu principal.

---

## 9. Comprovante de devolução

Ao finalizar um aluguel, apresente um pequeno comprovante no terminal:

```text
=================================
      EASY MOB - DEVOLUÇÃO       
=================================
Cliente: Ana Souza
Veículo: Patinete City
Tipo: Patinete
Início: 27/10/2026 18:30
Fim: 27/10/2026 18:52
Tempo utilizado: 22 minutos
Valor por minuto: R$ 0,35

TOTAL: R$ 7,70
=================================
```

---

## 10. Persistência dos dados

Há uma regra fundamental: **Fechar o Easy Mob não pode fazer os dados desaparecerem.** 

### Faça este teste de verificação:
1. Execute o sistema.
2. Realize um aluguel.
3. Encerre a aplicação.
4. Execute novamente.
5. Consulte os aluguéis.

O aluguel registrado anteriormente deverá continuar armazenado.

---

## 11. Situações que o sistema precisa resolver

Antes de considerar a aplicação concluída, teste pelo menos os seguintes cenários:

* **Teste 1:** Alugar uma bicicleta disponível.
* **Teste 2:** Tentar alugar novamente a mesma bicicleta.
* **Teste 3:** Alugar um patinete.
* **Teste 4:** Devolver um veículo e verificar o cálculo do tempo.
* **Teste 5:** Tentar devolver novamente o mesmo aluguel.
* **Teste 6:** Informar um ID que não existe.
* **Teste 7:** Fechar e abrir novamente o programa e verificar se os dados permaneceram salvos.
* **Teste 8:** Verificar se um veículo devolvido voltou a aparecer entre os disponíveis.

---

## Requisitos técnicos obrigatórios

A solução deverá demonstrar de forma clara a utilização de:
* Node.js e sistema de módulos;
* Módulos nativos `fs` e `readline`;
* Manipulação de arquivos JSON via `JSON.parse()` e `JSON.stringify()`;
* Classes, objetos, construtores e métodos (POO);
* Princípios de herança e encapsulamento de responsabilidades;
* Arrays e métodos de busca/iteração;
* Estruturas condicionais;
* Tratamento e validação de entradas de dados;
* Manipulação de datas (`Date`), cálculo do tempo de utilização e cálculo do preço do aluguel.

---

## 🔥 Desafio extra

Depois que a versão básica estiver funcionando, adicione a seguinte opção ao menu:

```text
6 - Resumo do sistema
```

Ao selecioná-la, apresente o seguinte painel dinâmico:

```text
========= RESUMO EASY MOB =========
Veículos cadastrados: 8
Disponíveis: 5
Alugados: 3
Aluguéis finalizados: 12
Valor total arrecadado: R$ 87,45
===================================
```

> 📊 **Regra:** Os números deverão ser calculados dinamicamente a partir dos dados armazenados, e nunca escritos manualmente no código.

---

## Entrega

O projeto deverá ser entregue contendo a seguinte estrutura:

```text
easy-mob/
├── index.js
├── models/
├── data/
│   ├── veiculos.json
│   └── alugueis.json
└── README.md
```

No arquivo **`README.md`**, explique brevemente:
1. Como executar o sistema;
2. Quais classes foram utilizadas;
3. Quais módulos nativos do Node.js foram utilizados;
4. Como funciona o cálculo do aluguel;
5. Como os dados são armazenados;
6. Quais validações foram implementadas.
