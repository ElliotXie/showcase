"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, FileText, Database, Brain, CheckSquare, BarChart4, Loader2 } from "lucide-react"

interface WorkflowVisualizerProps {
  currentStep: number
  isProcessing: boolean
}

export default function WorkflowVisualizer({ currentStep, isProcessing }: WorkflowVisualizerProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isProcessing && currentStep > 0) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 1
        })
      }, 30)

      return () => clearInterval(interval)
    } else if (!isProcessing) {
      setProgress(0)
    }
  }, [isProcessing, currentStep])

  const steps = [
    {
      id: 0,
      name: "Input Data",
      icon: <Database className="h-8 w-8" />,
      description: "User provides tissue type, marker gene, and species",
    },
    {
      id: 1,
      name: "Annotation Robot",
      icon: <Brain className="h-8 w-8" />,
      description: "Generating step-by-step annotation based on markers",
    },
    {
      id: 2,
      name: "Validation Robot",
      icon: <CheckSquare className="h-8 w-8" />,
      description: "Checking annotation accuracy against reference databases",
    },
    {
      id: 3,
      name: "Scoring Robot",
      icon: <BarChart4 className="h-8 w-8" />,
      description: "Evaluating annotation quality and confidence",
    },
    {
      id: 4,
      name: "Report Robot",
      icon: <FileText className="h-8 w-8" />,
      description: "Compiling comprehensive analysis report",
    },
    {
      id: 5,
      name: "Completed",
      icon: <CheckCircle className="h-8 w-8" />,
      description: "Analysis workflow completed",
    },
  ]

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-indigo-800 mb-6">CASSIA Workflow</h2>

      <div className="relative">
        {/* Workflow steps */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center text-center mb-4 md:mb-0">
              <motion.div
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{
                  scale: currentStep >= step.id ? 1 : 0.8,
                  opacity: currentStep >= step.id ? 1 : 0.5,
                }}
                className={`rounded-full p-3 mb-2 ${
                  currentStep > step.id
                    ? "bg-green-100 text-green-600"
                    : currentStep === step.id
                      ? "bg-indigo-100 text-indigo-600"
                      : "bg-gray-100 text-gray-400"
                }`}
              >
                {currentStep > step.id ? (
                  <CheckCircle className="h-8 w-8" />
                ) : currentStep === step.id && isProcessing ? (
                  <Loader2 className="h-8 w-8 animate-spin" />
                ) : (
                  step.icon
                )}
              </motion.div>
              <span className={`text-sm font-medium ${currentStep >= step.id ? "text-indigo-700" : "text-gray-500"}`}>
                {step.name}
              </span>
              <span className="text-xs text-gray-500 max-w-[120px] mt-1 hidden md:block">{step.description}</span>
            </div>
          ))}
        </div>

        {/* Connecting lines */}
        <div className="hidden md:block absolute top-11 left-0 right-0 h-0.5 bg-gray-200 z-0">
          <motion.div
            initial={{ width: "0%" }}
            animate={{
              width: `${Math.min(currentStep, 4) * 25}%`,
              transition: { duration: 0.5 },
            }}
            className="h-full bg-indigo-500"
          />
        </div>
      </div>

      {/* Current step details */}
      {currentStep > 0 && currentStep <= 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-indigo-50 p-4 rounded-lg mt-4"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-indigo-700">{steps[currentStep]?.name || "Processing"}</h3>
            {isProcessing && <span className="text-sm text-indigo-600">{progress}%</span>}
          </div>

          {isProcessing && (
            <div className="w-full bg-indigo-200 rounded-full h-2.5">
              <div
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {!isProcessing && currentStep === 4 && (
            <div className="flex items-center text-green-600">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Analysis complete! View results below.</span>
            </div>
          )}
        </motion.div>
      )}

      {currentStep === 5 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 p-4 rounded-lg mt-4 border border-green-200"
        >
          <div className="flex items-center text-green-600">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span className="font-semibold">Workflow Complete!</span>
          </div>
          <p className="text-green-700 mt-2">
            All analysis steps have been completed successfully. View the detailed results below.
          </p>
        </motion.div>
      )}
    </div>
  )
}
