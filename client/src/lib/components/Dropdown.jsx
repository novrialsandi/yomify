'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Button from './Button';
import { iconSvg } from '../Icons/icon';

/**
 * Dropdown component
 * @param {Object} props - The component props
 * @param {string} [props.label=''] - The label for the dropdown
 * @param {number} [props.popupTopPosition=75] - The top position of the dropdown popup
 * @param {string} [props.popupPosition='left'] - The position of the dropdown popup ('left' or 'right')
 * @param {boolean} [props.disabled=false] - Whether the dropdown is disabled
 * @param {string} [props.popupZIndexClass='z-10'] - The CSS class for the z-index of the popup
 * @param {string} [props.popupStyle=''] - Additional CSS styles for the popup
 * @param {string} [props.btnToggleClass=''] - Additional CSS classes for the toggle button
 * @param {string} [props.placeholder='Select Value'] - The placeholder text for the dropdown
 * @param {string} [props.icon=''] - The icon to display in the dropdown
 * @param {Array<{ id: string, label: string }>} [props.items=[]] - The items to display in the dropdown
 * @param {function} [props.onStateChange=() => {}] - The function to call when the state of the dropdown changes
 * @param {string} [props.type='single' | 'multi'] - The type of selection for the dropdown
 * @param {string} [props.hint=''] - The hint text for the dropdown
 * @param {string} [props.defaultValue=''] - The default value for the dropdown
 * @param {string} [props.maxWidth='1200px'] - The maximum width of the dropdown
 * @returns {React.ReactElement} The Dropdown component
 */
const Dropdown = ({
	label = '',
	popupTopPosition = 75, // should be changeable based on the height of the whole page
	popupPosition = 'left',
	disabled = false,
	popupZIndexClass = 'z-10',
	popupStyle = {},
	btnToggleClass = '',
	placeholder = 'Select Value',
	items = [],
	onStateChange = () => {},
	type = 'single',
	hint = '',
	defaultValue = '',
	maxWidth = '1200px'
}) => {
	const [multipleSelectedItems, setMultipleSelectedItems] = useState([]);
	const [singleSelectedItem, setSingleSelectedItem] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const wrapperRef = useRef(null);

	const onSelectItem = useCallback(
		(item) => {
			switch (type) {
				case 'single':
					setSingleSelectedItem(item.label);
					onStateChange(item.value);
					break;
				case 'multi':
					setMultipleSelectedItems((prevItems) => [...prevItems, item]);
					onStateChange([...multipleSelectedItems, item]);
					break;
				default:
					break;
			}
		},
		[
			type,
			multipleSelectedItems,
			setSingleSelectedItem,
			setMultipleSelectedItems,
			onStateChange
		]
	);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div ref={wrapperRef} className="relative flex w-full flex-col gap-2">
			{label && (
				<span className="text-page-title/6-medium text-text/light dark:text-text/light">
					{label}
				</span>
			)}
			<Button
				disabled={disabled}
				className={`${btnToggleClass}`}
				placeholder={placeholder}
				onClick={(e) => {
					e.stopPropagation();
					setIsOpen(!isOpen);
				}}
				primary={false}
			>
				<div className="flex w-full items-center justify-between gap-2">
					<span
						className={`${
							!singleSelectedItem && !multipleSelectedItems.length && !defaultValue
								? 'text-icon/disabled'
								: 'text-text/light'
						}`}
					>
						{!singleSelectedItem && !multipleSelectedItems.length
							? defaultValue
								? defaultValue
								: placeholder
							: type === 'single'
								? singleSelectedItem
								: `${multipleSelectedItems.length} Selected`}
					</span>
					<span
						style={{
							transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
							transition: 'transform 0.15s ease'
						}}
					>
						{iconSvg.arrowDownSvg}
					</span>
				</div>
			</Button>
			{type === 'multi' && multipleSelectedItems.length > 0 && (
				<div className="flex space-x-2">
					{multipleSelectedItems.map((item) => (
						<div className="inline-flex items-center gap-2 rounded bg-background/componnent-input px-2 py-0.5 text-text/light dark:text-text/light">
							<span>{item.label}</span>
						</div>
					))}
				</div>
			)}
			<p className="text-caption/4-light tracking-wider text-text/light">{hint}</p>

			{isOpen && (
				<div
					className={`no-scrollbar absolute h-fit max-h-[210px] w-full min-w-[140px] max-w-[${maxWidth}] overflow-auto rounded-lg border-[1px] border-border/dark bg-background/componnent-input shadow-lg ${popupZIndexClass} ${
						popupPosition === 'right' ? 'right-0' : 'left-0'
					}`}
					style={{
						top: `${popupTopPosition}px`,
						...popupStyle
					}}
				>
					<div
						className={`no-scrollbar relative w-full overflow-y-scroll rounded-lg p-2`}
						onClick={() => setIsOpen(!isOpen)}
					>
						<div className="no-scrollbar flex h-full flex-col gap-2 overflow-y-scroll text-text/light dark:text-text/light">
							{items && items.length ? (
								items.map((item) => {
									return (
										<button
											className="flex gap-2 p-2 hover:bg-background/primary"
											key={item.id}
											onClick={() => onSelectItem(item)}
										>
											{item.label}
										</button>
									);
								})
							) : (
								<span>No Value to select</span>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Dropdown;
