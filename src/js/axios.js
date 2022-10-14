import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
axios.defaults.baseURL = 'https://pixabay.com/api/';
// axios.defaults.headers.common['Authorization'] = '30543774-85dcbe3a92a7223df43425301';

export default class PixabayAPI {
    constructor() {
    this.searchQuery = '';
    this.page = 1;
    }

    async fetchImages() {
    const configPix = {
        URL: 'https://pixabay.com/api/',
        key: '30543774-85dcbe3a92a7223df43425301',
        per_page: 40,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    };

    try {
        const response = await axios.get(
        `${configPix.URL}?key=${configPix.key}&q=${this.searchQuery}&page=${this.page
        }&per_page=${configPix.per_page}&image_type=${configPix.image_type}&orientation=${configPix.orientation
        }&safesearch=${configPix.safesearch}`
        );

        if (response.data.total === 0) {
        Notify.warning(
            'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
        }

        if (this.page === 1) {
        Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
        }

        this.page += 1;

        return response.data;
        
    } catch (error) {
        if (error.response.status === 400) {
        Notify.info(
            `We're sorry, but you've reached the end of search results.`
        );
        }
        console.log(error);
    }
    }
    
resetPage() {
    this.page = 1;
}

get query() {
    return this.searchQuery;
}

set query(newQuery) {
    this.searchQuery = newQuery;
}
}