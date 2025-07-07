# ArchRanger AI

Sistema inteligente para análise de ameaças em diagramas de arquitetura usando Google Gemini AI.

## 🎯 Sobre o Projeto

O ArchRanger AI é uma solução inovadora que automatiza o processo de modelagem de ameaças em arquiteturas de software utilizando inteligência artificial. O sistema interpreta diagramas de arquitetura e gera relatórios detalhados baseados na metodologia STRIDE, preservando toda a formatação e estrutura da resposta da IA.

## ✨ Funcionalidades

- **Upload de Diagramas**: Interface drag-and-drop para upload de imagens
- **Análise com Gemini Vision**: Identificação automática de componentes usando IA
- **Relatório STRIDE**: Geração automática de relatórios de ameaças com Google Gemini Pro
- **Exportação Markdown**: Download em formato .md com formatação completa preservada
- **Interface Intuitiva**: Fluxo guiado com indicadores de progresso
- **Processamento Inteligente**: Conversão automática de JSON da IA para markdown formatado

## 🚀 Tecnologias

- **Frontend**: Next.js 14 (App Router)
- **IA**: Google Gemini 2.5 Flash (Vision + Text APIs)
- **UI**: Tailwind CSS + Lucide React
- **Upload**: React Dropzone
- **Processamento**: Conversão JSON para Markdown

## 📦 Instalação

1. **Clone o repositório**:
   ```bash
   git clone <url-do-repositorio>
   cd Hackaton-Fiap
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Adicione sua chave da API do Google Gemini:
   ```
   GOOGLE_GEMINI_API_KEY=sua_chave_aqui
   # ou
   NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY=sua_chave_aqui
   ```

4. **Execute o projeto**:
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação**:
   ```
   http://localhost:3000
   ```

## 🔧 Configuração da API Gemini

1. Acesse [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crie uma nova API key
3. Adicione a chave no arquivo `.env.local`

**Modelos Utilizados:**
- `gemini-2.5-flash` para análise de imagens (Vision) e geração de relatórios (Text)

## 📋 Como Usar

### Fluxo de Análise

1. **Upload do Diagrama**: 
   - Arraste e solte um diagrama de arquitetura na área indicada
   - O sistema aceita formatos de imagem comuns (JPG, PNG, etc.)

2. **Análise Automática**: 
   - O Gemini Vision AI identifica automaticamente os componentes
   - Componentes são categorizados por tipo (Web App, Database, API, etc.)

3. **Geração do Relatório**: 
   - O Gemini Pro AI gera um relatório STRIDE completo
   - Análise detalhada de ameaças por categoria
   - Recomendações específicas de segurança

4. **Download**: 
   - Baixe o relatório em formato Markdown (.md)
   - Preserva toda a formatação original da IA
   - Estrutura hierárquica com cabeçalhos e listas

### Interface

- **Indicador de Progresso**: Acompanhe cada etapa do processo
- **Visualização de Componentes**: Veja os componentes identificados
- **Status em Tempo Real**: Feedback sobre o processamento da IA
- **Botão de Download**: Interface simples e direta

## 🛡️ Metodologia STRIDE

O sistema analisa ameaças baseado na metodologia STRIDE:

- **S**poofing - Falsificação de identidade
- **T**ampering - Manipulação de dados
- **R**epudiation - Negação de ações
- **I**nformation Disclosure - Exposição de informações
- **D**enial of Service - Negação de serviço
- **E**levation of Privilege - Escalação de privilégios

## 📁 Estrutura do Projeto

```
Hackaton-Fiap/
├── app/
│   ├── components/
│   │   ├── ImageUpload.tsx      # Upload de imagens
│   │   ├── ComponentAnalysis.tsx # Análise de componentes
│   │   ├── ComponentList.tsx     # Lista de componentes
│   │   └── StrideReport.tsx      # Geração de relatórios
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # Página principal
├── lib/
│   └── gemini.ts                # Integração com Google Gemini
├── public/
├── package.json
├── tailwind.config.js
└── README.md
```

## 🔍 Processamento de Dados

### Análise de Imagens
- Uso do Gemini Vision para identificar componentes
- Extração de JSON estruturado da resposta da IA
- Categorização automática de tipos de componentes

### Geração de Relatórios
- Prompt estruturado para análise STRIDE
- Processamento inteligente da resposta JSON da IA
- Conversão automática para markdown formatado
- Preservação de hierarquia e formatação

### Exportação
- Conversão JSON → Markdown com formatação completa
- Cabeçalhos hierárquicos (# ## ###)
- Listas numeradas e com marcadores
- Preservação de negrito, itálico e código

## 🎥 Demonstração

Este projeto demonstra:
- Integração avançada com Google Gemini AI
- Processamento inteligente de diagramas de arquitetura
- Geração automática de relatórios de segurança
- Interface moderna e responsiva
- Preservação completa da formatação da IA

## 🚀 Funcionalidades Avançadas

- **Processamento Inteligente**: Conversão automática de JSON para markdown
- **Formatação Preservada**: Mantém toda a estrutura da resposta da IA
- **Interface Responsiva**: Funciona em desktop e mobile
- **Feedback Visual**: Indicadores de progresso e status
- **Tratamento de Erros**: Fallbacks para casos de falha na API

## 📄 Licença

MIT License

## 👥 Desenvolvido por

Equipe do Hackathon 3 IADT - FIAP Software Security

---

**Nota**: Este projeto utiliza a API do Google Gemini para análise de imagens e geração de relatórios. Certifique-se de ter uma chave de API válida configurada para o funcionamento completo. 