import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const InputFile = ({
	isRequired = false,
	label = '',
	accept = '*',
	onFileChange,
	id = `id-${Date.now()}`
}) => {
	const [selectedFile, setSelectedFile] = useState(null);

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setSelectedFile(file);

		if (file) {
			if (onFileChange) {
				onFileChange(file);
			}
		}
	};

	return (
		<>
			<div className="flex min-w-full flex-col justify-center">
				{label && (
					<label
						suppressHydrationWarning
						htmlFor={id}
						className="flex items-center pb-2 text-page-title/7-medium text-text/light"
					>
						{label}
						{isRequired && <span className="ml-1 font-bold text-red-400">*</span>}
					</label>
				)}
				<label
					htmlFor="fileInput"
					className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border/dark bg-background/componnent-input p-2 text-primary"
				>
					<span>Upload File</span>
					<svg
						width="16"
						height="14"
						viewBox="0 0 16 14"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 4.33333L14.6667 7M14.6667 7L12 9.66667M14.6667 7H6.00004M10 1.80269C9.15021 1.29218 8.16354 1 7.11115 1C3.92017 1 1.33337 3.68629 1.33337 7C1.33337 10.3137 3.92017 13 7.11115 13C8.16354 13 9.15021 12.7078 10 12.1973"
							stroke="#FD6F41"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</label>
				<input
					type="file"
					id="fileInput"
					accept={accept}
					onChange={handleFileChange}
					className="hidden"
				/>
				{selectedFile && (
					<div className="mt-2 flex w-fit items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap rounded-lg border border-dashed border-border/dark p-2">
						<svg
							width="19"
							height="22"
							viewBox="0 0 19 22"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M10.5 1H13.2C14.8802 1 15.7202 1 16.362 1.32698C16.9265 1.6146 17.3854 2.07354 17.673 2.63803C18 3.27976 18 4.11984 18 5.8V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H6.8C5.11984 21 4.27976 21 3.63803 20.673C3.07354 20.3854 2.6146 19.9265 2.32698 19.362C2 18.7202 2 17.8802 2 16.2V15.5M14 12H9.5M14 8H10.5M14 16H6M4 9V3.5C4 2.67157 4.67157 2 5.5 2C6.32843 2 7 2.67157 7 3.5V9C7 10.6569 5.65685 12 4 12C2.34315 12 1 10.6569 1 9V5"
								stroke="#848E9E"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>

						<div className="max-w-[100px]">
							<p className="overflow-hidden text-caption/4-light">
								{selectedFile.name.split('.')[0].length > 11
									? selectedFile.name.slice(0, 11) +
										'...' +
										selectedFile.type.split('/')[1]
									: selectedFile.name}
							</p>{' '}
							<p className="text-caption/5-light text-icon/secondary">
								File size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
							</p>
						</div>
						<div className="h-full border-r border-border/dark"></div>
						<div className="cursor-pointer">
							<svg
								width="18"
								height="18"
								viewBox="0 0 18 18"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M16.5 11.5V12.5C16.5 13.9001 16.5 14.6002 16.2275 15.135C15.9878 15.6054 15.6054 15.9878 15.135 16.2275C14.6002 16.5 13.9001 16.5 12.5 16.5H5.5C4.09987 16.5 3.3998 16.5 2.86502 16.2275C2.39462 15.9878 2.01217 15.6054 1.77248 15.135C1.5 14.6002 1.5 13.9001 1.5 12.5V11.5M13.1667 7.33333L9 11.5M9 11.5L4.83333 7.33333M9 11.5V1.5"
									stroke="#FD6F41"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default InputFile;
