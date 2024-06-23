import { NextRequest, NextResponse } from "next/server";
import {generateUniqueFilename} from "@/utils/validations/stringManipulation";
import path from "path";
import fs from "fs";


export const POST = async (req: NextRequest) => {

    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const file = (body.file as Blob) || null;
    const folder: string = ("public/" + body.folder as string) || "public/uploads";
    let isNewFolder: boolean = false;

    if (file) {
        const buffer = Buffer.from(await file.arrayBuffer());
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
            isNewFolder = true;
        }
        const fileName = (body.file as File).name
        const uniqueFileName = generateUniqueFilename(fileName);

        // Construct the full path for the new file name
        const filePath = path.join(folder, uniqueFileName);

        // Write the file with the new name
        fs.writeFileSync(filePath, buffer);

        // Return the new file name in the response
        return NextResponse.json({
            success: true,
            name: uniqueFileName,
            message: `Le fichier ${uniqueFileName} a bien été ajouté au dossier de stockage ${isNewFolder ? "nouvellement créé" : ""} ${folder}`
        });
    } else {
        return NextResponse.json({
            success: false,
            message: `Erreur: le fichier n'a pas été ajouté`
        });
    }
};
