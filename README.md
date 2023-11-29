# Sistema de Gerenciamento de Pacientes para Enfermeiros

![pacinfo](/assets/PaciInfo.png)

## Apresentação

<body>
    O Paci-Info é um sistema que tem por objetivo gerenciar o trabalho de um enfermeiro em um hospital, de forma organizada e segura. Pense em um gigantesco hospital com diversos pacientes e com uma vasta unicidade, ou seja, onde cada pessoa possui condições específicas de tratamento. Você não acha provável, com anotações físicas sobre cada paciente, a ocorrência de um erro ou demora no atendimento?
</body>
<head>

</head>
<body>
    Essa API tem justamente a função de direcionar corretamente o trabalho dos enfermeiros(as) durante um turno no Hospital.
</body>

## Como usufruir do projeto?

### Instale dependencias

#### -npm install

### Execute o projeto

#### -npm run dev

### Usando a API

#### Para se registrar como enfermeiro basta entrar na rota "/register" e colocar as seguintes informações:

<ul>
<li>usuario</li>
<li>senha</li>
<li>nome</li>
<li>especialidade</li>
<li>turno</li>
</ul>

#### Para fazer login, basta ir na rota "fazerLogin" e digitar os campos:

   <ul>
<li>usuario</li>
<li>senha</li>
</ul>
<br>

<body>
   <b> <font color="#ff0000">Aviso:</font> É Necessário lembrar que para modificar e deletar os enfermeiros é preciso ser um usuário administrador</b>
</body>

#### Depois de efetuado o login como enfermeiro, basta acessar a rota "pacientes" e usufruir das ferramentas de remoção, modificação, criação e observação dos pacientes.

##### <font color="#0000ff">Todo paciente deverá ser cadastrado com um enfermeiro(a)!</font>

### As informações para cadastro do paciente são:

<ul>
<li>nome</li>
<li>idade</li>
<li>enfermeiro_enfermeira_atendimento</li>
<li>remedios</li>
<li>toma_soro</li>
</ul>

### E se você esquecer a senha? Não tem problema, a API foi construída com a ferramente de recuperação de senha!

<ul>
 <li>Basta entrar na rota "/recuperarSenha" e enviar seu usuário</li>
 <li>Ir na ferramenta e pegar o token de recuperação</li>
 <li>Acessar a rota "/resetarSenha" e enviar os seguintes dados: <ul><li>usuario</li><li>novaSenha</li><li> token</li></ul> </li>
 </ul>
