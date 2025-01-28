import React, { useState } from 'react';
import TextInput from './TextInput';
import { Icon } from '@iconify/react';

const SearchInput = ({ isLoading, options = [] }) => {
	const [selected, setSelected] = useState(null);
	const [isFocused, setIsFocused] = useState(false);

	const onSearch = (detail) => {
		console.log(detail);
	};

	const onSelectOption = (option) => {
		setSelected(option.name);
		setIsFocused(false);
	};

	return (
		<div className="relative flex w-auto flex-col gap-2 rounded-lg py-2">
			<div className="z-20 w-full">
				<TextInput
					placeholder="Search..."
					onChange={({ target }) => onSearch(target.value)}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
				/>
			</div>

			{isFocused && (
				<div
					className="absolute z-10 w-full rounded-lg border border-border/dark bg-color/background/component-card"
					style={{ marginTop: '48px', maxHeight: '180px' }}
				>
					{!isLoading &&
						options.length > 0 &&
						options.map((option, index) => (
							<button
								key={index}
								disabled={option.disabled}
								className={`hover:bg-grey-f4 flex w-full items-center justify-between p-2 text-left transition duration-150 ease-in-out ${option.name === selected ? 'bg-grey-f4' : ''}`}
								onClick={() => onSelectOption(option)}
							>
								<div className="flex flex-col">
									<div>{option.name}</div>
								</div>
								{option.name === selected && (
									<span className="text-2xl">
										<Icon icon="material-symbols:check-small-rounded" />
									</span>
								)}
							</button>
						))}

					{options.length < 1 && !isLoading && (
						<div className="hover:bg-grey-f4 flex w-full items-center justify-between p-2 text-left transition duration-150 ease-in-out">
							data not found
						</div>
					)}

					{isLoading && (
						<div className="hover:bg-grey-f4 flex w-full items-center justify-between p-2 text-left transition duration-150 ease-in-out">
							Loading...
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default SearchInput;
