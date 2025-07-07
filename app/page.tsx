'use client'

import React, { useState } from 'react'
import { Upload, Shield, FileText, Download } from 'lucide-react'
import ImageUpload from './components/ImageUpload'
import ComponentAnalysis from './components/ComponentAnalysis'
import ComponentList from './components/ComponentList'
import StrideReport from './components/StrideReport'

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [components, setComponents] = useState<any[]>([])
  const [strideReport, setStrideReport] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl)
    setComponents([])
    setStrideReport(null)
    setCurrentStep(2)
  }

  const handleComponentsIdentified = (identifiedComponents: any[]) => {
    setComponents(identifiedComponents)
    setCurrentStep(3)
  }

  const handleReportGenerated = (report: any) => {
    console.log('Relatório recebido no componente principal:', report)
    console.log('Componentes atuais:', components)
    setStrideReport(report)
    setCurrentStep(5)
  }

  // Função para processar e formatar conteúdo markdown
  const processMarkdownContent = (content: string): string => {
    if (!content) return ''
    
    return content
      // Processar títulos
      .replace(/^### (.*$)/gim, '\n\nTÍTULO 3: $1\n')
      .replace(/^## (.*$)/gim, '\n\nTÍTULO 2: $1\n')
      .replace(/^# (.*$)/gim, '\n\nTÍTULO 1: $1\n')
      
      // Processar listas
      .replace(/^\* (.*$)/gim, '• $1')
      .replace(/^- (.*$)/gim, '• $1')
      .replace(/^\d+\. (.*$)/gim, '• $1')
      
      // Processar negrito e itálico
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/__(.*?)__/g, '$1')
      .replace(/_(.*?)_/g, '$1')
      
      // Processar código inline
      .replace(/`(.*?)`/g, '$1')
      
      // Processar blocos de código
      .replace(/```[\s\S]*?```/g, '')
      
      // Processar links
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      
      // Processar quebras de linha
      .replace(/\n\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      
      // Limpar espaços extras
      .trim()
  }





  const downloadMarkdown = () => {
    if (!strideReport) return

    // Função para converter JSON para markdown
    const convertToMarkdown = (obj: any, level: number = 0): string => {
      if (typeof obj === 'string') {
        return obj
      }
      
      if (Array.isArray(obj)) {
        return obj.map(item => {
          if (typeof item === 'string') {
            return `- ${item}`
          } else if (typeof item === 'object') {
            return `- ${convertToMarkdown(item, level + 1)}`
          }
          return `- ${item}`
        }).join('\n')
      }
      
      if (typeof obj === 'object' && obj !== null) {
        let result = ''
        
        Object.entries(obj).forEach(([key, value]) => {
          const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
          const headingLevel = Math.min(level + 2, 6)
          const headingPrefix = '#'.repeat(headingLevel)
          
          if (typeof value === 'string') {
            result += `${headingPrefix} ${formattedKey}\n\n${value}\n\n`
          } else if (Array.isArray(value)) {
            result += `${headingPrefix} ${formattedKey}\n\n`
            value.forEach((item, index) => {
              if (typeof item === 'string') {
                result += `${index + 1}. ${item}\n`
              } else if (typeof item === 'object') {
                result += `${index + 1}. ${convertToMarkdown(item, level + 1)}\n`
              }
            })
            result += '\n'
          } else if (typeof value === 'object' && value !== null) {
            result += `${headingPrefix} ${formattedKey}\n\n${convertToMarkdown(value, level + 1)}\n\n`
          } else if (value !== undefined && value !== null) {
            result += `**${formattedKey}:** ${value}\n\n`
          }
        })
        
        return result
      }
      
      return String(obj)
    }

    // Criar cabeçalho do markdown
    let markdownContent = `# Relatório STRIDE - ArchRanger AI

*Gerado em: ${new Date().toLocaleDateString('pt-BR')}*

---

`

    // Converter o relatório da IA para markdown
    const reportMarkdown = convertToMarkdown(strideReport)
    markdownContent += reportMarkdown

    // Criar blob e download como markdown
    const blob = new Blob([markdownContent], { type: 'text/markdown' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'relatorio-stride-archranger.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ArchRanger AI
          </h1>
          <p className="text-xl text-gray-600">
            Análise Inteligente de Ameaças em Arquiteturas de Software
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            <div className={`flex items-center ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 1 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Upload</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 2 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Análise</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${currentStep >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 3 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300'}`}>
                3
              </div>
              <span className="ml-2 font-medium">Componentes</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${currentStep >= 4 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${currentStep >= 4 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 4 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300'}`}>
                4
              </div>
              <span className="ml-2 font-medium">Relatório</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${currentStep >= 5 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${currentStep >= 5 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 5 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300'}`}>
                5
              </div>
              <span className="ml-2 font-medium">Download</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Step 1: Upload */}
          <div className={`bg-white rounded-lg shadow-lg p-6 ${currentStep >= 1 ? 'border-l-4 border-blue-600' : ''}`}>
            <div className="flex items-center mb-4">
              <Upload className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Passo 1: Upload do Diagrama
              </h2>
            </div>
            <ImageUpload onImageUpload={handleImageUpload} />
          </div>

          {/* Step 2: Component Analysis */}
          {uploadedImage && (
            <div className={`bg-white rounded-lg shadow-lg p-6 ${currentStep >= 2 ? 'border-l-4 border-green-600' : ''}`}>
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  Passo 2: Análise de Componentes
                </h2>
              </div>
              <ComponentAnalysis
                imageUrl={uploadedImage}
                onComponentsIdentified={handleComponentsIdentified}
                isAnalyzing={isAnalyzing}
                setIsAnalyzing={setIsAnalyzing}
                components={components}
              />
            </div>
          )}

          {/* Step 3: Lista de Componentes */}
          {components.length > 0 && !strideReport && (
            <div className={`bg-white rounded-lg shadow-lg p-6 ${currentStep >= 3 ? 'border-l-4 border-purple-600' : ''}`}>
              <div className="flex items-center mb-4">
                <FileText className="w-6 h-6 text-purple-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  Passo 3: Componentes Identificados
                </h2>
              </div>
              <ComponentList components={components} />
              <div className="mt-6 text-center">
                <button 
                  onClick={() => setCurrentStep(4)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Gerar Relatório STRIDE
                </button>
              </div>
            </div>
          )}

          {/* Step 4: STRIDE Report */}
          {currentStep >= 4 && components.length > 0 && (
            <div className={`bg-white rounded-lg shadow-lg p-6 ${currentStep >= 4 ? 'border-l-4 border-purple-600' : ''}`}>
              <div className="flex items-center mb-4">
                <FileText className="w-6 h-6 text-purple-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  Passo 4: Geração do Relatório STRIDE
                </h2>
              </div>
              <StrideReport
                components={components}
                onReportGenerated={handleReportGenerated}
                isGenerating={isGeneratingReport}
                setIsGenerating={setIsGeneratingReport}
              />
            </div>
          )}

          {/* Step 5: Download Report */}
          {strideReport && (
            <div className={`bg-white rounded-lg shadow-lg p-6 ${currentStep >= 5 ? 'border-l-4 border-orange-600' : ''}`}>
              <div className="flex items-center mb-4">
                <Download className="w-6 h-6 text-orange-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  Passo 5: Download do Relatório
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-center">
                  <button 
                    onClick={downloadMarkdown}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Baixar Relatório em Markdown
                  </button>
                </div>
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg text-center">
                  <p><strong>Markdown:</strong> Arquivo .md com formatação markdown completa da resposta da IA</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 