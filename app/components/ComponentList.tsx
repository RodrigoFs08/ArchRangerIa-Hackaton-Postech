'use client'

import React from 'react'
import { Server, Database, Globe, Shield, Zap } from 'lucide-react'

interface Component {
  id: number
  name: string
  type: string
  description: string
  threats: string[]
}

interface ComponentListProps {
  components: Component[]
}

const getIconForType = (type: string) => {
  switch (type.toLowerCase()) {
    case 'web application':
    case 'frontend':
      return <Globe className="w-5 h-5 text-blue-500" />
    case 'database':
      return <Database className="w-5 h-5 text-green-500" />
    case 'api service':
    case 'microservice':
      return <Server className="w-5 h-5 text-purple-500" />
    case 'infrastructure':
    case 'load balancer':
      return <Zap className="w-5 h-5 text-orange-500" />
    default:
      return <Shield className="w-5 h-5 text-gray-500" />
  }
}

export default function ComponentList({ components }: ComponentListProps) {
  return (
    <div className="space-y-4">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="font-semibold text-green-800 mb-2">
          ✅ Análise Concluída!
        </h3>
        <p className="text-green-700 text-sm">
          {components.length} componentes identificados na arquitetura
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {components.map((component) => (
          <div key={component.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {getIconForType(component.type)}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">
                  {component.name}
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  {component.type}
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  {component.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {component.threats.slice(0, 3).map((threat, index) => (
                    <span
                      key={index}
                      className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full"
                    >
                      {threat}
                    </span>
                  ))}
                  {component.threats.length > 3 && (
                    <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      +{component.threats.length - 3} mais
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">
          Próximo Passo
        </h3>
        <p className="text-blue-700 text-sm">
          Agora vamos gerar o relatório STRIDE com base nos componentes identificados. 
          O sistema irá analisar cada componente e aplicar a metodologia STRIDE para 
          identificar ameaças específicas e recomendações de segurança.
        </p>
      </div>
    </div>
  )
} 