(function(){
	
	const HTML_ROOT_ELEMENT = 'root';
	const HTML_BUTTON_RESET = 'reset';
	const HTML_MARBLE_COUNT = 'marble-count';
	const HTML_BLOCK_CLASS = 'block';	
	const HTML_BLOCK_WITH_MARBLE = 'block-with-marble';
	const HTML_BLOCK_WITH_MARBLE_SELECTED = 'block-with-marble-selected';
	const HTML_BLOCK_EMPTY = 'block-empty';
	const HTML_BLOCK_NOT_IN_USE = 'block-not-in-use';

	let htmlRoot = document.getElementById(HTML_ROOT_ELEMENT);
	let lastClickedMarbleBlock = null;

	// add reset functionality
	document.getElementById(HTML_BUTTON_RESET).onclick = function(){
		initGame();
	}

	function initGame(){
		htmlRoot.innerHTML = '';
		classicPlusPattern();
		setRemainingMarbleCount();
	}

	function setRemainingMarbleCount(){
		document.getElementById(HTML_MARBLE_COUNT).innerHTML = document.querySelectorAll(`#${HTML_ROOT_ELEMENT} .${HTML_BLOCK_WITH_MARBLE}`).length;
	}

	function classicPlusPattern(){		
		fillTheGameBoard(9, 9);

		markNCellsEmptyInRowFromIndex(0, 0, 3);
		markNCellsEmptyInRowFromIndex(1, 0, 3);
		markNCellsEmptyInRowFromIndex(2, 0, 3);

		markNCellsEmptyInRowFromIndex(0, 6, 3);
		markNCellsEmptyInRowFromIndex(1, 6, 3);
		markNCellsEmptyInRowFromIndex(2, 6, 3);

		markNCellsEmptyInRowFromIndex(6, 0, 3);
		markNCellsEmptyInRowFromIndex(7, 0, 3);
		markNCellsEmptyInRowFromIndex(8, 0, 3);

		markNCellsEmptyInRowFromIndex(6, 6, 3);
		markNCellsEmptyInRowFromIndex(7, 6, 3);
		markNCellsEmptyInRowFromIndex(8, 6, 3);

		markCellEmpty(4, 4);
	}	

	function fillTheGameBoard(rows, cols){
		Array.from({length: rows}, (_, rowNumber) => {
			Array.from({length: cols}, (_, columnNumber) => {
				htmlRoot.appendChild(createMarbleBlock(rowNumber, columnNumber));
			})
			htmlRoot.appendChild(createHtmlNewline());
			htmlRoot.appendChild(createHtmlNewline());
			htmlRoot.appendChild(createHtmlNewline());
		});
	}

	function markCellEmpty(row, col){
		markTheBlockAsEmpty(document.getElementById(getSlotId(row, col)));
	}	 

	function markNCellsEmptyInRowFromIndex(rowNumber, from, N){
		let i = from;
		while(N > 0){
			markCellNotInUse(rowNumber, i);
			i++;
			N--;
		}
	}

	function markCellNotInUse(row, col){
		markTheBlockAsNotInUse(document.getElementById(getSlotId(row, col)));
	}

	function markTheBlockAsNotInUse(block){
		block.classList.remove(HTML_BLOCK_WITH_MARBLE);
		block.classList.add(HTML_BLOCK_NOT_IN_USE);
	}

	function createHtmlNewline(){
		return document.createElement('br');
	}

	function getSlotId(row, column){
		return "R:"+row+"_C:"+column;
	}

	function getRowColumnFromId(id){		
		let op = {
			row: -1,
			column: -1
		};
		id = id.split('_');
		op.row = parseInt(id[0].replace("R:", ""));
		op.column = parseInt(id[1].replace("C:", ""));
		return op;
	}

	function setlastClickedMarbleAsSelected(){
		if(lastClickedMarbleBlock){
			lastClickedMarbleBlock.classList.add(HTML_BLOCK_WITH_MARBLE_SELECTED);	
		}
	}

	function setLastClickedMarbleAsNotSelected(){
		if(lastClickedMarbleBlock){
			lastClickedMarbleBlock.classList.remove(HTML_BLOCK_WITH_MARBLE_SELECTED);	
		}
	}

	function markTheBlockAsEmpty(block){
		block.classList.remove(HTML_BLOCK_WITH_MARBLE);
		block.classList.add(HTML_BLOCK_EMPTY);
	}

	function markTheBlockAsWithMarble(block){
		block.classList.add(HTML_BLOCK_WITH_MARBLE);
		block.classList.remove(HTML_BLOCK_EMPTY);
	}

	function createMarbleBlock(row, column){
		let block = document.createElement('div');
		block.id = getSlotId(row, column);
		block.classList.add(HTML_BLOCK_CLASS);
		block.classList.add(HTML_BLOCK_WITH_MARBLE);
		block.onclick = function(){
			// console.log(`Row: ${row}, Column: ${column}`);
			if(this.classList.contains(HTML_BLOCK_WITH_MARBLE) === true){
				setLastClickedMarbleAsNotSelected();
				lastClickedMarbleBlock = this;
				setlastClickedMarbleAsSelected();
				return;
			}

			// if block is empty
			if(this.classList.contains(HTML_BLOCK_EMPTY) === true && lastClickedMarbleBlock){
				let currentBlockId = this.id;
				let op = getRowColumnFromId(this.id);
				let currentBlockRow = op.row;
				let currentBlockColumn = op.column;
				op = getRowColumnFromId(lastClickedMarbleBlock.id);
				let lastBlockRow = op.row;
				let lastBlockColumn = op.column;

				// console.log(`current: (${currentBlockRow}, ${currentBlockColumn}), last: (${lastBlockRow}, ${lastBlockColumn})`);

				if(currentBlockRow === lastBlockRow){
					// both blocks are in same row
					// console.log('both blocks are in same row');
					let columnDiff = currentBlockColumn-lastBlockColumn;
					if(columnDiff === -2){
						markCellEmpty(currentBlockRow, currentBlockColumn+1);
						setLastClickedMarbleAsNotSelected();
						markTheBlockAsEmpty(lastClickedMarbleBlock);
						lastClickedMarbleBlock = null;
						markTheBlockAsWithMarble(this);
					} else if(columnDiff === 2){
						markCellEmpty(currentBlockRow, currentBlockColumn-1);
						setLastClickedMarbleAsNotSelected();
						markTheBlockAsEmpty(lastClickedMarbleBlock);
						lastClickedMarbleBlock = null;
						markTheBlockAsWithMarble(this);
					} else {
						// invalid selection
						console.log('oops.... blocks are too far');
					}
				} else if(currentBlockColumn === lastBlockColumn){
					// both blocks are in same column
					// console.log('both blocks are in same column');
					let rowDifference = currentBlockRow - lastBlockRow;
					if(rowDifference === -2){
						markCellEmpty(currentBlockRow+1, currentBlockColumn);
						setLastClickedMarbleAsNotSelected();
						markTheBlockAsEmpty(lastClickedMarbleBlock);
						lastClickedMarbleBlock = null;
						markTheBlockAsWithMarble(this);
					} else if(rowDifference === 2){
						markCellEmpty(currentBlockRow-1, currentBlockColumn);
						setLastClickedMarbleAsNotSelected();
						markTheBlockAsEmpty(lastClickedMarbleBlock);
						lastClickedMarbleBlock = null;
						markTheBlockAsWithMarble(this);
					}
				} else {
					// invalid selection
					console.log('oops.... blocks are too far');
				}
			}
			setRemainingMarbleCount();
		};
		return block;
	}	

	initGame();
})();
