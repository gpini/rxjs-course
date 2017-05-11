
export function setVisible(id, isVisible) {
	let container = document.getElementById(id);
	if (isVisible) {
		container.style.display = 'block';
	} else {
		container.style.display = 'none';
	}
}
