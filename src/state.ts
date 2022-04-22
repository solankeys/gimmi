/* Global State Store
======================================= */

import create from 'zustand';

type StoreTypes = {
	login: boolean;
	setLogin: (login: boolean) => void;

	account: boolean;
	setAccount: (account: boolean) => void;
};

const useStore = create<StoreTypes>((set) => ({
	login: false,
	setLogin: (login: boolean) => set({ login }),

	account: false,
	setAccount: (account: boolean) => set({ account }),
}));

export default useStore;
