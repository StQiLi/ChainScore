import React from 'react';
import { cn } from '../util/cn';

const Card = ({
  date,
  amount,
  sender,
  receiver,
  transactionType,
  status,
}) => {
  return (
    <div
      className={cn(
        'w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px]',
        'bg-gradient-to-b from-slate-800 to-slate-900 shadow-lg'
      )}
    >
      <div className="space-y-2">
        <CardField label="Date" value={date} />
        <CardField label="Amount" value={amount} valueClass="text-green-400" />
        <CardField label="Sender" value={sender} />
        <CardField label="Receiver" value={receiver} />
        <CardField label="Type" value={transactionType} />
        <CardField
          label="Status"
          value={status}
          valueClass={status === 'Completed' ? 'text-green-500' : 'text-yellow-500'}
        />
      </div>
    </div>
  );
};

const CardField = ({ label, value, valueClass = '' }) => {
  return (
    <p className="text-gray-100 font-bold">
      {label}: <span className={`font-normal ${valueClass}`}>{value}</span>
    </p>
  );
};

export default Card;
