export interface FoodInterface {
    id?: number;
    NDB_No?: number;

    Long_Desc: string;
    Shrt_Desc: string;
    ManufacName: string;
    SciName: string;
    FdGrp_Desc: string;
    ComName: string;

    N_Factor: number;
    CHO_Factor: number;
    Fat_Factor: number;
    Pro_Factor: number;
    fat: number;
    carb: number;
    protein: number;

    day_id: number;
    weight: number;
    meal: string;
}
