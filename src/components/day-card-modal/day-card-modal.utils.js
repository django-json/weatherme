export const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		transform: 'translate(-50%, -50%)'
	}
};

export const openModal = (setIsOpen) => {
	setIsOpen(true);
};

export const closeModal = (setIsOpen) => {
	setIsOpen(false);
};