import {
	PUSH_ITEM_TO_STAGE,
	CLEAR_STAGE,
	SET_SIGNING_BOX,
	SET_APPROVE_WINDOW,
	SET_DEBOTS_FILTER_KEY,
	SET_LOCAL_DEBOTS_LIST,
} from '../actions/debot';
import { USER_DEBOTS_LS_FIELD, DEV_NETWORK, FLD_NETWORK } from 'src/constants';

const initialState = {
	stage: [],
	signingBox: null,
	approveWindow: null,
	filterKey: '',
	debotsList: [
		{ title: 'Core', address: '0:5eeb0b84c8b7eb79e4798b5eab1555b9156b0da09b6ac1bfa76f9dd8a1bf7443', network: FLD_NETWORK },
		{ title: 'Voting list', address: '0:ceb2e275bf60296291a8d660316df88aca7f6ece14309a10fede7f239adee678', network: FLD_NETWORK },
		{ title: 'collator', address: '0:a0204b682a71be4169859e0ec3f43d93b34b2e642d43efae73e5a7257912853d', network: FLD_NETWORK },
		{ title: 'Action team/edit deaudit', address: '0:6a9e4d13385d15cc2e4e223f40dca52c3cf17854debf503e163d6969926a66d8', network: FLD_NETWORK },		
	],
	localDebotsList: JSON.parse(localStorage.getItem(USER_DEBOTS_LS_FIELD)) || [],
}
  
function reducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case PUSH_ITEM_TO_STAGE: {
			const stage = [...state.stage, payload];

			return {
				...state,
				stage,
			}
		}

		case CLEAR_STAGE: {
			return {
				...state,
				stage: [],
			}
		}

		case SET_SIGNING_BOX: {
			return {
				...state,
				signingBox: payload,
			}
		}

		case SET_APPROVE_WINDOW: {
			return {
				...state,
				approveWindow: payload,
			}
		}

		case SET_DEBOTS_FILTER_KEY: {
			const filterKey = payload.toLowerCase();

			return {
				...state,
				filterKey,
			}
		}

		case SET_LOCAL_DEBOTS_LIST: {
			return {
				...state,
				localDebotsList: payload,
			}
		}

		default:
			return state
	}
}

export default reducer
