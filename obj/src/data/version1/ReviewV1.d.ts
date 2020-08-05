import { IStringIdentifiable } from 'pip-services3-commons-node';
export declare class ReviewV1 implements IStringIdentifiable {
    id: string;
    product_id: string;
    party_id: string;
    create_time?: Date;
    update_time?: Date;
    rating: number;
    testimonial?: string;
    full_review?: boolean;
    helpful_count?: number;
    abuse_count?: number;
}
