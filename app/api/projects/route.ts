import { NextRequest, NextResponse } from "next/server";
import {generateUniqueFilename} from "@/utils/validations/stringManipulation";
import path from "path";
import fs from "fs";
import {createClient} from "@/utils/supabase/client";
import {useState} from "react";
import {revalidatePath} from "next/cache";
export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req: NextRequest) {
    const supabase = createClient()

    const projects: Projects[] = [
        {
          id: 1,
          project_date: "Date 1",
          project_title: "Reboisement transfrontalier",
          project_extract: "La Commune de Moyen Mono 1 et la Commune d’Aplahoué plus que jamais déterminées à assurer la protection de leur environnement.",
          project_description: "Initié par l’association ELS-TOGO, le projet transfrontalier Togo/Bénin a pour but de reboiser les rives du plus grand fleuve du Togo, le fleuve Mono sur une distance de 40 km au cours de la phase du projet et puis dans la Commune d’Aplahoué dans le Bénin au cours de la deuxième phase.",
          project_goal: "Ce projet vise à contribuer à l’atteinte de l’ambition du gouvernement qui consiste à atteindre un milliard d’arbres d’ici 2030 afin de contribuer efficacement à la protection de notre environnement. Plus de 20 000 personnes vont bénéficier directement de ce projet à travers la fabrication des engrais organiques, l’achat des pépinières, l’entretien des plants jusqu’à maturité, la vente des fruits produits par ces arbres et un héritage inépuisable pour les générations futurs.",
          project_method: "Sur ce projet nous allons planter des arbres fruitiers et à valeur ajoutés afin de créer des activités génératrices de revenus pour les jeunes et les femmes du milieu afin d’apporter une solution aux problèmes de la faim et du changement climatique. Nous allons collaborer sur ce projet avec l’ONG ENPRO qui va nous fournir des fertilisants organiques pour une bonne croissance des plants tout en respectant les principes de l’agro-écologie.",
          project_results: "",
          project_single_url: "../uploads/project-1.jpg",
          project_infos: null,
          project_meta: null,
          project_publish_status: null,
          created_at: null,
          updated_at: null,
          user_uid: null,
        },
        {
          id: 2,
          project_date: "Date 2",
          project_title: "Création d’un centre optique humanitaire",
          project_extract: "L’association ELS-TOGO soucieuse du bien être de sa population se donne pour mission d’améliorer l’acuité visuelle des personnes âgées et des jeunes.",
          project_description: "C’est dans cette optique que nous voulons créer un centre optique humanitaire pour offrir des services humanitaires de qualité à la population dans les milieux ruraux moyennant une modeste contribution financière.",
          project_goal: "Ce projet bénéficiera à plus 5 000 000 togolais souffrant des problèmes de vision sur toute l’étendue du territoire nationale. Les consultations seront menées par les ophtalmologues d’une part et les opticiens vont s’occuper de la fabrication et le choix des verres d’autre part.",
          project_method: "",
          project_results: "",
          project_single_url: "../uploads/project-2.jpg",
          project_infos: null,
          project_meta: null,
          project_publish_status: null,
          created_at: null,
          updated_at: null,
          user_uid: null,
        },
        {
          id: 3,
          project_date: "Date 3",
          project_title: "Camp chantier et tourisme",
          project_extract: "L’association ELS-TOGO vous propose des congés et vacances inoubliables au Togo avec plus de 50 sites touristiques à visiter sur l’ensemble du territoire national. Assuré le bien-être de la population consiste aussi à apporter de la joie et de la bonne humeur dans le cœur des gens ; c’est l’une des raisons qui nous pousse à créer des activités récréatives pour les enfants, les jeunes et les personnes âgées pour leur plein épanouissement. Il est également prévu au cours de ce projet des ateliers de formations, de partages d’expériences, des stages… Le projet de tourisme est destiné à tous les pays du monde et permettra à des millions de touristes de visiter les merveilleux sites touristes de notre beau pays le Togo comme les cascades de la région des plateaux, les belles plages et les lacs de la région maritime, le parc animalier de la région de la Kara, les beaux sites touristiques de Temberma …",
          project_description: "",
          project_goal: "",
          project_method: "",
          project_results: "",
          project_single_url: "../uploads/project-3.jpg",
          project_infos: null,
          project_meta: null,
          project_publish_status: null,
          created_at: null,
          updated_at: null,
          user_uid: null,
        },
        {
          id: 4,
          project_date: "Date 4",
          project_title: "Collecte et de valorisation des déchets",
          project_extract: "Rendre la commune Moyen Mono 1 propre et attirante c’est l’une des missions que se donne l’association ELS-TOGO. Soucieuse de l’amélioration du cadre de vie de la population togolaise et particulièrement de la Commune Moyen Mono 1, l’association ELS-TOGO voudrait apporter son soutien à la Mairie de la Commune Moyen Mono 1 en lui offrant des services de voiries composées des engins tricycles, véhicules pour le ramassage des déchets ménagers qui seront transformés en engrais organiques. Il sera également question au cours de ce projet, des formations sur le transfert de compétences au profit de la population de la Commune Moyen Mono 1 sur la valorisation des déchets ménagers et des animaux transformés en fertilisants organiques pour une bonne productivité.",
          project_description: "",
          project_goal: "",
          project_method: "",
          project_results: "",
          project_single_url: "../uploads/project-4.jpg",
          project_infos: null,
          project_meta: null,
          project_publish_status: null,
          created_at: null,
          updated_at: null,
          user_uid: null,
        },
        {
          id: 5,
          project_date: "Date 5",
          project_title: "Hygiène et assainissement",
          project_extract: "",
          project_description: "Pour permettre à nos populations de vivre dans un environnement sain et d’avoir de l’eau potable en permanence pour la consommation et usage domestique, l’association ELS-TOGO a initié un certain nombre projet. a) Projet de construction de dépotoirs publics pour éradiquer les dépotoirs anarchiques qui sont à la base de plusieurs maladies. b) Projet de construction de latrines publiques pour éviter la défécation à l’air libre c) Projet de voirie pour le ramassage des ordures ménagères d) Projet de construction de forages publics pour approvisionner la population en eau potable",
          project_goal: "",
          project_method: "",
          project_results: "",
          project_single_url: "../uploads/project-5.jpg",
          project_infos: null,
          project_meta: null,
          project_publish_status: null,
          created_at: null,
          updated_at: null,
          user_uid: null,
        },
        {
          id: 6,
          project_date: "Date 6",
          project_title: "Don de fournitures scolaires aux enfants démunies",
          project_extract: "L’éducation inclusive consiste à offrir les mêmes chances d’études à tous les enfants pour leur permettre un avenir meilleur.",
          project_description: "C’est dans ce cadre que depuis 2021, l’association ELS-TOGO offre des fournitures scolaires aux enfants démunis des Communes de Zio 1 et de Moyen Mono 1 afin de leur permettre de démarrer la rentrée scolaire en toute quiétude.",
          project_goal: "",
          project_method: "",
          project_results: "Plus de 500 enfants bénéficient chaque année de ces kits scolaires. Outre l’éducation inclusive nous faisons également la promotion de la culture de l’excellence en primant les meilleurs élèves de chaque classe en fin d’année avec des fournitures scolaires, le paiement de leurs écoles, des voyages touristiques en groupe… Ces activités de remise de kits scolaires se déroulent chaque année dans l’école Ste Fatima de Tsévié, partenaire de l’association ELS-TOGO.",
          project_single_url: "../uploads/project-6.jpg",
          project_infos: null,
          project_meta: null,
          project_publish_status: null,
          created_at: null,
          updated_at: null,
          user_uid: null,
        },
        {
          id: 7,
          project_date: "Date 7",
          project_title: "Reboisement dans les quartiers de la ville de Tsévié",
          project_extract: "",
          project_description: "La journée nationale de l’arbre est célébrée chaque 1 er juin au Togo. Cependant depuis 2021, le 1 er juin est considéré comme le jour du lancement officiel par le gouvernement de la campagne nationale de reboisement sur une période de 3 mois.",
          project_goal: "C’est dans ce cadre que l’association ELS-TOGO organise également des activités de reboisement plusieurs quartiers de la ville de Tsévié afin de contribuer à l’ambition du gouvernement qui consiste à planter un milliard d’arbres d’ici 2030",
          project_method: "",
          project_results: "En Juin 2023 l’association ELS-TOGO a mis en terre environs 500 plants sur voie située entre le bar Vénus et l’ITRA à Tsévié-Démé.",
          project_single_url: "../uploads/project-7.jpg",
          project_infos: null,
          project_meta: null,
          project_publish_status: null,
          created_at: null,
          updated_at: null,
          user_uid: null,
        }
      ];
      

    try {
        //const { data } = await supabase.from('projects').select()
        //console.log(data);

        const data =  projects;
        
        revalidatePath('/api/projects');
        return NextResponse.json(data);
    } catch(error) {
        console.error(error)
        return NextResponse.json(error);
    }


}
