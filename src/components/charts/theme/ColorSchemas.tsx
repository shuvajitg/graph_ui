import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from '@/components/ui/command'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import type { GraphlistType } from '@/lib/types'
import { cn } from '@/lib/utils'
import { PopoverContent } from '@radix-ui/react-popover'
import { Check, ChevronsUpDown } from "lucide-react"
import { useState } from 'react'

function ColorSchemas({
    graphList,
    setColr }: {
        graphList: GraphlistType[],
        setColr: (color: string) => void
    }) {
    const [open, setOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<string | null>(null)
    const handleSelect = (value: string) => {
        setSelectedItem(value)
        setColr(value)
        setOpen(false)
    }
    return (
        <div className='w-full max-w-sm p-2 flex items-center gap-1.5'>
            <h1 className='text-sidebar-foreground'>Bar chart Color:</h1>
            <div>
                {
                    graphList.map((list, index) => (
                        <Popover key={index} open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                {/* <span className="text-gray-400 mr-2">Style:</span> */}
                                <Button
                                    variant={'outline'}
                                    role="combobox"
                                    aria-expanded={open}
                                    className="justify-between bg-background w-[250px]"
                                    key={index}>
                                    {selectedItem ? selectedItem : "Select an Color..."}
                                    <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[250px] p-0 border rounded rounded-bottom-1">
                                <Command>
                                    <CommandInput placeholder="Search framework..." className="h-9" />
                                    <CommandList>
                                        <CommandEmpty>No item found.</CommandEmpty>
                                        <CommandGroup className="max-h-64 overflow-y-auto">
                                            {list.colorSchemes?.map((item: string) => (
                                                <CommandItem
                                                    key={item}
                                                    value={item}
                                                    onSelect={handleSelect}
                                                    className="cursor-pointer">
                                                    {item}
                                                    <Check className={cn("ml-auto", selectedItem === item ? "opacity-100" : "opacity-0")} />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    ))
                }
            </div>
        </div>
    )
}

export default ColorSchemas
