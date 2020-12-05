<h1 align="center">
  <img alt="KenzieHub" title="KenzieHub" src="https://kenzie.com.br/images/logoblue.svg" width="100px" />
</h1>

<h1 align="center">
  Kenzie Hub - API
</h1>

<p align = "center">
Este é o backend da aplicação KenzieHub - Um hub de portfólios de programadores daqui da Kenzie! O objetivo dessa aplicação é conseguir criar um frontend de qualidade em grupo, utilizando o que foi ensinado no segundo módulo do curso (Q2) - E desenvolver hard skills e soft skills.
</p>

<blockquote align="center">“Sempre passar o que você aprendeu. - Mestre Yoda”</blockquote>

<p align="center">
  <a href="#endpoints">Endpoints</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</p>


## **Endpoints**

A API tem um total de 13 endpoints, sendo em volta principalmente do usuário (dev) - podendo cadastrar seu perfil, tecnologias que estuda e trabalhos realizados. <br/>
O JSON para utilizar no Insomnia é este aqui -> https://kenziehub.s3.amazonaws.com/requests_kenziehub.json
Para importar o JSON no Insomnia é só clicar na palavra "Insomnia" no canto superior esquerdo. Nesse dropdown é só clicar em "Import / Export > Import Data > From Url" e colocar o link acima :v:

O url base da API é https://kenziehub.me

## Rotas que não precisam de autenticação


<h2 align ='center'> Listando usuários </h2>

Nessa aplicação o usuário sem fazer login ou se cadastrar pode ver os devs já cadastrados na plataforma, na API podemos acessar a lista dessa forma:
Aqui conseguimos ver os usuários, suas tecnologias e seus trabalhos cadastrados.

`GET /users -  FORMATO DA RESPOSTA - STATUS 200`
```json
[
  {
    "id": "8b8e50a6-50c2-4718-b817-2d38cad0c8f4",
    "name": "Gabriel Araujo",
    "email": "gabriel@gmail.com",
    "course_module": "2o Módulo (Frontend avançado)",
    "bio": "Lorem ipsum dolor emet",
    "contact": "linkedin/araujooj",
    "techs": [
      {
        "id": "55126701-18ac-40df-aab9-3a88657db446",
        "title": "React",
        "status": "Avançado",
        "created_at": "2020-11-30T16:26:53.953Z",
        "updated_at": "2020-11-30T16:26:53.953Z"
      },
      {
        "id": "af06a853-c1fb-4a94-960d-1c6caa8d2b5c",
        "title": "Typescript",
        "status": "Avançado",
        "created_at": "2020-11-30T18:40:08.316Z",
        "updated_at": "2020-11-30T18:40:08.316Z"
      }
    ],
    "works": [
      {
        "id": "0cd019b5-10c5-4eb4-9781-5dff577cfd9e",
        "title": "KenzieHub",
        "description": "I was the backend developer of this project, and i did it using Typescript and NodeJS",
        "deploy_url": "https://kenziehub.me",
        "created_at": "2020-12-03T01:13:44.720Z",
        "updated_at": "2020-12-03T01:13:44.720Z"
      }
    ],
    "created_at": "2020-11-27T00:01:13.789Z",
    "updated_at": "2020-12-05T13:59:22.632Z",
    "avatar_url": "https://kenziehub.s3.amazonaws.com/4ff1e3c6c082ff67af7c-IMG_20200610_110518_522.jpg"
  },
  {
    "id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
    "name": "Filipe Gutierry",
    "email": "filipe@gmail.com",
    "course_module": "2o Módulo (Frontend avançado)",
    "bio": "Lorem ipsum dolor emet",
    "contact": "123456789",
    "techs": [],
    "works": [],
    "created_at": "2020-11-27T11:35:18.768Z",
    "updated_at": "2020-11-27T11:36:04.490Z",
    "avatar_url": "https://kenziehub.s3.amazonaws.com/2a3a2542031902a9aa00-kenzie_academy_logo.jpg"
  },
  {
    "id": "7c8c65dd-d83b-465d-a074-acfb6535076c",
    "name": "Filipe Gutierry",
    "email": "fili2pe@gmail.com",
    "course_module": "2o Módulo (Frontend avançado)",
    "bio": "Lorem ipsum dolor emet",
    "contact": "123456789",
    "techs": [],
    "works": [],
    "created_at": "2020-11-27T11:41:58.779Z",
    "updated_at": "2020-11-27T11:41:58.779Z",
    "avatar_url": null
  },
]
```
Podemos utilizar os query params para mudar a lista, mudando a paginação, podemos alterar quantos usuários queremos no perPage, e alterar a página no parâmetro page. Uma requisição apenas no /users irá trazer 15 usuários na página 1.
Com o parâmetro tech, podemos filtrar por tecnologia.

