# Instalação Rápida - ArchRanger AI

## Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Chave da API Google Gemini

## Passos para Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd Hackaton-Fiap
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env.local
   ```
   
   Edite o arquivo `.env.local` e adicione sua chave da API:
   ```
   GOOGLE_GEMINI_API_KEY=sua_chave_aqui
   ```

4. **Execute o projeto**
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação**
   ```
   http://localhost:3000
   ```

## Obter Chave da API Gemini

1. Acesse [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Copie a chave gerada
5. Cole no arquivo `.env.local`

## Scripts Disponíveis

- `npm run dev` - Executa em modo desenvolvimento
- `npm run build` - Gera build de produção
- `npm run start` - Executa build de produção
- `npm run lint` - Executa linter

## Estrutura do Projeto

```
Hackaton-Fiap/
├── app/                    # Aplicação Next.js
│   ├── components/         # Componentes React
│   ├── globals.css         # Estilos globais
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Página inicial
├── lib/                    # Bibliotecas
│   └── gemini.ts           # Integração Google Gemini
├── .env.example            # Exemplo de variáveis de ambiente
├── package.json            # Dependências do projeto
└── README.md               # Documentação completa
```

## Solução de Problemas

### Erro 403 Forbidden
- Verifique se a chave da API está correta
- Certifique-se de que a API está habilitada no Google Cloud Console

### Erro de Dependências
- Delete `node_modules` e `package-lock.json`
- Execute `npm install` novamente

### Problemas de Build
- Execute `npm run build` para verificar erros
- Verifique se todas as dependências estão instaladas 