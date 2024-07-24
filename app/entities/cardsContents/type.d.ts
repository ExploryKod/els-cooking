
type CardImgElements = {
    img_source: string;
    img_alt_text: string;
}

type CardButtonData = {
    url: string;
    text: string;
}

type CardsContents = {
    id: string;
    card_category: string;
    card_name: string;
    card_lang: string;
    card_version: string;
    card_pretitle: string;
    card_title: string;
    card_text: string;
    card_img: CardImgElements;
    card_button_data: CardButtonData;
}

type CardsTextError = {
    error: boolean;
    message: string;
}