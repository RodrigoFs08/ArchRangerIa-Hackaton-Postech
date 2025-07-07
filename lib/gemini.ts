import { GoogleGenerativeAI } from '@google/generative-ai'

// Configuração da API do Gemini
const apiKey = process.env.GOOGLE_GEMINI_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY || ''
const genAI = new GoogleGenerativeAI(apiKey)

// Modelos
const visionModel = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
const textModel = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

export interface Component {
  id: number
  name: string
  type: string
  description: string
  position: { x: number; y: number }
  threats: string[]
}

export interface StrideReport {
  summary?: {
    totalComponents: number
    totalThreats: number
    riskLevel: string
    recommendations: number
  }
  strideAnalysis?: {
    spoofing: ThreatCategory
    tampering: ThreatCategory
    repudiation: ThreatCategory
    informationDisclosure: ThreatCategory
    denialOfService: ThreatCategory
    elevationOfPrivilege: ThreatCategory
  }
  recommendations?: string[]
  rawResponse?: string
  [key: string]: any // Permitir propriedades adicionais da IA
}

interface ThreatCategory {
  threats: Threat[]
  count: number
}

interface Threat {
  component: string
  description: string
  severity: string
  recommendation: string
}

/**
 * Analisa um diagrama de arquitetura usando Gemini Vision
 */
export async function analyzeArchitectureDiagram(imageBase64: string): Promise<Component[]> {
  // Verificar se a API key está configurada
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY || ''
  
  if (!apiKey) {
    return getMockComponents()
  }
  
  try {
    const prompt = `
      Analise este diagrama de arquitetura de software e identifique todos os componentes.
      
      Para cada componente encontrado, retorne:
      - Nome do componente
      - Tipo (Web Application, Database, API Service, Microservice, Infrastructure, etc.)
      - Descrição breve da função
      - Posição aproximada no diagrama (x, y)
      
      Retorne apenas um JSON válido com a seguinte estrutura:
      [
        {
          "id": 1,
          "name": "Nome do Componente",
          "type": "Tipo do Componente",
          "description": "Descrição da função",
          "position": {"x": 100, "y": 150},
          "threats": []
        }
      ]
      
      Seja preciso e identifique componentes como:
      - Frontend/Web Applications
      - APIs e Gateways
      - Bancos de dados
      - Load balancers
      - Firewalls
      - Caches
      - Message queues
      - Microservices
    `

    const imageData = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '')
    
    const result = await visionModel.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: imageData
        }
      }
    ])

    const response = await result.response
    const text = response.text()
    
    // Extrair JSON da resposta
    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (jsonMatch) {
      const parsedComponents = JSON.parse(jsonMatch[0])
      console.log('Componentes extraídos da API:', parsedComponents)
      return parsedComponents
    }
    
    return getMockComponents()
    
  } catch (error) {
    console.error('Erro na análise do diagrama:', error)
    return getMockComponents()
  }
}

/**
 * Gera relatório STRIDE usando Gemini Pro
 */
export async function generateStrideReport(components: Component[]): Promise<StrideReport> {
  try {
    const componentsText = components.map(comp => 
      `- ${comp.name} (${comp.type}): ${comp.description}`
    ).join('\n')

    const prompt = `
      Analise a seguinte arquitetura de software e gere um relatório STRIDE completo:

      Componentes identificados:
      ${componentsText}

      Gere um relatório STRIDE detalhado incluindo:
      1. Resumo executivo com estatísticas
      2. Análise de ameaças por categoria STRIDE:
         - Spoofing (Falsificação)
         - Tampering (Manipulação)
         - Repudiation (Negação)
         - Information Disclosure (Exposição)
         - Denial of Service (Negação de Serviço)
         - Elevation of Privilege (Escalação de Privilégios)
      3. Recomendações específicas de segurança

      Para cada ameaça, inclua:
      - Componente afetado
      - Descrição da ameaça
      - Nível de severidade (Alto, Médio, Baixo)
      - Recomendação de contramedida

      Retorne apenas um JSON válido com a estrutura completa do relatório.
    `

    const result = await textModel.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    // Extrair JSON da resposta
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      try {
        const parsedReport = JSON.parse(jsonMatch[0])
        console.log('Relatório gerado pela API:', parsedReport)
        
        // Retornar exatamente o que a IA retornou, apenas garantindo que seja um objeto
        return parsedReport
      } catch (error) {
        console.error('Erro ao fazer parse do JSON:', error)
        // Se não conseguir fazer parse, retornar o texto bruto
        return {
          rawResponse: text,
          summary: {
            totalComponents: components.length,
            totalThreats: 0,
            riskLevel: 'N/A',
            recommendations: 0
          }
        }
      }
    }
    
    console.warn('Não foi possível extrair dados JSON da resposta, retornando texto bruto')
    return {
      rawResponse: text,
      summary: {
        totalComponents: components.length,
        totalThreats: 0,
        riskLevel: 'N/A',
        recommendations: 0
      }
    }
    
  } catch (error) {
    console.error('Erro na geração do relatório:', error)
    // Retornar relatório simulado em caso de erro
    return getMockStrideReport(components)
  }
}

