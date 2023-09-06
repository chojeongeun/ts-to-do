interface Task {
	id: number;
	title: string;
	createdAt: Date;
	complete?: boolean;
}

const form = document.querySelector<HTMLFormElement>('#form');
const input = document.querySelector<HTMLInputElement>('#title');
const list = document.querySelector<HTMLUListElement>('#list');

//JSON.parse메서드는 무조건 파라미터값으로 문자값만 들어올수 있도록 강제되어있음
//generic으로 타입을 지정할 수 없기 때문에 무조건 문자를 넣어야 하는데
//처음 로컬저장소에 값이 없기 때문에 undefined, null이 들어가게됨
//localStrogae에 null값이 반환되는 순간 배열을 문자화해서 대신 들어가도록 하면
//parse메서드 안쪽에는 문자값이 인수로 전달되서 오류를 피할 수 있음
let tasks: Task[] = JSON.parse(localStorage.getItem('TASKS') || '[]');
