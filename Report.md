# Bookify - TPW_Project2
Se é um amante de livros e está à procura de uma maneira de partilhar as suas opiniões e descobrir novos títulos, o Bookify é a plataforma perfeita.
Com o Bookify, os utilizadores podem pesquisar e adicionar livros à sua biblioteca pessoal, adicionar authores favoritos e editoras.
Se é um autor que procura um novo público para os seus livros, o Bookify é a plataforma perfeita.
Com o Bookify,podem adicionar os seus próprios livros à plataforma, permitindo uma maior interação e colaboração com o seu público.


## Conteúdo
- [Bookify - TPW\_Project2](#bookify---tpw_project2)
  - [Conteúdo](#conteúdo)
  - [Visão do projeto](#visão-do-projeto)
- [Persona](#persona)
  - [Wednesday](#wednesday)
  - [William](#william)
  - [Júlia](#júlia)
- [Cenários](#cenários)
  - [Cenário 1](#cenário-1)
  - [Cenário 2](#cenário-2)
  - [Cenário 3](#cenário-3)
  - [Cenário 4](#cenário-4)
- [Requisitos](#requisitos)
- [Arquitetura](#arquitetura)
  - [Frontend](#frontend)
    - [Componentes](#componentes)
      - [Comunicação entre componentes](#comunicação-entre-componentes)
    - [**Serviços**](#serviços)
    - [**Módulos**](#módulos)
      - [User](#user)
      - [Author](#author)
      - [Publisher](#publisher)
      - [Book](#book)
      - [Search](#search)
      - [Género](#género)
      - [Reviews](#reviews)
      - [Rating](#rating)
      - [Comments](#comments)
    - [**Forms**](#forms)
  - [Backend](#backend)
    - [API](#api)
      - [User](#user-1)
      - [Publisher](#publisher-1)
      - [Book](#book-1)
      - [login](#login)
      - [rattings](#rattings)
      - [reviews](#reviews-1)
      - [Genres](#genres)
  - [Base de dados](#base-de-dados)
- [Autenticação](#autenticação)
- [Execute](#execute)
- [Deploy](#deploy)
- [Referências](#referências)
- [Créditos](#créditos)

## Visão do projeto 

O Bookify é um projeto de software que visa fornecer uma plataforma online inovadora para os amantes de livros, permitindo a procura e a adição de livros à sua biblioteca pessoal, bem como a partilha de opiniões sobre os títulos lidos através de **reviews** e **ratings**. Além disso, podem obter informações dos seus authores favoritos e editoras.
Enquanto autores, podem visualizar informações das editoras da plataforma, podem adicionar os seus própios livros, permitindo uma nova interação com os seus leitores.

O Bookify foi desenvolvido utilizando as tecnologias **Angular** e **Django Rest Framework**, juntanmente com outras ferramentas adicionar funcionaliades às tecnologias descritas anteriormente, garantindo alta performance e escalabilidade. 

# Persona

Uma _Persona_ é uma personagem criada para representar o público-alvo de um sistema ou produto. Para o nosso sistema, criamos três personas para ilustrar as possíveis utilizações: **Wednesday**, **William Shakespeare** e **Júlia**.

## Wednesday

_Wednesday_ é uma estudante universitária de 21 anos que adora ler livros de ficção cientifica e fantasia. Ela procura um sistema que lhe permita encontrar novas recomendações de livros e organizar sua biblioteca pessoal. Além disso, ela gostaria de ter a opção de adicionar reviews e ratings aos livros que já leu, para poder compartilhar suas opiniões.

## William

_William_ é um escritor de 35 anos que está sempre à procura de novas fontes de inspiração. Ele utiliza o Bookify para encontrar recomendações de livros que lhe possam fornecer ideias para os seus próximos projetos. 
Ele ainda utiliza a plataforma como forma expandir as suas oportunidades de marketing e alcançar um público mais amplo, adicionando seus livros à plaforma.

## Júlia
Júlia é uma advogada de 30 anos que utiliza o Bookify para encontrar livros de criminologia e direito penal. Ela gosta de manter uma biblioteca pessoal organizada e valoriza a opção de poder adicionar tags e categorias aos seus livros para facilitar a sua pesquisa.

# Cenários
O projeto Bookify inclui ? cenários que descrevem como as personas mencionadas acima podem usar a plataforma. Os cenários são:

## Cenário 1

**Wednesday** está a ler um livro e gostaria de adicionar uma review ao livro. Ela abre o Bookify e inicia sessão. Ela procura o livro que está a ler e clica no botão "Add review". Ela escreve a sua review e clica no botão "Submit". A review é adicionada ao livro e é visível para outros utilizadores.

## Cenário 2

**William** acabou de publicar um novo livro e gostaria de adicioná-lo à plataforma. Para isso, ele abre o Bookify e inicia sessão. Clica no botão "Add Book" e preenche os campos necessários. O livro é adicionado à plataforma e é visível para outros utilizadores.

## Cenário 3

**Júlia** está à procura por livros de direito para ler durante o seu tempo livre. Ela abre o Bookify e inicia sessão. Ela utiliza a funcionalidade de pesquisa para procurar por livros de direito.

## Cenário 4

**Joana** acabou de descobrir o Bookify e está interessada em utilizar a plataforma. Ela abre o Bookify e clica no botão "Criar conta". Ela preenche os campos necessários e cria a sua conta. Agora ela pode utilizar todas as funcionalidades do Bookify, incluindo adicionar livros à sua biblioteca pessoal, adicionar reviews e ratings, visitar a pagina da suas editoras favoritas com recurso do qrcode.

# Requisitos
                
Sem estar autenticado, posso:
- Visualizar a _homepage_ da aplicação
- Visualizar a _authores_ da aplicação
- Visualizar a _publishers_ da aplicação
- Visualizar a pagina especifica de um livro 
- Visualizar a pagina especifica de um autor
- Visualizar a pagina especifica de uma editora 
- Criar uma conta como autor
- Criar uma conta como leitor
- Pesquisar por diferentes filtros

Como utilizador, posso ainda:
- Fazer login / autenticar-se 
- Visualizar a página de perfil
- Editar dados do seu perfil
- Adicionar um livro, um autor ou uma editora aos favoritos
- Adicionar, remover e editar reviews
- Responder a outras reviews

Como autor, posso ainda:
- Adicionar, Remover e editar livros



# Arquitetura

O Bookify é uma aplicação web baseada em uma arquitetura de camadas, que consiste em três partes principais: backend, frontend e base de dados. Cada uma dessas partes é responsável por uma parte específica do sistema.
Permitindo desta forma uma uma maior flexibilidade e escalabilidade do Bookify, pois cada camada pode ser atualizada ou substituída independentemente das outras camadas. Além disso, a separação de responsabilidades entre as camadas permite uma manutenção mais fácil e um desenvolvimento mais rápido da plataforma.


## Frontend

O frontend é a camada mais visível do Bookify e é responsável por fornecer a interface gráfica para os utilizadores interagirem com a plataforma. Ela é desenvolvida usando Angular, um framework JavaScript de código aberto, e é responsável por exibir as páginas da web, receber os input dos utilizadores e enviar solicitações para a camada de aplicativo.

### Componentes

No frontend do Bookify, a interface é construída com componentes reutilizáveis que são compostos por um template HTML, um arquivo de estilo CSS e uma classe TypeScript. Cada componente é responsável por uma parte específica da funcionalidade da plataforma e pode ser facilmente adicionado, removido ou modificado sem afetar o funcionamento geral da aplicação.

Alguns componentes utilizados:

Nome | Funcionalidade|
-----|---------------|
**Login** | Responsável por exibir o formulário de login e enviar as credênciais para a camada de aplicativo.|
**Signup** | Responsável por exibir o formulário de registo e enviar as informações do utilizador para a camada de aplicativo.|
**Signup-author**| Responsável por exibir o formulário de registo e enviar as informações do autor para a camada de aplicativo.|
**Navbar** | Responsável por exibir a barra de navegação e permitir que o utilizador navegue entre as diferentes páginas da aplicação.|
**Search-filters**| Responsável por exibir os filtros de pesquisa e enviar os filtros selecionados para a camada de aplicativo.|
**author-profile**| Responsável por exibir o perfil do autor.|
**authors**| Responsável por exibir uma lista de um autores e ainda com um filtro de rating.|
**edit-author**| Responsável por exibir o formulário de editar e enviar dados do autor para a camada de aplicativo.|
**add-book**| Responsável por exibir o formulário de criação de livro e enviar as informações do livro para a camada de aplicativo.|
**edit-book**| Responsável por exibir o formulário de editar e enviar dados do livro para a camada de aplicativo.|
**book**| Responsável por exibir um card de um livro.|
**books-conatiner**| Responsável por exibir uma lista de cards de livros.|
**book-details**| Respónsavel por exibir a informação de um livro e enviar informações de rating, riews para a camada de aplicativo.|
**publisher**| Responsável por exibir a informação de uma editora.|
**publishers**| Responsável por exibir uma lista de editoras.|
**Profile**| Responsável por exibir o perfil do utilizador.|
**edit-profile**| Responsável por exibir o formulário de editar e enviar dados do utilizador para a camada de aplicativo.|

</br>
Estes são apenas alguns exemplos de componentes que podem ser encontrados na aplicação. A divisão em componentes permite que o frontend seja facilmente estendido e atualizado com novas funcionalidades no futuro.

#### Comunicação entre componentes

A comunicação entre componentes é essencial para a partilha de informação ou de alteração de dados. 
Em angular existem diferentes maneiras de comunicar entre os componentes, as que foram utilizadas foi:

- **Input**: permite que um componente filho receba dados de um componente pai.
  ```html
    <div class="h-full mb-2 flex gap-2" >
      <app-book *ngFor="let book of books" [book]="book" routerLink="/book/{{book.id}}"></app-book>
    </div>
  ```
  [file](frontend/src/app/base/books-container/books-container.component.html)
  ```typescript
    @Input()user_id: number;
    @Input()query: string;
    @Input()avg_rating: number;
    @Input()year: number;
    @Input()publisher: string;
    @Input()language: string;
  ```
  [file](./frontend/src/app/base/books-container/books-container.component.ts)

- **Output**: permite que um componente filho envie dados para um componente pai.
  ```typescript
    @Output() searchChanged = new EventEmitter<Search>()

    // (...) 
    searchChanged(search: Search) {
      this.search = search;
      this.searchChanged.emit(this.search);
    }
  ```
  [file](./frontend/src/app/base/search-filters/search-filters-containers/search-filters-containers.component.ts)


- **Service**: permite que um componente filho envie dados para um componente pai.</br>[auth.service](./frontend/src/app/services/auth.service.ts)
  
  </br>

### **Serviços**

No frontend do Bookify, os serviços são usados para gerir tarefas comuns e fornecer funcionalidade específica que pode ser compartilhada por vários componentes da aplicação. Eles são criados como classes no Angular e podem ser injetados em qualquer componente que precise da sua funcionalidade.

Alguns exemplos de serviços utilizados no Bookify incluem:

Name | Funcionalidade |
--- | --- |
**BookService** | Responsável por gerir a comunicação com a API RESTful do Bookify, permitindo que os componentes obtenham informações sobre livros e enviem dados para o back-end.|
**authService** | Responsável por gerir a autenticação do utilizador, incluindo o login e o registo.|
**userService** | Responsável por gerir a comunicação com a API RESTful do Bookify relacionada ao utilizador, incluindo a obtenção e atualização de informações do perfil.|
**reviewService** | Responsável por gerir a comunicação com a API RESTful do Bookify relacionada aos reviews, incluindo a adição e remoção de reviews.|
**authoreService**| Responsável por gerir a comunicação com a API RESTful do Bookify relacionada ao autor, incluindo a obtenção e atualização de informações do perfil.|
**publisherService**| Responsável por gerir a comunicação com a API RESTful do Bookify relacionada à editora, incluindo a obtenção de informações do perfil.|

</br>
Estes são apenas alguns exemplos de serviços que podem ser encontrados no Bookify. Eles são úteis para centralizar lógicas específicas e permitir que vários componentes da aplicação possam compartilhar essas funcionalidades sem precisar duplicá-las. Além disso, os serviços são úteis para realizar chamadas de API e gerir o fluxo de dados entre o front-end e o back-end da aplicação.

</br>

### **Módulos**

Os modelos são classes que representam os dados e a estrutura de uma aplicação. No Bookify, os modelos são usados para definir a estrutura de dados de entidades seguintes: 

#### User

O _user_ inclui informações sobre os utilizadores da plataforma, como nome de utilizador, senha, nome, endereço de e-mail e data de nascimento.

| Campo       | Tipo   | Descrição                             |
|-------------|--------|---------------------------------------|
| id          | Number | Identificador único do utilizador     |
| username    | String | Nome de utilizador                    |
| password    | String | Password do utilizador                |
| email       | String | Email do utilizador                   |
| first_name  | String | Primeiro nome do utilizador           |
| last_name   | String | Último nome do utilizador             |
| birth_date  | String | Data de nascimento do utilizador      |
| image       | String | Imagem de perfil do utilizador        |
| description | String | Descrição do utilizador               |
| avg_rating  | Number | Rating médio dos livros do utilizador |

#### Author

O _author_ inclui informações sobre os autores dos livros disponibilizados na plataforma.

| Campo       | Tipo   | Descrição                             |
|-------------|--------|---------------------------------------|
| id          | Number | Identificador único do autor          |
| name        | String | Nome do autor                         |
| birth_date  | String | Data de nascimento do autor           |
| image       | String | Imagem de perfil do autor             |
| description | String | Descrição do autor                    |
| nationality | String | Nacionalidade do autor                |
| avg_rating  | Number | Rating médio dos livros do autor      |


#### Publisher 

O _publisher_ inclui informações sobre as editoras que publicam os livros na plataforma.

| Campo       | Tipo   | Descrição                             |
|-------------|--------|---------------------------------------|
| id          | Number | Identificador único da editora        |
| name        | String | Nome da editora                       |
| email       | String | Email da editora                      |
| address     | String | Morada da editora                     |
| city        | String | Cidade da editora                     |
| country     | String | País da editora                       |
| website     | String | Website da editora                    |


#### Book

O _book_ inclui as informações sobre os livros disponibilizados no Bookify.

| Campo       | Tipo   | Descrição                             |
|-------------|--------|---------------------------------------|
| id          | Number | Identificador único do livro          |
| title       | String | Título do livro                       |
| pages       | Number | Número de páginas do livro            |
| author      | id     | Identificador do autor do Livro       |
| publisher   | id     | Identificador da editora do livro     |
| isbn        | String | ISBN do livro                         |
| description | String | Descrição do livro                    |
| image       | String | Imagem do livro                       |
| language    | String | Idioma do livro                       |
| publish_date | Date  | Data de publicação do livro           |
| avg_rating  | Number | Rating médio do livro                 |
| num_ratings | Number | Número the ratings dados              |
| genres      | Array  | Géneros do livro                      |
| author_name | String | Nome do autor                         |
| publisher_name | String | Nome da editora                    |
| genre_name  | String | Nome do genero do livro               |

####  Search 

A _Search_ armazena informações sobre as pesquisas efetuadas pelos utilizadores.

| Campo       | Tipo   | Descrição                             |
|-------------|--------|---------------------------------------|
| query       | String | Query de pesquisa                     |
| year        | Number | Ano de publicação                     |
| publisher   | String | Editora                               |
| language    | String | Idioma                                |
| avg_rating  | Number | Rating médio                          |


####  Género

O _Género_ guarda os diferentes Géneros de livros existentes na plataforma.

| Campo       | Tipo   | Descrição                             |
|-------------|--------|---------------------------------------|
| genre       | String | Nome do género                        |
| id          | Number | Identificador único do género         |


####  Reviews

A _Reviews_ guarda as reviews dos livros feitas pelos utilizadores.

| Campo       | Tipo   | Descrição                             |
|-------------|--------|---------------------------------------|
| id          | Number | Identificador único da review         |
| text        | String | Texto da review                       |
| datetime    | Date   | Data da review                        |
| user        | Number | Identificador do utilizador           |
| book        | Number | Identificador do livro                |
| user_name   | String | Nome do utilizador                    |
| user_image  | String | Imagem de perfil do utilizador        |
| book_title  | String | Título do livro                       |
| book_image  | String | Imagem do livro                       |
| number_of_comments | Number | Número de comentários da review    |


####  Rating 

A _Rating_ guarda os ratings dos livros feitas pelos utilizadores.

| Campo       | Tipo   | Descrição                             |
|-------------|--------|---------------------------------------|
| id          | Number | Identificador único do rating         |
| rating      | Number | Rating do livro                       |
| user        | Number | Identificador do utilizador           |
| book        | Number | Identificador do livro                |

####  Comments

Os _Comments_ guardam os comentários feitos pelos utilizadores nas reviews.

| Campo       | Tipo   | Descrição                             |
|-------------|--------|---------------------------------------|
| id          | Number | Identificador único do comentário     |
| text        | String | Texto do comentário                   |
| datetime    | Date   | Data do comentário                    |
| user        | Number | Identificador do utilizador           |
| review      | Number | Identificador da review               |
| user_name   | String | Nome do utilizador                    |
| user_image  | String | Imagem de perfil do utilizador        |


### **Forms**
No Angular, os forms são usados para coletar e validar dados de entrada do utilizador. Eles podem ser implementados de várias maneiras, mas a maneira mais comum é usar o módulo FormsModule e os componentes de formulário do Angular. O Angular fornece várias diretivas, como required, minlength e pattern, que podem ser adicionadas aos elementos de formulário para definir as regras de validação. É também possível criar regras de validação personalizadas usando expressões regulares ou escrevendo uma função de validação personalizada.

O botão de submit não funcionar enquanto o formulário estiver inválido, o que permite garantir ue os dados de entrada do utilizador estejam em um formato válido antes de enviá-los para o back-end ou armazená-los em um banco de dados, o que ajuda a garantir a integridade dos dados e a evitar problemas de validação no futuro.

Um exemplo de formulario utilizado no Bookify:

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
    <div class="form-control mb-4 space-y-4">

      <label class="input-group w-full input-group-lg">
        <span class="w-1/4">Username</span>
        <input type="text" name="username" class="w-3/4 input input-primary input-bordered input-lg"
               placeholder="Username"
               formControlName="username">
      </label>
```

```typescript
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    // ...
  }
}
```

## Backend

O backend é a camada de negócio do Bookify e é responsável por gerir a informação e as regras de negócio.  Ela é desenvolvida usando Django, um framework de aplicativo web de código aberto baseado em Python, e inclui as lógicas de negócio, validações e integrações com a API  RESTful do Bookify.


### API

O projeto Bookify inclui uma API que permite aos desenvolvedores criar aplicativos que se integram com a plataforma. A sua construção foi possiveis com a combinação de serializers e ModelViewSets, uma opção comum para criar endpoints de API RESTful no Django.
Os _ModelViewSets_ tratam- se de classes que fornecem uma camada de abstração para o gerenciamento de modelos em uma API RESTful. Eles fornecem funcionalidade padrão para operações comuns, como listar, criar, atualizar e excluir objetos de um modelo, e podem ser facilmente personalizados para atender às necessidades específicas da aplicação. Enquanto que os _serializers_  são usados no Django REST framework para convertar dados de modelos de banco de dados em formatos de dados mais simples, como JSON, e vice-versa. Eles permitem que os dados dos modelos sejam facilmente transferidos entre o backend e o frontend da aplicação e também facilitam a validação dos mesmos. Para complementar os métodos base dos _ModelViewSets_ também foram criadas ações extra em determinadas entidades, através do decorator _@action_, o que nos permitiu efetuar determinados queries mais complexos. Por fim, também foram usados os django filters em conjunto com um pacote externo [Django REST framework filters package](https://github.com/philipn/django-rest-framework-filters) de modo a facilitar as queries de filtragem. Através dos django filters foi possível criar as próprias classes filterset, que definem qual os filtros possíveis de aplicar a um determinado modelo.

Os endpoints apresentados pela _Api_, são o seguintes:

####  User

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | /user    | Cria um novo utilizador |
| GET    | /user    | Retorna todos os utilizadores |
| GET    | /user/:id | Retorna um utilizador específico |
| PUT    | /user/:id | Atualiza um utilizador específico |
| DELETE | /user/:id | Remove um utilizador específico |
| GET    | users/?avg_rating__gte= | Retorna a lista de utilizadores com bases no seu rating médio |

####  Publisher

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | /publisher | Cria uma nova editora |
| GET    | /publisher | Retorna todas as editoras |
| GET    | /publisher/:id | Retorna uma editora específica |
| PUT    | /publisher/:id | Atualiza uma editora específica |
| DELETE | /publisher/:id | Remove uma editora específica |
| GET    | publishers/?name=&city=&country= | retorna a lista de editoras com base no nome, cidade ou país |

####  Book

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | /book | Cria um novo livro |
| GET    | /book | Retorna todos os livros |
| GET    | /book/:id | Retorna um livro específico |
| PUT    | /book/:id | Atualiza um livro específico |
| DELETE | /book/:id | Remove um livro específico |
| GET    | books/get_all_authors/ | retorna todos os autores de livros |
| GET    | books/get_available_years/ | retorna a lista de anos onde se publicaram livros
| GET    | /books/?name__icontains=&language=&publish_date__year=&publisher=&avg_rating__gte= | retorna a lista de livros com base no nome, lingua, data de publicação, ano ou rating médio

####  login

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | /login | Cria uma nova sessão |

####  rattings

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | /rating | Cria um novo rating |
| GET    | /rating | Retorna todos os ratings |
| GET    | /rating/:id | Retorna um rating específico |
| PUT    | /rating/:id | Atualiza um rating específico |
| DELETE | /rating/:id | Remove um rating específico |

####  reviews

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | /review | Cria uma nova review |
| GET    | /review | Retorna todas as reviews |
| GET    | /review/:id | Retorna uma review específica |
| PUT    | /review/:id | Atualiza uma review específica |
| DELETE | /review/:id | Remove uma review específica |
| GET    | /reviews/?book=&user= | retorna a lista de reviews com base no livro ou no utilizador |

####  Genres

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | /genres | Cria um novo género |
| GET    | /genres | Retorna todos os géneros |
| GET    | /genres/:id | Retorna um género específico |
| PUT    | /genres/:id | Atualiza um género específico |
| DELETE | /genres/:id | Remove um género específico |



## Base de dados

A Base de dados é camada de persistência, responsável por armazenar e gerir os dados da plataforma. Ela é implementada usando um banco de dados relacional e inclui tabelas para armazenar informações sobre utilizadores, livros, avaliações e outros dados relevantes. A camada de aplicativo acessa os dados por consultas SQL e utiliza as informações para fornecer os recursos e funcionalidades da plataforma para os utilizadores.



# Autenticação 
A autenticação é uma parte essencial da aplicação, pois garante que apenas utilizadors autorizados tenham acesso aos recursos da aplicação. No Bookify, a autenticação é implementada usando o pacote django-rest-framework-simplejwt. Ele permite que os utilizadors se autentiquem por tokens JWT, gerados quando um utilizador faz login e enviados para o cliente. O cliente deve enviar o token em todas as requisições subsequentes para acessar os recursos protegidos. O token expira após um período configurável e o utilizador precisará fazer login novamente para obter um novo token. Isso garante que apenas os utilizadors autorizados tenham acesso aos recursos da aplicação.


Para a implementação da autenticação no lado do Django foram criados os endpoints de login e registo na API RESTful do Django para permitir que os utilizadors façam login e criem contas, e ainda de logout para apermitir que os utilizadores terminem a sessão.

[ver ficheiro](./backend/core/views/auth.py)
```py 
def get_tokens_for_user(user):
    global all_tokens

    username = user.username
    if username in all_tokens and all_tokens[username] is not None:
        return all_tokens[username]

    token = str(AccessToken.for_user(user))

    all_tokens[username] = token
    return token

@api_view(['POST'])
def login(request):
    username = request.data['username']
    password = request.data['password']

    user = authenticate(request, username=username, password=password)
    
    if user:
        # Get token
        token = get_tokens_for_user(user)
        user_data = CustomUser.objects.all().filter(username=username).values()

        return Response({
            "Message": "Login Successful",
            "Code": "HTTP_200_OK",
            "Authorization": "Bearer " + token,
            "user_id": user_data.first()["id"],
            "username": user_data.first()["username"]
        }, status=status.HTTP_200_OK)

    return Response({
        "Message": "User doesn't exist",
        "Code": "HTTP_400_BAD_REQUEST",
    }, status=status.HTTP_400_BAD_REQUEST)

```

Para implementar a autenticação no lado do Angular, criou-se um serviço de autenticação para gerir o login e o logout do utilizador. Esse serviço deve fazer chamadas HTTP para os endpoints de login e logout da API RESTful do Django e armazenar o token JWT recebido na resposta.

[ver ficheiro](./frontend/src/app/services/auth.service.ts)
```ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Session } from "../models/session.model";


const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
}
  
@Injectable({
providedIn: 'root'
})
export class AuthService {

    private baseUrl = 'http://localhost:8000/';

    constructor(private httpClient: HttpClient) {
    }

    login(username: string, password: string): Observable<Session> {
        const uri = this.baseUrl + 'login';
        return this.httpClient.post<Session>(uri, {'username': username, 'password': password}, httpOptions);
    }
```

A informação de cada login foi guardada num interceptador de autenticação, de forma a garantir que o token fosse enviado com cada requisitação para acessar os recursos protegidos da Api.


# Execute 

Para executar a aplicação, é necessário correr em dois terminais:

- Primeiro Terminal
```
cd backend
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
```

- Segundo Terminal
```
cd frontend
npm install
ng serve
```

# Deploy 

A aplicação pode ser acedida no seguinte link:

[https://bookify-frontend.herokuapp.com/](https://bookify-frontend.herokuapp.com/)


# Referências

- [https://www.goodreads.com/](https://www.goodreads.com/)
- [Django](https://www.djangoproject.com/)
- [Angular](https://angular.io/)
- [Bootstrap](https://getbootstrap.com/)
- [ModelViewSets](https://www.django-rest-framework.org/api-guide/viewsets/)
- [Django-fillters](https://django-filter.readthedocs.io/en/stable/guide/usage.html)
- [Serializers](https://www.django-rest-framework.org/api-guide/serializers/#serializers)
- [Autneticação](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/)


# Créditos

- [Artur Correia, 102477](https://github.com/afarturc)
- [Mariana Andrade, 103823](https://github.com/MarianaAndrad)
- [Vicente Barros, 97787](https://github.com/v1centebarros)

