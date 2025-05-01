"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Edit, ListFilter } from "lucide-react"

interface InputFormProps {
  onSubmit: (data: any) => void
}

export default function InputForm({ onSubmit }: InputFormProps) {
  const [tissueType, setTissueType] = useState("Atlas")
  const [markerGene, setMarkerGene] = useState(
    "RP24-338A5.4, Cr2, Ms4a1, Ighd, Fcer2a, Cd79a, Fcmr, Cd22, Cd19, Tnfrsf13c, Blk, Iglc2, Iglc3, Fcrl1, Spib, Pax5, Cd79b",
  )
  const [species, setSpecies] = useState("Mouse")

  // Toggle between dropdown and manual input
  const [useCustomTissue, setUseCustomTissue] = useState(false)
  const [useCustomSpecies, setUseCustomSpecies] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      tissueType,
      markerGene,
      species,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-indigo-700">Enter Analysis Parameters</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="tissueType">Tissue Type</Label>
              <div className="flex items-center space-x-2">
                <ListFilter className={`h-4 w-4 ${useCustomTissue ? "text-gray-400" : "text-indigo-600"}`} />
                <Switch checked={useCustomTissue} onCheckedChange={setUseCustomTissue} id="custom-tissue-toggle" />
                <Edit className={`h-4 w-4 ${useCustomTissue ? "text-indigo-600" : "text-gray-400"}`} />
              </div>
            </div>

            {useCustomTissue ? (
              <Input
                id="customTissueType"
                placeholder="Enter tissue type"
                value={tissueType}
                onChange={(e) => setTissueType(e.target.value)}
                required
              />
            ) : (
              <Select value={tissueType} onValueChange={setTissueType} required>
                <SelectTrigger id="tissueType">
                  <SelectValue placeholder="Select tissue type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Atlas">Atlas</SelectItem>
                  <SelectItem value="brain">Brain</SelectItem>
                  <SelectItem value="liver">Liver</SelectItem>
                  <SelectItem value="blood">Blood</SelectItem>
                  <SelectItem value="lung">Lung</SelectItem>
                  <SelectItem value="heart">Heart</SelectItem>
                  <SelectItem value="kidney">Kidney</SelectItem>
                  <SelectItem value="spleen">Spleen</SelectItem>
                  <SelectItem value="thymus">Thymus</SelectItem>
                  <SelectItem value="bone_marrow">Bone Marrow</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="markerGene">Marker Gene</Label>
            <Input
              id="markerGene"
              placeholder="e.g., CD19, Ms4a1, Pax5"
              value={markerGene}
              onChange={(e) => setMarkerGene(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="species">Species</Label>
              <div className="flex items-center space-x-2">
                <ListFilter className={`h-4 w-4 ${useCustomSpecies ? "text-gray-400" : "text-indigo-600"}`} />
                <Switch checked={useCustomSpecies} onCheckedChange={setUseCustomSpecies} id="custom-species-toggle" />
                <Edit className={`h-4 w-4 ${useCustomSpecies ? "text-indigo-600" : "text-gray-400"}`} />
              </div>
            </div>

            {useCustomSpecies ? (
              <Input
                id="customSpecies"
                placeholder="Enter species"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                required
              />
            ) : (
              <Select value={species} onValueChange={setSpecies} required>
                <SelectTrigger id="species">
                  <SelectValue placeholder="Select species" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Human">Human</SelectItem>
                  <SelectItem value="Mouse">Mouse</SelectItem>
                  <SelectItem value="Rat">Rat</SelectItem>
                  <SelectItem value="Zebrafish">Zebrafish</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
            Start Analysis
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
