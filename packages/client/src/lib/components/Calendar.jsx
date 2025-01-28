import React from 'react';
import { cn } from '@/lib/helpers/classname';
import { DayPicker } from 'react-day-picker';
import dayjs from 'dayjs';
import Dropdown from './Dropdown';
import { Icon } from '@iconify/react';
import { id } from 'dayjs/locale';

// mode: 'single' | 'range' | 'multiple'
export default function Calendar({
	className,
	classNames,
	mode = 'single',
	numberOfMonths = 1,
	...props
}) {
	const [month, onMonthChange] = React.useState(new Date());
	// cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",

	return (
		<DayPicker
			mode={mode}
			month={month}
			className={cn('p-1', className)}
			numberOfMonths={numberOfMonths}
			showOutsideDays={false}
			locale={id}
			classNames={{
				weekdays: 'text-caption/3-light px-8',
				root: 'w-fit border-spacing-2',
				day_button: 'inline-flex items-center  w-full justify-center rounded p-4 ',
				day_width: 'w-[100px]',
				week: 'mb-2',
				day: 'gap-5',
				weeks: 'gap-1 ',
				outside: 'opacity-30',
				month_grid: 'w-[400px] border-spacing-y-2 !border-separate',
				months: 'flex gap-2',
				nav: 'hidden',
				selected: mode === 'single' ? 'bg-icon/primary rounded-md' : 'bg-icon/primary',
				range_start: 'bg-primary rounded-l-md text-color/text/light',
				range_end: 'bg-primary rounded-r-md text-color/text/light',
				...classNames
			}}
			{...props}
			components={{
				MonthCaption: (props) => {
					const { calendarMonth, displayIndex } = props;
					const month = dayjs(calendarMonth.date).format('MMMM');
					const selectedYear = dayjs(calendarMonth.date).format('YYYY');

					const generateYears = React.useMemo(() => {
						const startYear = 2000;
						const currentYear = +dayjs().format('YYYY');
						const maxYear = currentYear + 10;

						const years = [];
						for (let i = startYear; i <= maxYear; i++) {
							years.push({
								id: i,
								label: i
							});
						}

						return years;
					}, []);

					const generateMonths = React.useMemo(() => {
						const months = [];
						for (let i = 0; i <= 11; i++) {
							months.push({
								id: i,
								label: dayjs().month(i).format('MMMM')
							});
						}
						return months;
					}, []);

					const years = generateYears;
					const months = generateMonths;

					const changeYear = (year) => {
						const diff = year - selectedYear;
						onMonthChange(dayjs(calendarMonth.date).add(diff, 'year').toDate());
					};

					const changeMonth = (selectedMonth) => {
						const monthMap = {
							January: 0,
							February: 1,
							March: 2,
							April: 3,
							May: 4,
							June: 5,
							July: 6,
							August: 7,
							September: 8,
							October: 9,
							November: 10,
							December: 11
						};

						const monthIndex = monthMap[selectedMonth];
						const currentMonthIndex = monthMap[month];

						const diff = monthIndex - currentMonthIndex;
						onMonthChange(dayjs(calendarMonth.date).add(diff, 'month').toDate());
					};

					const nextMonth = React.useCallback(() => {
						onMonthChange(dayjs(calendarMonth.date).add(1, 'month').toDate());
						return;
					});

					const prevMonth = React.useCallback(() => {
						onMonthChange(dayjs(calendarMonth.date).subtract(1, 'month').toDate());
						return;
					});

					return (
						<div className="mb-4 flex space-x-2 p-2">
							{numberOfMonths === 1 ? (
								<div className="flex w-full items-center justify-between">
									<div className="flex items-center justify-between space-x-2 px-2">
										<div className="w-fit">
											<Dropdown
												defaultValue={month}
												items={months}
												popupTopPosition={50}
												onStateChange={changeMonth}
											/>
										</div>
										<div className="w-fit">
											<Dropdown
												defaultValue={selectedYear}
												items={years}
												popupTopPosition={50}
												onStateChange={changeYear}
											/>
										</div>
									</div>
									<div className="flex items-center">
										<button
											onClick={prevMonth}
											className="inline-flex h-8 w-8 items-center justify-center"
										>
											<Icon
												icon="ei:chevron-up"
												className="size-8 rotate-[-90deg]"
											/>
										</button>
										<button
											onClick={nextMonth}
											className="inline-flex h-8 w-8 items-center justify-center"
										>
											<Icon
												icon="ei:chevron-up"
												className="size-8 rotate-[90deg]"
											/>
										</button>
									</div>
								</div>
							) : (
								<div className="flex w-full items-center justify-between space-x-8 px-2">
									{displayIndex === 0 ? (
										<>
											<button
												className="inline-flex h-8 w-8 items-center justify-center"
												onClick={prevMonth}
											>
												<Icon
													icon="ei:chevron-up"
													className="size-8 rotate-[-90deg]"
												/>
											</button>
											<div className="flex space-x-3">
												<span>{month}</span>
												<span className="opacity-20">/</span>
												<span>{selectedYear}</span>
											</div>
										</>
									) : (
										<>
											<div className="flex space-x-3">
												<span>{month}</span>
												<span className="opacity-20">/</span>
												<span>{selectedYear}</span>
											</div>
											<button
												className="inline-flex h-8 w-8 items-center justify-center"
												onClick={nextMonth}
											>
												<Icon
													icon="ei:chevron-up"
													className="size-8 rotate-[90deg]"
												/>
											</button>
										</>
									)}
								</div>
							)}
						</div>
					);
				}
			}}
		/>
	);
}
