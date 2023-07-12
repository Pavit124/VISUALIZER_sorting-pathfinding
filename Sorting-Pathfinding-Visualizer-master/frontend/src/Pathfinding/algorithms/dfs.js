export function dfs(grid, startNode, finishNode) {
    let visitedNodesInOrder = [];
    let currentNode = startNode;
    const gridRow = grid.length - 1;
    const gridCol = grid[0].length - 1;
    let currentCol = gridCol;

    for(let i = 0; i <= startNode.row; i++) {
        currentNode = grid[startNode.row - i][startNode.col];
        currentNode.isVisited = true;
        visitedNodesInOrder.push(currentNode);
    }
    for(let i = startNode.col; i <= gridCol; i++) {
        currentNode = grid[0][i];
        currentNode.isVisited = true;
        visitedNodesInOrder.push(currentNode);
    }
    while(true) {
        for(let i = 1; i <= gridRow; i++) {
            currentNode = grid[i][currentCol];
            currentNode.isVisited = true;
            visitedNodesInOrder.push(currentNode);
            if(currentNode === finishNode) {
                return visitedNodesInOrder;
            }
        }
        currentCol--;
        for(let i = gridRow; i > 0; i--) {
            currentNode = grid[i][currentCol];
            currentNode.isVisited = true;
            visitedNodesInOrder.push(currentNode);
            if(currentNode.isFinish === finishNode) {
                return visitedNodesInOrder
            }
        }
        currentCol--;
    }
}