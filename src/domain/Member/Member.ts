import MetabolicProfile from './MetabolicProfile';

export class Member {
    public metabolicProfile: MetabolicProfile;
    constructor(
        public memberId: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public metric: boolean,
        public gender: number,
        public weight: number,
        public height: number,
        public targetWeightChange: number,
        public birthDate: Date,
        public activityLevel: string,
        public createdTimestamp: Date,
        public updatedTimestamp: Date,
    ) {
    }
}
