'use client'
import { useState, useEffect } from 'react'
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline'

interface ToastProps {
  message: string
  type: 'success' | 'error' | 'info'
  isVisible: boolean
  onClose: () => void
}

export default function Toast({ message, type, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="h-6 w-6 text-green-400" />
      case 'error':
        return <XCircleIcon className="h-6 w-6 text-red-400" />
      case 'info':
        return <InformationCircleIcon className="h-6 w-6 text-blue-400" />
    }
  }

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      case 'info':
        return 'bg-blue-50 border-blue-200'
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`max-w-sm w-full ${getBgColor()} border rounded-lg p-4 shadow-lg`}>
        <div className="flex">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{message}</p>
          </div>
          <div className="ml-auto pl-3">
            <button
              onClick={onClose}
              className="inline-flex rounded-md p-1.5 text-gray-400 hover:text-gray-500"
            >
              <XCircleIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}