"use client"

import { createBanner } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadDropzone } from "@/lib/uploadthing";
import { bannerSchema } from "@/lib/zodSchemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useActionState, useState } from "react";

export default function CreateBannerPage() {
    const [image, setImage] = useState<string | undefined>(undefined);
    const [lastResult, action] = useActionState(createBanner, undefined);

    const [form, fields ] = useForm({
        lastResult,
        
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: bannerSchema });
        },

        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });

    return (
        <form id={form.id} onSubmit={form.onSubmit} action={action}>
            <div className="flex items-center gap-x-4">
                <Button asChild variant="outline" size="icon">
                    <Link href={"/dashboard/banner"}>
                        <ChevronLeft className="size-4" />
                    </Link>
                </Button>
                <h1 className="font-semibold tracking-tight text-2xl">New Banner</h1>
            </div>

            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>Banner details</CardTitle>
                    <CardDescription>Create your banner here</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-y-6">
                        <div className="flex flex-col gap-3">
                            <Label>Name</Label>
                            <Input 
                                key={fields.title.key}
                                name={fields.title.name}
                                type="text" 
                                placeholder="Create title for banner"
                            />
                            <p className="text-red-500">{fields.title.errors}</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Label>Image</Label>
                            <input 
                                type="hidden" 
                                value={image} 
                                key={fields.imageString.key} 
                                name={fields.imageString.name}
                                defaultValue={fields.imageString.initialValue}
                            />
                            {image !== undefined ? (
                                <Image 
                                    src={image} 
                                    alt="Banner image" 
                                    width={200} 
                                    height={200} 
                                    className="h-[200px] w-[200px] object-cover border rounded-lg"
                                />
                            ) : ( 
                                <UploadDropzone
                                    onClientUploadComplete = {
                                        (res) => {
                                            setImage(res[0].url)
                                    }}
                                onUploadError={() => {
                                    alert("Something went wrong")
                                }}
                                endpoint="bannerUploader"
                            />
                            )}
                            <p className="text-red-500">{fields.imageString.errors}</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <SubmitButton text="Create Banner"/>
                </CardFooter>
            </Card>

        </form>
    )
}