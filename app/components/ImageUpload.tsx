'use client'

import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, Image } from 'lucide-react'

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void
}

export default function ImageUpload({ onImageUpload }: ImageUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        onImageUpload(result)
      }
      reader.readAsDataURL(file)
    }
  }, [onImageUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp']
    },
    multiple: false
  })

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center">
          {isDragActive ? (
            <Upload className="w-12 h-12 text-blue-500 mb-4" />
          ) : (
            <Image className="w-12 h-12 text-gray-400 mb-4" />
          )}
          
          <p className="text-lg font-medium text-gray-700 mb-2">
            {isDragActive ? 'Solte o arquivo aqui' : 'Arraste e solte um diagrama'}
          </p>
          
          <p className="text-sm text-gray-500">
            ou clique para selecionar um arquivo
          </p>
          
          <p className="text-xs text-gray-400 mt-2">
            Formatos suportados: JPG, PNG, GIF, BMP
          </p>
        </div>
      </div>
    </div>
  )
} 