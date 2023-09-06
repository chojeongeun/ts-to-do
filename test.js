const form = document.querySelector < HTMLFormElement > '#form';
const input = document.querySelector < HTMLInputElement > '#title';
const list = document.querySelector < HTMLUListElement > '#list';

let tasks = JSON.parse(localStorage.getItem('TASKS')) || [];
tasks.map((task) => addListItem(task));

form.addEventListener('submit', (e) => {
	e.preventDefault();
	if (input.value.trim() === '') return alert('할일을 입력하세요');
	const newTask = {
		id: performance.now(),
		title: input.value,
		createdAt: new Date(),
	};
	input.value = '';
	tasks = [newTask, ...tasks];
	list.innerHTML = '';
	//새로운 객체가 만들어지면 저장소에 데이터를 집어넣고
	localStorage.setItem('TASKS', JSON.stringify(tasks));
	//tasks에 있는 배열값을 반복돌면서 목록 생성
	tasks.map((task) => addListItem(task));
});

function addListItem(task) {
	const item = document.createElement('li');
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	//동적인 추가된 상태에서 change이벤트가 발생하지 않고 바로 새로고침되었을때 checked유무에 따라 속성, 스타일 변경
	checkbox.checked = task.complete ? true : false;
	item.style.textDecoration = task.complete ? 'line-through' : 'none';

	checkbox.addEventListener('change', () => {
		task.complete = checkbox.checked;
		item.style.textDecoration = task.complete ? 'line-through' : 'none';
		//동적으로 생긴 checkbox요소에 change이벤트가 발생할때마다 다시 변경점을 로컬저장소에 저장
		localStorage.setItem('TASKS', JSON.stringify(tasks));
	});

	item.append(checkbox, task.title);
	list.append(item);
}
