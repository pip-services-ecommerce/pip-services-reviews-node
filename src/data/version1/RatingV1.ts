import { IStringIdentifiable } from 'pip-services3-commons-node';

export class RatingV1 implements IStringIdentifiable {
    public id: string;
    public rating_0_count?: number;
    public rating_1_count?: number;
    public rating_2_count?: number;
    public rating_3_count?: number;
    public rating_4_count?: number;
    public rating_5_count?: number;
    public total_count?: number;
}