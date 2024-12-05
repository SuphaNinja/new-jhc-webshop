"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, X } from "lucide-react";
import Link from "next/link";
import StringArrayInput from "../../StringArrayInput";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import { SubmitButton } from "../../SubmitButtons";
import { Switch } from "@/components/ui/switch";
import { useActionState, useState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "@/lib/zodSchemas";
import { type $Enums } from "@prisma/client";
import { createProduct, editProduct } from "@/app/actions";

interface iAppProps {
    data: {
        images: string[];
        id: string;
        name: string;
        description: string;
        status: $Enums.ProductStatus;
        price: number;
        colors: string[];
        sizes: string[];
        category: $Enums.ProductCategory;
        isFeatured: boolean;
        createdAt: Date;
    }
}


export function EditForm({ data }: iAppProps) {
    const [images, setImages] = useState<string[]>(data.images);
    const [sizesArray, setSizesArray] = useState<string[]>(data.sizes);
    const [colorArray, setColorArray] = useState<string[]>(data.images);
    const [lastResult, action] = useActionState(editProduct, undefined);
    const [form, fields] = useForm({
        lastResult,

        onValidate({ formData }) {
            return parseWithZod(formData, { schema: productSchema });
        },

        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });

    const handleDelete = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    }

    const enhancedAction = async (formData: FormData) => {
        formData.append('colors', JSON.parse(JSON.stringify(colorArray)));
        formData.append('sizes', JSON.parse(JSON.stringify(sizesArray)));
        return action(formData);
    }
    
    return(
        <form
            id={form.id}
            onSubmit={form.onSubmit}
            action={enhancedAction}
        >
            <input type="hidden" name="productId" value={data.id}/>
            <div className='flex items-center gap-4'>
                <Button asChild variant="outline" size="icon">
                    <Link href="/dashboard/products">
                        <ChevronLeft className='size-4' />
                    </Link>
                </Button>
                <h1 className='text-xl font-semibold tracking-tight'>Edit Product</h1>
            </div>

            <Card className='mt-5'>
                <CardHeader>
                    <CardTitle>Product details</CardTitle>
                    <CardDescription>Fill the form to update your product</CardDescription>
                </CardHeader>
                <CardContent>

                    <div className='flex flex-col gap-6'>
                        <div className='flex flex-col gap-3'>
                            <Label>Name</Label>
                            <Input
                                type="text"
                                key={fields.name.key}
                                name={fields.name.name}
                                defaultValue={data.name}
                                className="w-full"
                                placeholder="Product name"
                            />
                            <p className=' text-red-500'>{fields.name.errors}</p>
                        </div>

                        <div className='flex flex-col gap-3'>
                            <Label>Description</Label>
                            <Textarea
                                key={fields.description.key}
                                name={fields.description.name}
                                defaultValue={data.description}
                                className="w-full"
                                placeholder="Product description"
                            />
                            <p className=' text-red-500'>{fields.description.errors}</p>
                        </div>

                        <div className='flex flex-col gap-3'>
                            <Label>Price</Label>
                            <Input
                                key={fields.price.key}
                                name={fields.price.name}
                                defaultValue={data.price}
                                type="number"
                                className="w-full"
                                placeholder="Pris i öre"
                            />
                            <p className=' text-red-500'>{fields.price.errors}</p>
                        </div>

                        <div className='flex flex-col gap-3'>
                            <Label>Featured product</Label>
                            <Switch
                                key={fields.isFeatured.key}
                                name={fields.isFeatured.name}
                                defaultChecked={data.isFeatured}
                            />
                            <p className=' text-red-500'>{fields.isFeatured.errors}</p>
                        </div>

                        <div className='flex max-w-md flex-col gap-3'>
                            <Label>Status</Label>
                            <Select
                                key={fields.status.key}
                                name={fields.status.name}
                                defaultValue={data.status}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='draft'>Draft</SelectItem>
                                    <SelectItem value='published'>Published</SelectItem>
                                    <SelectItem value='archived'>Archived</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-red-500">{fields.status.errors}</p>
                        </div>

                        <div className='flex max-w-md flex-col gap-3'>
                            <StringArrayInput
                                key={fields.sizes.key as string}
                                onArrayChange={setSizesArray}
                                initialValue={data.sizes}
                                name="sizes"
                                label="Enter Sizes"
                                type="size"
                            />
                            <p className='text-red-500'>{fields.sizes.errors}</p>
                        </div>

                        <div className='flex max-w-md flex-col gap-3'>
                            <Label>Category</Label>
                            <Select
                                key={fields.category.key}
                                name={fields.category.name}
                                defaultValue={data.category}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='klader'>Kläder</SelectItem>
                                    <SelectItem value='verktyg'>Verktyg</SelectItem>
                                    <SelectItem value='material'>Material</SelectItem>
                                    <SelectItem value='annat'>Annat</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className='text-red-500'>{fields.category.errors}</p>
                        </div>

                        <div className='flex flex-col gap-3'>
                            <StringArrayInput
                                key={fields.colors.key as string}
                                onArrayChange={setColorArray}
                                initialValue={data.colors}
                                name="colors"
                                label="Enter Colors"
                                type="color"
                            />
                            <p className='text-red-500'>{fields.colors.errors}</p>
                        </div>

                        <div className='flex flex-col gap-3'>
                            <Label>Images</Label>
                            <input
                                type='hidden'
                                value={images}
                                key={fields.images.key}
                                name={fields.images.name}
                                defaultValue={data.images}
                            />
                            {images.length > 0 ? (
                                <div className='flex gap-5'>
                                    {images.map((image, index) => (
                                        <div key={index} className="relative w-[100px] h-[100px]">
                                            <Image
                                                height={100}
                                                width={100}
                                                src={image}
                                                alt="product image"
                                                className='object-cover size-full rounded-lg border'
                                            />
                                            <button
                                                onClick={() => handleDelete(index)}
                                                type="button"
                                                className='rounded-md -top-3 -right-3 bg-red-500 text-white p-2 absolute'
                                            >
                                                <X className="size-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <UploadDropzone
                                    endpoint="imageUploader"
                                    onClientUploadComplete={(res) => {
                                        setImages(res.map((r) => r.url));
                                    }}

                                    onUploadError={() => alert("Something went wrong!")}
                                />
                            )}
                            <p className="text-red-500">{fields.images.errors}</p>
                        </div>

                    </div>
                </CardContent>
                <CardFooter>
                    <SubmitButton text="Save changes" />
                </CardFooter>
            </Card>

        </form>
    )
}