'use client';

import React, { useReducer } from 'react';

import {
	useReactTable,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel
} from '@tanstack/react-table';

export default function Table({
	data = [],
	columns = () => [],
	onRowSelect = () => {},
	isLoading = false,
	withSelect = false
}) {
	const rerender = useReducer(() => ({}), {})[1];
	const [columnFilters, setColumnFilters] = React.useState([]);
	const [sorting, setSorting] = React.useState([]);

	const table = useReactTable({
		data,
		columns,
		filterFns: {},
		state: {
			sorting,
			columnFilters
		},
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		debugTable: true,
		debugHeaders: true,
		debugColumns: false
	});

	if (!data.length || columns.length === 0) return <NoData />;

	return (
		<div>
			{isLoading ? (
				<div className="flex flex-col space-y-2">
					<div className="h-6 w-full animate-pulse bg-background/componnent-input" />
					{Array.from({ length: 3 }, (_, i) => (
						<div key={i} className="flex space-x-4">
							{Array.from({ length: 3 }, (_, i) => (
								<div
									key={i}
									className="h-6 w-full animate-pulse bg-background/componnent-input"
								/>
							))}
						</div>
					))}
				</div>
			) : (
				<table className="w-full overflow-x-auto">
					<thead className="rounded-md bg-background/componnent-input text-text/light">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((h) => (
									<th key={h.id} className="w-fit px-4 py-2 text-start">
										<div className="flex gap-2">
											{flexRender(h.column.columnDef.header, h.getContext())}
										</div>
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody className="text-text/light">
						{table.getRowModel().rows.map((row) => (
							<tr
								key={row.id}
								className="transition-all duration-100 hover:bg-background/componnent-input"
							>
								{row.getVisibleCells().map((cell) => (
									<td
										key={cell.id}
										className="items-center border-b border-neutral/600 px-4 py-2"
									>
										<span className="self-center text-caption/3-light">
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</span>
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}

function NoData() {
	return (
		<div className="flex h-full w-full flex-col gap-2 text-center">
			<div className="rounded-md bg-background/componnent-input p-4 text-center"></div>
			<span className="pt-6 text-text/light">No Data Available.</span>
		</div>
	);
}
