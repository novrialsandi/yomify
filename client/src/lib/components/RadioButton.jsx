'use client';

import React from 'react';

const RadioButton = ({
	options,
	selectedValue,
	label = '',
	onChange,
	id = `radio-${Date.now()}`,
	isRequired = false
}) => {
	return (
		<div className="flex flex-col gap-2">
			{label && (
				<label
					htmlFor={id}
					className="flex items-center text-page-title/7-medium text-text/light"
				>
					{label}
					{isRequired && <span className="ml-1 font-bold text-red-400">*</span>}
				</label>
			)}
			<div className="flex gap-8">
				{options.map((option) => (
					<div key={option.value} className="flex items-center gap-2">
						<label className="flex cursor-pointer items-center gap-2">
							<input
								type="radio"
								className="hidden"
								name={id}
								value={option.value}
								checked={selectedValue === option.value}
								onChange={() => onChange(option.value)}
							/>
							<span
								className={`flex h-5 w-5 items-center justify-center rounded-full border ${
									selectedValue === option.value
										? 'border-6 border-primary'
										: 'border border-border/dark bg-background/componnent-input hover:border-2 hover:border-primary'
								}`}
							>
								{selectedValue === option.value && (
									<span className="size-5 flex-none rounded-full border-[6px] border-primary"></span>
								)}
							</span>
							<span>{option.name}</span>
						</label>
					</div>
				))}
			</div>
		</div>
	);
};

export default RadioButton;
