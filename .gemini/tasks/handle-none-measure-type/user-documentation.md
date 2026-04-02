# Documentação: Tipos de Medida

## O que mudou?
Agora o sistema suporta categorias que não exigem medidas (ex: acessórios, gravatas).

## Regras de Negócio
- **Categorias sem Medida**: Se uma categoria estiver configurada com o tipo de medida "NONE", ao adicionar um produto dessa categoria em um aluguel, o sistema não solicitará medidas como Busto, Cintura, etc.
- **Interface**: O item aparecerá na lista de produtos do aluguel para confirmação de disponibilidade, mas o painel de detalhes (onde ficam as medidas) permanecerá fechado e desativado.
