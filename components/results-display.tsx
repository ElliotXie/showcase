"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Award } from "lucide-react"

interface ResultsDisplayProps {
  results: any
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  const [activeTab, setActiveTab] = useState("summary")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="bg-indigo-700 text-white p-4">
        <h2 className="text-2xl font-bold">CASSIA Analysis Report</h2>
        <p className="text-indigo-100">Comprehensive Cell Type Analysis and Annotation</p>
      </div>

      <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab} className="p-4">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="annotation">Annotation</TabsTrigger>
          <TabsTrigger value="validation">Validation</TabsTrigger>
          <TabsTrigger value="quality">Quality</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-indigo-700">Cell Type Identification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Main Cell Type:</span>
                  <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white">{results.cellType}</Badge>
                </div>

                <div>
                  <span className="font-semibold">Sub Cell Types:</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {results.subTypes.map((type: string, index: number) => (
                      <Badge key={index} variant="outline" className="border-indigo-300">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-semibold">Number of Markers:</span>
                  <span>{results.markerCount}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-semibold">Quality Score:</span>
                  <div className="flex items-center">
                    <span className="text-xl font-bold text-indigo-700 mr-2">{results.score}</span>
                    <Award className="h-5 w-5 text-yellow-500" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="annotation" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-indigo-700">Step-by-Step Cell Type Annotation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Key Functional Markers and Their Roles</h3>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">B cell receptor (BCR) signaling and activation:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {results.keyMarkers.map((marker: string, index: number) => (
                      <li key={index}>
                        <strong>{marker}</strong> – {getMarkerDescription(marker)}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold text-lg">Annotation Logic</h3>
                  <p className="text-gray-700 mt-2">
                    Based on the expression of key markers like {results.keyMarkers.slice(0, 3).join(", ")}, and the
                    absence of conflicting markers, the cells were identified as {results.cellType}.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="validation" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-indigo-700">Validation Check</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                <span className="font-semibold text-green-700">{results.validationStatus}</span>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Feedback and Justification</h3>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-gray-700">{results.feedbackSummary}</p>

                  <h4 className="font-medium mt-4 mb-2">Marker Consistency:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>
                      The proposed <strong>{results.cellType}</strong> annotation is strongly supported by the provided
                      marker list.
                    </li>
                    <li>
                      <strong>Key markers</strong> for {results.cellType.toLowerCase()} are all present.
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="space-y-4">
          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-xl text-indigo-700">Quality Assessment</CardTitle>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-indigo-700 mr-2">{results.score}</span>
                <Award className="h-6 w-6 text-yellow-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Strengths:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>
                      <strong>Correctness of Annotations</strong>: The final annotation as "{results.cellType}" is
                      strongly supported by the presence of key markers.
                    </li>
                    <li>
                      <strong>Balanced Marker Consideration</strong>: The annotation considers a comprehensive list of
                      markers grouped by functional roles.
                    </li>
                    <li>
                      <strong>Comprehensive View</strong>: The analysis provides a detailed breakdown of markers and
                      their relevance.
                    </li>
                  </ul>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Areas for Improvement:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>
                      <strong>Subtype Distinction</strong>: Further refinement could better distinguish between closely
                      related subtypes.
                    </li>
                    <li>
                      <strong>Tissue Specificity</strong>: Additional contextual data could provide more definitive
                      tissue-specific conclusions.
                    </li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold">Overall Assessment</h3>
                  <p className="text-gray-700 mt-2">
                    The annotation is well-reasoned and captures the key aspects of the data. Minor improvements could
                    be made in addressing potential mixed populations and tissue specificity, but these do not detract
                    significantly from the overall quality.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

function getMarkerDescription(marker: string) {
  const descriptions: Record<string, string> = {
    Cr2: "Complement receptor 2, B cell co-receptor for complement activation",
    Ms4a1: "CD20, crucial for B cell receptor signaling",
    Ighd: "IgD, mature B cell surface immunoglobulin",
    Fcer2a: "CD23, low-affinity IgE receptor, regulates B cell activation",
    Cd19: "Core component of B cell receptor complex",
    Cd22: "B-cell receptor, regulates B cell activation",
    Pax5: "Master transcription factor for B cell identity",
    Cxcr5: "Guides B cell migration to follicles",
    Marker1: "Key functional marker for cell identification",
    Marker2: "Secondary marker supporting cell type annotation",
    Marker3: "Lineage-specific marker for cell classification",
  }

  return descriptions[marker] || "Important marker for cell type identification"
}
