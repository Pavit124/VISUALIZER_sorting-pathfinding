import React, { Component } from 'react';
import Node from './Node/Node';
import { Link } from 'react-router-dom'
import { dijkstra, dijkstraShortestPath } from '../algorithms/dijkstra';
import { astar, astarShortestPath } from '../algorithms/astar';
import { bfs, bfsShortestPath } from '../algorithms/bfs';
import { dfs } from '../algorithms/dfs';
import { bidirectional, bidirectionalShortestPath } from '../algorithms/bidirectional';
import './PathfindingVisualizer.css';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const content = {
  'dijkstra': '<strong><u>Dijkstra’s algorithm</u></strong> works on directed graphs, where nodes are connected with weighted non-negative edges. The algorithm finds the distance from a single source node to all other nodes in the graph. If we only care about the shortest distance to a single target node, we can simply stop the algorithm after that particular path has been found.The algorithm finds the distance from a single source node to all other nodes in the graph.',
  'astar': '<srong><u>A* Search Algorithm</u></strong> is a simple and efficient search algorithm that can be used to find the optimal path between two nodes in a graph. It will be used for the shortest path finding. It is an extension of Dijkstra’s shortest path algorithm (Dijkstra’s Algorithm). The extension here is that, instead of using a priority queue to store all the elements, we use heaps (binary trees) to store them. This function is used in conjunction with the f-heap data structure in order to make searching more efficient.',
  'breadth': '<strong><u>Breadth-First Search (BFS)</u> </strong>is an algorithm used for traversing graphs or trees. Traversing means visiting each node of the graph. Breadth-First Search is a recursive algorithm to search all the vertices of a graph or a tree.As breadth-first search is the process of traversing each node of the graph, a standard BFS algorithm traverses each vertex of the graph into two parts: 1) Visited 2) Not Visited. So, the purpose of the algorithm is to visit all the vertex while avoiding cycles. ',
  'depth': '<strong><u>Depth-first search(DFS)</u></strong> is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node (selecting some arbitrary node as the root node in the case of a graph) and explores as far as possible along each branch before backtracking. When an algorithm traverses a tree, it checks or updates every vertex in the structure. Then, it marks each node it has visited to ensure that it won’t visit the same node more than once.Simply put, tree traversal is the process of checking and updating each vertex within a tree once. ',
  'bidirectional': '<strong><u>Bidirectional search</u></strong> is a searching technique that runs two way.It is the faster technique that works with two who searches that run simultaneously, first one from source too goal and the other one from goal to source in a backward direction. In in an optimal state, both the searches will meet in the middle off the data structure.The bidirectional search algorithm works on a directed graph to find the shortest path between the source(initial node) to the goal node. The two searches will start from their respective places and the algorithm stops when the two searches meet at a node.',
}

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      buttonValue: 'Select Algorithm',
      visitedNodesInOrder: [],
      nodesInShortestPathOrder: [],
      selectedAlgorithm: 'Select Algorithm',
      content: '',
      timeoutIds: [],
    };
    this.algorithmChanged = this.algorithmChanged.bind(this);
    this.clearGrid = this.clearGrid.bind(this);
    this.terminate = this.terminate.bind(this);
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  animate(visitedNodesInOrder, nodesInShortestPathOrder) {
    const speed = parseInt(document.getElementById("speed").value);
    const timeoutIds = [];
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        const timeoutId1 = setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, speed * i);
        timeoutIds.push(timeoutId1);
        this.setState({ timeoutIds });
        return;
      }
      const timeoutId2 = setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
        document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).className = 'node node-start node-visited';
        document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`).className = 'node node-finish node-visited';
      }, speed * i);
      timeoutIds.push(timeoutId2);
    }
    this.setState({ timeoutIds });
  }

  animateShortestPath(nodesInShortestPathOrder) {
    const speed = parseInt(document.getElementById("speed").value) * 3;
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
        document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).className = 'node node-start node-shortest-path';
        document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`).className = 'node node-finish node-shortest-path';
      }, document.getElementById('algorithms').value === 'depth' ? (speed - 10) * i : (speed + 30) * i);
    }
  }

  visualize() {
    const algorithm = document.getElementById('algorithms').value;
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    switch(algorithm) {
      case 'dijkstra':
        this.visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        this.nodesInShortestPathOrder = dijkstraShortestPath(finishNode);
        this.animate(this.visitedNodesInOrder, this.nodesInShortestPathOrder);
        break;
      case 'astar':
        this.visitedNodesInOrder = astar(grid, startNode, finishNode);
        this.nodesInShortestPathOrder = astarShortestPath(finishNode);
        this.animate(this.visitedNodesInOrder, this.nodesInShortestPathOrder);
        break;
      case 'breadth':
        this.visitedNodesInOrder = bfs(grid, startNode, finishNode);
        this.nodesInShortestPathOrder = bfsShortestPath(finishNode);
        this.animate(this.visitedNodesInOrder, this.nodesInShortestPathOrder);
        break;
      case 'depth':
        this.visitedNodesInOrder = dfs(grid, startNode, finishNode);
        this.animate(this.visitedNodesInOrder, this.visitedNodesInOrder);
        break;
      case 'bidirectional':
        this.visitedNodesInOrder = bidirectional(grid, startNode, finishNode);
        console.log(this.visitedNodesInOrder[this.visitedNodesInOrder.length - 1])
        console.log(this.visitedNodesInOrder[this.visitedNodesInOrder.length - 2])
        this.nodesInShortestPathOrder = bidirectionalShortestPath(finishNode);
        this.animate(this.visitedNodesInOrder, this.nodesInShortestPathOrder);
        break;
      default:
        break;
    }
  }
  
  terminate() {
    const { timeoutIds } = this.state;
    for (let i = 0; i < timeoutIds.length; i++) {
      clearTimeout(timeoutIds[i]);
    }
    this.setState({ timeoutIds: [] });
  }

  algorithmChanged() {
    this.clearGrid();
    this.setState({status: ''});
    const value = document.getElementById('algorithms').value;
    if(value === '') {
      this.setState({buttonValue: 'Select Algorithm', selectedAlgorithm: 'Select Algorithm', content: ''});
    } else {
      this.setState({buttonValue: 'Visualize!'});
      switch(value) {
        case 'dijkstra':
          this.setState({selectedAlgorithm: 'Dijkstra\'s Algorithm', content: content['dijkstra']});
          return;
        case 'astar':
          this.setState({selectedAlgorithm: 'A* Search Algorithm', content: content['astar']});
          return;
        case 'breadth':
          this.setState({selectedAlgorithm: 'Breadth-first Search Algorithm', content: content['breadth']});
          return;
        case 'depth':
          this.setState({selectedAlgorithm: 'Depth-first Search Algorithm', content: content['depth']});
          return;
        case 'bidirectional':
          this.setState({selectedAlgorithm: 'Bi-directional Search Algorithm', content: content['bidirectional']});
          return;
      
        default:
          return;
      }
    }
  }

  clearGrid() {
    this.terminate();
    this.setState({status: ''});
    for(let row = 0; row < 20; row++) {
      for(let col = 0; col < 50; col ++) {
        const node = this.state.grid[row][col];
        document.getElementById(`node-${row}-${col}`).className = 'node';
        node.distance = Infinity;
        node.isVisited = false;
        node.isWall = false;
        node.previousNode = null;
        document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).className = 'node node-start';
        document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`).className = 'node node-finish';
      }
    }
    this.setState({visitedNodesInOrder: [], nodesInShortestPath: []});
  }

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <div id="pathfinding" className="pathfinding-visualizer">
        <div className="header">
          <span>Pathfinding Visualizer</span>
          <select className="dropdown" id="algorithms" onChange={this.algorithmChanged}>
            <option value="">Algorithms</option>
            <option value="dijkstra">Dijkstra's Algorithm</option>
            <option value="astar">A* Search</option>
            <option value="breadth">Breadth-first Search</option>
            <option value="depth">Depth-first Search</option>
            <option value="bidirectional">Bi-directional Algorithm</option>
          </select>
          <button className="buttons startstop" id="visualize" onClick={() => this.visualize()} >{this.state.buttonValue}</button>
          <button className="buttons startstop" id="board" onClick={this.terminate} >Terminate</button>
          <button className="buttons" id="path" onClick={this.clearGrid}>Clear Board</button>
          <div className="ddspeed">
            <label>Speed: </label>
            <select className="dropdown" id="speed">
              <option value="20">Fast</option>
              <option value="30">Medium</option>
              <option value="40">Slow</option>
            </select>
          </div>
          <Link to="/"><button className="buttons startstop" id="logout">Logout</button></Link>
        </div>
        <div className="symbols">
          <span><span style={{ backgroundColor: 'green', width: '20px', height: '20px', margin: '0', display: 'inline-block' }}></span> Start Node</span>
          <span><span style={{ backgroundColor: 'red', width: '20px', height: '20px', margin: '0', display: 'inline-block' }}></span> Target Node</span>
          <span><span style={{ border: '2px solid rgb(0, 149, 199)', width: '20px', height: '20px', margin: '0', display: 'inline-block' }}></span> Univisited Node</span>
          <span><span style={{ backgroundColor: '#ff70a6', width: '20px', height: '20px', margin: '0', display: 'inline-block' }}></span> Visisted Node</span>
          <span><span style={{ backgroundColor: 'rgb(255, 254, 106)', width: '20px', height: '20px', margin: '0', display: 'inline-block' }}></span> Shortest-path Node</span>
        </div>
        <div className="desc">
          <span>Pick your algorithm and visualize it!!! :) </span>
        </div>
        <div className="mainSection">
          <div className="info">
            <h3 className='info-head'>{this.state.selectedAlgorithm}</h3>
            <div className='divide'></div>
            <p className="info-content" dangerouslySetInnerHTML={{ __html: this.state.content }}></p>
          </div>
          <div className="grid">
            {grid.map((row, rowIdx) => {
              return (
                <div key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const { row, col, isFinish, isStart, isWall } = node;
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        isFinish={isFinish}
                        isStart={isStart}
                        isWall={isWall}
                        mouseIsPressed={mouseIsPressed}
                        onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                        onMouseEnter={(row, col) =>
                          this.handleMouseEnter(row, col)
                        }
                        onMouseUp={() => this.handleMouseUp()}
                        row={row}></Node>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