/**
 * Dados de exemplo
 */
export function getMockComponents(): Component[] {
  return [
    {
      id: 1,
      name: 'Frontend Web App',
      type: 'Web Application',
      description: 'Interface de usuário React/Angular',
      position: { x: 100, y: 50 },
      threats: ['XSS', 'CSRF', 'Injection']
    },
    {
      id: 2,
      name: 'API Gateway',
      type: 'API Service',
      description: 'Gateway de entrada para APIs',
      position: { x: 300, y: 150 },
      threats: ['DDoS', 'Authentication Bypass', 'Rate Limiting']
    },
    {
      id: 3,
      name: 'User Service',
      type: 'Microservice',
      description: 'Serviço de gerenciamento de usuários',
      position: { x: 500, y: 100 },
      threats: ['SQL Injection', 'Privilege Escalation', 'Data Exposure']
    },
    {
      id: 4,
      name: 'Database',
      type: 'Database',
      description: 'Banco de dados PostgreSQL',
      position: { x: 500, y: 250 },
      threats: ['SQL Injection', 'Data Breach', 'Backup Exposure']
    },
    {
      id: 5,
      name: 'Load Balancer',
      type: 'Infrastructure',
      description: 'Balanceador de carga',
      position: { x: 200, y: 200 },
      threats: ['DDoS', 'SSL/TLS Issues', 'Configuration Errors']
    }
  ]
}

function getMockStrideReport(components: Component[]): StrideReport {
  // Calcular total de ameaças baseado nos dados
  const strideAnalysis = {
    spoofing: {
              threats: [
          {
            component: 'Frontend Web App',
            description: 'Ataque de falsificacao de identidade',
            severity: 'Alto',
            recommendation: 'Implementar autenticacao multi-fator'
          }
        ],
      count: 1
    },
    tampering: {
              threats: [
          {
            component: 'API Gateway',
            description: 'Manipulacao de dados em transito',
            severity: 'Medio',
            recommendation: 'Implementar assinatura digital'
          },
          {
            component: 'Database',
            description: 'Modificacao nao autorizada de dados',
            severity: 'Alto',
            recommendation: 'Implementar auditoria de logs'
          }
        ],
      count: 2
    },
    repudiation: {
              threats: [
          {
            component: 'User Service',
            description: 'Negacao de acoes realizadas',
            severity: 'Medio',
            recommendation: 'Implementar logs de auditoria'
          }
        ],
      count: 1
    },
    informationDisclosure: {
              threats: [
          {
            component: 'Database',
            description: 'Exposicao de dados sensiveis',
            severity: 'Alto',
            recommendation: 'Implementar criptografia em repouso'
          }
        ],
      count: 1
    },
    denialOfService: {
              threats: [
          {
            component: 'Load Balancer',
            description: 'Ataque DDoS',
            severity: 'Alto',
            recommendation: 'Implementar protecao DDoS'
          },
          {
            component: 'API Gateway',
            description: 'Sobrecarga de requisicoes',
            severity: 'Medio',
            recommendation: 'Implementar rate limiting'
          }
        ],
      count: 2
    },
    elevationOfPrivilege: {
              threats: [
          {
            component: 'User Service',
            description: 'Escalacao de privilegios',
            severity: 'Alto',
            recommendation: 'Implementar controle de acesso baseado em roles'
          }
        ],
      count: 1
    }
  }

  // Calcular total de ameaças
  const totalThreats = Object.values(strideAnalysis).reduce((sum, category) => sum + category.count, 0)

      return {
      summary: {
        totalComponents: components.length,
        totalThreats: totalThreats,
        riskLevel: 'Medio',
        recommendations: 8
      },
      strideAnalysis: strideAnalysis,
          recommendations: [
      'Implementar autenticacao multi-fator em todos os pontos de entrada',
      'Configurar HTTPS em todas as comunicacoes',
      'Implementar rate limiting no API Gateway',
      'Configurar backup automatico do banco de dados',
      'Implementar monitoramento de seguranca em tempo real',
      'Configurar firewall de aplicacao (WAF)',
      'Implementar logs de auditoria centralizados',
      'Realizar testes de penetracao regulares'
    ]
    }
} 