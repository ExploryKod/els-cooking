import Image from "next/image";

export function ProjectImage({ src, alt }: any) {
    return <Image src={`/projects/${src}.svg`} alt={alt} width="64" height="64" />
}
