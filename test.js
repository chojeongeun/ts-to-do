const form = document.querySelector('#form');
const input = document.querySelector('#title');
const list = document.querySelector('#list');

//처음 페이지 로딩시 로컬 저장소에서 TASKS에 대한 데이터호출
let data = localStorage.getItem('TASKS');
//해당 데이터가 있으면 parsing 해서 tasks배열에 저장, 없으면 빈배열 저장
let tasks = data ? JSON.parse(data) : [];

//tasks에 배열값을 반복출력 (만약 저장소에 값이없으면 출력안됨)
tasks.map((task) => addListItem(task));

//Submit이벤트가 발생할때마다
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

	checkbox.addEventListener('change', () => {
		task.complete = checkbox.checked;
		item.style.textDecoration = task.complete ? 'line-through' : 'none';
		//동적으로 생긴 checkbox요소에 change이벤트가 발생할때마다 다시 변경점을 로컬저장소에 저장
		localStorage.setItem('TASKS', JSON.stringify(tasks));
	});

	item.append(checkbox, task.title);
	list.append(item);
}
