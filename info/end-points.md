Os endpoints apresentados pela _Api_, são o seguintes:

####  User

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET    | /api/users    | Retorna todos os utilizadores |
| GET    | /api/users/:id | Retorna um utilizador específico |
| PUT    | /api/users/:id | Atualiza um utilizador específico |
| DELETE | /api/users/:id | Remove um utilizador específico |
| GET    | /api/users/?avg_rating__gte= | Retorna a lista de utilizadores com bases no seu rating médio |
| GET    | /api/users/:id/get_user_reviews/ | Retorna a lista de reviews de um utilizador específico |
| GET    | /api/users/:id/get_fav_book/ | Retorna a lista de livros de um utilizador específico |
| GET    | /api/users/:id/get_fav_author/ | Retorna a lista de autores de um utilizador específico |
| GET    | /api/users/:id/get_fav_publisher/ | Retorna a lista de editoras de um utilizador específico |
| POST   | /api/users/:id/add_fav_book/:book_id | Adiciona um livro específico aos favoritos de um utilizador específico |
| POST   | /api/users/:id/add_fav_author/:author_id | Adiciona um autor específico aos favoritos de um utilizador específico |
| POST   | /api/users/:id/add_fav_publisher/:publisher_id | Adiciona uma editora específica aos favoritos de um utilizador específico |
| DELETE | /api/users/:id/remove_fav_book/:book_id | Remove um livro específico dos favoritos de um utilizador específico |
| DELETE | /api/users/:id/remove_fav_author/:author_id | Remove um autor específico dos favoritos de um utilizador específico |
| DELETE | /api/users/:id/remove_fav_publisher/:publisher_id | Remove uma editora específica dos favoritos de um utilizador específico |


####  Publisher

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | /api/publishers | Cria uma nova editora |
| GET    | /api/publishers | Retorna todas as editoras |
| GET    | /api/publishers/:id | Retorna uma editora específica |
| PUT    | /api/publishers/:id | Atualiza uma editora específica |
| DELETE | /api/publishers/:id | Remove uma editora específica |
| GET    | /api/publishers/?name=&city=&country= | retorna a lista de editoras com base no nome, cidade ou país |
| GET    | /api/publishers/:id/get_publisher_books/ | retorna a lista de livros de uma editora específica |
| GET    | /api/publishers/:id/get_publisher_authors/ | retorna a lista de autores de uma editora específica |

####  Author

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET    | /api/authors | Retorna todos os autores |
| GET    | /api/authors/:id | Retorna um autor específico |
| PUT    | /api/authors/:id | Atualiza um autor específico |
| DELETE | /api/authors/:id | Remove um autor específico |
| GET    | /api/authors/?name=&birth_date=&death_date=&country= | retorna a lista de autores com base no nome, data de nascimento, data de morte ou país |


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
| GET    | /books/?author=' | retorna a lista de livros de um autor específico
| GET    | /books/years/ | retorna a lista de anos onde se publicaram livros
| GET    | /books/genres/| retorna a lista de todos os generos|



####  login

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | /login | Cria uma nova sessão |
| POST    | /user/register/| Cria um novo User|
| POST    | /author/register/| Cria um novo Author|


####  rattings

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | /rating | Cria um novo rating |
| GET    | /rating | Retorna todos os ratings |
| GET    | /rating/:id | Retorna um rating específico |
| PUT    | /rating/:id | Atualiza um rating específico |
| DELETE | /rating/:id | Remove um rating específico |
| GET    | /ratings/?book=&user= | retorna a lista de ratings com base no livro ou no utilizador |


####  reviews

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | /review | Cria uma nova review |
| GET    | /review | Retorna todas as reviews |
| GET    | /review/:id | Retorna uma review específica |
| PUT    | /review/:id | Atualiza uma review específica |
| DELETE | /review/:id | Remove uma review específica |
| GET    | /reviews/?book=&user= | retorna a lista de reviews com base no livro ou no utilizador |


#### Comments

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | /comment | Cria um novo comentário |
| GET    | /comment | Retorna todos os comentários |
| GET    | /comment/:id | Retorna um comentário específico |
| PUT    | /comment/:id | Atualiza um comentário específico |
| DELETE | /comment/:id | Remove um comentário específico |


####  Genres

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | /genres | Cria um novo género |
| GET    | /genres | Retorna todos os géneros |
| GET    | /genres/:id | Retorna um género específico |
| PUT    | /genres/:id | Atualiza um género específico |
| DELETE | /genres/:id | Remove um género específico |
| GET    | /genres/?name= | retorna a lista de géneros com base no nome |
