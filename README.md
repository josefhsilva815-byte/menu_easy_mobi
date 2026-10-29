# Mobilidade Fácil

## Descrição do projeto

A empresa fictícia Mobilidade Fácil oferece bicicletas e patinetes para aluguel. Cada veículo possui:

- identificação;
- tipo (bicicleta ou patinete);
- valor por minuto;
- estado de disponibilidade.

O sistema deve permitir o gerenciamento do aluguel desses veículos, garantindo que apenas operações válidas sejam executadas.

## Objetivo

Implementar uma aplicação para controlar o aluguel de veículos de mobilidade individual, atendendo às regras de negócio descritas e seguindo a especificação definida pelos testes automatizados.

## Funcionalidades esperadas

O sistema deve ser capaz de:

- cadastrar bicicletas;
- cadastrar patinetes;
- consultar veículos disponíveis;
- iniciar um aluguel;
- encerrar um aluguel;
- calcular o valor total com base no tempo utilizado;
- impedir operações inválidas.

## Regras de negócio

### 1. Cadastro de veículos

- Cada veículo deve ter uma identificação única;
- O tipo do veículo deve ser informado corretamente;
- O valor por minuto deve ser definido no momento do cadastro;
- O veículo deve iniciar como disponível para aluguel.

### 2. Consulta de veículos disponíveis

- O sistema deve listar apenas os veículos que estão disponíveis para aluguel;
- Veículos indisponíveis não devem aparecer na consulta.

### 3. Início de aluguel

- Só é possível iniciar um aluguel quando o veículo estiver disponível;
- O aluguel deve registrar o início do uso e associar o veículo ao período de locação;
- Operações com veículos inexistentes ou indisponíveis devem ser rejeitadas.

### 4. Encerramento de aluguel

- Só é possível encerrar um aluguel em andamento;
- O sistema deve registrar o momento de término do aluguel;
- O veículo deve voltar a ficar disponível ao final do processo.

### 5. Cálculo do valor

- O valor total deve ser calculado com base no tempo de uso e no valor por minuto do veículo;
- O valor deve refletir corretamente o período em que o veículo foi utilizado;
- Caso o cálculo seja solicitado em situação inválida, a operação deve falhar.

### 6. Operações inválidas

O sistema deve impedir entradas e ações inconsistentes, como:

- cadastrar veículo duplicado;
- iniciar aluguel de veículo indisponível;
- iniciar aluguel de veículo inexistente;
- encerrar aluguel inexistente;
- encerrar um veículo que não está em uso;
- consultar veículos sem resultados válidos;
- executar ações quando os dados de entrada estiverem incompletos ou incorretos.

## Importante: testes como especificação

Nesta atividade, os testes são a especificação do sistema. Isso significa que:

- propriedades, métodos, retornos e mensagens de erro devem ser descobertos a partir do arquivo de teste;
- a implementação deve seguir fielmente o comportamento esperado pelos testes;
- o código deve estar alinhado com as regras e mensagens definidas pela suíte de testes.

Em outras palavras, o projeto não deve ser implementado apenas a partir de uma ideia inicial, mas com base na validação dos testes, que definem o contrato funcional do sistema.

## Estrutura sugerida do sistema

A solução pode ser organizada em classes e métodos como:

- Veiculo
- Bicicleta
- Patinete
- Aluguel
- SistemaMobilidade

Os nomes exatos e a organização interna devem ser confirmados pelos testes do projeto.

## Critério de conclusão

A implementação estará correta quando:

- todos os testes forem aprovados;
- todas as regras de negócio forem respeitadas;
- todas as operações inválidas forem rejeitadas corretamente;
- os retornos e mensagens de erro estiverem de acordo com a especificação definida pelos testes.

## Observação

Este README serve como guia de requisitos e entendimento do sistema. A implementação final deve ser guiada pela análise do código de teste, que estabelece a regra oficial do comportamento esperado.
