interface Projects {
    id: BigInt | int;
    user_id?: BigInt | int;
    project_date?: string;
    project_place?: string;
    project_category?: string | null;
    project_title: string;
    project_extract?: string | null;
    project_teaser?: string | null;
    project_description?: string | null;
    project_goal?: string | null;
    project_method?: string | null;
    project_results?: string | null;
    project_single_url?: string | null;
    project_infos?: Record<string, unknown> | null;
    project_meta?: Record<string, unknown> | null;
    project_publish_status?: string | null;
    created_at?: Date | null;
    updated_at?: Date | null;
    user_uid?: string | null;
}