`GET /users?perPage=15&page=1&tech=React - FORMATO DA RESPOSTA - STATUS 200`
```json
[
  {
    "id": "8b8e50a6-50c2-4718-b817-2d38cad0c8f4",
    "name": "Gabriel Araujo",
    "email": "gabriel@gmail.com",
    "course_module": "2o Módulo (Frontend avançado)",
    "bio": "Lorem ipsum dolor emet",
    "contact": "linkedin/araujooj",
    "techs": [
      {
        "id": "55126701-18ac-40df-aab9-3a88657db446",
        "title": "React",
        "status": "Avançado",
        "created_at": "2020-11-30T16:26:53.953Z",
        "updated_at": "2020-11-30T16:26:53.953Z"
      },
      {
        "id": "af06a853-c1fb-4a94-960d-1c6caa8d2b5c",
        "title": "Typescript",
        "status": "Avançado",
        "created_at": "2020-11-30T18:40:08.316Z",
        "updated_at": "2020-11-30T18:40:08.316Z"
      }
    ],
    "works": [
      {
        "id": "0cd019b5-10c5-4eb4-9781-5dff577cfd9e",
        "title": "KenzieHub",
        "description": "I was the backend developer of this project, and i did it using Typescript and NodeJS",
        "deploy_url": "https://kenziehub.me",
        "created_at": "2020-12-03T01:13:44.720Z",
        "updated_at": "2020-12-03T01:13:44.720Z"
      }
    ],
    "created_at": "2020-11-27T00:01:13.789Z",
    "updated_at": "2020-12-05T13:59:22.632Z",
    "avatar_url": "https://kenziehub.s3.amazonaws.com/4ff1e3c6c082ff67af7c-IMG_20200610_110518_522.jpg"
  }
]
```

Lembrando que no cabeçalho da resposta, temos as informações sobre a paginação, e o nextUrl para acessar a próxima página.

Cabeçalho da resposta:
> nextUrl: http://kenziehub.me/users?perPage=15&page=2 <br/>
> page: 1 <br/>
> perPage: 15

Podemos acessar um usuário específico utilizando o endpoint:

`GET /users/:user_id -  FORMATO DA RESPOSTA - STATUS 200`
```json
  {
    "id": "8b8e50a6-50c2-4718-b817-2d38cad0c8f4",
    "name": "Gabriel Araujo",
    "email": "gabriel@gmail.com",
    "course_module": "2o Módulo (Frontend avançado)",
    "bio": "Lorem ipsum dolor emet",
    "contact": "linkedin/araujooj",
    "techs": [
      {
        "id": "55126701-18ac-40df-aab9-3a88657db446",
        "title": "React",
        "status": "Avançado",
        "created_at": "2020-11-30T16:26:53.953Z",
        "updated_at": "2020-11-30T16:26:53.953Z"
      },
      {
        "id": "af06a853-c1fb-4a94-960d-1c6caa8d2b5c",
        "title": "Typescript",
        "status": "Avançado",
        "created_at": "2020-11-30T18:40:08.316Z",
        "updated_at": "2020-11-30T18:40:08.316Z"
      }
    ],
    "works": [
      {
        "id": "0cd019b5-10c5-4eb4-9781-5dff577cfd9e",
        "title": "KenzieHub",
        "description": "I was the backend developer of this project, and i did it using Typescript and NodeJS",
        "deploy_url": "https://kenziehub.me",
        "created_at": "2020-12-03T01:13:44.720Z",
        "updated_at": "2020-12-03T01:13:44.720Z"
      }
    ],
    "created_at": "2020-11-27T00:01:13.789Z",
    "updated_at": "2020-12-05T13:59:22.632Z",
    "avatar_url": "https://kenziehub.s3.amazonaws.com/4ff1e3c6c082ff67af7c-IMG_20200610_110518_522.jpg"
  }
```

<h2 align ='center'> Criação de usuário </h2>

`POST /users -  FORMATO DA REQUISIÇÃO`
```json
{
"email": "johndoe@email.com",
"password": "123456",
"name": "John Doe",
"bio": "Lorem ipsum dolor emet",
"contact": "linkedin/in/johndoe",
"course_module": "Segundo Módulo (Frontend avançado)"
}
```

Caso dê tudo certo, a resposta será assim:

`POST /users -  FORMATO DA RESPOSTA - STATUS 201`
```json
{
  "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
  "name": "John Doe",
  "email": "johndoe@email.com",
  "course_module": "Segundo Módulo (Frontend avançado)",
  "bio": "Lorem ipsum dolor emet",
  "contact": "linkedin/in/johndoe",
  "created_at": "2020-12-05T14:38:02.019Z",
  "updated_at": "2020-12-05T14:38:02.019Z",
  "avatar_url": null
}
```

1. O campo - "contact": Pode receber as redes sociais da pessoa, ou numero de telefone, algum método de contato fora da aplicação.

2. O campo - "course_module" deve receber respectivamente os 4 módulos do curso da kenzie, devendo ser escritos dessa forma:
    1. "Primeiro módulo (Introdução ao Frontend)"
    2. "Segundo módulo (Frontend Avançado)"
    3. "Terceiro módulo (Introdução ao Backend)"
    4. "Quarto módulo (Backend Avançado)"


<h2 align ='center'> Possíveis erros </h2>

Caso você acabe errando e mandando algum campo errado, a resposta de erro será assim:
No exemplo a requisição foi feita faltando o campo "contact" e "course_module".

