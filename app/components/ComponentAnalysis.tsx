'use client'

import React, { useEffect } from 'react'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import ComponentList from './ComponentList'
import { analyzeArchitectureDiagram, Component, getMockComponents } from '../../lib/gemini'

interface ComponentAnalysisProps {
  imageUrl: string
  onComponentsIdentified: (components: any[]) => void
  isAnalyzing: boolean
  setIsAnalyzing: (analyzing: boolean) => void
  components: any[]
}

export default function ComponentAnalysis({
  imageUrl,
  onComponentsIdentified,
  isAnalyzing,
  setIsAnalyzing,
  components
}: ComponentAnalysisProps) {
  
  const analyzeImage = async () => {
    setIsAnalyzing(true)
    
    try {
      // Chamada real para Gemini Vision API
      const analyzedComponents = await analyzeArchitectureDiagram(imageUrl)
      onComponentsIdentified(analyzedComponents)
    } catch (error) {
      console.error('Erro na análise:', error)
      const mockComponents = getMockComponents()
      onComponentsIdentified(mockComponents)
    } finally {
      setIsAnalyzing(false)
    }
  }

  useEffect(() => {
    if (imageUrl) {
      analyzeImage()
    }
  }, [imageUrl])

  return (
    <div className="space-y-6">
      {/* Preview da imagem */}
      <div className="flex justify-center">
        <div className="relative">
          <img
            src={imageUrl}
            alt="Diagrama de arquitetura"
            className="max-w-full h-auto max-h-96 rounded-lg shadow-md"
          />
          {isAnalyzing && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
              <div className="text-white text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                <p>Analisando componentes...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status da análise */}
      <div className="flex items-center justify-center mb-6">
        {isAnalyzing ? (
          <div className="flex items-center text-blue-600">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            <span>Analisando diagrama com Gemini Vision AI...</span>
          </div>
        ) : (
          <div className="flex items-center text-green-600">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span>Análise concluída! Componentes identificados.</span>
          </div>
        )}
      </div>

      {/* Lista de componentes identificados */}
      {!isAnalyzing && components.length > 0 ? (
        <div className="mt-6">
          <ComponentList components={components} />
        </div>
      ) : null}

      {/* Informações sobre a análise */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <h3 className="font-semibold text-blue-800 mb-2">
          Como funciona a análise:
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• O Gemini Vision AI analisa o diagrama pixel por pixel</li>
          <li>• Identifica componentes como servidores, bancos de dados, APIs</li>
          <li>• Reconhece relacionamentos e fluxos de dados</li>
          <li>• Classifica cada componente por tipo e função</li>
        </ul>

      </div>
    </div>
  )
} 