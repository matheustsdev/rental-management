# [cite_start]User Documentation: Fast Product Availability Check [cite: 1]

## Overview
Essa funcionalidade permite verificar rapidamente se um produto está disponível para aluguel em uma data ou período específico. 
Útil para responder prontamente aos clientes em solicitações de reserva via WhatsApp ou telefone.

## Regras de Negócio

### Status de Disponibilidade
- **Disponível**: O produto está livre e pode ser reservado.
- **Indisponível / Alugado**: O produto já está em um aluguel (ativo ou agendado) para essas datas.
- **Em Preparação / Buffer**: O produto já foi devolvido, mas está em período de higienização ou manutenção interna.

### Buffer dinâmico
- Se o aluguel estiver finalizado (`FINISHED`), o sistema calcula a disponibilidade baseada na **data real** da devolução somada aos dias de higienização.
- Se o aluguel estiver agendado (`SCHEDULED`), o sistema calcula a disponibilidade baseada na **data prevista** da devolução somada aos dias de higienização.

## Guia do Usuário
1.  Acesse a seção **Produtos** ou o widget de **Disponibilidade** na tela inicial.
2.  Insira o **Código de Referência** do produto.
3.  Selecione a **Data de Início** e **Data de Fim** do período desejado.
4.  Clique em **Verificar**.
5.  O sistema exibirá instantaneamente se o produto está livre ou se há um aluguel conflitante (mostrando os dados do cliente e o período ocupado).

## Avisos
- Certifique-se de que as datas de devolução real estejam atualizadas para garantir a precisão no cálculo de buffer.
- Aluguéis deletados são ignorados automaticamente pela ferramenta de disponibilidade.