# Scholargate: plataforma de gestão para educação

## Sobre
Esse projeto corresponde ao front-end de uma aplicação web para gestão acadêmica, e foi desenvolvido utilizando o framework Angular e Bootstrap. - O projeto referente ao back-end da mesma aplicação pode ser encontrado [aqui](https://github.com/FullStack-Education/M3P-BackEnd-Squad1).

## Funcionalidades principais
- Permite o cadastramento e manejo de professores, turmas, alunos e avaliações;
- Possui três diferentes níveis de acesso para diferentes cargos no contexto acadêmico (administrador, docente e aluno), cada um com funcionalidades específicas disponíveis. - A proteção dos componentes é assegurada por meio de guarda de rotas:
  ~~~typescript
  if (sessionStorage.getItem('role') == 'ADMIN' || sessionStorage.getItem('role') == 'PROFESSOR') {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
  ~~~
  
- Apresenta estatísticas do sistema (número de turmas, docentes e alunos cadastrados) na página principal de administradores;
- Possibilita aos administradores a consulta dos dados de alunos e docentes cadastrados no sistema por meio de pesquisa;
- Disponibiliza aos alunos seu histórico de avaliações e lista de disciplinas. - A exibição das notas é ordenada por meio de função sort:
  ~~~typescript
      this.avaliacoes = response.sort((a: any, b: any) => new Date(a.data).getTime() - new Date(b.data).getTime());
      }
  ~~~

## Componentes e rotas
- Página de login (`/login`) - Página padrão para acessar o sistema, valida credenciais de acesso do usuário;
  ![image](https://github.com/user-attachments/assets/d6aa7def-370f-49c0-afb3-dd0200888497)

- Toolbar - Barra superior presente em todas as telas (exceto página de login), contém o nome da página atual, além do nome e imagem de perfil do usuário atualmente logado;
- Menu lateral - Presente em todas as telas (exceto página de login), possibilita a navegação pelas demais páginas da aplicação dependendo do cargo do usuário logado;
- Página de início (`/home`) - Página principal da aplicação, seu conteúdo varia de acordo com o cargo do usuário logado (administradores e docentes têm acesso a uma listagem de todos os alunos cadastrados no sistema);
  ![image](https://github.com/user-attachments/assets/54cd5a6f-2303-4289-9653-c8d54a408b5b)

  ![image](https://github.com/user-attachments/assets/113045e5-fb11-4851-af3c-31eef34d515b)
  
- Cadastro de docente (`/cadastro-docente`) - Formulário que recebe informações para cadastro de um docente no sistema;
  ![image](https://github.com/user-attachments/assets/c5b0fa62-f6c0-4d03-ab4d-566b706f561d)

- Cadastro de aluno (`/cadastro-aluno`) - Formulário que recebe informações para cadastro de um aluno no sistema;
  ![image](https://github.com/user-attachments/assets/0f18b1fa-f0c9-46de-b316-1e2dc2251a89)

- Cadastro de turma (`/cadastro-turma`) - Formulário que recebe informações para cadastro de uma turma no sistema;
  ![image](https://github.com/user-attachments/assets/7348750c-712d-4244-a120-5cb5ab3015ef)

- Cadastro de avaliação (`/cadastro-avaliacao`) - Formulário que recebe informações para cadastro de uma nota no sistema;
  ![image](https://github.com/user-attachments/assets/e270a290-bebb-41e5-8f73-e0b6983c2e05)

- Listagem de docentes (`/listagem-docentes`) - Apresenta todos os docentes cadastrados no sistema, permite pesquisa por meio de um campo de texto;
  ![image](https://github.com/user-attachments/assets/c6932549-448f-46cf-9d56-239a281e43e4)

- Notas (`/listagem-notas`) - Apresenta o histórico completo de notas do aluno atualmente logado.
  ![image](https://github.com/user-attachments/assets/d08f0da9-52df-426f-a3f6-ea16db1db3f2)


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
### Observações importantes sobre a execução
- Este projeto corresponde ao front-end da aplicação, e depende [do respectivo back-end](https://github.com/FullStack-Education/M3P-BackEnd-Squad1) para rodar adequadamente;
- A aplicação possui 4 perfis iniciais mockados, com as seguintes credenciais:
  ~~~
  ADMINISTRADOR
    login: admin
    senha: 123

  PROFESSOR
    login: professor
    senha: 123
  
  ALUNO
    login: aluno
    senha: 123
  
  ALUNO 2
    login: aluno2
    senha: 123
  ~~~

## Autoria
Desenvolvido em conjunto por Barbara Calderon, David Dutra e Luís Pedro Trindade.