import { useState } from 'react'
import { useQuery } from "@tanstack/react-query"
import { getTelefonos } from "@/api/telefonos"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Loader2, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Item {
  id: number;
  unidad: string;
  ip: string;
  rack: string;
  anterior: string;
  estado: string;
  piso: number;
  area: string;
  usuario: string;
  createdAt: string;
  internos: {
    id: number;
    ue: string;
    lugar: string;
    ter: string;
    telefonoId: string;
  }
}

type FilterType = {
  column: keyof Item | null;
  value: string | number | null;
}

const ItemTable = () => {
  const [sortColumn, setSortColumn] = useState<keyof Item>('id')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<FilterType>({ column: null, value: null })

  const { data, isLoading, error } = useQuery({
    queryKey: ['telefonos'],
    queryFn: getTelefonos
  })

  if (error) return <div className="text-red-500 text-center py-4">Error: {(error as Error).message}</div>

  if (isLoading) return (
    <div className="flex justify-center items-center py-8">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
    </div>
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const sortedData = data
    ? [...data].sort((a: Item, b: Item) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
        if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
        return 0
      })
    : []

  const filteredData = sortedData.filter((item: Item) => {
    const matchesSearch = Object.values(item).some(
      value => 
        value && 
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
    const matchesFilter = filter.column && filter.value
      ? item[filter.column] === filter.value
      : true
    return matchesSearch && matchesFilter
  })

  const handleSort = (column: keyof Item) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const handleFilter = (column: keyof Item, value: string | number) => {
    setFilter({ column, value })
  }

  const clearFilter = () => {
    setFilter({ column: null, value: null })
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-4">
        <Input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        {filter.column && filter.value && (
          <Badge variant="secondary" className="flex items-center gap-2">
            Filtrado por {filter.column}: {filter.value}
            <Button variant="ghost" size="sm" onClick={clearFilter}>
              <X className="h-4 w-4" />
            </Button>
          </Badge>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {['ID', 'Unidad', 'IP', 'Rack', 'Anterior', 'Estado', 'Piso', 'Área', 'Usuario', 'Fecha de Creación'].map((header, index) => (
                <TableHead key={index} className="text-center">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort(header.toLowerCase().replace(' de creación', 'createdAt') as keyof Item)}
                  >
                    {header}
                    {sortColumn === header.toLowerCase().replace(' de creación', 'createdAt') && (
                      sortDirection === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item: Item) => (
              <TableRow key={item.id}>
                <TableCell className="text-center">{item.id}</TableCell>
                <TableCell className="text-center">
                  <Button variant="link" onClick={() => handleFilter('unidad', item.unidad)}>{item.unidad}</Button>
                </TableCell>
                <TableCell className="text-center">
                  <Button variant="link" onClick={() => handleFilter('ip', item.ip)}>{item.ip}</Button>
                </TableCell>
                <TableCell className="text-center">
                  <Button variant="link" onClick={() => handleFilter('rack', item.rack)}>{item.rack}</Button>
                </TableCell>
                <TableCell className="text-center">
                  <Button variant="link" onClick={() => handleFilter('anterior', item.anterior)}>{item.anterior}</Button>
                </TableCell>
                <TableCell className="text-center">
                  <Button variant="link" onClick={() => handleFilter('estado', item.estado)}>{item.estado}</Button>
                </TableCell>
                <TableCell className="text-center">
                  <Button variant="link" onClick={() => handleFilter('piso', item.piso)}>{item.piso}</Button>
                </TableCell>
                <TableCell className="text-center">
                  <Button variant="link" onClick={() => handleFilter('area', item.area)}>{item.area}</Button>
                </TableCell>
                <TableCell className="text-center">
                  <Button variant="link" onClick={() => handleFilter('usuario', item.usuario)}>{item.usuario}</Button>
                </TableCell>
                <TableCell className="text-center">{formatDate(item.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ItemTable