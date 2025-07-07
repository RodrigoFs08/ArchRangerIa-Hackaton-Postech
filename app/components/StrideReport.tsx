'use client'

import React, { useEffect } from 'react'
import { Loader2, CheckCircle, FileText, Shield } from 'lucide-react'
import { generateStrideReport, Component, StrideReport as StrideReportType } from '../../lib/gemini'

interface StrideReportProps {
  components: any[]
  onReportGenerated: (report: any) => void
  isGenerating: boolean
  setIsGenerating: (generating: boolean) => void
}

export default function StrideReport({
  components,
  onReportGenerated,
  isGenerating,
  setIsGenerating
}: StrideReportProps) {

  const generateReport = async () => {
    setIsGenerating(true)
    
    try {
      // Chamada real para Gemini 2.5 Flash API
      const report = await generateStrideReport(components)
      console.log('Relatório gerado:', report)
      console.log('Componentes recebidos:', components)
      onReportGenerated(report)
    } catch (error) {
      console.error('Erro na geração do relatório:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  useEffect(() => {
    if (components.length > 0) {
      generateReport()
    }
  }, [components])

  return (
    <div className="space-y-6">
      {/* Status da geração */}
      <div className="flex items-center justify-center">
        {isGenerating ? (
          <div className="flex items-center text-purple-600">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            <span>Gerando relatório STRIDE com Gemini 2.5 Flash...</span>
          </div>
        ) : (
          <div className="flex items-center text-green-600">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span>Relatório STRIDE gerado com sucesso!</span>
          </div>
        )}
      </div>

      {/* Informações sobre STRIDE */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h3 className="font-semibold text-purple-800 mb-2">
          Metodologia STRIDE:
        </h3>
        <div className="grid grid-cols-2 gap-2 text-sm text-purple-700">
          <div><strong>S</strong>poofing - Falsificação de identidade</div>
          <div><strong>T</strong>ampering - Manipulação de dados</div>
          <div><strong>R</strong>epudiation - Negação de ações</div>
          <div><strong>I</strong>nformation Disclosure - Exposição de informações</div>
          <div><strong>D</strong>enial of Service - Negação de serviço</div>
          <div><strong>E</strong>levation of Privilege - Escalação de privilégios</div>
        </div>
      </div>

      {/* Componentes identificados */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-3">
          Componentes Identificados ({components.length}):
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {components.map((component) => (
            <div key={component.id} className="bg-white p-3 rounded border">
              <div className="flex items-center">
                <Shield className="w-4 h-4 text-blue-500 mr-2" />
                <div>
                  <p className="font-medium text-gray-800">{component.name}</p>
                  <p className="text-sm text-gray-600">{component.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 