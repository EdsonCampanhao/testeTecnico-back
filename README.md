# API de Pokémon - Documentação

## 📋 Visão Geral

API para captura e gerenciamento de Pokémon baseado na temperatura de cidades.

## 🛠️ Tecnologias Utilizadas

- **TypeScript** - Linguagem de programação
- **React** - Frontend framework
- **Express** - Framework web para Node.js
- **Sequelize** - ORM para banco de dados
- **BCrypt** - Hash de senhas
- **JWT** - Autenticação via tokens
- **Weather API** - api do clima
- **Poke Api** - api do pokemon

## ⚙️ Configuração do Ambiente

### Variáveis de Ambiente (.env)

```env
API_KEY_GEO= (chave necessária para as requisições na api de clima)
JWT_KEY= (chave necessária para geração do jwt)
//credenciais do seu banco
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=
```

## 🔐 Endpoints de Autenticação

### POST /createUser
Cria um novo usuário no sistema.

**Parâmetros:**
- `name` (string) - Nome do usuário
- `email` (string) - Email do usuário
- `password` (string) - Senha (mínimo 8 caracteres + 1 letra maiúscula)

**Exemplo de Request:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "MinhaSenh@123"
}
```

### Post /login
Autentica um usuário no sistema.

**Parâmetros:**
- `email` (string) - Email do usuário
- `password` (string) - Senha do usuário

**Exemplo de Request:**
```json
{
  "email": "joao@email.com",
  "password": "MinhaSenh@123"
}
```

## 🎮 Endpoints de Pokémon

### Post /catchedPokemon
Retorna todos os Pokémon capturados por um usuário.

**Parâmetros:**
- `userId` (number) - ID do usuário

**Exemplo de Request:**
**Exemplo de Request:**
```json
{
"userId":1
}
```

### POST /catchPokemon
Captura um novo Pokémon para o usuário.

**Parâmetros:**
- `userId` (number) - ID do usuário
- `name` (string) - Nome do Pokémon
- `url` (string) - URL da sprite do Pokémon

**Exemplo de Request:**
```json
{
  "userId": "123",
  "name": "Pikachu",
  "url": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
}
```

### GET /getPKM
Busca Pokémon baseado na localização (raw query city).

**Parâmetros:**
- `city` (string) - Nome da cidade para busca

**Exemplo de Request:**
```
GET /getPKM?city=São Paulo
```

## 📝 Notas Importantes

- Todos os endpoints de Pokémon requerem autenticação JWT
- As senhas são hasheadas usando BCrypt antes de serem armazenadas
- A API utiliza geolocalização para o endpoint `/getPKM`
- Certifique-se de configurar todas as variáveis de ambiente antes de executar a aplicação

## 🚀 Como Executar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Configure o arquivo `.env` com as variáveis necessárias


3. Inicie o servidor:
   ```bash
   npm run dev
   ```

4.baixe o front-end no link:https://github.com/EdsonCampanhao/testeTecnico-front

5. crie um .env com o a variável de ambiente no mesmo nível do package.json
    ```NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

6. rode também com npm run dev
   

