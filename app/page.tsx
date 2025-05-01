"use client"

import { useState } from "react"
import WorkflowVisualizer from "@/components/workflow-visualizer"
import InputForm from "@/components/input-form"
import ResultsDisplay from "@/components/results-display"
import { Button } from "@/components/ui/button"
import RobotAnimation from "@/components/robot-animation"

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    tissueType: "",
    markerGene: "",
    species: "Mouse",
  })
  const [results, setResults] = useState<any>(null)

  const handleSubmit = async (data: any) => {
    setFormData(data)
    setIsProcessing(true)
    setCurrentStep(1)

    // Simulate processing time for each step
    await simulateProcessing(1)
    setCurrentStep(2)

    await simulateProcessing(2)
    setCurrentStep(3)

    await simulateProcessing(3)
    setCurrentStep(4)

    await simulateProcessing(4)

    // Generate mock results based on the input
    const mockResults = generateMockResults(data)
    setResults(mockResults)
    setIsProcessing(false)
    // Add a final state update to indicate workflow is complete
    setCurrentStep(5)
  }

  function simulateProcessing(step: number) {
    // Different steps take different amounts of time - increased for longer animations
    const stepTimes = [0, 3500, 3000, 3000, 4000]
    return new Promise((resolve) => setTimeout(resolve, stepTimes[step]))
  }

  const resetWorkflow = () => {
    setCurrentStep(0)
    setResults(null)
    setIsProcessing(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-800 mb-2">CASSIA Workflow Visualization</h1>
          <p className="text-lg text-gray-600">Comprehensive Cell Type Analysis and Annotation</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6">
            {currentStep === 0 ? (
              <InputForm onSubmit={handleSubmit} />
            ) : (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-indigo-700">Input Parameters</h2>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <p>
                    <span className="font-medium">Tissue Type:</span> {formData.tissueType}
                  </p>
                  <p>
                    <span className="font-medium">Marker Gene:</span> {formData.markerGene}
                  </p>
                  <p>
                    <span className="font-medium">Species:</span> {formData.species}
                  </p>
                </div>
                <Button onClick={resetWorkflow} variant="outline" className="w-full mt-4" disabled={isProcessing}>
                  Reset Workflow
                </Button>
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <WorkflowVisualizer currentStep={currentStep} isProcessing={isProcessing} />

            <RobotAnimation currentStep={currentStep} isProcessing={isProcessing} />

            {results && (
              <div className="mt-8">
                <ResultsDisplay results={results} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

function generateMockResults(data: any) {
  // Generate mock results based on input data
  const cellTypes = {
    brain: "Neuronal cells",
    liver: "Hepatocytes",
    blood: "B cells",
    lung: "Alveolar cells",
    heart: "Cardiomyocytes",
    kidney: "Renal epithelial cells",
    spleen: "Follicular B cells",
    thymus: "T cells",
    bone_marrow: "Hematopoietic stem cells",
  }

  const tissueType = data.tissueType.toLowerCase()
  const cellType = cellTypes[tissueType as keyof typeof cellTypes] || "Follicular B cells"

  // If the tissue is spleen or the marker gene includes CD19, CD20, or B cell markers, use B cell data
  const isBCell =
    tissueType === "spleen" ||
    data.markerGene.toLowerCase().includes("cd19") ||
    data.markerGene.toLowerCase().includes("cd20") ||
    data.markerGene.toLowerCase().includes("ms4a1")

  return {
    cellType: isBCell ? "Follicular B cells (FoB)" : cellType,
    subTypes: isBCell ? ["Germinal center B cells", "Marginal zone-like B cells"] : ["Type A", "Type B"],
    markerCount: 50,
    score: Math.floor(Math.random() * 10) + 90, // Random score between 90-99
    keyMarkers: isBCell
      ? ["Cr2", "Ms4a1", "Ighd", "Fcer2a", "Cd19", "Cd22", "Pax5", "Cxcr5"]
      : ["Marker1", "Marker2", "Marker3"],
    validationStatus: "VALIDATION PASSED",
    feedbackSummary: isBCell
      ? "The annotation as Follicular B cells is strongly supported by key markers like Cr2, Ighd, Fcer2a, Cxcr5, and Pax5."
      : "The annotation is well-supported by the marker profile.",
  }
}
