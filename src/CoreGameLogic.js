function getNewState (cells, xIndex, yIndex) {
	const aliveCount = getNeighbours(cells, xIndex, yIndex).reduce((sum, item) => sum + item, 0);
	const currentState = cells[xIndex][yIndex];
	if (currentState === 1 && aliveCount < 2) {
		return 0;
	}

	if (currentState === 1 && (aliveCount === 2 || aliveCount === 3)) {
		return 1;
	}

	if (currentState === 1 && aliveCount > 3) {
		return 0;
	}
	
	if (currentState === 0 && aliveCount === 3) {
		return 1;
	}

	return currentState;
}

function getNeighbours(cells, xIndex, yIndex) {
	const [xLength, yLength] = [cells.length, cells[0].length];
	const rowAbove = xIndex - 1;
	const rowBelow = xIndex + 1;
	const columnLeft = yIndex - 1;
	const columnRight = yIndex + 1;
	
	const top = rowAbove >= 0 ? cells[rowAbove][yIndex] : 0;
	const topRight = rowAbove >= 0 && columnRight < yLength ? cells[rowAbove][columnRight] : 0;
	const right = columnRight < yLength ? cells[xIndex][columnRight]: 0;
	const rightBelow = columnRight < yLength && rowBelow < xLength ? cells[rowBelow][columnRight] : 0;
	const below = rowBelow < xLength ? cells[rowBelow][yIndex] : 0;
	const belowLeft = rowBelow < xLength && columnLeft >= 0 ? cells[rowBelow][columnLeft] : 0;
	const left = columnLeft >= 0 ? cells[xIndex][columnLeft] : 0;
	const leftTop = columnLeft >= 0 && rowAbove >= 0 ? cells[rowAbove][columnLeft] : 0;

	return [top, topRight, right, rightBelow, below, belowLeft, left, leftTop];
}

const nextGen = (cells) => {
	if (!(cells && cells.length && cells[0].length)) {
		return ;
	}

	return cells.map((row, xIndex) => {
		let newRow = [];
		row.map((cell, yIndex) => {
			newRow.push(getNewState(cells, xIndex, yIndex));
		});

		return newRow;
	});
};

export default nextGen;