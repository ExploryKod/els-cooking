import { NextRequest, NextResponse } from "next/server";
import {generateUniqueFilename} from "@/utils/validations/stringManipulation";
import path from "path";
import fs from "fs";
import {createClient} from "@/utils/supabase/client";
import {useState} from "react";
export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req: NextRequest) {
    const supabase = createClient()
    const { data } = await supabase.from('projects').select()

    return NextResponse.json(data);
}
