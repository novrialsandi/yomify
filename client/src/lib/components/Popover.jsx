import React from 'react';
import { cn } from '@/lib/helpers/classname';

const Popover = React.forwardRef(({ className, ...props }, ref) => (
	<div ref={ref} className={cn('relative inline-block w-full', className)} {...props} />
));

const PopoverTrigger = React.forwardRef(({ className, ...props }, ref) => (
	<div ref={ref} className={(cn(''), className)} {...props} />
));

const PopoverContent = React.forwardRef(
	({ className, align = 'center', offset = 0, isOpen, onClose, ...props }, ref) => {
		const handleClickOutside = React.useCallback(
			(event) => {
				if (ref?.current && !ref.current.contains(event.target)) {
					onClose(false);
				}
			},
			[ref, onClose]
		);

		React.useEffect(() => {
			document.addEventListener('mousedown', handleClickOutside);
			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}, [handleClickOutside]);

		const itemsAlignStyle = {
			left: 'left-0',
			right: 'right-0',
			center: 'left-1/2 transform -translate-x-1/2'
		};

		return (
			<div
				ref={ref}
				data-align={align}
				offset={offset}
				style={{ display: isOpen ? 'block' : 'none' }}
				className={cn(
					'absolute z-[10] mt-2 w-fit border-[1px] border-color/border/component-border bg-background/componnent-input',
					itemsAlignStyle[align],
					className
				)}
				{...props}
			/>
		);
	}
);

Popover.displayName = 'Popover';
PopoverTrigger.displayName = 'PopoverTrigger';
PopoverContent.displayName = 'PopoverContent';

export { Popover, PopoverTrigger, PopoverContent };
