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
