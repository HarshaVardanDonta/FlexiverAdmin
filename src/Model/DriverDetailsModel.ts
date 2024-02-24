class DriverDetails {
    id!: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    mobileNo!: string;
    aBNNo!: string;
    subUrb!: string;
    city!: string;
    isVerified!: boolean;
    availability!: string;
    canYouLiftAndGroove!: string;
    flexerTale!: string;
    flexerStyle!: string;
    lastDanceMove!: string;
    vehicleType!: string;
    vehicleModel!: string;
    vehicleMake!: string;
    vehicleYear!: string;
    rejectionReason!: string;

    fromJson(json: any) {
        this.id = json.id;
        this.firstName = json.firstName;
        this.lastName = json.lastName;
        this.email = json.email;
        this.mobileNo = json.mobileNo;
        this.aBNNo = json.aBNNo;
        this.subUrb = json.subUrb;
        this.city = json.city;
        this.isVerified = json.isVerified;
        this.availability = json.availability;
        this.canYouLiftAndGroove = json.canYouLiftAndGroove;
        this.flexerTale = json.flexerTale;
        this.flexerStyle = json.flexerStyle;
        this.lastDanceMove = json.lastDanceMove;
        this.vehicleType = json.vehicleType;
        this.vehicleModel = json.vehicleModel;
        this.vehicleMake = json.vehicleMake;
        this.vehicleYear = json.vehicleYear;
        this.rejectionReason = json.rejectionReason;
    }

    toJson() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            mobileNo: this.mobileNo,
            aBNNo: this.aBNNo,
            subUrb: this.subUrb,
            city: this.city,
            isVerified: this.isVerified,
            availability: this.availability,
            canYouLiftAndGroove: this.canYouLiftAndGroove,
            flexerTale: this.flexerTale,
            flexerStyle: this.flexerStyle,
            lastDanceMove: this.lastDanceMove,
            vehicleType: this.vehicleType,
            vehicleModel: this.vehicleModel,
            vehicleMake: this.vehicleMake,
            vehicleYear: this.vehicleYear,
        }
    }
}

export default DriverDetails;