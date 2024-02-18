import { useEffect, useState } from "react";
import "./App.css"; 
import Board from './components/Board/Board.jsx'
// import data from '../data'
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import Editable from "./components/Editable/Editable";
import Search from "./components/Search/Search";

const getLocalStorageData = () => localStorage.getItem("kanban-board")
? JSON.parse(localStorage.getItem("kanban-board"))
: []

function App() {
  const [data, setData] = useState(localStorage.getItem("kanban-board")
? JSON.parse(localStorage.getItem("kanban-board"))
: []);

  const [tempSearchedData, setTempSearchedData] = useState(localStorage.getItem("kanban-board")
? JSON.parse(localStorage.getItem("kanban-board"))
: []);

  useEffect(() => {
    localStorage.setItem("kanban-board", JSON.stringify(data));
    setTempSearchedData(data);
  }, [data]);

  const setName = (title, bid) => {
    const index = data.findIndex((item) => item.id === bid);
    const tempData = [...data];
    tempData[index].boardName = title;
    setData(tempData);
  };

  const dragCardInBoard = (source, destination) => {
    let tempData = [...data];
    const destinationBoardIdx = tempData.findIndex(
      (item) => item.id.toString() === destination.droppableId
    );
    const sourceBoardIdx = tempData.findIndex(
      (item) => item.id.toString() === source.droppableId
    );
    tempData[destinationBoardIdx].card.splice(
      destination.index,
      0,
      tempData[sourceBoardIdx].card[source.index]
    );
    tempData[sourceBoardIdx].card.splice(source.index, 1);

    return tempData;
  };

  // const dragCardInSameBoard = (source, destination) => {
  //   let tempData = Array.from(data);
  //   console.log("Data", tempData);
  //   const index = tempData.findIndex(
  //     (item) => item.id.toString() === source.droppableId
  //   );
  //   console.log(tempData[index], index);
  //   let [removedCard] = tempData[index].card.splice(source.index, 1);
  //   tempData[index].card.splice(destination.index, 0, removedCard);
  //   setData(tempData);
  // };

  const addCard = (title, bid) => {
    const index = data.findIndex((item) => item.id === bid);
    const tempData = [...data];
    tempData[index].card.push({
      id: uuidv4(),
      title: title,
      tags: [],
      task: [],
      issueType: '',
      effortEstimation: '',
      priority: '',
      description: '',
      attachments: null,
      assignee: null,
      dependsOn: null,
      blocks: null,
    });
    setData(tempData);
  };

  const removeCard = (boardId, cardId) => {
    const index = data.findIndex((item) => item.id === boardId);
    const tempData = [...data];
    const cardIndex = data[index].card.findIndex((item) => item.id === cardId);

    tempData[index].card.splice(cardIndex, 1);
    setData(tempData);
  };

  const addBoard = (title) => {
    const tempData = [...data];
    tempData.push({
      id: uuidv4(),
      boardName: title,
      card: [],
    });
    setData(tempData);
  };

  const removeBoard = (bid) => {
    const tempData = [...data];
    const index = data.findIndex((item) => item.id === bid);
    tempData.splice(index, 1);
    setData(tempData);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) return;

    setData(dragCardInBoard(source, destination));
  };

  const updateCard = (bid, cid, card) => {
    const index = data.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...data];
    const cards = tempBoards[index].card;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    tempBoards[index].card[cardIndex] = card;
    setData(tempBoards);
  };

  function filterCards(typeOfSearchStr, searchString) {
    const filteredBoards = [];
    if(!typeOfSearchStr || !searchString) {
      // setData(data);
      setTempSearchedData(localStorage.getItem("kanban-board")
      ? JSON.parse(localStorage.getItem("kanban-board"))
      : []);
    }
    const data = localStorage.getItem("kanban-board")
    ? JSON.parse(localStorage.getItem("kanban-board"))
    : []
    if(searchString) {

      data.forEach(board => {
        const updatedCards = [];
        board.card.forEach(card => {
          if (typeOfSearchStr === "description" && card.description && card.description.toLowerCase().includes(searchString)) {
 
            updatedCards.push(card);
          } else if (typeOfSearchStr === "issueType" && card.issueType && card.issueType.toLowerCase().includes(searchString)) {
           
            updatedCards.push(card);
          } else if (typeOfSearchStr === "title" && card.title && card.title.toLowerCase().includes(searchString)) {
           
            updatedCards.push(card);
          } else if (typeOfSearchStr === "assignee" && card.assignee && card.assignee.toLowerCase().includes(searchString)) {
           
            updatedCards.push(card);
          } else if (typeOfSearchStr === "tags" && card.tags) {
              for(let i = 0; i< card.tags.length; i++) {
                if(card.tags[i]?.tagName?.toLowerCase().includes(searchString)) {
                  updatedCards.push(card);
                  return;
                } 
              }
            } 
          }  
        ); 
        filteredBoards.push({...board, card: updatedCards})
      });
      setTempSearchedData(filteredBoards);
      return filteredBoards;
    }
}

  const onSearch = ({searchStr, selectedCategory}) => {
    // tempSearchedData
    const arr = localStorage.getItem("kanban-board")
    ? JSON.parse(localStorage.getItem("kanban-board"))
    : [];
    const result = filterCards(selectedCategory, searchStr)

  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App" >
      <h1>Kanban Board</h1>
      <Search onSearchCb={onSearch} />
        <div className="app_outer">
          <div className="app_boards">
            {tempSearchedData.map((item) => (
              <Board
                key={item.id}
                id={item.id}
                name={item.boardName}
                card={item.card}
                setName={setName}
                addCard={addCard}
                removeCard={removeCard}
                removeBoard={removeBoard}
                updateCard={updateCard}
              />
            ))}
            <Editable
              class={"add__board"}
              name={"+ Add Column"}
              btnName={"Add Column"}
              onSubmit={addBoard}
              placeholder={"Enter Column Title"}
            />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
