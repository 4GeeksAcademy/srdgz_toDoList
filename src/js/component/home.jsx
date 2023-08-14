import React, { useState } from 'react';

//include images into your bundle
//create your first component
const Home = () => {
	const [ inputValue, setInputValue ] = useState('');
	const [ toDos, setToDos ] = useState([]);

	return (
		<div className='container'>
			<h1 className='title'><i class='fa-solid fa-list-check'></i> My todo list</h1>
			<ul>
				<li>
					<input
						type='text'
						placeholder='Enter your task'
						onChange={(task) => setInputValue(task.target.value)}
						value={inputValue}
						onKeyUp={(task) => {
							if (task.key === 'Enter') {
								setToDos(toDos.concat(inputValue));
								setInputValue('');
							}
						}}>
					</input>
				</li>
				{toDos.map((list, index) => (
					<li>
						{list}
							<i className='fa-regular fa-circle-xmark'
								onClick={() => 
									setToDos(toDos.filter((i, currentIndex) => index != currentIndex))
								}>
							</i>
						<hr className='breakLine'/>
					</li>
				))}
			</ul>
			<h6>You have {toDos.length} pending tasks</h6>
		</div>
	);
};

export default Home;