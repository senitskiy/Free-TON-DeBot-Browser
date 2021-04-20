import React from 'react';
import { useSelector } from 'react-redux';
import { ConfirmInput } from 'src/components/Stages/StageComponents';
import './index.scss';

const convertFromNano = value => value / 1000000000;

const ApproveWindow = () => {
	const approveWindow = useSelector(state => state.debot.approveWindow);

	const handleApprove = isApproved => approveWindow.submit(isApproved);

	const { dst, fee, out, setcode, signkey } = approveWindow.params;
	const hasOutgoingTransfers = !!out.length;

	return (
		<div className='approve-window'>
			<div className='approve-window__container'>
				<div className='approve-window__header'>
					Permission Request 
				</div>
				<div className='approve-window__description'>
					DeBot is going to create an onchain transaction:
				</div>
				<div className='approve-window__details'>
					<div className='approve-window__details-row'>
						<div className='approve-window__details-col approve-window__details-col--title'>
							Account:
						</div>
						<div className='approve-window__details-col'>
							{dst}
						</div>
					</div>
					<div className='approve-window__details-row'>
						<div className='approve-window__details-col approve-window__details-col--title'>
							Transaction fees:
						</div>
						<div className='approve-window__details-col'>
							{convertFromNano(fee)} tokens
						</div>
					</div>
					<div className='approve-window__details-row'>
						<div className='approve-window__details-col approve-window__details-col--title'>
							Message signer public key:
						</div>
						<div className='approve-window__details-col'>
							{signkey}
						</div>
					</div>
				</div>
				{hasOutgoingTransfers
					? <div className='approve-window__details-description'>
						Outgoing transfers from account:
					</div>
					: <div className='approve-window__details-description'>
						No outgoing transfers.
					</div>
				}
				{hasOutgoingTransfers
					&& <div className='approve-window__transfers'>
						<div className='approve-window__transfers-row'>
							<div className='approve-window__transfers-col approve-window__transfers-col--title'>
								Recipient
							</div>
							<div className='approve-window__transfers-col approve-window__transfers-col--title'>
								Amount
							</div>
						</div>
						{out.map((spending, index) => (
							<div key={`${spending}-${index}`} className='approve-window__transfers-row'>
								<div className='approve-window__transfers-col'>
									{spending.recipient}
								</div>
								<div className='approve-window__transfers-col'>
									{convertFromNano(spending.amount)} tokens
								</div>
							</div>
						))}
					</div>
				}
				{!!setcode
					&& <div className='approve-window__details-description approve-window__details-description--warning'>
						Warning: the transaction will change the account smart contract code!
					</div>
				}
				<div className='approve-window__confirm'>
					<ConfirmInput approveCallback={handleApprove} />
				</div>
			</div>
		</div>
	);
}

export default ApproveWindow;
