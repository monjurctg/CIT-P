/**
 * Movie Domain Object
 */
export class Movie {
    constructor(data) {
        this.tconst = data.tconst;
        this.titleType = data.titleType;
        this.primaryTitle = data.primaryTitle;
        this.originalTitle = data.originalTitle;
        this.isAdult = data.isAdult;
        this.startYear = data.startYear;
        this.endYear = data.endYear;
        this.runtimeMinutes = data.runtimeMinutes;
        this.genres = data.genres ? data.genres.split(',') : [];
        this.rating = data.averageRating || 0;
        this.numVotes = data.numVotes || 0;
    }

    get displayTitle() {
        return `${this.primaryTitle} (${this.startYear})`;
    }
}
