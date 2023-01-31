# **Módulos**

Os modelos são classes que representam os dados e a estrutura de uma aplicação. No Bookify, os modelos são usados para definir a estrutura de dados de entidades seguintes: 

## User

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

## Author

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


## Publisher 

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


## Book

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

##  Search 

A _Search_ armazena informações sobre as pesquisas efetuadas pelos utilizadores.

| Campo       | Tipo   | Descrição                             |
|-------------|--------|---------------------------------------|
| query       | String | Query de pesquisa                     |
| year        | Number | Ano de publicação                     |
| publisher   | String | Editora                               |
| language    | String | Idioma                                |
| avg_rating  | Number | Rating médio                          |


##  Género

O _Género_ guarda os diferentes Géneros de livros existentes na plataforma.

| Campo       | Tipo   | Descrição                             |
|-------------|--------|---------------------------------------|
| genre       | String | Nome do género                        |
| id          | Number | Identificador único do género         |


##  Reviews

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


##  Rating 

A _Rating_ guarda os ratings dos livros feitas pelos utilizadores.

| Campo       | Tipo   | Descrição                             |
|-------------|--------|---------------------------------------|
| id          | Number | Identificador único do rating         |
| rating      | Number | Rating do livro                       |
| user        | Number | Identificador do utilizador           |
| book        | Number | Identificador do livro                |

##  Comments

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



