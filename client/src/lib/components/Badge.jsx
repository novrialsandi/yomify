export default function Badge({ label, color = 'icon-primary' }) {
	return (
		<span
			className={`text-xs inline-flex items-center rounded-md bg-icon/primary px-2 py-0.5 text-caption/3-light text-${color}`}
		>
			{label}
		</span>
	);
}
