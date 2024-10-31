# Scholargate: plataforma de gestão para educação

## Sobre
Esse projeto corresponde ao front-end de uma aplicação web para gestão acadêmica, e foi desenvolvido utilizando o framework Angular e Bootstrap. - O projeto referente ao back-end da mesma aplicação pode ser encontrado [aqui](https://github.com/FullStack-Education/M3P-BackEnd-Squad1).

## Funcionalidades
- Permite o cadastramento e manejo de professores, turmas, alunos e avaliações;
- Possui três diferentes níveis de acesso para diferentes cargos no contexto acadêmico (administrador, docente e aluno), cada um com funcionalidades específicas disponíveis;
- Apresenta estatísticas do sistema (número de turmas, docentes e alunos cadastrados) na página principal de administradores;
- Possibilita aos administradores a consulta dos dados de alunos e docentes cadastrados no sistema por meio de pesquisa;
- Disponibiliza aos alunos seu histórico de avaliações e lista de disciplinas.

## Componentes e rotas
- Página de login (`/login`) - Página padrão para acessar o sistema, valida credenciais de acesso do usuário;
- Página de início (`/home`) - Página principal da aplicação, seu conteúdo varia de acordo com o cargo do usuário logado (administradores e docentes têm acesso a uma listagem de todos os alunos cadastrados no sistema);
- Toolbar - Barra superior presente em todas as telas (exceto página de login), contém o nome da página atual, além do nome e imagem de perfil do usuário atualmente logado;
- Menu lateral - Presente em todas as telas (exceto página de login), possibilita a navegação pelas demais páginas da aplicação dependendo do cargo do usuário logado;
- Cadastro de docente (`/cadastro-docente`) - Formulário que recebe informações para cadastro de um docente no sistema;
- Cadastro de aluno (`/cadastro-aluno`) - Formulário que recebe informações para cadastro de um aluno no sistema;
- Cadastro de turma (`/cadastro-turma`) - Formulário que recebe informações para cadastro de uma turma no sistema;
- Cadastro de avaliação (`/cadastro-avaliacao`) - Formulário que recebe informações para cadastro de uma nota no sistema;
- Listagem de docentes (`/listagem-docentes`) - Apresenta todos os docentes cadastrados no sistema, permite pesquisa por meio de um campo de texto;
- Notas (`/listagem-notas`) - Apresenta o histórico completo de notas do aluno atualmente logado.

## Possíveis melhorias futuras
Algumas funções podem ser implementadas para tornar a aplicação ainda melhor, como aprimoramento/adequação da estrutura de dados, criação de nova conta, resgate de senha, botões de edição e deleção. - Além disso, algumas partes da aplicação ainda encontram-se meramente 'mockadas', como a lista de cursos na home de alunos. Essa seção pode futuramente receber dados vindos do back-end.

## Instalação e execução
### Pré-requisitos
- Node.js;
- Angular CLI.
### Para execução local:
1. Clone o repositório;
2. Instale as dependências do NPM com o comando `npm install`;
3. Execute o projeto Angular por meio do comando `ng serve`;
4. Acesse o projeto localmente no navegador por meio do endereço padrão `http://localhost:4200/`.

## Autoria
Desenvolvido em conjunto por Barbara Calderon, David Dutra e Luís Pedro Trindade.
