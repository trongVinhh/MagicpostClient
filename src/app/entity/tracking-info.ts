export class TrackingInfo {
    public orderCode: string;
    public totalPrice: number;
    public mass: number;
    public receiveAddress: string;
    public receiverName: string;
    public phoneNumber: string;
    public nameCurrentStorage: string;
    public date: Date;
    public status: string;

    constructor(
        orderCode: string,
        totalPrice: number,
        mass: number,
        receiveAddress: string,
        receiverName: string,
        phoneNumber: string,
        nameCurrentStorage: string,
        date: Date,
        status: string
    ) {
        this.orderCode = orderCode;
        this.totalPrice = totalPrice;
        this.mass = mass;
        this.receiveAddress = receiveAddress;
        this.receiverName = receiverName;
        this.phoneNumber = phoneNumber;
        this.nameCurrentStorage = nameCurrentStorage;
        this.date = date;
        this.status = status;
    }
    
}
