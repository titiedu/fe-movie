interface IListMovie {
    name: string;
    slug: string;
    lang: string;
    thumb_url: string;
    _id: string;
    quality: string;
    sub_docquyen: boolean;
    episode_current: string;
}
interface IPhim {
    _id: string;
    name: string;
    slug: string;
    content: string;
    thumb_url: string;
    poster_url: string;
    type: string;
    status: string;
    sub_docquyen: boolean;
    time: string;
    episode_current: string;
    year: number;
    view: number;
    actor: string;
    lang: string;
    quality: string;
    episode_total: number;
    category: { name: string; slug: string }[];
    country: { name: string; slug: string }[];
    episodes: { server_name: string; server_data: IEpisode[] }[];
}
interface IEpisode {
    name: string;
    filename: string;
    slug: string;
    link_embed: string;
    link_m3u8: string;
}