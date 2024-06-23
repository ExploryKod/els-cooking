import Image from 'next/image'

export function projectImage({ imageId, alt }: any) {
    return <Image src={`/avatars/${imageId}.png`} alt={alt} width="64" height="64" />
}

export function projectSVG({ imageId, alt }: any) {
    return <Image src={`/avatars/${imageId}.svg`} alt={alt} width="64" height="64" />
}


