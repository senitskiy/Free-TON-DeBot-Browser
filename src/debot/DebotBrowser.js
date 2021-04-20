import store from 'src/store';
import tonClient from 'src/tonClient';
import { DEBOT_WC } from 'src/constants';
import { setSigningBox, setApproveWindow } from 'src/store/actions/debot';
import InterfacesController from './interfaces';

class DebotBrowser {
	constructor() {
		this.debot_handle = null;
		this.debot_abi = null;
		this.info = null;
	}

	setDebotParams(params) {
		const { debot_handle, debot_abi, info } = params;

		this.debot_handle = debot_handle;
		this.debot_abi = debot_abi;
		this.info = info;
	}

	log(loggerParams) {
		const browserParams = {
			debot_handle: this.debot_handle,
			debot_abi: this.debot_abi,
			info: this.info,
		};
		console.log(browserParams, loggerParams);
	};

	switch(params) {
		console.log(params)
	};

	switch_completed() {
		console.log({ msg: 'Switch completed' })
	};

	show_action(params) {
		console.log(params)
	};

	input(params) {
		console.log(params)
	};

	async get_signing_box() {
		const keysPromise = new Promise((resolve) => {
			store.dispatch(setSigningBox({
				submit: resolve,
			}));
		});

		const keys = await keysPromise;

		const { handle } = await tonClient.crypto.get_signing_box(keys);

		store.dispatch(setSigningBox(null));

		return { signing_box: handle };
	};

	invoke_debot(params) {
		console.log(params)
	};

	async send(params) {
		const parsedMessage = await tonClient.boc.parse_message({ boc: params.message })

		const { dst, src, dst_workchain_id } = parsedMessage.parsed;
		const [, interfaceId] = dst.split(':');

		if (dst_workchain_id === DEBOT_WC) {
			InterfacesController.delegateToInterface(interfaceId, {
				debotAddress: src,
				...params,
			});
		} else {
			console.log('call other debot', parsedMessage, params);
			// call other debot
		}
	};

	async approve(params) {
		const approvePromise = new Promise((resolve) => {
			store.dispatch(setApproveWindow({
				submit: resolve,
				params: params.activity,
			}));
		});

		const approved = await approvePromise;

		store.dispatch(setApproveWindow(null));

		return { approved };
	};
}

export default DebotBrowser;