/**
 * Person Domain Object
 */
export class Person {
    constructor(data) {
        this.nconst = data.nconst;
        this.primaryName = data.primaryName;
        this.birthYear = data.birthYear;
        this.deathYear = data.deathYear;
        this.primaryProfession = data.primaryProfession ? data.primaryProfession.split(',') : [];
        this.knownForTitles = data.knownForTitles ? data.knownForTitles.split(',') : [];

        // This will be populated from TMDB
        this.imageUrl = null;
    }

    get displayName() {
        return this.primaryName;
    }
}
