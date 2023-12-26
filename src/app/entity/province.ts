import District from "./district";

interface Province {
    name: string;
    code: number;
    division_type: string;
    codename: string;
    phone_code: number;
    district: District[];
}

export default Province;
