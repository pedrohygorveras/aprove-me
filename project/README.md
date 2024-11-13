# Bankme Receivables Management System

Este sistema foi desenvolvido para gerenciar recebíveis e cedentes de forma automatizada e eficiente.

## Funcionalidades Principais

- **Cadastro e Gestão de Recebíveis e Cedentes**: A API permite operações de criação, leitura, atualização e exclusão (CRUD) para recebíveis e cedentes.
- **Autenticação e Gerenciamento de Permissões**: Controle de acesso baseado em perfis de usuário para garantir segurança e isolamento de operações.
- **Processamento em Lotes**: Envio de grandes volumes de recebíveis de uma única vez para processamento em segundo plano, garantindo resiliência.
- **Resiliência**: Itens que falham no processamento são automaticamente reprocessados ou movidos para uma "Fila Morta" após múltiplas tentativas.

### Perfis de Usuário e Descrição de Permissões

| **Permissão** | **Descrição**                                                                                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Admin**     | Acesso total a todas as funcionalidades, incluindo gestão de usuários, permissões e dados sensíveis. Capacidade de executar qualquer operação disponível no sistema.      |
| **Operator**  | Permissão para processar recebíveis, cadastrar e editar cedentes, e gerenciar lotes de transações. Não pode acessar configurações críticas ou gerenciar usuários.         |
| **Auditor**   | Acesso somente de leitura, sem a capacidade de modificar ou excluir informações. Este perfil é destinado a atividades de auditoria e visualização de relatórios.          |
| **Manager**   | Permissão para gerenciar cedentes, recebíveis e lotes, mas sem controle sobre as permissões de outros usuários e sem acesso a configurações administrativas.              |
| **Support**   | Acesso limitado para visualizar dados de recebíveis e cedentes, sem a capacidade de realizar alterações. Perfil voltado para oferecer suporte ao cliente, de modo seguro. |

---
