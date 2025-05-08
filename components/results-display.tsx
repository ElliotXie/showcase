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
              <CardTitle className="text-xl text-indigo-700">Cell Type Identification Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Main Cell Type:</span>
                  <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white">{results.cellType}</Badge>
                </div>

                <div>
                  <span className="font-semibold">Probable Sub Cell Types:</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {results.subTypes.map((type: string, index: number) => (
                      <Badge key={index} variant="outline" className="border-indigo-300">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-semibold">Number of Key Markers Analyzed:</span>
                  <span>{results.markerCount}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-semibold">Overall Quality Score:</span>
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
              <CardTitle className="text-xl text-indigo-700">Detailed Cell Type Annotation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Key Functional Markers and Their Roles</h3>
                <p className="text-sm text-gray-600 mb-3">{results.functionalMarkersIntro}</p>
                <div className="bg-indigo-50 p-4 rounded-lg space-y-3">
                  {results.functionalMarkers.map((marker: { name: string; description: string }, index: number) => (
                    <div key={index}>
                      <h4 className="font-medium text-indigo-800">{marker.name}</h4>
                      <p className="text-sm text-gray-700 ml-2">– {marker.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Key Cell Type Markers</h3>
                <p className="text-sm text-gray-600 mb-3">{results.cellTypeMarkersIntro}</p>
                <div className="bg-indigo-50 p-4 rounded-lg space-y-3">
                  {results.cellTypeMarkers.map((marker: { name: string; description: string }, index: number) => (
                    <div key={index}>
                      <h4 className="font-medium text-indigo-800">{marker.name}</h4>
                      <p className="text-sm text-gray-700 ml-2">– {marker.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Database Cross-Reference</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 whitespace-pre-line">{results.databaseCrossReference}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Most Probable General Cell Type</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 whitespace-pre-line">{results.probableGeneralCellType}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Top 3 Most Probable Sub Cell Types</h3>
                <p className="text-sm text-gray-600 mb-3">{results.probableSubCellTypesIntro}</p>
                <div className="space-y-3">
                  {results.probableSubCellTypes.map((subType: { name: string; description: string }, index: number) => (
                    <div key={index} className="bg-indigo-50 p-4 rounded-lg">
                      <h4 className="font-medium text-indigo-800">{index + 1}. {subType.name}</h4>
                      <p className="text-sm text-gray-700 mt-1 ml-2 whitespace-pre-line">{subType.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Concise Summary of Analysis</h3>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-sm text-green-700 whitespace-pre-line">{results.annotationConciseSummary}</p>
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
                  <p className="text-gray-700 mb-3">{results.feedbackSummary}</p>

                  <h4 className="font-medium mt-4 mb-2 text-gray-800">Marker Consistency:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                    {results.markerConsistency.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
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
                  <h3 className="font-semibold mb-2 text-indigo-800">Strengths:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                    {results.qualityStrengths.map((item: string, index: number) => (
                      <li key={index} className="whitespace-pre-line">{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-amber-800">Areas for Improvement (Weaknesses):</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                    {results.qualityWeaknesses.map((item: string, index: number) => (
                      <li key={index} className="whitespace-pre-line">{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Overall Assessment</h3>
                  <p className="text-sm text-gray-700 whitespace-pre-line">{results.qualityOverallAssessment}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
