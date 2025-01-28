'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Menu = () => {
	const [selectedTab, setSelectedTab] = useState('Semua');
	const tabs = ['Semua', 'Berjalan', 'Selesai', 'Batal'];
	return (
		<div className="flex">
			<div className="flex space-x-2 rounded-[12px] bg-background/componnent-input p-2">
				<div className="relative flex w-full">
					<div className="flex space-x-2 rounded-lg bg-background/componnent-input">
						{tabs.map((tab) => (
							<div key={tab} className="relative">
								{selectedTab === tab && (
									<motion.div
										layoutId="activeTab"
										className="absolute inset-0 rounded-lg bg-[#FB4414]"
										transition={{
											type: 'spring',
											stiffness: 500,
											damping: 30
										}}
									/>
								)}
								<button
									onClick={() => setSelectedTab(tab)}
									className={`z-1 relative px-8 py-1 transition-colors ${
										selectedTab === tab
											? 'text-text/light'
											: 'text-icon/disabled'
									}`}
								>
									{tab}
								</button>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Menu;
