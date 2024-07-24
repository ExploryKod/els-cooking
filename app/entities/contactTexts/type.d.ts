type SocialMedias = {
    platform: string,
    url: string,
    logo_source: string,
    logo_alt_text: string,
    logo_color: string,
    logo_hover_color: string,   
}

type ContactImg = {
    img_source: string,
    img_alt_text: string,
}

type ButtonData = {
    url: string,
    text: string,
}

type ContactMapData = {
    map_lat: string,
    map_long: string,
    map_zoom: string,
}

type ContactLogos = {
    logo_source: string,
    logo_alt_text: string,
    logo_color: string,
    logo_hover_color: string,
}

type ContactTexts = {
    id: int,
    contact_section: string,
    contact_lang: string,
    contact_version: string,
    contact_message: string,
    contact_address: string,
    contact_phone: string,
    contact_email: string,
    contact_schedules: string,
    contact_social_media: {
        facebook: string,
        twitter: string,
        linkedin: string,
        instagram: string,
        other: array<SocialMedias>
    },
    contact_img: ContactImg,
    contact_logos: ContactLogos
    contact_button_data: ButtonData
    contact_map_data: ContactMapData
}