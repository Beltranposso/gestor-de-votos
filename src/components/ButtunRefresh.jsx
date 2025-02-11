"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export default function ReloadButton({onClick}) {
  const [isLoading, setIsLoading] = useState(false)

  const handleReload = async () => {
    setIsLoading(true)
    // Simular una acción de recarga
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  return (
    <Button onClick={onClick} disabled={isLoading} variant="outline" size="icon">
      <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
      <span className="sr-only">Recargar</span>
    </Button>
  )
}

