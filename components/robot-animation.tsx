"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Brain, CheckCircle, BarChart3, FileText } from "lucide-react"

interface RobotAnimationProps {
  currentStep: number
  isProcessing: boolean
}

export default function RobotAnimation({ currentStep, isProcessing }: RobotAnimationProps) {
  const [conversation, setConversation] = useState<string[]>([])
  const [showConversation, setShowConversation] = useState(false)

  useEffect(() => {
    if (currentStep === 1 && isProcessing) {
      setConversation(["Analyzing marker genes...", "Identifying cell type patterns..."])
      setShowConversation(true)
    } else if (currentStep === 2 && isProcessing) {
      setConversation(["Validating annotation against reference databases...", "Checking marker consistency..."])
      setShowConversation(true)
    } else if (currentStep === 3 && isProcessing) {
      setConversation(["Calculating confidence score...", "Evaluating annotation quality..."])
      setShowConversation(true)
    } else if (currentStep === 4 && isProcessing) {
      setConversation(["Generating comprehensive report...", "Finalizing analysis..."])
      setShowConversation(true)
    } else if (currentStep === 5) {
      setConversation(["Analysis complete!", "Report ready for review."])
      setShowConversation(true)
      // Auto-hide the conversation after 3 seconds when complete
      const timer = setTimeout(() => {
        setShowConversation(false)
      }, 3000)
      return () => clearTimeout(timer)
    } else {
      setShowConversation(false)
    }
  }, [currentStep, isProcessing])

  const robots = [
    {
      id: 1,
      name: "Annotator",
      icon: <Brain className="h-6 w-6" />,
      color: "bg-indigo-100 text-indigo-600",
      activeSteps: [1],
    },
    {
      id: 2,
      name: "Validator",
      icon: <CheckCircle className="h-6 w-6" />,
      color: "bg-green-100 text-green-600",
      activeSteps: [2],
    },
    {
      id: 3,
      name: "Scorer",
      icon: <BarChart3 className="h-6 w-6" />,
      color: "bg-amber-100 text-amber-600",
      activeSteps: [3],
    },
    {
      id: 4,
      name: "Reporter",
      icon: <FileText className="h-6 w-6" />,
      color: "bg-blue-100 text-blue-600",
      activeSteps: [4],
    },
  ]

  // Find active robots based on current step
  const activeRobots = robots.filter((robot) => {
    if (currentStep === 0) return false
    if (currentStep === 1) return robot.id === 1
    if (currentStep === 2) return robot.id === 1 || robot.id === 2
    if (currentStep === 3) return robot.id === 2 || robot.id === 3
    if (currentStep === 4) return robot.id === 3 || robot.id === 4
    if (currentStep === 5) return robot.id === 4 // Only show the reporter robot when complete
    return false
  })

  if (currentStep === 0) return null

  return (
    <div className="mt-6 mb-4">
      <div className="flex justify-center items-center space-x-8 relative">
        {activeRobots.map((robot, index) => (
          <motion.div
            key={robot.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className={`rounded-full p-4 ${robot.color}`}>{robot.icon}</div>
            <span className="text-sm font-medium mt-2">{robot.name}</span>

            {index === 0 && activeRobots.length > 1 && currentStep !== 5 && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, repeat: isProcessing ? Number.POSITIVE_INFINITY : 0, repeatType: "reverse" }}
                className="absolute top-8 left-[calc(25%+20px)] right-[calc(75%-20px)] h-0.5 bg-gray-300"
              >
                <motion.div
                  animate={{
                    x: [0, 100, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: isProcessing ? Number.POSITIVE_INFINITY : 0,
                    ease: "linear",
                  }}
                  className="absolute top-[-3px] h-2 w-2 rounded-full bg-indigo-500"
                />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showConversation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 bg-gray-50 rounded-lg p-3 max-w-md mx-auto"
          >
            <div className="flex items-start space-x-2">
              <div className="bg-indigo-100 p-1 rounded-full">
                <MessageSquare className="h-4 w-4 text-indigo-600" />
              </div>
              <div className="text-sm text-gray-700">
                {conversation.map((message, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.5 }}
                    className="mb-1"
                  >
                    {message}
                  </motion.p>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
