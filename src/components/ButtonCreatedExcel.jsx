import React from "react";
import { Button } from "@/components/ui/button";
import { Sheet } from 'lucide-react';
import { URI27 } from "../services/Conexiones";

import axios from "axios";
import * as XLSX from "xlsx";

export default function ExcelExportButton({ fileName = "reporte.xlsx", id, estado }) {
    const [data, setData] = React.useState([]);

    const fetchData = async () => {
        if (!id) {
            console.error("El ID es inválido.");
            return;
        }
        try {
            const response = await axios.get(`${URI27}${id}`);
            setData(response.data);
        } catch (error) {
            console.error("Error al obtener datos:", error);
        }
    };

    const handleExportExcel = async () => {
        try {
            if (!data || data.length === 0) {
                console.warn("No hay datos para exportar.");
                return;
            }

            // Crear una copia del array de datos con la clave "quorum" renombrada a "Coeficiente"
            const transformedData = data.map(item => {
                const newItem = { ...item }; // Crear una copia del objeto
                if ("quorum" in newItem) {
                    newItem.Coeficiente = newItem.quorum; // Agregar nueva clave
                    delete newItem.quorum; // Eliminar clave antigua
                }
                return newItem;
            });

            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.json_to_sheet(transformedData);
            XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");
            XLSX.writeFile(workbook, fileName);
        } catch (error) {
            console.error("Error al generar el archivo Excel:", error);
        }
    };

    const handleClick = async () => {
        await fetchData();
        await handleExportExcel();
    };

    return (
        <Button
            disabled={estado === "Activa" || estado === "Programada"}
            onClick={handleClick}
            variant="ghost"
            className="flex w-full justify-start gap-2 rounded-md hover:bg-green-100"
        >
            <Sheet />
            Reporte detallado
        </Button>
    );
}
 