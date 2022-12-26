window.addEventListener('load', () => {
	 persona = JSON.parse(localStorage.getItem('persona')) || [];
	const nameInput = document.querySelector('#name');
	const newPersoniForm = document.querySelector('#input-name-form');

	const username = localStorage.getItem('username') || '';

	nameInput.value = username;

	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	})

	newPersoniForm.addEventListener('submit', e => {
		e.preventDefault();

		const personi = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			createdAt: new Date().getTime()
		}

		persona.push(personi);

		localStorage.setItem('persona', JSON.stringify(persona));

		// Reset the form
		e.target.reset();

		DisplayPersona()
		
	})

	DisplayPersona()

	
})


function DisplayPersona () {
	const personiList = document.querySelector('#personat');
	personiList.innerHTML = "";

	persona.forEach(personi => {
		const personiItem = document.createElement('div');
		personiItem.classList.add('personi-item');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
		var img =new Image();
			img.src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'
			document.getElementById('personat').appendChild(img);
			img.width=30;
			
		span.classList.add('bubble');
		if (personi.category == 'mesues') {
			span.classList.add('mesues');
		} else {
			span.classList.add('student');
			
		}
		content.classList.add('personi-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		content.innerHTML = `<input type="text" value="${personi.content}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		personiItem.appendChild(label);
		personiItem.appendChild(content);
		personiItem.appendChild(actions);

		personiList.appendChild(personiItem);

		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				personi.content = e.target.value;
				localStorage.setItem('persona', JSON.stringify(persona));
				DisplayPersona()

			})
		})

		deleteButton.addEventListener('click', (e) => {
			persona = persona.filter(t => t != personi);
			localStorage.setItem('persona', JSON.stringify(persona));
			DisplayPersona()
		})

	})
}

