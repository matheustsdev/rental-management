# User Documentation - Regras de Aluguel

## Visão Geral
Esta funcionalidade permite a criação de novos aluguéis de produtos, garantindo que os itens estejam disponíveis e os preços sejam calculados corretamente.

## Regras de Negócio
1.  **Disponibilidade**: Um produto só pode ser alugado se não houver outro aluguel ativo no mesmo período (incluindo o tempo de limpeza/buffer da categoria).
2.  **Datas**:
    - A data de devolução deve ser obrigatoriamente posterior à data de aluguel.
    - Não é permitido criar aluguéis com data retroativa.
3.  **Financeiro**:
    - **Descontos**: Podem ser aplicados em porcentagem ou valor fixo.
    - **Sinal**: O cliente pode pagar uma parte do valor no momento da reserva (sinal).
    - **Total**: O valor total é calculado com base no preço do produto e período (se aplicável), subtraindo os descontos.

## Guia do Usuário
Ao cadastrar um aluguel, o sistema validará automaticamente se os itens escolhidos estão "livres". Se houver conflito, o sistema impedirá o salvamento e informará qual produto está indisponível.
