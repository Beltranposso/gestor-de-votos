'use client'

import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function QuestionSelect({ questions = [] }) {
  // Inicializa con un valor vacío o el id de la primera pregunta, si existe
  const [selectedQuestion, setSelectedQuestion] = React.useState("");
 console.log(selectedQuestion)
  return (
    <Select
      value={selectedQuestion}
      onValueChange={(value) => setSelectedQuestion(value)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Seleccionar pregunta" />
      </SelectTrigger>
      <SelectContent>
        {questions.map((question) => (
          <SelectItem key={question.id} value={String(question.id)}>
            {question.text || `Pregunta ${question.id}`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
