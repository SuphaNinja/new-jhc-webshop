"use client";

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image'
import React, { useState } from 'react'

interface iAppProps {
    images: string[];
}
export function ImageSlider({images}: iAppProps) {
    const [imageIndex, setImageIndex] = useState(0);

    const handlePrevious = () => {
        setImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setImageIndex((prevIndex) => (prevIndex === images.length -1 ? 0 : prevIndex + 1));
    };

    const handleImageClick = (index: number) => {
        setImageIndex(index);
    }
    return (
        <div className='grid gap-6 md:gap-3 items-start'>
            <div className='relative overflow-hidden rounded-lg'>
                <Image 
                    src={images[imageIndex]} 
                    alt={"Product Image"} 
                    width={600} 
                    height={600}
                    className='object-cover h-[600px] w-[600px]'
                />
                <div className='absolute inset-0 flex items-center justify-between px-4'>
                    <Button onClick={handlePrevious} variant={"secondary"} size={"icon"}>
                        <ChevronLeft className='size-8'/>
                    </Button>
                    <Button onClick={handleNext} variant={"secondary"} size={"icon"}>
                        <ChevronRight className='size-8' />
                    </Button>
                </div>
            </div>
            <div className='grid grid-cols-5 gap-4'>
                {images.map((image, index) => (
                    <div 
                        key={index} 
                        onClick={() => handleImageClick(index)} 
                        className={`relative hover:scale-105 overflow-hidden hover:cursor-pointer rounded-lg 
                            ${imageIndex === index ? 'border-2 scale-105 border-primary' : ''}`}
                    >
                        <Image 
                            src={image} 
                            alt="product Image" 
                            width={100} 
                            height={100}
                            className='w-[100px] h-[100px] object-cover'
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
