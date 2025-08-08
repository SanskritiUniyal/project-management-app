// src/components/KanbanBoard.jsx
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './KanbanBoard.css';

const initialTasks = {
  todo: [{ id: '1', content: 'Build login page' }],
  inProgress: [{ id: '2', content: 'Wire up Redux' }],
  done: [{ id: '3', content: 'Deploy to Render' }]
};

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceList = Array.from(tasks[source.droppableId]);
    const [movedItem] = sourceList.splice(source.index, 1);
    const destList = Array.from(tasks[destination.droppableId]);
    destList.splice(destination.index, 0, movedItem);

    setTasks({
      ...tasks,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destList
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-container">
        {['todo', 'inProgress', 'done'].map((column) => (
          <Droppable droppableId={column} key={column}>
            {(provided) => (
              <div
                className="kanban-column"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3>{column.toUpperCase()}</h3>
                {tasks[column].map((task, index) => (
                  <Draggable draggableId={task.id} index={index} key={task.id}>
                    {(provided) => (
                      <div
                        className="kanban-task"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {task.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
