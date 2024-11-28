"use client"

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'

interface StringArrayInputProps {
    onArrayChange: (array: string[]) => void;
    name: string;
    label: string;
    type: 'color' | 'size';
    key: string;
    initialValue?: string[]
}

const VALID_SIZES = ['xs', 's', 'm', 'l', 'xl', 'xxl', 'none'];

export default function StringArrayInput({ onArrayChange, name, label, type, key, initialValue }: StringArrayInputProps) {
    const [inputValue, setInputValue] = useState('')
    const [stringArray, setStringArray] = useState<string[]>(initialValue ? initialValue : []);

    useEffect(() => {
        onArrayChange(stringArray);
    }, [stringArray, onArrayChange]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            e.preventDefault();
            addStringsToArray();
        }
    }

    const isValidHexCode = (str: string) => /^#([0-9A-F]{3}){1,2}$/i.test(str);

    const isValidSize = (str: string) => VALID_SIZES.includes(str.toLowerCase());

    const addStringsToArray = () => {
        const newStrings = inputValue.split(',').map(str => str.trim()).filter(str => str !== '')
        const validStrings = newStrings.filter(str => {
            if (type === 'color') {
                return isValidHexCode(str);
            } else if (type === 'size') {
                return isValidSize(str);
            }
            return false;
        });
        setStringArray(prevArray => [...prevArray, ...validStrings]);
        setInputValue('');
    }

    const removeString = (index: number) => {
        setStringArray(prevArray => prevArray.filter((_, i) => i !== index));
    }

    return (
        <div className="w-full max-w-md space-y-4">
            <div className="space-y-2">
                <label htmlFor={name} className="text-sm font-medium text-gray-700">
                    {label}
                </label>
                <div className="flex space-x-2">
                    <Input
                        id={name}
                        key={key}
                        name={name}
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleInputKeyDown}
                        placeholder={type === 'color' ? "Enter hex colors (e.g., #FF0000)" : "Enter sizes (e.g., xs, m, l)"}
                        className="flex-grow"
                    />
                    <Button type="button" onClick={addStringsToArray}>Add</Button>
                </div>
            </div>
            <div className="flex flex-wrap gap-2">
                {stringArray.map((str, index) => (
                    <div
                        key={index}
                        className={`flex items-center text-sm font-medium px-2.5 py-0.5 rounded ${type === 'color' ? 'text-white' : 'bg-gray-200 text-gray-800'
                            }`}
                        style={type === 'color' ? { backgroundColor: str } : undefined}
                    >
                        {str}
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className={`ml-1 h-4 w-4 p-0 hover:bg-opacity-20 hover:scale-110 ${type === 'color' ? 'hover:bg-white' : 'hover:bg-gray-300'
                                }`}
                            onClick={() => removeString(index)}
                        >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove</span>
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}