`POST /users - `
`` FORMATO DA RESPOSTA - STATUS 400``
```json
{
  "status": "error",
  "message": [
    "contact is required",
    "course_module is required"
  ]
}
```

A senha necessita de 6 caracteres.

`POST /users - `
`` FORMATO DA RESPOSTA - STATUS 400``
```json
{
  "status": "error",
  "message": [
    "password: minimum is 6 characters"
  ]
}
```

Email já cadastrado:

`POST /users - `
``  FORMATO DA RESPOSTA - STATUS 400``
```json
{
  "status": "error",
  "message": "Email already exists"
}
```

<h2 align = "center"> Login </h2>

`POST /sessions - FORMATO DA REQUISIÇÃO`
```json
{
"email": "johndoe@email.com",
"password": "123456"
}
```

Caso dê tudo certo, a resposta será assim:

`POST /sessions -  FORMATO DA RESPOSTA - STATUS 201`
```json
{
  "user": {
    "id": "2a75e12d-fd1c-481d-ba88-4d8b17103b2a",
    "name": "John Doe",
    "email": "johndoe@email.com",
    "course_module": "Segundo Módulo (Frontend avançado)",
    "bio": "Lorem ipsum dolor emet",
    "contact": "linkedin/in/johndoe",
    "created_at": "2020-12-05T17:45:04.207Z",
    "updated_at": "2020-12-05T17:45:04.207Z",
    "techs": [],
    "works": [],
    "avatar_url": null
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDcxODM3NzYsImV4cCI6MTYwNzQ0Mjk3Niwic3ViIjoiMmE3NWUxMmQtZmQxYy00ODFkLWJhODgtNGQ4YjE3MTAzYjJhIn0.UY67X23mPYAAzT43uFWZDHPUakd2STo5w4AuOcppkyQ"
}
```

Com essa resposta, vemos que temos duas informações, o user e o token respectivo, dessa forma você pode guardar o token e o usuário logado no localStorage para fazer a gestão do usuário no seu frontend.

## Rotas que necessitam de autorização

Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

Após o usuário estar logado, ele deve conseguir informar as tecnologias que ele aprendeu até agora.

<h2 align ='center'> Criar tecnologias para o seu perfil </h2>

`POST /users/techs - FORMATO DA REQUISIÇÃO`
```json
{
	"title": "React",
	"status": "Iniciante"
}
```

1. O campo - "status" deve receber respectivamente os 3 níveis de habilidade:
    - "Iniciante"
    - "Intermediário"
    - "Avançado"

Caso você tente criar uma tecnologia com o mesmo nome para o seu perfil, receberá este erro:

`POST /users/techs - FORMATO DA RESPOSTA - STATUS 401`
```json
{
  "status": "error",
  "message": "User Already have this technology created, you can only update it"
}
```

Ou seja, você pode apenas dar update em quanto você avançou nas tecnologias que já está no seu perfil. Utilizando este endpoint:

`PUT /users/techs/:tech_id - FORMATO DA REQUISIÇÃO`
```json
{
	"status": "Avançado"
}
```

Também é possível deletar uma tecnologia, utilizando este endpoint:

`DELETE /users/techs/:tech_id`
```
Não é necessário um corpo da requisição.
```

<h2 align ='center'> Criar trabalhos para o seu perfil </h2>

Da mesma forma de criar tecnologias, conseguimos criar trabalhos, dessa forma:

`POST /users/works - FORMATO DA REQUISIÇÃO`
```json
{
	"title": "KenzieHub",
	"description": "I was the backend developer of this project, and i did it using Typescript and NodeJS",
	"deploy_url": "https://kenziehub.me"
}
```
Conseguimos atualizar o titulo, a descrição ou o deploy_url, qualquer uma das informações do respectivo trabalho.
Utilizando este endpoint:

`PUT /users/works/:work_id - FORMATO DA REQUISIÇÃO`
```json
{
  "title": "KenzieHub Atualizado",
  "description": "Nova descrição."
}
```

Também é possível deletar um trabalho do seu perfil, utilizando este endpoint:

`DELETE /users/works/:work_id`
```
Não é necessário um corpo da requisição.
```

<h2 align ='center'> Atualizando os dados do perfil </h2>

Assim como os endpoints de tecnologias e trabalhos, nesse precisamos estar logados, com o token no cabeçalho da requisição. Estes endpoints são para atualizar seus dados como, foto de perfil, nome, ou qualquer outra informação em relação ao que foi utilizado na criação do usuário.

Endpoint para atualizar a foto de perfil:

`PATCH /users/avatar - FORMATO DA REQUISIÇÃO`
```multipart
avatar: <Arquivo de imagem>
```

Nesse endpoint podemos atualizar qualquer dado do usuário, e a senha também, porém é necessário enviar a antiga senha no campo "old_password" caso o usuário queira atualizar a senha.

`PUT /users/profile - FORMATO DA REQUISIÇÃO`
```json
{
"name": "Gabriel Araujo",
"contact": "linkedin/araujooj",
"old_password": "123456",
"password": "123456789"
}
```

---
Feito com ♥ by araujooj :wave:
