import { NextRequest, NextResponse } from "next/server";
import {generateUniqueFilename} from "@/utils/validations/stringManipulation";
import path from "path";
import fs from "fs";
import {createClient} from "@/utils/supabase/client";
import { useFetch } from "@/hooks/mysql/useFetch";
import { usePrismaFetch } from "@/hooks/prisma/usePrismaFetch";
import {useState} from "react";
import {revalidatePath} from "next/cache";
export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req: NextRequest) {
    const supabase = createClient()

    try {
        const {...projects} = usePrismaFetch('projects')
        console.log(projects);
        revalidatePath('/api/projects');
        return NextResponse.json(projects);
    } catch(error) {
        console.error(error)
        return NextResponse.json({
            error: error
        }, { status: 500 });
    }
}
