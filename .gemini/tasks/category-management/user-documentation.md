# Documentação do Usuário: Gestão de Categorias

**Visão Geral da Funcionalidade**: Esta funcionalidade permite aos gestores cadastrarem novas categorias de produtos, definirem o tempo necessário para higienização (buffer) e o tipo de medida que esses produtos exigirão dos clientes.

## Regras de Negócio
### Lógica de Negócio
- **Buffer de Dias**: Representa o tempo adicional necessário após a data de devolução antes que um item esteja disponível novamente. Deve ser maior ou igual a 0.
- **Tipo de Medida**: A escolha do tipo de medida (`DRESS`, `SUIT`, `NONE`) determina quais campos serão exibidos no momento da criação de um aluguel para itens desta categoria.
  - `DRESS`: Exige Busto, Cintura, Quadril, Comprimento, etc.
  - `SUIT`: Exige Ombro, Manga, Calça, etc.
  - `NONE`: Não exige medidas adicionais (ideal para acessórios, bolsas, sapatos).

## Guia do Usuário
### Manual do Usuário
1. Acesse o menu **Categorias**.
2. Para adicionar, clique em **Nova Categoria**.
3. Preencha o nome (ex: "Vestidos Curtos"), os dias de buffer (ex: 2) e selecione o tipo de medida.
4. Clique em **Salvar**.
5. Para editar, clique no botão de edição na linha da categoria desejada, altere os dados e salve.

## Avisos
### Avisos Importantes
- **Nomes Duplicados**: O sistema não permitirá duas categorias com o mesmo nome.
- **Mudança de Medida**: Alterar o tipo de medida de uma categoria que já possui produtos alugados ou cadastrados pode afetar a exibição das medidas em registros passados. O sistema emitirá um alerta nessas situações.
- **Buffer**: Um valor de buffer muito alto pode limitar a disponibilidade dos produtos em datas próximas no calendário.
