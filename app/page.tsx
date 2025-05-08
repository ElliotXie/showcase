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
  // Updated ICC Analysis Data
  return {
    // Summary Tab Data
    cellType: "Interstitial Cells of Cajal (ICCs)",
    subTypes: [
      "ICC-MY (Interstitial Cells of Cajal in the Myenteric Plexus)",
      "ICC-IM (Interstitial Cells of Cajal in the Intramuscular Layer)",
      "A mixed population of ICC-MY and ICC-IM",
    ],
    markerCount: 8, // Counted unique key functional + cell type markers mentioned
    score: 95,

    // Annotation Tab Data
    functionalMarkersIntro:
      "Based on the provided list, the following genes are key functional markers:",
    functionalMarkers: [
      {
        name: "ANO1 (Anoctamin 1 / TMEM16A)",
        description:
          "A calcium-activated chloride channel essential for generating slow wave pacemaker activity in the gastrointestinal tract. It is a defining functional marker for Interstitial Cells of Cajal (ICCs).",
      },
      {
        name: "KIT (KIT proto-oncogene, receptor tyrosine kinase / CD117)",
        description:
          "A receptor tyrosine kinase that is crucial for the development, survival, and function of ICCs. Signaling through KIT is vital for ICC network formation and pacemaker activity. It is a canonical marker for ICCs.",
      },
      {
        name: "GUCY1A3 (Guanylate cyclase 1 soluble subunit alpha 3) & GUCY1B3 (Guanylate cyclase 1 soluble subunit beta 3)",
        description:
          "Subunits of soluble guanylate cyclase (sGC). sGC is activated by nitric oxide (NO) and produces cGMP, which mediates smooth muscle relaxation. Their presence suggests a role in mediating inhibitory neuromuscular transmission, a function performed by ICCs (particularly ICC-IM) and smooth muscle cells.",
      },
      {
        name: "OBSCN (Obscurin)",
        description:
          "A giant protein found in muscle cells, involved in sarcomere organization and signaling. Its presence suggests a close association or interaction with smooth muscle tissue.",
      },
      {
        name: "GDNF (Glial cell derived neurotrophic factor)",
        description:
          "A neurotrophic factor important for the survival and differentiation of various neuronal populations, including enteric neurons. Its expression by supporting cells like glia or mesenchymal cells, or potentially by ICCs themselves, can influence the enteric nervous system.",
      },
      {
        name: "EDN3 (Endothelin 3)",
        description:
          "A peptide hormone involved in the development of neural crest-derived cells, including enteric neurons and melanocytes. Its expression can be associated with developmental processes or specific cell lineages derived from the neural crest.",
      },
      {
        name: "FAP (Fibroblast Activation Protein alpha)",
        description:
          "A serine protease expressed by activated fibroblasts and myofibroblasts. Its presence suggests interaction with or presence of mesenchymal/fibroblast-like cells in the cluster or surrounding environment.",
      },
    ],
    cellTypeMarkersIntro: "Based on the provided list, the following genes are key cell type markers:",
    cellTypeMarkers: [
      {
        name: "ANO1 & KIT",
        description:
          "As mentioned above, these are the most definitive markers for Interstitial Cells of Cajal (ICCs). Their high expression is the strongest indicator of the cell type.",
      },
      {
        name: "ETV1 (ETS variant 1)",
        description:
          "A transcription factor expressed in various cell types, including enteric neurons and ICCs, particularly ICC-MY.",
      },
      {
        name: "EDN3",
        description:
          "Associated with neural crest-derived lineages, including enteric neurons and potentially some ICC subtypes.",
      },
      {
        name: "OBSCN",
        description:
          "Primarily associated with muscle cells (smooth and striated). Its presence in this cluster points towards a cell type closely associated with or embedded within the muscularis layer.",
      },
      {
        name: "GUCY1A3 & GUCY1B3",
        description:
          "While functional, their expression is strongly associated with smooth muscle cells and cells that interact closely with smooth muscle, like ICCs mediating inhibitory inputs.",
      },
      {
        name: "FAP & COL19A1 (Collagen type XIX alpha 1 chain)",
        description:
          "Markers associated with fibroblasts and the extracellular matrix, suggesting interaction with or presence of mesenchymal components.",
      },
    ],
    databaseCrossReference:
      "Cross-referencing these markers with scRNA-seq databases (like PanglaoDB, CellMarker) and relevant literature on GI scRNA-seq confirms the strong association of ANO1 and KIT with Interstitial Cells of Cajal. ETV1 and EDN3 are known markers for enteric neurons and are also found in specific ICC subtypes, particularly ICC-MY which are closely associated with the myenteric plexus. OBSCN, GUCY1A3, and GUCY1B3 are characteristic of smooth muscle cells, and their presence in an ICC cluster highlights the intimate relationship and functional interaction between ICCs and smooth muscle in regulating gut motility. FAP and COL19A1 are markers of fibroblasts and the surrounding connective tissue matrix, consistent with ICCs being embedded within the muscularis layer and associated with the myenteric plexus (which contains fibroblasts).",
    probableGeneralCellType:
      "The overwhelming presence and high ranking of ANO1 and KIT as the top markers are definitive for Interstitial Cells of Cajal (ICCs). While other markers associated with neurons, smooth muscle, and fibroblasts are present, they are lower in the ranked list and are consistent with the known location and interactions of ICCs within the muscularis layer. Based on the specific combination and ranking of markers, particularly the co-expression of ETV1 and EDN3 with ANO1 and KIT, the cluster is most likely composed of Interstitial Cells of Cajal located in the Myenteric Plexus (ICC-MY).",
    probableSubCellTypesIntro:
      "ICCs in the GI tract are heterogeneous and include subtypes like ICC-MY (myenteric plexus), ICC-IM (intramuscular), and ICC-DMP (deep muscular plexus). Based on the markers:",
    probableSubCellTypes: [
      {
        name: "ICC-MY (Interstitial Cells of Cajal in the Myenteric Plexus)",
        description:
          "This subtype is the primary pacemaker in the GI tract and is located within the myenteric plexus, in close association with enteric neurons and smooth muscle. The high expression of ANO1 and KIT, combined with the presence of ETV1 and EDN3 (markers associated with enteric neurons and often found in ICC-MY), strongly supports this subtype. The presence of FAP and COL19A1 is also consistent with the connective tissue-rich environment of the myenteric plexus.",
      },
      {
        name: "ICC-IM (Interstitial Cells of Cajal in the Intramuscular Layer)",
        description:
          "This subtype is located within the circular and longitudinal muscle layers and is primarily involved in mediating neuromuscular transmission from motor neurons. High expression of ANO1 and KIT is characteristic. The presence of OBSCN, GUCY1A3, and GUCY1B3 (associated with smooth muscle) is highly consistent with ICC-IM being embedded within the muscle layers and interacting with smooth muscle cells.",
      },
      {
        name: "A mixed population of ICC-MY and ICC-IM",
        description:
          "Given the overlap in marker expression between these subtypes and the difficulty in definitively separating them based solely on this list, it is possible the cluster represents a mix of ICC-MY and ICC-IM, or perhaps transitional states between them.",
      },
    ],
    annotationConciseSummary:
      "The analysis of the highly expressed genes in this cluster from the human esophagus muscularis tissue reveals a strong signature of Interstitial Cells of Cajal (ICCs), primarily driven by the top markers ANO1 and KIT. The presence of markers associated with enteric neurons (ETV1, EDN3) and smooth muscle/mesenchyme (OBSCN, GUCY1A3/B3, FAP, COL19A1) is consistent with the known location and functional interactions of ICCs within the muscularis layer. Based on the specific combination and ranking of markers, particularly the co-expression of ETV1 and EDN3 with ANO1 and KIT, the cluster is most likely composed of Interstitial Cells of Cajal located in the Myenteric Plexus (ICC-MY).",

    // Validation Tab Data
    validationStatus: "VALIDATION PASSED",
    feedbackSummary:
      "The annotation as Interstitial Cells of Cajal (ICCs) is strongly supported by the top markers ANO1 and KIT.",
    markerConsistency: [
      "The proposed Interstitial Cells of Cajal (ICCs) annotation is strongly supported by the provided marker list.",
      "Key markers for ICCs (ANO1, KIT) are all present and highly ranked.",
    ],

    // Quality Tab Data
    qualityStrengths: [
      "Correctness of Annotations: The identification of the cluster as Interstitial Cells of Cajal (ICCs) is scientifically sound, relying on the top markers ANO1 and KIT, which are canonical and definitive for ICCs. The analysis also correctly highlights the functional roles of these markers (e.g., ANO1 for pacemaker activity, KIT for ICC development and maintenance). This aligns perfectly with known biology.",
      "Balanced Consideration of Markers: The analysis doesn't overemphasize a single marker but integrates multiple supporting markers to refine the annotation. For example: GUCY1A3/GUCY1B3 and OBSCN are used to contextualize the ICCs' interaction with smooth muscle. ETV1 and EDN3 are appropriately linked to ICC-MY and neural crest-derived lineages. FAP and COL19A1 are noted as evidence of the mesenchymal environment, which is consistent with ICCs' anatomical location.",
      "Comprehensive View of Cell Types: The annotation captures the heterogeneity of ICC subtypes (ICC-MY, ICC-IM) and acknowledges potential mixed populations. The reasoning for favoring ICC-MY due to ETV1 and EDN3 is well-supported by literature, as these markers are associated with the myenteric plexus.",
      "Rank Consideration: The analysis prioritizes the top-ranked markers (e.g., ANO1, KIT) while still incorporating lower-ranked but biologically relevant markers (e.g., FAP, COL19A1). This demonstrates a nuanced understanding of marker importance.",
    ],
    qualityWeaknesses: [
      "Minor Oversight in Subtype Specificity: While the annotation correctly identifies ICC-MY as the most likely subtype, it could further clarify why other ICC subtypes (e.g., ICC-DMP) are less likely, given the absence of specific markers (e.g., PROK1 for ICC-DMP). This would strengthen the exclusion of other subtypes.",
      "Limited Discussion of Lower-Ranked Markers: Some lower-ranked markers (e.g., DPP10, ADAMTS19) are not discussed, though their biological relevance to ICCs or the esophagus muscularis is unclear. A brief note on their potential roles or irrelevance would add completeness.",
    ],
    qualityOverallAssessment:
      "The annotation excels in scientific accuracy, marker balance, and capturing the broader context of the data. The minor weaknesses do not detract significantly from the overall quality.",
  };
}
