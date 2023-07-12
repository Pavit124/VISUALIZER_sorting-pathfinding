import { dijkstra } from "./dijkstra";

export function bidirectional(grid, startNode, finishNode) {
    let toStart = dijkstra(grid, finishNode, startNode);
    for(let row = 0; row < 20; row++) {
        for(let col = 0; col < 50; col ++) {
          const node = grid[row][col];
          document.getElementById(`node-${row}-${col}`).className = 'node';
          node.distance = Infinity;
          node.isVisited = false;
          node.isWall = false;
          node.previousNode = null;
        }
    }
    let toFinish = dijkstra(grid, startNode, finishNode);
    let visitedNodesInOrder = toFinish.slice(0, 10);

    for(let i = 0; i < toStart.length - 10; i++) {
        if(toStart[i].row === toFinish[i + 10].row) {
            if(toStart[i].col === toFinish[i + 10].col) {
                return visitedNodesInOrder;
            }
        }
        visitedNodesInOrder.push(toStart[i + 1]);
        visitedNodesInOrder.push(toFinish[i + 10]);
    }

    return visitedNodesInOrder;
}

export function bidirectionalShortestPath(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}