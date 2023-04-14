import { FC, PropsWithChildren, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
	sideMenuOpen: boolean;
}

const UI_Initial_State: UIState = {
	sideMenuOpen: false,
};

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(uiReducer, UI_Initial_State);

	const openSideMenu = () => {
		dispatch({ type: 'UI - Open Sidebar' });
	};

	const closeSideMenu = () => {
		dispatch({ type: 'UI - Close Sidebar' });
	};

	return (
		<UIContext.Provider
			value={{
				...state,
				// Methods
				openSideMenu,
				closeSideMenu,
			}}
		>
			{children}
		</UIContext.Provider>
	);
};
