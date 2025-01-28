'use client';
import React from 'react';
import { cn } from '@/lib/helpers/classname';

const Card = React.forwardRef(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			'flex flex-col rounded-lg border border-color/border/component-border bg-color/background/component-card p-4',
			className
		)}
		{...props}
	/>
));

Card.displayName = 'Card';

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
	<div ref={ref} className={cn('', className)} {...props} />
));

CardHeader.displayName = 'CardHeader';

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
	<div ref={ref} className={cn('mt-6', className)} {...props} />
));

CardContent.displayName = 'CardContent';

export { Card, CardHeader, CardContent };
