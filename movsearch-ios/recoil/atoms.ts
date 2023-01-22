import { atom } from 'recoil';
import { MovieInterface, User } from '../GraphQL/MovieServices/types';
import { searchType } from '../types';

export const filters = atom({
	key: 'filters',
	default: undefined as searchType | undefined
});

export const selectedGenresState = atom({
	key: 'genres',
	default: [] as String[]
});

export const selectedMovieState = atom({
	key: 'selectedMovie',
	default: undefined as MovieInterface | undefined
});

export const authInfo = atom({
	key: 'authInfo',
	default: undefined as User | undefined
});

export const loggedIn = atom({
	key: 'loggedIn',
	default: false
});

export const showSearchState = atom({
	key: 'showSearchState',
	default: false
});
