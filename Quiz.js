'use strict';

const questions = [
	{
		question: 'What is the capital of France?',
		options: [
			{ answer: 'London', correct: false },
			{ answer: 'Paris', correct: true },
			{ answer: 'Madrid', correct: false }
		]
	},
	{
		question: 'What is the capital of Spain?',
		options: [
			{ answer: 'Paris', correct: false },
			{ answer: 'Madrid', correct: true },
			{ answer: 'London', correct: false }
		]
	},
	{
		question: 'What is the capital of Italy?',
		options: [
			{ answer: 'Rome', correct: true },
			{ answer: 'Paris', correct: false },
			{ answer: 'Berlin', correct: false }
		]
	}
];

let currentQuestion = 0;
let score = 0;

const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const progressBar = document.querySelector('.bar');
const scoreSpan = document.getElementById('score');
const feedback = document.getElementById('feedback');

function loadQuestion() {
	const question = questions[currentQuestion];
	const questionElement = document.querySelector('.question');
	const optionsElement = questionElement.querySelector('#options');

	questionElement.querySelector('#question').textContent = question.question;

	optionsElement.innerHTML = '';

	question.options.forEach((option, index) => {
		const li = document.createElement('li');
		const input = document.createElement('input');
		const label = document.createElement('label');

		input.type = 'radio';
		input.name = `q${currentQuestion}`;
		input.value = index;

		label.textContent = option.answer;

		li.appendChild(input);
		li.appendChild(label);

		optionsElement.appendChild(li);
	});

	if (currentQuestion === 0) {
		prevButton.disabled = true;
	} else {
		prevButton.disabled = false;
	}

	if (currentQuestion === questions.length - 1) {
		nextButton.textContent = 'Finish';
	} else {
		nextButton.textContent = 'Next';
	}

	progressBar.style.width = `${(currentQuestion / questions.length) * 100}%`;

	scoreSpan.textContent = score;
}

function highlightAnswer() {
	const questionElement = document.querySelector('.question');
	const optionsElement = questionElement.querySelector('#options');
	const selectedOption = optionsElement.querySelector('input:checked');

	if (selectedOption) {
		const selectedAnswer = selectedOption.parentElement.textContent.trim();
		const correctAnswer = questions[currentQuestion].options.find(option => option.correct).answer;

		if (selectedAnswer === correctAnswer) {
			selectedOption.parentElement.classList.add('correct');
			feedback.textContent = 'Correct!';
			score++;
		} else {
			selectedOption.parentElement.classList.add('incorrect');
			feedback.textContent = 'Incorrect!';
		}
	} else {
		feedback.textContent = '';
	}

	optionsElement.querySelectorAll('li').forEach(li => {
		if (!li.classList.contains('correct') && !li.classList.contains('incorrect')) {
			li.classList.remove('selected');
		}
	});

	if (currentQuestion === questions.length - 1) {
		feedback.textContent = '';

		const scorePercentage = (score / questions.length) * 100;

		if (scorePercentage >= 80) {
			feedback.textContent = 'Excellent!';
		} else if (scorePercentage >= 50) {
			feedback.textContent = 'Good job!';
		} else {
			feedback.textContent = 'Keep practicing';
		}
	}
}

function goToNextQuestion() {
	highlightAnswer();

	if (currentQuestion < questions.length - 1) {
		currentQuestion++;
		loadQuestion();
	} else {
		document.querySelector('.quiz').style.display = 'none';
		document.querySelector('.score').style.display = 'block';
	}
}

function goToPrevQuestion() {
	highlightAnswer();

	if (currentQuestion > 0) {
		currentQuestion--;
		loadQuestion();
	}
}

prevButton.addEventListener('click', goToPrevQuestion);
nextButton.addEventListener('click', goToNextQuestion);

loadQuestion();