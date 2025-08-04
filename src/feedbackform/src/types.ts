 export interface Feedback{
    id: number;
    name: string;
    email: string
    rating: number;
    comment: string;
    timestamp: string;
    category: 'bug'|'feature'|'general'

}

export interface Stats{
    total:number;
    averageRating:number;
    bugCount:number;
    featureCount:number;
    
}

